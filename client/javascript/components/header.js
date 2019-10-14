import {create} from "../auxiliary/render.js";
import {getRelationUrl} from "../auxiliary/redirection.js";


const navItems = () => [
    {title: 'Home', link: '/'},
    {title: 'Add feedback', link: '/comment'},
    {title: 'Manage feedback', link: '/view'},
    {title: 'Statistics', link: '/stat'}
];

export default () => {
    const header = create('nav', {
        id: 'header',
        className: 'pages-nav'
    });
    const links = navItems();
    links.forEach((item) => {
        header.append(makeNavNode({...item, parent: header}))
    });

    return header;
};

const makeNavNode = ({link, title = 'Nav node', parent = document}) => {
    const parentClass = parent.className || '';
    const navNode = create('div', {
        className: `${parentClass}__item`
    });

    if (!!link) {
        const aLink = create('a', {
            href: link,
            className: 'link link--page',
            textContent: title,
        });
        aLink.onclick = redirectHandler;
        navNode.append(aLink);
    } else {
        navNode.textContent = title;
    }

    return navNode;
};

const redirectHandler = (e) => {
    const relationUrl = getRelationUrl(e.currentTarget.href);

    window.history.pushState("new page", "Title", `/${relationUrl}`);
    const event = new Event('header-change-url');
    document.dispatchEvent(event);
    return false;
};
