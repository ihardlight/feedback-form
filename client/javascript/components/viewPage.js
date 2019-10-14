import {deleteViewById, getViewById, getViews} from "../auxiliary/requests.js";
import {disableSelecting} from '../auxiliary/handlers.js'
import {create} from "../auxiliary/render.js";
import {getShortText, setDefaultTable, updateCommentInfo, pickRowDueEvent} from "../auxiliary/viewCommon.js";
import {viewPageRender} from "./statics.js";


export default () => {
    const view = viewPage();
    disableSelecting(view);
    loadViews(view).catch((err) => {
        console.log('Error during view loading');
        console.log(err);
    });
    return view;
}

const viewPage = () => create('div', viewPageRender);

const loadViews = async (viewPage) => {
    const viewTable = viewPage.querySelector('table tbody');
    setDefaultTable(viewPage, viewTable);
    document.addEventListener('scroll', scrollTableHandler);
    await addMoreViews(viewTable)
        .catch((err) => {
            console.log("Failed during loading comment views");
            console.log(err);
        });
};

const scrollTableHandler = async () => {
    const viewPage = document.getElementById('page-view');
    const viewTable = viewPage.querySelector('table tbody');
    if (document.documentElement.scrollTop >= document.documentElement.scrollHeight - 1300) {
        await addMoreViews(viewTable, 5)
            .catch((err) => {
                console.log(err);
                console.log("Failed during loading comment views");
            });
    }
};

const addMoreViews = async (viewTable, viewNum) => {
    loadMoreViews(viewNum)
        .then(views => {
                if (views.length === 0) {
                    document.removeEventListener('scroll', scrollTableHandler);
                    return;
                }
                views.forEach((view, index) => {
                    setTimeout(() => {
                        const row = addRow(viewTable, view);
                        row.addEventListener('click', clickViewRowHandler);
                    }, 100 * index);
                })
            }
        );

};

const addRow = (tableElem, cellValues) => {
    const shortCellValues = Object.entries(cellValues).reduce((accum, [currentKey, currentValue]) => {
        const shortValue = typeof currentValue === 'string' ? getShortText(currentValue) : currentValue;
        return {...accum, [currentKey]: shortValue};
    }, {});
    const row = getNewRow(shortCellValues);
    tableElem.append(row);

    const deleteButton = row.querySelector('.cl_id');
    deleteButton.addEventListener('click', deleteViewHandler.bind(deleteButton));
    return row;
};

const loadMoreViews = async (viewNum = 10) => {
    const array = [];
    while (--viewNum >= 0) {
        const view = await viewGenerator.next();
        if (!view.done) {
            array.push(view.value);
        }
    }
    return array;

};

const getView = async function* () {
    const views = await getViews();
    for (const view of views) {
        yield view;
    }
};

const viewGenerator = getView();

const clickViewRowHandler = (e) => {
    pickRowDueEvent(e);
    const viewPage = document.getElementById('page-view');
    const row = e.currentTarget;
    const pickedId = row.querySelector('td.cl_id > div > input').value;
    const hasDelete = Array.from(e.target.querySelectorAll('a')).some(s => s.textContent === 'Delete');
    const wasDeleted = hasDelete || e.target.textContent === 'Delete';
    if (wasDeleted) {
        updateCommentInfo(viewPage);
        return;
    }
    getViewById(pickedId)
        .then(view => {
                updateCommentInfo(viewPage, view);
            }
        )
        .catch(err => {
            console.log(`Error during loading view with id = ${pickedId}`);
            console.log(err);
        })
};

const deleteViewHandler = (e) => {
    const viewPage = document.getElementById('page-view');
    const button = e.currentTarget;
    const pickedId = button.querySelector('div > input').value;
    const tableElem = viewPage.querySelector('table tbody');
    const parentRow = Array.from(tableElem.querySelectorAll('tbody tr')).filter(row => {
        return row.querySelector('.cl_id div > input').value === pickedId;
    })[0];
    deleteViewById(pickedId)
        .then(() => {
            // noinspection JSCheckFunctionSignatures
            tableElem.removeChild(parentRow);
        })
        .catch(err => {
            console.log(`Error during deleting view with id = ${pickedId}`);
            console.log(err);
        });
};

const getNewRow = ({id, name, surname, number, region, city, email, text}) => {
    return create('tr', {
        className: 'row',
        td1: {
            tag: 'td',
            className: 'column cl_full_name',
            textContent: `${name} ${surname}`
        },
        td2: {
            tag: 'td',
            className: 'column cl_region',
            textContent: `${region}`
        },
        td3: {
            tag: 'td',
            className: 'column cl_city',
            textContent: `${city}`
        },
        td4: {
            tag: 'td',
            className: 'column cl_number',
            textContent: `${number}`
        },
        td5: {
            tag: 'td',
            className: 'column cl_email',
            textContent: `${email}`
        },
        td6: {
            tag: 'td',
            className: 'column cl_text',
            textContent: `${text}`
        },
        td7: {
            tag: 'td',
            className: 'column cl_id',
            action: {
                tag: 'div',
                className: 'column',
                action: {
                    tag: 'a',
                    textContent: 'Delete'
                },
                id: {
                    tag: 'input',
                    type: 'hidden',
                    value: id
                }
            }
        }
    })
};