// Comment Info
export const commentInfoRender = {
    tag: 'div',
    className: 'comment-info',
    content: {
        tag: 'div',
        className: 'comment-info__content',
        name: {
            tag: 'label',
            for: 'name',
            span: {
                tag: 'span',
                textContent: 'Name',
            },
            input: {
                tag: 'input',
                type: 'text',
                className: 'input-field',
                name: 'name',
                disabled: true
            }
        },
        surname: {
            tag: 'label',
            for: 'surname',
            span: {
                tag: 'span',
                textContent: 'Surname',
            },
            input: {
                tag: 'input',
                type: 'text',
                className: 'input-field',
                name: 'surname',
                disabled: true
            }
        },
        middleName: {
            tag: 'label',
            for: 'middle-name',
            span: {
                tag: 'span',
                textContent: 'Middle name',
            },
            input: {
                tag: 'input',
                type: 'text',
                className: 'input-field',
                name: 'middle_name',
                disabled: true
            }
        },
        region: {
            tag: 'label',
            for: 'region',
            span: {
                tag: 'span',
                textContent: 'Region',
            },
            input: {
                tag: 'input',
                type: 'text',
                className: 'input-field',
                name: 'region',
                disabled: true
            }
        },
        city: {
            tag: 'label',
            for: 'city',
            span: {
                tag: 'span',
                textContent: 'City',
            },
            input: {
                tag: 'input',
                type: 'text',
                className: 'input-field',
                name: 'city',
                disabled: true
            }
        },
        number: {
            tag: 'label',
            for: 'number',
            span: {
                tag: 'span',
                textContent: 'Phone number',
            },
            input: {
                tag: 'input',
                type: 'text',
                className: 'input-field',
                name: 'number',
                disabled: true
            }
        },
        email: {
            tag: 'label',
            for: 'email',
            span: {
                tag: 'span',
                textContent: 'Email',
            },
            input: {
                tag: 'input',
                type: 'text',
                className: 'input-field',
                name: 'email',
                disabled: true
            }
        },
        comment: {
            tag: 'label',
            for: 'text',
            span: {
                tag: 'span',
                textContent: 'Comment',
            },
            textarea: {
                tag: 'textarea',
                className: 'textarea-field',
                name: 'text',
                value: '---Comment will be here---',
                disabled: true
            }
        },
    }
};

// View page
const titleView = {
    tag: 'h1',
    className: 'header__title',
    textContent: 'All comments'
};

const infoView = {
    tag: 'p',
    className: 'info',
    textContent: 'Here you can read all comments from users. Pick any comment to see full information. ' +
        'If you scroll additional comments will be load automatically.'
};

const tableView = {
    tag: 'table',
    thead: {
        tag: 'thead',
        tr: {
            tag: 'tr',
            className: 'row head',
            th1: {
                tag: 'th',
                className: 'column',
                'data-column': 'colomn1',
                textContent: 'Full name'
            },
            th2: {
                tag: 'th',
                className: 'column',
                'data-column': 'colomn2',
                textContent: 'Region'
            },
            th3: {
                tag: 'th',
                className: 'column',
                'data-column': 'colomn3',
                textContent: 'City'
            },
            th4: {
                tag: 'th',
                className: 'column',
                'data-column': 'colomn4',
                textContent: 'Phone number'
            },
            th5: {
                tag: 'th',
                className: 'column',
                'data-column': 'colomn5',
                textContent: 'Email'
            },
            th6: {
                tag: 'th',
                className: 'column',
                'data-column': 'colomn6',
                textContent: 'Comment'
            },
            th7: {
                tag: 'th',
                className: 'column',
                'data-column': 'colomn7',
                textContent: 'Action'
            }
        }
    },
    tbody: {
        tag: 'tbody',

    }
};

export const viewPageRender = {
    id: 'page-view',
    className: 'page',
    header: {
        tag: 'div',
        className: 'header',
        title: titleView,
        info: infoView,
        tableDiv: {
            tag: 'div',
            className: 'table table__view',
            table: tableView,
            commentInfoRender
        }
    }
};

