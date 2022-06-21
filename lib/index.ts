import { Map as OlMap } from "ol";
import type VectorLayer from "ol/layer/Vector";
import type {
    OPTION_tile_map,
    OPTION_polygon, OPTION_polyline,
    OPTION_point,
    OPTION_point_cluster, STYLE_point_cluster,
    STYLE_polygon, STYLE_polyline
} from "./core";
import {
    create_point_cluster_layer,
    create_point_layer,
    create_polygon_layer__GeoJson,
    create_polygon_layer__PathArray,
    create_polyline_layer,
    create_tile_map__xyz
} from "./core";
import { AnimationController } from "./animation";

class OlController {
    /**
     * @description container element of map
     */
    readonly #dom: HTMLElement
    /**
     * @description container element of map
     */
    get dom() {
        return this.#dom
    }

    /**
     * @description instance of the map
     */
    #map: OlMap | null = null

    /**
     * @description references of addition layers
     */
    #layers = new Map<string, VectorLayer<any>>()
    /**
     * @description names of addition layers
     */
    get layers() {
        return [ ...this.#layers.keys() ]
    }

    /**
     * @description reference of animation controllers
     */
    #animationLayers = new Map<string, AnimationController>()
    /**
     * @description names of animation controllers
     */
    get animationLayers() {
        return [ ...this.#animationLayers.keys() ]
    }

    // region 渲染/重绘
    /**
     * @description render a new map on the target dom
     * @param el container of map
     * @param src url of map tile
     * @param initOptions default view config
     */
    constructor(
        el: HTMLElement,
        src?: string,
        initOptions?: Partial<OPTION_tile_map>) {
        this.#dom = el
        this.#map = create_tile_map__xyz(el, src, initOptions)
    }

    /**
     * @description render a new map on the target dom
     * @param src url of map tile
     * @param initOptions default view config
     */
    render(
        src?: string,
        initOptions?: Partial<OPTION_tile_map>) {
        if(this.#map !== null) {
            console.warn('[OlController] There is a map instance on the target dom, calling the method "render" will overwrite the old map instance. If that`s what you`re doing, ignore this warning.')
            this.dispose()
        }
        this.#map = create_tile_map__xyz(this.#dom, src, initOptions)
    }

    // endregion

    // region 图层控制(添加/移除)
    /**
     * @description add point layer
     * @param layerName layer`s name
     * @param points details of every point
     * @param icon path/url of icon to show
     */
    public addPointLayer(
        layerName: string,
        points: OPTION_point[],
        icon: string) {
        if(!this.#map) {
            console.warn('[OlController] The map instance has already disposed.')
        }
        else {
            if(this.#layers.has(layerName)) {
                console.warn(`[OlController] A layer named "${ layerName }" already exists, the old layer will be replaced by the new layer. If that's what you're doing, ignore this warning.`)
            }

            const layer_point = create_point_layer(points, icon)
            this.#layers.set(layerName, layer_point)
            this.#map.addLayer(layer_point)
        }
    }

    /**
     * @description add point layer in cluster
     * @param layerName layer`s name
     * @param points details of every point
     * @param icon path/url of icon to show
     * @param distance distance of points in cluster
     * @param minDistance min-distance of points in cluster
     * @param clusterStyle style of icon in cluster
     */
    public addPointClusterLayer(
        layerName: string,
        points: OPTION_point_cluster[],
        icon: string,
        distance: number,
        minDistance: number,
        clusterStyle?: Partial<STYLE_point_cluster>) {
        if(!this.#map) {
            console.warn('[OlController] The map instance has already disposed.')
        }
        else {
            if(this.#layers.has(layerName)) {
                console.warn(`[OlController] A layer named "${ layerName }" already exists, the old layer will be replaced by the new layer. If that's what you're doing, ignore this warning.`)
            }

            const layer_point_cluster = create_point_cluster_layer(points, icon, distance, minDistance, clusterStyle)
            this.#layers.set(layerName, layer_point_cluster)
            this.#map.addLayer(layer_point_cluster)
        }
    }

    /**
     * @description add polygon layer by data in geoJson
     * @param layerName layer`s name
     * @param polygons path/url to geoJson
     * @param style optional style for polygon
     */
    public addPolygonLayer(layerName: string, polygons: string, style?: STYLE_polygon): void
    /**
     * @description add polygon layer by data in geoJson
     * @param layerName layer`s name
     * @param polygons collections of path of polygon
     * @param style optional style for polygon
     */
    public addPolygonLayer(layerName: string, polygons: OPTION_polygon[], style?: STYLE_polygon): void
    /**
     * @description add polygon layer by data in geoJson/pathArray
     * @param layerName layer`s name
     * @param polygons path/url to geoJson (`geoJson`); collections of path of polygon (`pathArray`)
     * @param style optional style for polygon
     */
    public addPolygonLayer(
        layerName: string,
        polygons: string | OPTION_polygon[],
        style?: Partial<STYLE_polygon>) {
        if(!this.#map) {
            console.warn('[OlController] The map instance has already disposed.')
        }
        else {
            if(this.#layers.has(layerName)) {
                console.warn(`[OlController] A layer named "${ layerName }" already exists, the old layer will be replaced by the new layer. If that's what you're doing, ignore this warning.`)
            }

            if(typeof polygons === 'string') {
                const layer_json = create_polygon_layer__GeoJson(polygons, style)
                this.#layers.set(layerName, layer_json)
                this.#map.addLayer(layer_json)
            }
            else {
                const layer_path = create_polygon_layer__PathArray(polygons, style)
                this.#layers.set(layerName, layer_path)
                this.#map.addLayer(layer_path)
            }
        }
    }

    /**
     * @description add polyline layer
     * @param layerName layer`s name
     * @param polylines details of every polyline
     * @param style optional style for polyline
     */
    public addPolylineLayer(
        layerName: string,
        polylines: OPTION_polyline[],
        style?: Partial<STYLE_polyline>
    ) {
        if(!this.#map) {
            console.warn('[OlController] The map instance has already disposed.')
        }
        else {
            if(this.#layers.has(layerName)) {
                console.warn(`[OlController] A layer named "${ layerName }" already exists, the old layer will be replaced by the new layer. If that's what you're doing, ignore this warning.`)
            }

            const layer_polyline = create_polyline_layer(polylines, style)
            this.#layers.set(layerName, layer_polyline)
            this.#map.addLayer(layer_polyline)
        }
    }

    /**
     * @description 移除附加图层
     * @param layerName (可选) 若为空则移除全部附加图层, 否则移除指定图层
     */
    public removeLayer(layerName?: string) {
        if(layerName === undefined) {
            this.#layers.forEach((vecLayer) => {
                vecLayer.dispose()
            })
            this.#layers.clear()
        }
        else {
            this.#layers.get(layerName)?.dispose()
            this.#layers.delete(layerName)
        }
    }

