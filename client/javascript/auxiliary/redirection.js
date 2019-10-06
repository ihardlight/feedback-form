export const getRelationUrl = (url) => {
    const hostRegExp = /(localhost|127\.0\.0\.1):[0-9]{4}\//;
    const hostMatches = url.match(hostRegExp);

    return url.slice(hostMatches.index + hostMatches[0].length, url.length);
};