import "ol/ol.css";
import { Feature, Map as OlMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { Cluster, OSM, Raster, XYZ } from "ol/source";
import { MapOptions } from "ol/PluggableMap";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Fill, Icon, Stroke, Style, Text } from "ol/style";
import { LineString, Point, Polygon } from "ol/geom";
import { useGeographic } from "ol/proj";
import CircleStyle from "ol/style/Circle";
import ImageLayer from "ol/layer/Image";

/**
 * @description default style config
 */
const enum UseDefault {
    stroke = '#39c',
    strokeWidth = 2,
    fill = 'transparent',
    IconFill = '#39c',
    IconStroke = '#fff',
    IconTextColor = '#fff',
}

// call once to enable longitude/latitude
useGeographic()

// region create map
/**
 * @description optional option of view
 */
type OPTION_tile_map = {
    /**
     * @description base layer(s)
     */
    base?: {
        /**
         * @description source of map
         */
        src: string
        /**
         * @description if cross-origin
         */
        crossOrigin: string
        /**
         * @description An array of numbers representing an extent: [minx, miny, maxx, maxy].
         */
        extent?: number[]
    }[]
    /**
     * @description use raster
     */
    raster?: {
        operationType: 'pixel' | 'image',
        operation: (data: number[][] | ImageData[]) => number[] | ImageData
    }
    // region view
    /**
     * @description default center
     */
    center?: [ number, number ]
    /**
     * @description projection (default to EPSG:4326)
     */
    projection?: string
    /**
     * @description default zoom level
     */
    zoom?: number
    /**
     * @description min zoom level (>=2)
     */
    minZoom?: number
    /**
     * @description max zoom level (<=20)
     */
    maxZoom?: number
    constrainResolution: boolean
    smoothResolutionConstraint: boolean
    // endregion
}
/**
 * @description crate a ol::map instance
 * @param el dom container, or a valid css selector of target dom
 * @param options custom options for ol::view
 */
const create_tile_map__xyz = (
    el: HTMLElement | string,
    options?: OPTION_tile_map) => {
    let base_layers: TileLayer<any>[];

    if(!!options?.base && options.base.length > 0) {
        base_layers = options.base.map(single => new TileLayer({
            source: new XYZ({
                crossOrigin: single.crossOrigin,
                url: single.src,
            }),
            extent: single.extent
        }))
    }
    else {
        base_layers = [
            new TileLayer({
                source: new OSM()
            })
        ]
    }

    if(!!options?.raster) {
        const raster = new Raster({
            sources: base_layers,
            operationType: options.raster.operationType,
            operation: options.raster.operation,
        })
        const map_option: MapOptions = {
            target: el,
            layers: [
                new ImageLayer({
                    source: raster
                })
            ],
            view: new View({
                center: options?.center ?? [ 0, 0 ],
                projection: options?.projection ?? "EPSG:4326",
                zoom: options?.zoom ?? 7,
                minZoom: Math.max(2, options?.minZoom ?? 0),
                maxZoom: Math.min(20, options?.maxZoom ?? 20),
            }),
            controls: [],
        }

        return new OlMap(map_option)
    }
    else {
        const map_option: MapOptions = {
            target: el,
            layers: base_layers,
            view: new View({
                center: options?.center ?? [ 0, 0 ],
                projection: options?.projection ?? "EPSG:4326",
                zoom: options?.zoom ?? 7,
                minZoom: Math.max(2, options?.minZoom ?? 0),
                maxZoom: Math.min(20, options?.maxZoom ?? 20),
                // 整数倍
                constrainResolution: options?.constrainResolution ?? true,
                // 无级缩放
                smoothResolutionConstraint: options?.smoothResolutionConstraint ?? false
            }),
            controls: [],
        }

        return new OlMap(map_option)
    }
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
                scale: 1,
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                src: point.icon ?? icon,
            })
        }))
        source.addFeature(point_feature)
    })

    return layer
}

/**
 * @description point data in create-point-layer
 */
type OPTION_point_cluster<T = any> = {
    /**
     * @description anchor of icon
     */
    anchor: [ number, number ]
    /**
     * @description custom data
     */
    ext?: T
}
/**
 * @description optional options for point-cluster`s style
 */
type STYLE_point_cluster = {
    /**
     * @description if hide icon when num of icon > 1
     */
    hideIcon: boolean
    /**
     * @description text of text-function
     */
    text: string | ((num: number) => string)
    /**
     * @description color of text
     */
    textColor: string
    /**
     * @description used when shape is `circle`
     */
    radius: number
    /**
     * @description background color
     */
    backgroundColor: string
    /**
     * @description background stroke
     */
    borderColor: string
}
/**
 * @description generator custom style using optional config
 * @param num number of cluster item
 * @param originIcon original icon
 * @param style style config
 */
