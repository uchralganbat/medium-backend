module.exports = validateRequest;

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnkown: true
    };
    const { error, value } = schema.vali
}