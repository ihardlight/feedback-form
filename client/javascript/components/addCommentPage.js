import {getCities, getRegions, submitForm} from "../auxiliary/requests.js";
import {create} from "../auxiliary/render.js";
import {patternMatchValidation, requiredValidation, selectValidation} from "../auxiliary/validator.js";
import {addCommentPageRender} from "./statics.js";


export default () => {
    const addComment = addCommentPage();
    const form = addComment.querySelector('form[name=add-comment-form]');
    form.addEventListener('submit', formSubmitHandler);
    form['region'].addEventListener('change', changeRegionHandler);

    updateRegions(form).then();
    return addComment;
}

const addCommentPage = () => create('div', addCommentPageRender);

const elementsPatterns = {
    'number': /\+7\([0-9]{3}\)-[0-9]{3}-[0-9]{4}/,
    'email': /.+@.+/
};

const formValidation = (form) => {
    const requiredElements = form.getElementsByClassName('required');
    Array.from(requiredElements).forEach(elem => {
        if (elem.tagName === 'SELECT') {
            selectValidation(elem);
        } else {
            requiredValidation(elem);
        }
    });

    Object.entries(elementsPatterns).forEach(([fieldName, pattern]) => {
        patternMatchValidation(form.elements[fieldName], pattern)
    });
};

const updateRegions = async (form) => {

    await getRegions()
        .then(regions => {
            setDefaultOptions(form['region']);
            regions.forEach(region => {
                addOption(form['region'], region);
            });
        })
        .catch(() => {
            console.log("Failed during loading regions");
        });
};

const updateCities = async (form, region_id) => {

    await getCities(region_id)
        .then(cities => {
            setDefaultOptions(form['city']);
            cities.forEach(city => {
                addOption(form['city'], city);
            });
        })
        .catch(() => {
            console.log("Failed during loading cities");
        });
};

const addOption = (selectElem, {id, name} = {}) => {
    selectElem.append(create('option', {
        tag: 'option',
        value: id,
        textContent: name
    }))
};

const setDefaultOptions = (selectElem) => {

    while (selectElem.length > 1) {
        selectElem.remove(selectElem.length - 1);
    }
    selectElem.value = 0;
};

const formSubmitHandler = (e) => {
    const form = document.forms['add-comment-form'];
    e.preventDefault();
    formValidation(form);

    if (form.getElementsByClassName('with-error').length === 0) {
        submitForm(form).then((resp) => {
            if (!!resp) {
                setDefaultForm(form);
                alert('Success submit!!!');
            }
        });
    }
};

const setDefaultForm = (form) => {
    Array.from(form.elements).forEach(elem => {
        if (elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') {
            elem.value = ''
        } else if (elem.tagName === 'SELECT') {
            elem.value = 0;
        }
    });
};

const changeRegionHandler = () => {
    const form = document.forms['add-comment-form'];
    form['city'].removeAttribute('disabled');
    const regionId = form['region'].value;
    updateCities(form, regionId).then();
};