// Not found page
export const notFoundPageRender = {
    className: 'page',
    header: {
        tag: 'header',
        className: 'header',
        title: {
            tag: 'h1',
            textContent: 'not found, 404',
            className: 'header__title'
        }
    }
};

// Main page
const titleMain = {
    tag: 'h1',
    className: 'header__title',
    textContent: 'Welcome to example of form for collecting and managing feedback from clients'
};

const addCommentMain = {
    tag: 'p',
    className: 'info',
    textContent: 'You can write your feedback on "Add feedback" page. ' +
        'Name, surname and text slots are obligatory.' +
        'Also you can provide you phone number in format +7(***)-***-**** and email so that our specialists can text you back.' +
        'Preferably to choose your region and city for improving our service in your area.'
};

const viewMain = {
    tag: 'p',
    className: 'info',
    textContent: 'You can view all comments on "Manage feedback" page.' +
        'If you want delete comment just click on delete button. Pick any comment to see full information. ' +
        'If you scroll additional comments will be load automatically.'
};

const statMain = {
    tag: 'p',
    className: 'info',
    textContent: 'Obviously you can see statistics on "Statistics" page. All tables updates in real time.' +
        'Pick a region and you will see comments distribution per city. ' +
        'Pick a city and you will see info about users that made that comments. ' +
        'Pick any user to see full information about him and about comment that he made'
};

const headerMain = {
    tag: 'div',
    className: 'header',
    titleMain,
    addCommentMain,
    viewMain,
    statMain
};

export const mainPageRender = {
    id: 'page-home',
    className: 'page',
    headerMain
};

// Add comment page
const titleAddComment = {
    tag: 'h1',
    textContent: 'You can add your comment here',
    className: 'header__title'
};

const infoAddComment = {
    tag: 'p',
    className: 'info',
    textContent: 'Hi! I\'m a feedback form. Please fill me accurate and correctly. ' +
        'I will help make your experience with my company easier and better. ' +
        'Name, surname and text slots are obligatory.' +
        'Also you can provide you phone number in format +7(***)-***-**** and email so that our specialists can text you back.' +
        'Preferably to choose your region and city for improving our service in your area.'
};

const nameInputAddComment = {
    tag: 'label',
    for: 'name',
    span: {
        tag: 'span',
        textContent: 'Name',
        span: {
            tag: 'span',
            className: 'required',
            textContent: '*'
        }
    },
    input: {
        tag: 'input',
        className: 'input-field required',
        name: 'name',
        placeholder: 'Ex. Ivan',
        type: 'text',
        value: ''
    }
};

const surnameAddComment = {
    tag: 'label',
    for: 'surname',
    span: {
        tag: 'span',
        textContent: 'Surname',
        span: {
            tag: 'span',
            className: 'required',
            textContent: '*'
        }
    },
    input: {
        tag: 'input',
        className: 'input-field required',
        name: 'surname',
        placeholder: 'Ex. Ivanov',
        type: 'text',
        value: ''
    }
};

const middleNameAddComment = {
    tag: 'label',
    for: 'middle_name',
    span: {
        tag: 'span',
        textContent: 'Middle name',
    },
    input: {
        tag: 'input',
        className: 'input-field',
        name: 'middle_name',
        placeholder: 'Ex. Ivanov',
        type: 'text',
        value: ''
    }
};

const regionAddComment = {
    tag: 'label',
    for: 'region',
    span: {
        tag: 'span',
        textContent: 'Region',
    },
    select: {
        tag: 'select',
        className: 'select-field required',
        name: 'region',
        option: {
            tag: 'option',
            selected: true,
            disabled: true,
            value: 0,
            textContent: 'Choose your region'
        }
    }
};

const cityAddComment = {
    tag: 'label',
    for: 'city',
    span: {
        tag: 'span',
        textContent: 'City',
    },
    select: {
        tag: 'select',
        className: 'select-field required',
        name: 'city',
        disabled: true,
        option: {
            tag: 'option',
            selected: true,
            disabled: true,
            value: 0,
            textContent: 'Choose your city'
        }
    }
};