    // endregion

    // region 动画控制(添加/获取/移除)
    /**
     * @description 在地图实例上附加一个动画 `controller`, 动画图层生命周期由此 `controller` 控制
     * @param layerName layer`s name
     * @param path 动画轨迹
     * @param icons 运动点、起点(可选)、终点(可选) 图标
     * @param duration (可选) 动画持续时间 (单位: ms, 默认值: 100_000)
     * @param style (可选) 动画轨迹样式
     * @param percentUpdateCB (可选) 回调函数, 运动图标行进百分比变化时触发, 参数为当前已播放的百分比(0-1)
     */
    addAnimation(
        layerName: string,
        path: [ number, number ][],
        icons: {
            player: string,
            start?: string,
            end?: string
        },
        duration: number = 100_000,
        style?: {
            width?: number,
            stroke?: string
        },
        percentUpdateCB?: (percent: number) => void) {
        if(!this.#map) {
            console.warn('[OlController] The map instance has already disposed.')
        }
        else {
            if(this.#animationLayers.has(layerName)) {
                console.warn(`[OlController] A layer named "${ layerName }" already exists, the old layer will be replaced by the new layer. If that's what you're doing, ignore this warning.`)
            }

            const animation_controller = new AnimationController(this.#map, path, icons, duration, style, percentUpdateCB)
            this.#animationLayers.set(layerName, animation_controller)
            // 由 controller 控制动画图层附加到地图实例上
            // 此处只需保存 controller 的引用
        }
    }

    /**
     * @description 根据图层名获取 `controller`, 若为空则返回 `null`
     * @param layerName 动画图层名
     */
    getAnimation(layerName: string) {
        return this.#animationLayers.get(layerName) ?? null
    }

    /**
     * @description 移除动画图层
     * @param layerName (可选) 若为空则移除全部动画图层, 否则移除指定图层
     */
    removeAnimation(layerName?: string) {
        if(layerName === undefined) {
            this.#animationLayers.forEach((controller) => {
                controller.dispose()
            })
            this.#animationLayers.clear()
        }
        else {
            this.#animationLayers.get(layerName)?.dispose()
            this.#animationLayers.delete(layerName)
        }
    }

    // endregion

    // region viewport (to center)
    /**
     * @description animate to target center
     * @param center target center
     * @param duration animation duration
     */
    public animateTo(
        center: [ number, number ],
        duration: number = 1500) {
        this.#map?.getView().animate({ center, duration })
    }

    // endregion

    // region clean up / dispose
    /**
     * @description 移除除底图外的全部内容
     */
    cleanUp() {
        this.removeLayer()
        this.removeAnimation()
    }

    /**
     * @description 移除全部图层并销毁地图实例
     */
    dispose() {
        this.cleanUp()

        this.#map?.dispose()
        this.#map = null
    }

    // endregion
}

export {
    OlController
}
