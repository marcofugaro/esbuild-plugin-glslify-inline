import { Plugin } from 'esbuild'

type Options = {
  minify?: boolean
}

declare function glslInline(options?: Options): Plugin
export { glslInline }
