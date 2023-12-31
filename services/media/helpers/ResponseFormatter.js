function success(code, message, data) {
    return {
        meta: {
            code: code,
            message: message
        },
        data: data
    }
}

function error(code, message) {
    return {
        meta: {
            code: code,
            message: message
        },
    }
}

module.exports = {
    success,
    error
}