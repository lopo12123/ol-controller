import { Map as OlMap } from "ol";
import { OSM, XYZ } from "ol/source";



class OlController {
    /**
     * @description container element in dom
     * @private
     */
    #container: HTMLElement | null = null
    #handle: OlMap | null = null

    constructor(el: HTMLElement, src?: string) {
    }
}

export {
    OlController
}
