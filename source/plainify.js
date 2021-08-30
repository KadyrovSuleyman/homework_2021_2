let plainify = (object) => {
    if ( !isObject(object) ) {
        return undefined;
    }

    const result = {};

    for (const [key, value] of Object.entries(object)) {
        addProperty(result, key, value);
    }

    return result;
}

const isObject = (object) => (typeof object == 'object');

const addProperty = (object, key, value) => {
    ( isObject(value) ) ?
        addNestedProperty(object, key, value) :
        addPlainProperty(object, key, value);
}

const addPlainProperty = (object, key, value) => {
    object[key] = value;
}

const addNestedProperty = (parentObject, parentKey, parentValue) => {
    const childObject  = plainify(parentValue);

    for (const [childKey, childValue] of Object.entries(childObject)) {
        parentObject[parentKey + '.' + childKey] = childValue;
    }
}
