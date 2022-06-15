<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import { OlController } from "../lib";


// region panel control
const PanelDefault = {
    url: '',
    panel_center_longitude: '116.3',
    panel_center_latitude: '39.9',
    panel_point_longitude: '',
    panel_point_latitude: '',
    panel_polygon_url: '',
}
const panel_url = ref(PanelDefault.url)
const panel_center_longitude = ref(PanelDefault.panel_center_longitude)
const panel_center_latitude = ref(PanelDefault.panel_center_latitude)
const panel_point_longitude = ref(PanelDefault.panel_point_longitude)
const panel_point_latitude = ref(PanelDefault.panel_point_latitude)
const panel_polygon_url = ref(PanelDefault.panel_polygon_url)

const resetPanel = () => {
    panel_url.value = PanelDefault.url
    panel_center_longitude.value = PanelDefault.panel_center_longitude
    panel_center_latitude.value = PanelDefault.panel_center_latitude
    panel_point_longitude.value = PanelDefault.panel_point_longitude
    panel_point_latitude.value = PanelDefault.panel_point_latitude
    panel_polygon_url.value = PanelDefault.panel_polygon_url
}
const reloadDefault = () => {
    // reset values of inputs
    resetPanel()
    // render default basic layer
    renderMap()
}
// endregion

const container = ref<HTMLDivElement | null>(null)
const controller = shallowRef<OlController | null>(null)
const pointCount = ref(0)
const polygonCount = ref(0)

/**
 * @description 绘制地图
 */
const renderMap = () => {
    if(!!container.value) {
        controller.value?.dispose()
        controller.value = new OlController(container.value, panel_url.value, {
            center: [ parseFloat(panel_center_longitude.value ?? '116.3'), parseFloat(panel_center_latitude.value ?? '39.9') ]
        })
    }
}

const moveTo = () => {
    if(!panel_center_longitude.value || !panel_center_latitude.value) {
        alert('无效点位值')
        return
    }

    controller.value?.animateTo([ panel_center_longitude.value, panel_center_latitude.value ])
}

/**
 * @description 添加点
 */
const addPoint = () => {
    if(!panel_point_longitude.value || !panel_point_latitude.value) {
        alert('无效点位值')
        return
    }

    controller.value?.addPointLayer(
        'points' + pointCount.value,
        [ {
            anchor: [ panel_point_longitude.value, panel_point_latitude.value ]
        } ],
        './wujiaoxing.png'
    )
    pointCount.value += 1
}

/**
 * @description 添加 url 路径
 */
const addPolygon_url = () => {
    if(!panel_polygon_url.value) {
        alert('无效url')
        return
    }
    console.log(panel_polygon_url.value)
    controller.value?.addPolygonLayer(
        'polygon' + polygonCount.value,
        panel_polygon_url.value
    )
    polygonCount.value += 1
}
/**
 * @description 添加 geoJson 路径
 */
const addPolygon_file = () => {
    alert('暂不支持')
}

/**
 * @description 清空地图
 */
const clearMap = () => {
    controller.value?.clear()
}

onMounted(() => {
    // reloadDefault()
})
onBeforeUnmount(() => {
    controller.value?.dispose()
})
</script>

<template>
    <div class="home">
        <div class="panel-view">
            <div class="title-banner">
                <div class="btn" @click="reloadDefault">
                    <i class="iconfont icon-reset_basic"/>
                    <span>载入默认</span>
                </div>
                <div class="btn" @click="renderMap">
                    <i class="iconfont icon-ditu"/>
                    <span>参数绘制</span>
                </div>
            </div>

            <div class="block">
                <div class="label">Url of map tile</div>
                <input class="val" type="text" v-model="panel_url"
                       placeholder="use default OSM if empty.">
            </div>

            <div class="block">
                <div class="label">
                    <span>Center</span>
                    <div class="btn" @click="moveTo">
                        <i class="iconfont icon-jujiao"/>
                        <span>聚焦</span>
                    </div>
                </div>
                <div class="two-ipt">
                    <span class="label">lon:</span>
                    <input class="val" type="text" v-model="panel_center_longitude"
                           placeholder="default: 116.3.">
                    <span class="label">lat:</span>
                    <input class="val" type="text" v-model="panel_center_latitude"
                           placeholder="default: 39.9.">
                </div>
            </div>

            <div class="block">
                <div class="label">
                    <span>Point</span>
                    <div class="btn" @click="addPoint">
                        <i class="iconfont icon-dianping"/>
                        <span>添加点位</span>
                    </div>
                </div>
                <div class="two-ipt">
                    <span class="label">lon:</span>
                    <input class="val" type="text" v-model="panel_point_longitude"
                           placeholder="longitude">
                    <span class="label">lat:</span>
                    <input class="val" type="text" v-model="panel_point_latitude"
                           placeholder="latitude">
                </div>
            </div>

            <div class="block">
                <div class="label">
                    <span>Polygon</span>

                    <div class="btn" @click="addPolygon_url">
                        <i class="iconfont icon-huizhi-01"/>
                        <span>添加区域</span>
                    </div>
                </div>
                <div class="ipt-and-file">
                    <span class="label">url:</span>
                    <input class="val" type="text" v-model="panel_polygon_url"
                           placeholder="Url of GeoJson file.">
                    <div class="btn" @click="addPolygon_file">
                        <i class="iconfont icon-json"/>
                        <span>选择文件</span>
                    </div>
                </div>
            </div>
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
        width: 18.6875rem;
        height: 100%;
        border-right: solid 1px #777;
        overflow: hidden auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        .title-banner {
            width: calc(100% - 1.25rem);
            margin: 0.625rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .block {
            position: relative;
            width: calc(100% - 1.25rem);
            margin: 0.625rem 0;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;

            .label {
                width: 100%;
                height: 1.875rem;
                margin: 0.3125rem 0;
                color: #777;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .val {
                font-size: 0.75rem;
            }
        }

        .two-ipt {
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr 3fr 1fr 3fr;
            column-gap: 0.3125rem;
        }

        .ipt-and-file {
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: auto 1fr auto;
            column-gap: 0.3125rem;
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
