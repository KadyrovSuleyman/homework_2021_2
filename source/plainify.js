let plainify = (obj) => {
    let result = {};

    for (let [key, value] of Object.entries(obj)) {
        if (isObject(value)) {

            let temp  = plainify(value);

            for (let [key1, value1] of Object.entries(temp)) {
                result[key + '.' + key1] = value1;
            }



            break;
        }

        result[key] = value;
    }

    return result;
}

const isObject = (obj) => (typeof obj == 'object');






 