const numberAddComment = {
    tag: 'label',
    for: 'number',
    span: {
        tag: 'span',
        textContent: 'Phone number',
    },
    input: {
        tag: 'input',
        className: 'tel-number-field',
        name: 'number',
        type: 'tel',
        placeholder: "Ex. +7(***)-***-****"
    }
};

const emailAddComment = {
    tag: 'label',
    for: 'email',
    span: {
        tag: 'span',
        textContent: 'Email',
    },
    input: {
        tag: 'input',
        className: 'input-field',
        name: 'email',
        type: 'text',
        // type: 'email',
        placeholder: "Ex. example@mail.com"
    }
};

const textAddComment = {
    tag: 'label',
    for: 'text',
    span: {
        tag: 'span',
        textContent: 'Comment',
        span: {
            tag: 'span',
            className: 'required',
            textContent: '*'
        }
    },
    textarea: {
        tag: 'textarea',
        className: 'textarea-field required',
        name: 'text',
        placeholder: "All was perfect"
    }
};

const submitAddComment = {
    tag: 'label',
    span: {
        tag: 'span',
    },
    submitButton: {
        tag: 'input',
        id: 'add-comment-submit',
        type: 'submit',
        value: 'Submit'
    },
};

const formDivAddComment = {
    tag: 'div',
    className: 'form',
    form: {
        tag: 'form',
        id: 'add-comment-form',
        className: 'page',
        name: 'add-comment-form',
        nameInput: nameInputAddComment,
        surname: surnameAddComment,
        middleName: middleNameAddComment,
        region: regionAddComment,
        city: cityAddComment,
        number: numberAddComment,
        email: emailAddComment,
        text: textAddComment,
        submit: submitAddComment
    }
};

export const addCommentPageRender = {
    id: 'page-comment',
    className: 'page',
    header: {
        tag: 'header',
        className: 'header',
        title: titleAddComment,
        info: infoAddComment,
        formDiv: formDivAddComment
    }
};

// Stat page

const titleStat = {
    tag: 'h1',
    className: 'header__title',
    textContent: 'Statistics'
};

const infoStat = {
    tag: 'p',
    className: 'info',
    textContent: 'If you recently added a comment we already have measured it into statistic.' +
        'Pick a region and you will see comments distribution per city. ' +
        'Pick a city and you will see info about users that made that comments. ' +
        'Pick any user to see full information about him and about comment that he made'
};

const tableRegionStat = {
    tag: 'table',
    className: 'table__region',
    thead: {
        tag: 'thead',
        tr: {
            tag: 'tr',
            className: 'row head',
            th1: {
                tag: 'th',
                className: 'column',
                textContent: 'Region'
            },
            th2: {
                tag: 'th',
                className: 'column',
                textContent: '#comments'
            },
        }
    },
    tbody: {
        tag: 'tbody'
    }
};

const tableCityStat = {
    tag: 'table',
    className: 'table__city',
    thead: {
        tag: 'thead',
        tr: {
            tag: 'tr',
            className: 'row head',
            th1: {
                tag: 'th',
                className: 'column',
                textContent: 'City'
            },
            th2: {
                tag: 'th',
                className: 'column',
                textContent: '#comments'
            },
        }
    },
    tbody: {
        tag: 'tbody'
    }
};

const tableViewStat = {
    tag: 'table',
    className: 'table__view',
    thead: {
        tag: 'thead',
        tr: {
            tag: 'tr',
            className: 'row head',
            th1: {
                tag: 'th',
                className: 'column',
                textContent: 'Full name'
            },
            th2: {
                tag: 'th',
                className: 'column',
                textContent: 'Number'
            },
            th3: {
                tag: 'th',
                className: 'column',
                textContent: 'Email'
            },
            th4: {
                tag: 'th',
                className: 'column',
                textContent: 'Comment'
            },
        }
    },
    tbody: {
        tag: 'tbody'
    }
};

export const statPageRender = {
    id: 'page-stat',
    className: 'page',
    header: {
        tag: 'div',
        className: 'header',
        title: titleStat,
        info: infoStat,
        tableDiv: {
            tag: 'div',
            className: 'table table__stat',
            tableRegion: tableRegionStat,
            tableCity: tableCityStat,
            tableView: tableViewStat,
            commentInfoRender
        }
    }
};