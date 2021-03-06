import fs from 'fs/promises'
// The babel-plugin-glsl compiler is a really 👨‍🍳🤌 glslify compiler.
// It doesn't rename imports, so you can import a function in
// a string and use it in another. Read more at:
// https://github.com/onnovisser/babel-plugin-glsl#imported-function-names
import compile from 'babel-plugin-glsl/lib/compile.js'
import { minifyShader } from './minifyShader.js'

export function glslifyInline({ minify = false } = {}) {
  return {
    name: 'glslifyInline',
    setup(build) {
      const cache = {}

      build.onLoad({ filter: /\.(js|ts|jsx|tsx)$/ }, async (args) => {
        if (args.path.includes('/node_modules/')) {
          return
        }

        let text = await fs.readFile(args.path, 'utf8')

        if (!text.includes('#pragma glslify')) {
          return
        }

        // remove the unnecessary import
        text = text.replace(/import glsl from ('|")glslify('|");?/, '')

        // remove the unnecessary glsl function call
        text = text.replace(/glsl`/g, '`')

        // resolve glslify imports
        text = text.replace(/^(\s*)#pragma glslify(.*)/gm, (match) => {
          const glslifyImport = match.trim()

          if (cache[glslifyImport]) {
            return cache[glslifyImport]
          }

          let contents = compile(glslifyImport)
          if (minify) {
            contents = minifyShader(contents)
          }
          cache[glslifyImport] = contents
          return contents
        })

        return {
          contents: text,
        }
      })
    },
  }
}
