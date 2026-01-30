function errHandler (err, req, res, next) {
    const statusCode = err.statusCode || 500

    res.status(statusCode)

    res.render("error", {
        message: err.message || "Internal Server Error", statusCode
    })
}

module.exports = errHandler