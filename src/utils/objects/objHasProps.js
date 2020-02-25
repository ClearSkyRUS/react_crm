const objHasProps = (obj, props) => {
    for (let key in props) {
        if (!obj[key])
            return false
        else if (typeof props[key] === 'object')
            for (let key2 in props[key])
                if (!obj[key][key2])
                    return false
    }
    return true
}

export default objHasProps