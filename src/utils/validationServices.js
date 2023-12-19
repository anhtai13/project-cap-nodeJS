export const validatePrice = (price) => {
    return typeof price === 'number' && price > 1000
}

export const validateIdDetailAndDelete = (id) => {
    return id > 0
}