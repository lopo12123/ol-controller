<script setup lang="ts">
import 'ol/ol.css';
import { onBeforeUnmount, onMounted, ref } from "vue";
import { create_map } from "../lib/core";

const OlContainer = ref<HTMLDivElement | null>(null)

const renderMap = () => {
    if(!!OlContainer.value) {
        create_map(OlContainer.value, '', {
            center: [ 120.209881, 29.235268 ]
        })
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
        <div id="ol-container" ref="OlContainer"/>
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
