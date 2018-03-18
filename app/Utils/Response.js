module.exports = {
    json_res(data) {
        return {
            is_error: false,
            data: data
        }
    },
    json_res_error(error) {
        return {
            is_error: true,
            error_message: error
        }
    }
};