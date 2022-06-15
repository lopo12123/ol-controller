import "ol/ol.css";
import { Feature, Map as OlMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM, XYZ } from "ol/source";
import { MapOptions } from "ol/PluggableMap";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Fill, Icon, Stroke, Style } from "ol/style";
import { Point, Polygon } from "ol/geom";
import { useGeographic } from "ol/proj";

/**
 * @description default style config
 */
const enum UseDefault {
    stroke = '#777',
    strokeWidth = 2,
    fill = 'transparent',
}

// call once to enable longitude/latitude
useGeographic()

// region create map
/**
 * @description optional option of view
 */
type OPTION_tile_map = {
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
const create_tile_map__xyz = (
    el: HTMLElement | string,
    src?: string,
    options?: OPTION_tile_map) => {
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

// region polygon layer
/**
 * @description polygon data in create-polygon-layer (by path array)
 */
type OPTION_polygon<T = any> = {
    /**
     * @description path of polygon (series of points of the polygon)
     */
    path: [ number, number ][],
    /**
     * @description optional private style (it will block the shared style config)
     */
    style?: STYLE_polygon
    /**
     * @description custom data
     */
    ext?: T
}
/**
 * @description optional options for polygon`s style
 */
type STYLE_polygon = {
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
 * @param geojson path/url of polygon
 * @param style optional style
 */
const create_polygon_layer__GeoJson = (
    geojson: string,
    style?: Partial<STYLE_polygon>) => {
    if(style?.strokeType === 'dashed' && !style?.dashArray) {
        console.warn('[OlController] The "style.StrokeType" will not function as "style.dashArray" is in invalid format.')
    }

    return new VectorLayer({
        source: new VectorSource({
            url: geojson,
            format: new GeoJSON()
        }),
        style: new Style({
            stroke: new Stroke({
                color: style?.stroke ?? UseDefault.stroke,
                width: style?.strokeWidth ?? UseDefault.strokeWidth,
                lineDash: style?.strokeType === 'dashed' ? (style?.dashArray ?? [ 0, 0 ]) : [ 0, 0 ]
            }),
            fill: new Fill({
                color: style?.fill ?? UseDefault.fill
            })
        })
    })
}

/**
 * @description create a polygon by data from path array
 * @param polygons collection of polygons
 * @param style optional style
 */
const create_polygon_layer__PathArray = <Ext_AreaData = any>(
    polygons: OPTION_polygon<Ext_AreaData>[],
    style?: Partial<STYLE_polygon>) => {
    if(style?.strokeType === 'dashed' && !style?.dashArray) {
        console.warn('[OlController] The "style.StrokeType" will not function as "style.dashArray" is in invalid format.')
    }

    const source = new VectorSource()
    const layer = new VectorLayer({ source })

    polygons.forEach(polygon => {
        const polygon_feature = new Feature({
            type: 'polygon',
            geometry: new Polygon([ polygon.path ]),
            self: polygon,
        })

        let dash = [ 0, 0 ]
        if(polygon.style?.strokeType === 'dashed' && !!polygon.style.dashArray) {
            dash = polygon.style.dashArray
        }
        else if(!polygon.style?.strokeType && style?.strokeType === 'dashed' && !!style.dashArray) {
            dash = style.dashArray
        }

        polygon_feature.setStyle(new Style({
            stroke: new Stroke({
                color: polygon.style?.stroke ?? style?.stroke ?? UseDefault.stroke,
                width: polygon.style?.strokeWidth ?? style?.strokeWidth ?? UseDefault.strokeWidth,
                lineDash: dash
            }),
            fill: new Fill({
                color: polygon.style?.fill ?? style?.fill ?? UseDefault.fill
            })
        }))
        source.addFeature(polygon_feature)
    })

    return layer
}
// endregion

// region point layer
/**
 * @description point data in create-point-layer
 */
type OPTION_point<T = any> = {
    /**
     * @description anchor of icon
     */
    anchor: [ number, number ]
    /**
     * @description optional private icon (it will block the shared icon config)
     */
    icon?: string
    /**
     * @description custom data
     */
    ext?: T
}
/**
 * @description create a layer which contains series of points
 * @param points a collection of point-data
 * @param icon path to the icon of point (shared by all points)
 */
const create_point_layer = <Ext_PointData = any>(
    points: OPTION_point<Ext_PointData>[],
    icon: string) => {
    const source = new VectorSource()
    const layer = new VectorLayer({ source })

    points.forEach(point => {
        const point_feature = new Feature({
            type: 'point',
            geometry: new Point(point.anchor),
            self: point
        })
        point_feature.setStyle(new Style({
            image: new Icon({
                anchor: [ 0.5, 0.5 ],
                scale: 0.5,
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                src: point.icon ?? icon,
            })
        }))
        source.addFeature(point_feature)
    })

    return layer
}
// endregion

export type {
    OPTION_tile_map,
    OPTION_polygon,
    STYLE_polygon,
    OPTION_point
}

export {
    create_tile_map__xyz,
    create_point_layer,
    create_polygon_layer__GeoJson,
    create_polygon_layer__PathArray
}
