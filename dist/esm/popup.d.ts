import { Map as OlMap } from "ol";
/**
 * @description anchor of popup overlay
 */
export declare type PopupAnchor = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center-left' | 'center-center' | 'center-right';
/**
 * @description 不要直接使用此类进行实例化, 使用 `OlController.addPopup` 方法添加叠置层控制类
 */
declare class PopupController {
    #private;
    get dom(): HTMLElement | null;
    /**
     * @description 叠置层锚点当前所处位置
     * <br/>`[x: number, y: number]` - 当前叠置层锚点坐标
     * <br/>`null` - 当前叠置层为隐藏
     */
    get position(): [number, number] | null;
    /**
     * @description 构建叠置层控制类, 一个控制类绑定一个 dom 元素以实现唤起/隐藏行为
     * @param el 绑定的 dom 元素
     * @param map 叠置层所属的地图实例
     * @param anchor (可选)定位锚点(默认值: `bottom-left`)
     * @param offset (可选)定位锚点偏移(格式: [x, y], 单位: px, 默认值: [0, 0])
     */
    constructor(el: HTMLElement, map: OlMap, anchor?: PopupAnchor, offset?: [number, number]);
    /**
     * @description 唤起叠置层
     * @param position 锚点坐标
     */
    show(position: [x: number, y: number]): void;
    /**
     * @description 隐藏叠置层
     */
    hide(): void;
    /**
     * @description 将叠置层移至视图中央
     * @param duration 动画时间
     */
    toCenter(duration?: number): void;
    /**
     * @description 清除叠置层的全部内容, 释放 controller 所持的强引用
     */
    dispose(): void;
}
export { PopupController };
