import { Map as OlMap, Overlay } from "ol";

/**
 * @description anchor of popup overlay
 */
export type PopupAnchor = 'top-left' | 'top-center' | 'top-right'
    | 'bottom-left' | 'bottom-center' | 'bottom-right'
    | 'center-left' | 'center-center' | 'center-right'

/**
 * @description 不要直接使用此类进行实例化, 使用 `OlController.addPopup` 方法添加叠置层控制类
 */
class PopupController {
    /**
     * @description 绑定的 dom 元素
     */
    #dom: HTMLElement | null
    get dom() {
        return this.#dom
    }

    /**
     * @description 所属的地图实例
     */
    #map: OlMap | null

    /**
     * @description 叠置层锚点当前所处位置
     * <br/>`[x: number, y: number]` - 当前叠置层锚点坐标
     * <br/>`null` - 当前叠置层为隐藏
     */
    #position: [ number, number ] | null = null
    /**
     * @description 叠置层锚点当前所处位置
     * <br/>`[x: number, y: number]` - 当前叠置层锚点坐标
     * <br/>`null` - 当前叠置层为隐藏
     */
    get position() {
        return this.#position
    }

    /**
     * @description 叠置层实例
     */
    #overlay: Overlay | null

    /**
     * @description 构建叠置层控制类, 一个控制类绑定一个 dom 元素以实现唤起/隐藏行为
     * @param el 绑定的 dom 元素
     * @param map 叠置层所属的地图实例
     * @param anchor (可选)定位锚点(默认值: `bottom-left`)
     * @param offset (可选)定位锚点偏移(格式: [x, y], 单位: px, 默认值: [0, 0])
     */
    constructor(
        el: HTMLElement,
        map: OlMap,
        anchor: PopupAnchor = 'bottom-left',
        offset: [ number, number ] = [ 0, 0 ]) {
        this.#dom = el
        this.#map = map

        const overlay = new Overlay({
            element: el,
            positioning: anchor,
            offset: offset
        })

        this.#overlay = overlay
        this.#map.addOverlay(overlay)
    }

    /**
     * @description 唤起叠置层
     * @param position 锚点坐标
     */
    show(position: [ x: number, y: number ]) {
        this.#position = position
        this.#overlay?.setPosition(position)
    }

    /**
     * @description 隐藏叠置层
     */
    hide() {
        this.#position = null
        this.#overlay?.setPosition(undefined)
    }

    /**
     * @description 将叠置层移至视图中央
     * @param duration 动画时间
     */
    toCenter(duration: number = 1_500) {
        if(this.#map === null) {
            console.warn('[OlController] The map instance has already disposed.')
        }
        else if(this.#position === null) {
            console.warn('[OlController] The overlay is currently hidden.')
        }
        else {
            this.#map.getView().animate({
                center: this.#position,
                duration: duration
            })
        }
    }

    /**
     * @description 清除叠置层的全部内容, 释放 controller 所持的强引用
     */
    dispose() {
        this.#dom = null
        this.#position = null
        if(!!this.#overlay) this.#map?.removeOverlay(this.#overlay)
        this.#overlay?.dispose()
        this.#overlay = null
        this.#map = null
    }
}

export {
    PopupController
}