const clusterStyleGenerator = (num: number, originIcon: Icon, style?: Partial<STYLE_point_cluster>) => {
    const textToShow = typeof style?.text === 'function' ? style.text(num) : (style?.text ?? num.toString())

    return new Style({
        image: style?.hideIcon === false
            ? originIcon
            : new CircleStyle({
                radius: style?.radius ?? 10,
                stroke: new Stroke({
                    color: style?.borderColor ?? UseDefault.IconStroke
                }),
                fill: new Fill({
                    color: style?.backgroundColor ?? UseDefault.IconFill
                })
            }),
        text: new Text({
            text: textToShow,
            fill: new Fill({
                color: style?.textColor ?? UseDefault.IconTextColor
            }),
        })
    })
}
/**
 * @description create a layer which contains series of points in cluster
 * @param points a collection of point-data
 * @param icon path to the icon of point (shared by all points)
 * @param distance distance of points in cluster
 * @param minDistance min-distance of points in cluster
 * @param clusterStyle style of cluster icon
 */
const create_point_cluster_layer = <Ext_PointData = any>(
    points: OPTION_point<Ext_PointData>[],
    icon: string,
    distance: number,
    minDistance: number,
    clusterStyle?: Partial<STYLE_point_cluster>) => {
    const features = points.map(point => {
        return new Feature({
            type: 'point_cluster',
            geometry: new Point(point.anchor),
            self: point
        })
    })
    const source = new VectorSource({ features })
    const cluster_source = new Cluster({ distance, minDistance, source })

    const styleCache: { [k: number]: Style } = {}

    return new VectorLayer({
            source: cluster_source,
            style: (feature_group) => {
                const size = feature_group.get('features').length
                let style = styleCache[size]

                if(!style) {
                    style = clusterStyleGenerator(size, new Icon({
                        anchor: [ 0.5, 0.5 ],
                        scale: 1,
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: icon,
                    }), clusterStyle)
                    styleCache[size] = style
                }

                return style
            }
        }
    )
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

// region polyline layer

/**
 * @description polyline data in create-polyline-layer
 */
type OPTION_polyline<T = any> = {
    /**
     * @description path of polyline (series of points of the polyline)
     */
    path: [ number, number ][],
    /**
     * @description optional private style (it will block the shared style config)
     */
    style?: STYLE_polyline,
    /**
     * @description custom data
     */
    ext?: T
}
/**
 * @description optional options for polyline`s style
 */
type STYLE_polyline = {
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
     * @description icon of start
     */
    startMarker?: string
    /**
     * @description icon of end
     */
    endMarker?: string
}
/**
 * @description create a layer which contains series of polyline
 * @param polylines a collection of polyline-data
 * @param style optional style
 */
const create_polyline_layer = (polylines: OPTION_polyline[], style?: Partial<STYLE_polyline>) => {
    if(style?.strokeType === 'dashed' && !style?.dashArray) {
        console.warn('[OlController] The "style.StrokeType" will not function as "style.dashArray" is in invalid format.')
    }

    const source = new VectorSource()
    const layer = new VectorLayer({ source })

    polylines.forEach(polyline => {
        const polyline_feature = new Feature({
            type: 'polyline',
            geometry: new LineString(polyline.path),
            self: polyline
        })

        let dash = [ 0, 0 ]
        if(polyline.style?.strokeType === 'dashed' && !!polyline.style.dashArray) {
            dash = polyline.style.dashArray
        }
        else if(!polyline.style?.strokeType && style?.strokeType === 'dashed' && !!style.dashArray) {
            dash = style.dashArray
        }

        polyline_feature.setStyle(new Style({
            stroke: new Stroke({
                color: polyline.style?.stroke ?? style?.stroke ?? UseDefault.stroke,
                width: polyline.style?.strokeWidth ?? style?.strokeWidth ?? UseDefault.strokeWidth,
                lineDash: dash
            }),
        }))

        if(!!style?.startMarker) {
            const start = new Feature({
                type: 'start-marker',
                geometry: new Point(polyline.path[0]),
            })
            start.setStyle(new Style({
                image: new Icon({
                    anchor: [ 0.5, 0.5 ],
                    src: style.startMarker
                })
            }))
            source.addFeature(start)
        }

        if(!!style?.endMarker) {
            const end = new Feature({
                type: 'end-marker',
                geometry: new Point(polyline.path[0]),
            })
            end.setStyle(new Style({
                image: new Icon({
                    anchor: [ 0.5, 0.5 ],
                    scale: 1,
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    src: style.endMarker
                })
            }))
            source.addFeature(end)
        }

        source.addFeature(polyline_feature)
    })

    return layer
}
// endregion

export type {
    OPTION_tile_map,

    OPTION_point,
    OPTION_point_cluster,
    STYLE_point_cluster,

    OPTION_polygon,
    STYLE_polygon,

    OPTION_polyline,
    STYLE_polyline,
}

export {
    create_tile_map__xyz,

    create_point_layer,
    create_point_cluster_layer,

    create_polygon_layer__GeoJson,
    create_polygon_layer__PathArray,

    create_polyline_layer,
}
