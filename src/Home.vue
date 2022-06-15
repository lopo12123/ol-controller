<script lang="ts" setup>
import { ref, shallowRef } from "vue";
import { OlController } from "../lib";

// region panel control
const PanelDefault = {
    center: [ 120, 30 ]
}

// endregion

const container = ref<HTMLDivElement | null>(null)
const controller = shallowRef<OlController | null>(null)

const renderMap = () => {
    if(!!container.value) {
        controller.value = new OlController(container.value, '', {
            center: [ 120.209881, 29.235268 ]
        })
    }
}
</script>

<template>
    <div class="home">
        <div class="panel-view">

        </div>
        <div class="map-view">
            <div id="ol-container" ref="container"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "index";

.home {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .panel-view {
        @include index.scrollBarStyle();
        position: relative;
        width: 18.75rem;
        height: 100%;
        overflow: hidden auto;

        .block {

        }
    }

    .map-view {
        position: relative;
        width: calc(100% - 18.75rem);
        height: 100%;

        #ol-container {
            position: relative;
            width: 100%;
            height: 100%;
        }
    }
}
</style>