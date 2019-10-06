const url = "cgi-bin/controller.py";

const sendRequest = (url, params, timeout = 5000) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.responseType = "json";
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                if (request.response) {
                    const {result, error} = request.response;
                    result ? resolve(result) : reject(error)
                } else {
                    reject('Have not response');
                }
            }
        });

        request.send(params);
        setTimeout(() => {
            reject('Time is out');
        }, timeout);
    });

};

const makeRequest = (paramsGenerator) => {
    return (...args) => {
        const params = paramsGenerator.apply(this, args);
        return sendRequest(url, params)
    }
};

const getRegions = makeRequest(() => {
    return toParams('load-regions');
});

const getCities = makeRequest((regionId) => {
    return toParams(`load-cities`, [{'region_id': regionId}]);
});

const getViews = makeRequest(() => {
    return toParams('view');
});

const getViewById = makeRequest((id) => {
    return toParams('view', [{'id': id}]);
});

const getRegionStat = makeRequest((minComments = 5) => {
    return toParams('stat', [{'stat-name': 'region'}, {'min-comments': minComments}]);
});

const getCityStat = makeRequest((regionName, minComments = 1) => {
    return toParams('stat',
        [{'stat-name': 'city'}, {'region-name': regionName}, {'min-comments': minComments}]);
});

const deleteViewById = makeRequest((id) => {
    return toParams('delete-view', [{'id': id}]);
});

const submitForm = makeRequest((form) => {
    return toParams('comment', Array.from(form.elements));
});

const toParams = (action, array = []) => {
    return array.reduce((accum, current, idx) => {
        const name = current.name || Object.keys(current)[0] || `name${idx}`;
        const value = current.value || Object.values(current)[0] || `value${idx}`;

        return `${accum}${name}=${value}&`
    }, `action=${action}&`);
};

export {
    getRegions,
    getCities,
    getViews,
    getViewById,
    deleteViewById,
    getRegionStat,
    getCityStat,
    submitForm
}