import glsl from 'glslify'

const head = glsl`
  uniform float time;
  uniform float speed;

  #pragma glslify: noise = require(glsl-noise/simplex/3d)
`
const main = glsl`
  vec3 displacement = normal * noise(vec3(uv, time * speed));
`

console.log(head, main)
