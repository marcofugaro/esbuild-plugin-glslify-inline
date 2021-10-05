// 👨‍🍳🤌
import compile from 'babel-plugin-glsl/lib/compile.js'

export default function glslifyInline() {
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
        text = text.replaceAll('glsl`', '`')

        // resolve glslify imports
        text = text.replace(/^(\s*)#pragma glslify(.*)/gm, (match) => {
          const glslifyImport = match.trim()

          if (cache[glslifyImport]) {
            return cache[glslifyImport]
          }

          const contents = compile(glslifyImport)
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
