import {create} from "../auxiliary/render.js";
import {mainPageRender} from "./statics.js";


export default () => {
    return create('div', mainPageRender);
}
