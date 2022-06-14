import "ol/ol.css";
import { Feature, Map as OlMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM, XYZ } from "ol/source";
import { MapOptions } from "ol/PluggableMap";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Fill, Icon, Stroke, Style } from "ol/style";
import { Point } from "ol/geom";
import { useGeographic } from "ol/proj";

// call once to enable longitude/latitude
useGeographic()

// region create map
/**
 * @description optional option of view
 */
type MapViewOption = {
    /**
     * @description default center
     */
    center: [ number, number ]
    /**
     * @description projection (default to EPSG:4326)
     */
    projection: string
    /**
     * @description default zoom level
     */
    zoom: number
    /**
     * @description min zoom level (>=2)
     */
    minZoom: number
    /**
     * @description max zoom level (<=20)
     */
    maxZoom: number
}
/**
 * @description crate a ol::map instance
 * @param el dom container, or a valid css selector of target dom
 * @param src src of map tail
 * @param options custom options for ol::view
 */
const create_map = (el: HTMLElement | string, src?: string, options?: MapViewOption) => {
    const map_option: MapOptions = {
        target: el,
        layers: [
            new TileLayer({
                source: !src ?
                    new OSM() :
                    new XYZ({
                        // crossOrigin: new URL(src).origin,
                        url: src
                    })
            })
        ],
        view: new View({
            center: options?.center ?? [ 0, 0 ],
            projection: options?.projection ?? "EPSG:4326",
            zoom: 7,
            minZoom: Math.max(2, options?.minZoom ?? 0),
            maxZoom: Math.min(20, options?.maxZoom ?? 20),
        }),
        controls: [],
    }

    return new OlMap(map_option)
}
// endregion

// region create boundary
/**
 * @description optional options for boundary generator
 */
type BoundaryStyleOptions = {
    /**
     * @description stroke color
     */
    stroke: string
    /**
     * @description stroke width
     */
    strokeWidth: number
    /**
     * @description stroke type
     */
    strokeType: 'dashed' | 'solid'
    /**
     * @description required if strokeType is 'dashed'
     */
    dashArray?: number[]
    /**
     * @description background-color of the area
     */
    fill: string
}
/**
 * @description create a polygon by data from GeoJson
 * @param path_of_json data of polygon
 * @param styles optional style
 */
const create_boundary__from_json = (path_of_json: string, styles?: Partial<BoundaryStyleOptions>) => {
    if(styles?.strokeType === 'dashed' && !styles?.dashArray) {
        console.warn('[OlController] "StrokeType" will not function as "dashArray" is in invalid format.')
    }

    return new VectorLayer({
        source: new VectorSource({
            url: path_of_json,
            format: new GeoJSON()
        }),
        style: new Style({
            stroke: new Stroke({
                color: styles?.stroke ?? '#777',
                width: styles?.strokeWidth ?? 2,
                lineDash: styles?.strokeType === 'solid' ? [ 0, 0 ] : (styles?.dashArray ?? [ 0, 0 ])
            }),
            fill: new Fill({
                color: styles?.fill ?? 'transparent'
            })
        })
    })
}
// endregion

// region create markers
type MarkerItemOption<T = any> = {
    /**
     * @description anchor of icon
     */
    anchor: [ number, number ]
    /**
     * @description private icon (it will block the shared icon config)
     */
    icon?: string
    /**
     * @description custom data
     */
    ext?: T
}
/**
 * @description create a layer which contains series of points
 * @param path_of_icon path of icon (shared by all markers)
 * @param markers
 */
const create_marker_layer = <Ext = any>(
    path_of_icon: string,
    markers: MarkerItemOption<Ext>[]) => {
    const source = new VectorSource()
    const layer = new VectorLayer({ source })

    markers.forEach((marker) => {
        const marker_feature = new Feature({
            type: 'marker',
            geometry: new Point(marker.anchor),
            self: marker
        })
        marker_feature.setStyle(new Style({
            image: new Icon({
                anchor: [ 0.5, 0.5 ],
                scale: 0.5,
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                src: marker.icon ?? path_of_icon,
            })
        }))
        source.addFeature(marker_feature)
    })

    return layer
}
// endregion

export type {
    MapViewOption,
    BoundaryStyleOptions,
    MarkerItemOption
}

export {
    create_map,
    create_boundary__from_json
}
