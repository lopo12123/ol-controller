import { Map as OlMap } from "ol";
/**
 * @description 不要直接使用此类进行实例化, 使用 `OlController.addAnimation` 方法添加动画控制类
 */
declare class AnimationController {
    #private;
    /**
     * @description 是否正在播放
     */
    get playing(): boolean;
    /**
     * @description 构造动画播放控制类, 一个控制类绑定一个动画图层以控制播放/停止行为
     * @param map 动画图层所属地图实例
     * @param path 动画轨迹
     * @param icons 运动点、起点(可选)、终点(可选) 图标
     * @param duration (可选) 动画持续时间 (单位: ms, 默认值: 100_000)
     * @param style (可选) 动画轨迹样式
     * @param percentUpdateCB (可选) 回调函数, 运动图标行进百分比变化时触发, 参数为当前已播放的百分比(0-1)
     */
    constructor(map: OlMap, path: [number, number][], icons: {
        player: string;
        start?: string;
        end?: string;
    }, duration?: number, style?: {
        width?: number;
        stroke?: string;
    }, percentUpdateCB?: (percent: number) => void);
    /**
     * @description 实时修改动画持续时间(以修改动画播放速度)
     */
    setDuration(duration: number): void;
    /**
     * @description 播放
     */
    play(): void;
    /**
     * @description 停止
     */
    pause(): void;
    /**
     * @description 将动画重置到初始位置
     * @param reset_speed 是否重置动画速度到默认值 (速度默认值: 1)
     */
    reset(reset_speed?: boolean): void;
    /**
     * @description 清除动画图层的全部内容, 释放 controller 所持的强引用
     */
    dispose(): void;
}
export { AnimationController };
