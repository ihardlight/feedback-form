const requiredValidation = (elem) => {
    if (elem && elem.value === '') {
        elem.classList.add('with-error');
    } else {
        elem.classList.remove('with-error')
    }
};

const selectValidation = (elem) => {
    if (elem && elem.value === "0") {
        elem.classList.add('with-error');
    } else {
        elem.classList.remove('with-error')
    }
};

const patternMatchValidation = (elem, pattern) => {
    if (!elem.value.match(pattern)) {
        elem.classList.add('with-error');
    } else {
        elem.classList.remove('with-error');
    }
};

export {
    requiredValidation,
    selectValidation,
    patternMatchValidation,
}

