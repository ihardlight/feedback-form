import {getCityStat, getRegionStat, getViewById, getViews} from "../auxiliary/requests.js";
import {disableSelecting} from "../auxiliary/handlers.js";
import {create} from "../auxiliary/render.js";
import {getShortText, setDefaultTable, updateCommentInfo, pickRowDueEvent} from "../auxiliary/viewCommon.js";
import {statPageRender} from "./statics.js";

const statPage = () => create('div', statPageRender);

const statLoadFunctions = () => {return {
    region: getRegionStat,
    city: getCityStat,
}};

const statTimeouts = [];

const loadStat = async (statPage, statParam, handler, statFilter) => {
    const statTable = statPage.querySelector(`table.table__${statParam} tbody`);
    const statLoadFunction = statLoadFunctions()[statParam];
    await statLoadFunction(statFilter)
        .then(stats => {
            setDefaultTable(statPage, statTable);
            // noinspection JSCheckFunctionSignatures
            Object.entries(stats).forEach((stat, index) => {
                const timeoutId = setTimeout(() => {
                    const row = addRow(statTable, stat);
                    row.addEventListener('click', handler);
                }, 100 * index);
                statTimeouts.push(timeoutId);
            });
        })
        .catch((err) => {
            console.log(err);
            console.log(`Failed during loading ${statParam} stat`);
        });
};

const loadRegionStat = async (statPage) => {
    return loadStat(statPage, 'region', clickRegionRowHandler);
};

const loadCityStat = async (statPage, regionName) => {
    return loadStat(statPage, 'city', clickCityRowHandler, regionName);
};

const loadViews = async (statPage, handler, cityName) => {
    const viewTable = statPage.querySelector('table.table__view tbody');
    await getViews()
        .then(views => {
            setDefaultTable(statPage, viewTable);
            views.filter(viewItem => viewItem.city === cityName)
                .forEach((viewItem, index) => {
                    const view = viewItem;
                    setTimeout(() => {
                        const row = addViewRow(viewTable, view);
                        row.addEventListener('click', handler);
                    }, 50 * index);
                });
        })
        .catch((err) => {
            console.log("Failed during loading comment views");
            console.log(err);
        });
};

const addRow = (tableTag, statValues, id = 0) => {
    const props = {className: 'row', id: getHiddenProp(id)};

    statValues.forEach((value, ind) => {
        props[`stat${value}${ind}`] = getProp(value);
    });

    const newRow = create('tr', props);
    tableTag.append(newRow);
    return newRow;
};

const addViewRow = (tableElem, viewValues) => {
    const view = Object.entries(viewValues).reduce((accum, [currentKey, currentValue]) => {
        const shortValue = typeof currentValue === 'string' ? getShortText(currentValue) : currentValue;
        return {...accum, [currentKey]: shortValue};
    }, {});
    const props = {
        className: 'row',
        id: getHiddenProp(view['id']),
        fullName: getProp(`${view['name']} ${view['surname']}`),
        number: getProp(`${view['number']}`),
        email: getProp(`${view['email']}`),
        text: getProp(`${view['text']}`)
    };
    const row = create('tr', props);

    tableElem.append(row);
    return row;
};

const getHiddenProp = (value) => {
    return {
        tag: 'input',
        className: 'column',
        type: 'hidden',
        value: value
    };
};

const getProp = (value) => {
    return {
        tag: 'td',
        className: 'column',
        textContent: value
    }
};

const clickRegionRowHandler = (e) => {
    const row = e.currentTarget;
    if (row.classList.contains('picked')){
        return;
    }
    pickRowDueEvent(e);


    const statPage = document.getElementById('page-stat');
    const regionName = row.querySelector('td').textContent;
    const viewTable = statPage.querySelector('table.table__view tbody');
    clearStatTimeouts();
    setDefaultTable(statPage, viewTable);

    loadCityStat(statPage, regionName)
        .then(() => {
            updateCommentInfo(statPage);
            const cityRows = statPage.querySelectorAll('table.table__city tr');
            cityRows.forEach(row => {
                row.addEventListener('click', clickCityRowHandler)
            })
        })
        .catch(err => {
            console.log(`Error during loading city stat with region name = ${regionName}`);
            console.log(err);
        });
};

const clickCityRowHandler = (e) => {
    const row = e.currentTarget;
    if (row.classList.contains('picked')){
        return;
    }
    pickRowDueEvent(e);

    const cityName = row.querySelector('td').textContent;
    clearStatTimeouts();

    const statPage = document.getElementById('page-stat');
    loadViews(statPage, clickViewRowHandler, cityName)
        .then(() => {
            updateCommentInfo(statPage);
        })
        .catch(err => {
            console.log(`Error during loading views with city name = ${cityName}`);
            console.log(err);
        });
};

const clickViewRowHandler = (e) => {
    const row = e.currentTarget;
    if (row.classList.contains('picked')){
        return;
    }
    pickRowDueEvent(e);

    const commentId = row.querySelector('input').value;
    clearStatTimeouts();

    const statPage = document.getElementById('page-stat');
    getViewById(commentId)
        .then((view) => {
            updateCommentInfo(statPage, view);
        })
        .catch(err => {
            console.log(`Error during loading view with comment id = ${commentId}`);
            console.log(err);
        });
};

const clearStatTimeouts = () => {
    statTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    statTimeouts.length = 0;
};

export default () => {
    const stat = statPage();
    disableSelecting(stat);
    loadRegionStat(stat)
        .then(() => {
            updateCommentInfo(stat);
        })
        .catch(err => {
            console.log(`Error during loading region stat`);
            console.log(err);
        });
    return stat;
}
