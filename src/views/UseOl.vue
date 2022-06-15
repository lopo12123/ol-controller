<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import { OlController } from "../../lib";

const container = ref<HTMLDivElement | null>(null)
const controller = shallowRef<OlController | null>(null)

const renderMap = () => {
    if(!!container.value) {
        controller.value = new OlController(container.value, '', {
            center: [ 120.209881, 29.235268 ]
        })

        controller.value.addPolygonLayer('test-polygon', 'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=330000_full')
        controller.value.addPointLayer('test-point', [ { anchor: [ 120, 30 ] } ], 'http://localhost:22222/src/assets/home/serve.png')
    }
}

onMounted(() => {
    renderMap()
    // const map = new OlMap({
    //     layers: [
    //         new TileLayer({
    //             source: new OSM(),
    //         }),
    //     ],
    //     target: '#ol-container',
    //     view: new View({
    //         center: [ 0, 0 ],
    //         zoom: 2,
    //     }),
    // });
    // console.log(map)
})
onBeforeUnmount(() => {

})
</script>

<template>
    <div class="use-ol">
        <div id="ol-container" ref="container"/>
    </div>
</template>

<style lang="scss" scoped>
.use-ol {
    position: relative;
    width: 100%;
    height: 100%;

    #ol-container {
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 100%;
    }
}
</style>
