const notFound = (req, res, next) => {
    const error = new Error(`NOT Found - ${req.originalUrl}`)
    res.status(404)
    res.status(404)
    next(error)
}


const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    //!if it is 404, it will not change
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export { notFound, errorHandler }