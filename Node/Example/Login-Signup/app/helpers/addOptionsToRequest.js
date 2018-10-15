module.exports = (options) => {
    return (req, res, next) => {
        req.headers.options = options;
        next();
    }
}