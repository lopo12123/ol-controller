import type { OPTION_tile_map, OPTION_polygon, OPTION_polyline, OPTION_point, OPTION_point_cluster, STYLE_point_cluster, STYLE_polygon, STYLE_polyline } from "./core";
import { AnimationController } from "./animation";
import { PopupAnchor, PopupController } from "./popup";
declare class OlController {
    #private;
    /**
     * @description container element of map
     */
    get dom(): HTMLElement | null;
    /**
     * @description whether the map has been rendered(true) of disposed(false)
     */
    get instantiated(): boolean;
    /**
     * @description render a new map on the target dom
     * @param el container of map
     * @param src url of map tile
     * @param initOptions default view config
     */
    constructor(el: HTMLElement, src?: string, initOptions?: Partial<OPTION_tile_map>);
    /**
     * @description render a new map on the target dom
     * @param el container of map
     * @param src url of map tile
     * @param initOptions default view config
     */
    render(el: HTMLElement, src?: string, initOptions?: Partial<OPTION_tile_map>): void;
    /**
     * @description names of addition layers
     */
    get layers(): string[];
    /**
     * @description add point layer
     * @param layerName layer`s name
     * @param points details of every point
     * @param icon path/url of icon to show
     */
    addPointLayer(layerName: string, points: OPTION_point[], icon: string): void;
    /**
     * @description add point layer in cluster
     * @param layerName layer`s name
     * @param points details of every point
     * @param icon path/url of icon to show
     * @param distance distance of points in cluster
     * @param minDistance min-distance of points in cluster
     * @param clusterStyle style of icon in cluster
     */
    addPointClusterLayer(layerName: string, points: OPTION_point_cluster[], icon: string, distance: number, minDistance: number, clusterStyle?: Partial<STYLE_point_cluster>): void;
    /**
     * @description add polygon layer by data in geoJson
     * @param layerName layer`s name
     * @param polygons path/url to geoJson
     * @param style optional style for polygon
     */
    addPolygonLayer(layerName: string, polygons: string, style?: STYLE_polygon): void;
    /**
     * @description add polygon layer by data in geoJson
     * @param layerName layer`s name
     * @param polygons collections of path of polygon
     * @param style optional style for polygon
     */
    addPolygonLayer(layerName: string, polygons: OPTION_polygon[], style?: STYLE_polygon): void;
    /**
     * @description add polyline layer
     * @param layerName layer`s name
     * @param polylines details of every polyline
     * @param style optional style for polyline
     */
    addPolylineLayer(layerName: string, polylines: OPTION_polyline[], style?: Partial<STYLE_polyline>): void;
    /**
     * @description 移除附加图层
     * @param layerName (可选) 若为空则移除全部附加图层, 否则移除指定图层
     */
    removeLayer(layerName?: string): void;
    /**
     * @description names of animation controllers
     */
    get animationLayers(): string[];
    /**
     * @description 在地图实例上附加一个动画 `controller`, 动画图层的生命周期由此 `controller` 控制
     * @param layerName layer`s name
     * @param path 动画轨迹
     * @param icons 运动点、起点(可选)、终点(可选) 图标
     * @param duration (可选) 动画持续时间 (单位: ms, 默认值: 100_000)
     * @param style (可选) 动画轨迹样式
     * @param percentUpdateCB (可选) 回调函数, 运动图标行进百分比变化时触发, 参数为当前已播放的百分比(0-1)
     */
    addAnimation(layerName: string, path: [number, number][], icons: {
        player: string;
        start?: string;
        end?: string;
    }, duration?: number, style?: {
        width?: number;
        stroke?: string;
    }, percentUpdateCB?: (percent: number) => void): void;
    /**
     * @description 根据图层名获取 `controller`, 若为空则返回 `null`
     * @param layerName 动画图层名
     */
    getAnimation(layerName: string): AnimationController | null;
    /**
     * @description 移除动画图层
     * @param layerName (可选) 若为空则移除全部动画图层, 否则移除指定图层
     */
    removeAnimation(layerName?: string): void;
    /**
     * @description names of popup-overlay controllers
     */
    get popupOverlays(): string[];
    /**
     * @description 将 dom 元素绑定为地图叠置层控元素, 叠置层的生命周期由此 `controller` 控制
     * @param layerName layer`s name
     * @param el 绑定的 dom 元素
     * @param anchor (可选)定位锚点(默认值: `bottom-left`)
     * @param offset (可选)定位锚点偏移(格式: [x, y], 单位: px, 默认值: [0, 0])
     */
    addPopup(layerName: string, el: HTMLElement, anchor?: PopupAnchor, offset?: [number, number]): void;
    /**
     * @description 根据图层名获取 `controller`, 若为空则返回 `null`
     * @param layerName 叠置层名
     */
    getPopup(layerName: string): PopupController | null;
    /**
     * @description 移除叠置层
     * @param layerName (可选) 若为空则移除全部叠置层, 否则移除指定图层
     */
    removePopup(layerName?: string): void;
    /**
     * @description animate to target center
     * @param center target center
     * @param duration animation duration
     */
    animateTo(center: [number, number], duration?: number): void;
    /**
     * @description 移除除底图外的全部内容
     */
    cleanUp(): void;
    /**
     * @description 移除全部图层并销毁地图实例
     */
    dispose(): void;
}
export { OlController };
