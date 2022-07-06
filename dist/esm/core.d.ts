import "ol/ol.css";
import { Map as OlMap } from "ol";
import { Cluster } from "ol/source";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
/**
 * @description optional option of view
 */
declare type OPTION_tile_map = {
    /**
     * @description default center
     */
    center: [number, number];
    /**
     * @description projection (default to EPSG:4326)
     */
    projection: string;
    /**
     * @description default zoom level
     */
    zoom: number;
    /**
     * @description min zoom level (>=2)
     */
    minZoom: number;
    /**
     * @description max zoom level (<=20)
     */
    maxZoom: number;
};
/**
 * @description crate a ol::map instance
 * @param el dom container, or a valid css selector of target dom
 * @param src src of map tail
 * @param options custom options for ol::view
 */
declare const create_tile_map__xyz: (el: HTMLElement | string, src?: string, options?: Partial<OPTION_tile_map>) => OlMap;
/**
 * @description point data in create-point-layer
 */
declare type OPTION_point<T = any> = {
    /**
     * @description anchor of icon
     */
    anchor: [number, number];
    /**
     * @description optional private icon (it will block the shared icon config)
     */
    icon?: string;
    /**
     * @description custom data
     */
    ext?: T;
};
/**
 * @description create a layer which contains series of points
 * @param points a collection of point-data
 * @param icon path to the icon of point (shared by all points)
 */
declare const create_point_layer: <Ext_PointData = any>(points: OPTION_point<Ext_PointData>[], icon: string) => VectorLayer<VectorSource<import("ol/geom/Geometry").default>>;
/**
 * @description point data in create-point-layer
 */
declare type OPTION_point_cluster<T = any> = {
    /**
     * @description anchor of icon
     */
    anchor: [number, number];
    /**
     * @description custom data
     */
    ext?: T;
};
/**
 * @description optional options for point-cluster`s style
 */
declare type STYLE_point_cluster = {
    /**
     * @description if hide icon when num of icon > 1
     */
    hideIcon: boolean;
    /**
     * @description text of text-function
     */
    text: string | ((num: number) => string);
    /**
     * @description color of text
     */
    textColor: string;
    /**
     * @description used when shape is `circle`
     */
    radius: number;
    /**
     * @description background color
     */
    backgroundColor: string;
    /**
     * @description background stroke
     */
    borderColor: string;
};
/**
 * @description create a layer which contains series of points in cluster
 * @param points a collection of point-data
 * @param icon path to the icon of point (shared by all points)
 * @param distance distance of points in cluster
 * @param minDistance min-distance of points in cluster
 * @param clusterStyle style of cluster icon
 */
declare const create_point_cluster_layer: <Ext_PointData = any>(points: OPTION_point<Ext_PointData>[], icon: string, distance: number, minDistance: number, clusterStyle?: Partial<STYLE_point_cluster>) => VectorLayer<Cluster>;
/**
 * @description polygon data in create-polygon-layer (by path array)
 */
declare type OPTION_polygon<T = any> = {
    /**
     * @description path of polygon (series of points of the polygon)
     */
    path: [number, number][];
    /**
     * @description optional private style (it will block the shared style config)
     */
    style?: STYLE_polygon;
    /**
     * @description custom data
     */
    ext?: T;
};
/**
 * @description optional options for polygon`s style
 */
declare type STYLE_polygon = {
    /**
     * @description stroke color
     */
    stroke: string;
    /**
     * @description stroke width
     */
    strokeWidth: number;
    /**
     * @description stroke type
     */
    strokeType: 'dashed' | 'solid';
    /**
     * @description required if strokeType is 'dashed'
     */
    dashArray?: number[];
    /**
     * @description background-color of the area
     */
    fill: string;
};
/**
 * @description create a polygon by data from GeoJson
 * @param geojson path/url of polygon
 * @param style optional style
 */
declare const create_polygon_layer__GeoJson: (geojson: string, style?: Partial<STYLE_polygon>) => VectorLayer<VectorSource<import("ol/geom/Geometry").default>>;
/**
 * @description create a polygon by data from path array
 * @param polygons collection of polygons
 * @param style optional style
 */
declare const create_polygon_layer__PathArray: <Ext_AreaData = any>(polygons: OPTION_polygon<Ext_AreaData>[], style?: Partial<STYLE_polygon>) => VectorLayer<VectorSource<import("ol/geom/Geometry").default>>;
/**
 * @description polyline data in create-polyline-layer
 */
declare type OPTION_polyline<T = any> = {
    /**
     * @description path of polyline (series of points of the polyline)
     */
    path: [number, number][];
    /**
     * @description optional private style (it will block the shared style config)
     */
    style?: STYLE_polyline;
    /**
     * @description custom data
     */
    ext?: T;
};
/**
 * @description optional options for polyline`s style
 */
declare type STYLE_polyline = {
    /**
     * @description stroke color
     */
    stroke: string;
    /**
     * @description stroke width
     */
    strokeWidth: number;
    /**
     * @description stroke type
     */
    strokeType: 'dashed' | 'solid';
    /**
     * @description required if strokeType is 'dashed'
     */
    dashArray?: number[];
    /**
     * @description icon of start
     */
    startMarker?: string;
    /**
     * @description icon of end
     */
    endMarker?: string;
};
/**
 * @description create a layer which contains series of polyline
 * @param polylines a collection of polyline-data
 * @param style optional style
 */
declare const create_polyline_layer: (polylines: OPTION_polyline[], style?: Partial<STYLE_polyline>) => VectorLayer<VectorSource<import("ol/geom/Geometry").default>>;
export type { OPTION_tile_map, OPTION_point, OPTION_point_cluster, STYLE_point_cluster, OPTION_polygon, STYLE_polygon, OPTION_polyline, STYLE_polyline, };
export { create_tile_map__xyz, create_point_layer, create_point_cluster_layer, create_polygon_layer__GeoJson, create_polygon_layer__PathArray, create_polyline_layer, };
