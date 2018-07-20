

export default () => {
    return function raiseUrlNotFoundError(req, res, next) {
        var error = new Error(req.method + ' ' + req.url + ' ' + 'does not exist');
        error.status = 404;
        next(error);
    };
};