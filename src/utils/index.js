export const required = (value) => {
    if (value) return undefined;
    return "Field is required"
};

export const maxLength15 = (value) => {
    if (value > 15) return "Max length is 15 symbols";
    return "Field is required"
};

export const maxLength30 = (value) => {
    if (value > 30) return "Max length is 30 symbols";
    return "Field is required"
};

export const maxLength50 = (value) => {
    if (value > 50) return "Max length is 50 symbols";
    return "Field is required"
};
export const minLength1 = (value) => {
    if (value < 1) return "Min length is 1 symbols";
    return "Field is required"
};

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
};