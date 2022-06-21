import { Map as OlMap } from "ol";
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
import VectorLayer from "ol/layer/Vector";

class OlController {
    /**
     * @description container element of map
     * @private
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
     * @private
     */
    #map: OlMap | null = null

    /**
     * @description references of addition layers
     * @private
     */
    #layers = new Map<string, VectorLayer<any>>()
    /**
     * @description names of addition layers
     */
    get layers() {
        return [ ...this.#layers.keys() ]
    }

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
     * @description remove certain layer
     * @param layerName name of layer
     */
    public removeLayer(layerName: string) {
        this.#layers.get(layerName)?.dispose()
        this.#layers.delete(layerName)
    }

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

    /**
     * @description clear all layers but base map
     */
    clear() {
        this.#layers.forEach(layer => {
            layer.dispose()
        })
        this.#layers.clear()
    }

    /**
     * @description clean up all layers and the map instance
     */
    dispose() {
        this.clear()

        this.#map?.dispose()
        this.#map = null
    }
}

export {
    OlController
}
