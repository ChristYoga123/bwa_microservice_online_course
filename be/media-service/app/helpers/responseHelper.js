function success(code, message, data) {
    return {
        meta: {
            status: "success",
            code: code,
            message: message
        },
        data: data
    }
}

function error(code, message) {
    return {
        meta: {
            status: "error",
            code: code,
            message: message
        }
    }
}

module.exports = {
    success,
    error
}
