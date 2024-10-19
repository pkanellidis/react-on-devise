
export const readResponseErrors = (error) => {
    let message
    if (error.response) {
        message = error.response.data.errors || error.response.data.error
    } else {
        message = "Something went wrong"
    }

    return message
}

export const readResponseMessage = (response) => {
    return response.data && response.data.message
}