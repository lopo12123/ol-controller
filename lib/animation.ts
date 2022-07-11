import { Feature, Map as OlMap } from "ol";
import VectorLayer from "ol/layer/Vector";
import { Geometry, LineString, Point } from "ol/geom";
import VectorSource from "ol/source/Vector";
import { Icon, Stroke, Style } from "ol/style";
import RenderEvent from "ol/render/Event";
import { getVectorContext } from "ol/render";

/**
 * @description 不要直接使用此类进行实例化, 使用 `OlController.addAnimation` 方法添加动画控制类
 */
class AnimationController {
    /**
     * @description 所属的地图实例
     */
    #map: OlMap | null

    /**
     * @description 动画层
     */
    readonly #layer: VectorLayer<any>

    /**
     * @description 原始轨迹
     */
    readonly #route: Geometry

    /**
     * @description 动画播放主体
     */
    readonly #player: Feature
    /**
     * @description 运动的图标的位置
     */
    readonly #player_geo: Geometry

    /**
     * @description 是否正在播放
     */
    #playing = false
    /**
     * @description 是否正在播放
     */
    get playing() {
        return this.#playing
    }

    /**
     * @description 运动完全程的时间 单位: ms
     */
    #duration: number
    /**
     * @description 播放速度 数值为 100_000 / duration
     */
    #speed: number
    /**
     * @description 运动路径比例 [0, 1]
     */
    #dis_percent = 0
    /**
     * @description 运动占比变化回调, 可按需设置以更新外部展示值
     */
    readonly #percentUpdateCB: ((curr_percent: number) => void) | null = null

    /**
     * @description 上一帧时间戳 (raf 时间)
     */
    #last_raf_time = -1

    /**
     * @description 构造动画播放控制类, 一个控制类绑定一个动画图层以控制播放/停止行为
     * @param map 动画图层所属地图实例
     * @param path 动画轨迹
     * @param icons 运动点、起点(可选)、终点(可选) 图标
     * @param duration (可选) 动画持续时间 (单位: ms, 默认值: 100_000)
     * @param style (可选) 动画轨迹样式
     * @param percentUpdateCB (可选) 回调函数, 运动图标行进百分比变化时触发, 参数为当前已播放的百分比(0-1)
     */
    constructor(
        map: OlMap,
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
        if(path.length <= 1) throw new Error('[OlController] Your animation-path is too short, need 2 point at least!')

        this.#map = map
        this.#duration = duration
        this.#speed = 100_000 / duration
        this.#percentUpdateCB = percentUpdateCB ?? null

        // region 构建动画图层元素

        // region 源 和 轨迹图层 animation_layer
        const animation_source = new VectorSource()
        const animation_layer = new VectorLayer({ source: animation_source })

        this.#layer = animation_layer
        // endregion

        // region 轨迹 route_feature
        const route = new LineString(path)
        const route_feature = new Feature(route)
        route_feature.setStyle(new Style({
            stroke: new Stroke({
                width: style?.width ?? 6,
                color: style?.stroke ?? '#39c'
            })
        }))

        animation_source.addFeature(route_feature)
        this.#route = route
        // endregion

        // region 运动图标 player_feature
        const player_feature = new Feature({
            geometry: new Point(path[0])
        })
        player_feature.setStyle(new Style({
            image: new Icon({
                anchor: [ 0.5, 0.5 ],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                src: icons.player,
            })
        }))

        animation_source.addFeature(player_feature)
        this.#player = player_feature
        this.#player_geo = player_feature.getGeometry()!
        // endregion

        // region 起点图标 [start]
        if(!!icons.start) {
            const start = new Feature({
                geometry: new Point(path[0]),
            })
            start.setStyle(new Style({
                image: new Icon({
                    anchor: [ 0.5, 0.5 ],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    src: icons.start,
                })
            }))
            animation_source.addFeature(start)
        }
        // endregion

        // region 终点图标 [end]
        if(!!icons.end) {
            const end = new Feature({
                geometry: new Point(path[path.length - 1]),
            })
            end.setStyle(new Style({
                image: new Icon({
                    anchor: [ 0.5, 0.5 ],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    src: icons.end,
                })
            }))
            animation_source.addFeature(end)
        }
        // endregion

        // endregion

        this.#map.addLayer(animation_layer)
    }

    /**
     * @description 实时修改动画持续时间(以修改动画播放速度)
     */
    setDuration(duration: number) {
        this.#duration = duration
    }

    // region 播放/停止
    /**
     * @description 动画回调需要绑定当前实例, 箭头函数特性使得此处需要显式绑定 this 以获取实例属性
     */
    #animation_callback_for_self = ((ev: RenderEvent) => {
        // 计算两次 raf 之间行进的百分比
        const curr_raf_time = ev.frameState!.time
        const elapsedTime = curr_raf_time - this.#last_raf_time
        this.#dis_percent = this.#dis_percent + elapsedTime / this.#duration
        this.#last_raf_time = curr_raf_time

        // 外部百分比同步回调
        this.#percentUpdateCB?.(this.#dis_percent)

        // 走完全程自动回到起点并停止
        if(this.#dis_percent > 1) {
            this.reset()
        }
        // 否则计算并行进
        else {
            // 计算当前坐标位置
            // @ts-ignore
            const curr_coordinate = this.#route.getCoordinateAt(this.#dis_percent)
            // @ts-ignore
            this.#player_geo.setCoordinates(curr_coordinate)

            // 在目标位置绘制运动图标
            const vectorCtx = getVectorContext(ev)
            vectorCtx.setStyle(this.#player.getStyle() as Style)
            vectorCtx.drawGeometry(this.#player_geo)

            // 渲染到地图, 触发地图渲染事件以自动 raf
            this.#map?.render()
        }
    }).bind(this)

    /**
     * @description 播放
     */
    play() {
        // 当前停止则执行播放
        if(!this.#playing) {
            // 置为 播放标志
            this.#playing = true

            // raf 起始时间
            this.#last_raf_time = Date.now()

            // 注册动画事件
            this.#layer.on('postrender', this.#animation_callback_for_self)

            // @ts-ignore 隐藏原有展示图标, 触发地图渲染事件以自动 raf
            this.#player.setGeometry(null)
        }
    }

    /**
     * @description 停止
     */
    pause() {
        // 当前播放则执行停止
        if(this.#playing) {
            // 置为 停止标志
            this.#playing = false

            // 恢复运动图标的显示
            this.#player.setGeometry(this.#player_geo);
            // 注销动画事件
            this.#layer.un('postrender', this.#animation_callback_for_self)
        }
    }

    // endregion

    /**
     * @description 将动画重置到初始位置
     * @param reset_speed 是否重置动画速度到默认值 (速度默认值: 1)
     */
    reset(reset_speed: boolean = false) {
        this.pause()
        this.#dis_percent = 0
        this.#percentUpdateCB?.(0)

        if(reset_speed) {
            this.#speed = 1
        }
    }

    /**
     * @description switch show/hide of animation layer
     * @param to 指定显示或隐藏, 为空则切换
     */
    toggle_visible(to?: boolean) {
        this.#layer.setVisible(to ?? !this.#layer.getVisible())
    }

    /**
     * @description 清除动画图层的全部内容, 释放 controller 所持的强引用
     */
    dispose() {
        this.pause()
        this.#map?.removeLayer(this.#layer)
        this.#map = null
    }
}

export {
    AnimationController
}