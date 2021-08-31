/** @module plainify */

/**
 * Plainify nested object to plain object
 * @param {object} object - nested object to plainify
 * @returns {object} plain object
 */

const plainify = (object) => {
    if (typeof object != 'object') {
        return;
    }

    const result = {};

    Object.entries(object).forEach((item) => {
        addProperty(result, item[0], item[1]);
    });

    return result;
}

const addProperty = (object, key, value) => {
    if (typeof value === null) return;

    (typeof value == 'object') ?
        addNestedProperty(object, key, value) :
        addPlainProperty(object, key, value);
}

const addPlainProperty = (object, key, value) => {
    object[key] = value;
}

const addNestedProperty = (parentObject, parentKey, parentValue) => {
    const childObject  = plainify(parentValue);

    for (const [childKey, childValue] of Object.entries(childObject)) {
        parentObject[`${parentKey}.${childKey}`] = childValue;
    }
}
