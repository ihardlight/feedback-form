import {addComment, header, main, notFound, stat, view} from '../components/index.js'
import {create} from "./render.js";
import {getRelationUrl} from "./redirection.js";


// for handling manual changes in url
window.addEventListener('hashchange', (e) => {
    e.preventDefault();
    if (e.oldURL === e.newURL)
        return;
    updateContent(content);
    return false;
});

// for handling redirection in header
document.addEventListener('header-change-url', () => {
    updateContent(content);
});

const app = document.getElementById('app');

const content = create('div', {
    id: 'content'
});

const contentRouter = {
    '^$': main,
    '^comment$': addComment,
    '^view$': view,
    '^stat$': stat,
    '.+': notFound
};

const updateContent = (content) => {
    const relationUrl = getRelationUrl(document.URL);

    setDefaultById(content.id);
    appendSuitableComponent(content, relationUrl);
};

const setDefaultById = (elementId) => {
    const tag = document.getElementById(elementId);
    document.querySelectorAll(`#${elementId} > *`).forEach(child =>  {
        tag.removeChild(child);
    })

};

const appendSuitableComponent = (element, urlRoute) => {
    Object.entries(contentRouter).some(([regExp, render]) => {
        if (!!urlRoute.match(regExp)) {
            element.append(render.call(document));
            return true;
        }
    });
};

// side-effects
app.prepend(header());
app.append(content);
updateContent(content);
