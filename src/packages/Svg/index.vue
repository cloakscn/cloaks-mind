<template>
  <div ref="footer"></div>
</template>

<script lang="ts">
import {SVG, Rect} from '@svgdotjs/svg.js'
import {ref} from "vue";
export default {
  name: "index"
}

const footer = ref(null)
const draw = SVG().addTo('body').size(300, 300);
// const element = draw.element('div', {id:'myId'}).words('this is a title');
draw.rect(300,300).fill('#f00')
const foreignObject = draw.foreignObject(300, 300)
// Pass true as second parameter to SVG() to create an html in the html-namespace
foreignObject.add(SVG('<input type="text">',true))
foreignObject.add(SVG('<button>button</button>',true))
foreignObject.add(SVG('<div><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d648ee130fac4d0da76b343493082dcc~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp"> <button>button:d</button></div>',true))
// var rect = new Rect().size(100, 100).addTo(draw)
// or to reuse an existing node
// var rect = new Rect(node).size(100, 100)
</script>

<style scoped>

</style>