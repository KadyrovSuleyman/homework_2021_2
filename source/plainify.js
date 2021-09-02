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

/**
 * To add property to object. Plainify property value first if it's nested
 * @param {object} object - target object for property adding
 * @param {string} key - key of added property
 * @param value - value of added property
 */
const addProperty = (object, key, value) => {
    if (typeof value === null) return;

    if ( (typeof value == 'object') && (!Array.isArray(value)) ) {
        const childObject  = plainify(value);
        
        Object.entries(childObject).forEach(([childKey, childValue]) => {
            object[`${key}.${childKey}`] = childValue;
        });

        return;
    }

    object[key] = value;
}
