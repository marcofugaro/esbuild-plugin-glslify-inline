# esbuild-plugin-glslify-inline

> Transform glsl strings with glslify

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
import glslifyInline from 'esbuild-plugin-glslify-inline'

esbuild.build({
  // ...

  plugins: [glslifyInline()],
})
```

## API

### unicornFun(input, options?)

#### input

Type: `string`

Lorem ipsum.

#### options

Type: `object`

##### postfix

Type: `string`\
Default: `rainbows`

Lorem ipsum.
