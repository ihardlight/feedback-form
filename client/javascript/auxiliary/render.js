export function create(tag, props) {
    const element = document.createElement(tag);

    Object.entries(props).forEach(([key, value]) => {
        if (typeof value === 'object') {
            const innerTag = value['tag'] || key;
            element.append(create(innerTag, value));
        } else {
            element[key] = value;
        }
    });

    return element;
}