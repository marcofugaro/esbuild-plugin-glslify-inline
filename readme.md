# esbuild-plugin-glslify-inline

> An [esbuild](https://github.com/evanw/esbuild) plugin to transform inline GLSL strings with [glslify](https://github.com/glslify/glslify).

## Install

```
npm install --save-dev esbuild-plugin-glslify-inline
```

or

```
yarn add --dev esbuild-plugin-glslify-inline
```

## Usage

You can use into any `esbuild.mjs` script like this:

```js
import { build } from 'esbuild'
import { glslifyInline } from 'esbuild-plugin-glslify-inline'

build({
  entryPoints: ['input.js'],
  outfile: 'output.js',
  bundle: true,
  plugins: [glslifyInline()],
}).catch(() => process.exit(1))
```

You can also minify the imported shaders with `glslifyInline({ minify: true })`.

After that, you can use glslify normally with esbuild:

```js
import glsl from 'glslify'

// ...

const material = new THREE.MeshStandardMaterial()

customizeVertexShader(material, {
  head: glsl`
    uniform float time;
    uniform float speed;

    // you can import glsl packages like this
    #pragma glslify: noise = require(glsl-noise/simplex/3d)
  `,
  main: glsl`
    // and use them in other parts of the shader
    vec3 displacement = normal * noise(vec3(uv, time * speed));
  `,
  // hook that lets you modify the position
  transformed: glsl`
    transformed += displacement;
  `,
})
```

<!-- TODO note about customizeVertexShader -->
