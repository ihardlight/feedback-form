import {create} from "../auxiliary/render.js";
import {notFoundPageRender} from "./statics.js";

export default () => {
    return create('div', notFoundPageRender);
}
