import fs from 'fs/promises'
import path from 'path'
import URL from 'url'
import esbuild from 'esbuild'
import test from 'ava'
import { glslifyInline } from '../src/index.js'

const __dirname = path.dirname(URL.fileURLToPath(import.meta.url))

test('works with a basic example', async (t) => {
  const input = path.resolve(__dirname, './fixtures/basic.js')
  const output = path.resolve(__dirname, './fixtures/generated/basic.js')

  await esbuild.build({
    entryPoints: [input],
    outfile: output,
    bundle: true,
    format: 'esm',
    plugins: [glslifyInline()],
  })

  const generated = await fs.readFile(output, 'utf-8')

  t.snapshot(generated)
})

test('works with a basic example but minified', async (t) => {
  const input = path.resolve(__dirname, './fixtures/basic.js')
  const output = path.resolve(__dirname, './fixtures/generated/basic-minified.js')

  await esbuild.build({
    entryPoints: [input],
    outfile: output,
    bundle: true,
    format: 'esm',
    plugins: [glslifyInline({ minify: true })],
  })

  const generated = await fs.readFile(output, 'utf-8')

  t.snapshot(generated)
})
