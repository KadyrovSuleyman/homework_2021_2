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

    Object.entries(object).forEach(([key, value]) => {
        addProperty(result, key, value);
    });

    return result;
}

const addProperty = (object, key, value) => {
    if (typeof value === null) return;

    if ((typeof value == 'object') && (!Array.isArray(value))) {
        addNestedProperty(object, key, value);
    } else {
        addPlainProperty(object, key, value);
    }
}

const addPlainProperty = (object, key, value) => {
    object[key] = value;
}

const addNestedProperty = (parentObject, parentKey, parentValue) => {
    const childObject  = plainify(parentValue);

    Object.entries(childObject).forEach(([childKey, childValue]) => {
        parentObject[`${parentKey}.${childKey}`] = childValue;
    });
}
