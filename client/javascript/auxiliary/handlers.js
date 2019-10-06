export const disableSelecting = (page) => {
    page.onselectstart = () => {
        return false
    };
    page.onmousedown = () => {
        return false
    };
    page.onclick = () => {
        return false
    };
};