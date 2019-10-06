import {create} from "../auxiliary/render.js";
import {notFoundPageRender} from "./statics.js";

const notFound = create('div', notFoundPageRender);

export default () => {
    return notFound;
}
