// export const parseView = (viewItem) => {
//     const {id, text, name, surname, middle_name = '', number = '', email = ''} = viewItem;
//     const region = viewItem.region || 'Not chosen';
//     const city = viewItem.city || 'Not chosen';
//     return {id, text, name, surname, middle_name, number, email, region, city};
// };

export const getShortText = (text, maxLen = 7) => {
    if (text.length <= maxLen)
        return text;
    else
        return `${text.slice(0, maxLen)}...`;
};

export const setDefaultTable = (page, tableElem) => {
    for (let row of page.querySelectorAll('tr')) {
        if (tableElem.contains(row)) {
            tableElem.removeChild(row);
        }
    }
};

export const updateCommentInfo = (page, view = {}) => {
    const commentInfo = page.querySelector('div.comment-info');
    const inputs = commentInfo.getElementsByClassName('input-field');
    Array.from(inputs).forEach(input => {
        input.value = view[input.name] || '';
    });
    const textarea = commentInfo.getElementsByClassName('textarea-field')[0];
    textarea.value = view[textarea.name] || '';
};

export const pickRowDueEvent = (event) => {
    const pickedBefore = event.currentTarget.parentElement.querySelectorAll('.picked');
    pickedBefore.forEach(elem => elem.classList.remove('picked'));

    event.currentTarget.classList.add('picked');
    event.target.classList.add('picked');
};