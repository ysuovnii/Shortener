function notFound(req, res, next) {
    res.status(404)

    res.render("error", {
        message: "Page not found", 
        statusCode: 404,
    })

}

module.exports = notFound