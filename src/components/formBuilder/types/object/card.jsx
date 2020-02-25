import React, { useState } from 'react'
import { Form, Icon, Card } from 'semantic-ui-react'

import FieldsSwitch from 'components/formBuilder/fieldsTypeSwitch'
import typeOf from 'type-of'
import { typesList } from 'utils'

export default ({ newObject, setNewObject, field, setKeys, deleteKey }) => {
    const [keyName, setKeyName] = useState(field)
    const [type, setType] = useState(newObject[field] || newObject[field] === false ? getCapitalizedType(newObject[field]) : null)
    const [arrayType, setArrayType] = useState(newObject[field] || newObject[field] === false ? getCapitalizedArrayType(newObject[field]) : null)
    const options = Object.keys(typesList).map(key => ({ key: typesList.key, text: key, value: key }))
    const onKeyInput = ({ value }) => {
        if (!newObject[value]) {
            let objectHolder = newObject
            objectHolder[value] = objectHolder[keyName]
            delete objectHolder[keyName]
            setNewObject(objectHolder)
            setKeys(Object.keys(objectHolder))
            setKeyName(value)
        }
    }
    const onTypeChange = ({ value }) => {
        let objectHolder = newObject
        objectHolder[keyName] = typeof typesList[value].default === 'object' ? JSON.parse(JSON.stringify(typesList[value].default)) : typesList[value].default
        setNewObject(objectHolder)
        setType(value)
    }
    return (
        <Card>
            <Card.Content extra textAlign='right'>
                <Icon link name='delete' onClick={() => deleteKey(keyName)} />
            </Card.Content>
            <Card.Content>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Key' value={keyName} placeholder='Key' onChange={(e, data) => onKeyInput(data)} />
                    <Form.Select
                        fluid search selection
                        label='Type'
                        value={type}
                        options={options}
                        placeholder='Type'
                        onChange={(e, data) => onTypeChange(data)}
                    />
                </Form.Group>
                {!type ? '' :
                    <Form.Group inline widths='equal'>
                        {type === 'Array' && !arrayType ? '' : <FieldsSwitch type={type} field={keyName} object={{ type: arrayType }} newObject={newObject} setNewObject={setNewObject} />}
                        {type === 'Array' ?
                            <Form.Select
                                fluid search selection
                                label='Type'
                                value={arrayType}
                                options={options.filter(obj => obj.value !== 'Array' && obj.value !== 'Boolean')}
                                placeholder='Type'
                                onChange={(e, { value }) => setArrayType(value)}
                            /> : ''}
                    </Form.Group>
                }
            </Card.Content>
        </Card>
    )
}

const getCapitalizedType = (value) => {
    const type = typeOf(value)
    return type && type[0].toUpperCase() + type.slice(1);
}

const getCapitalizedArrayType = (value) => {
    if (value.length) {
        const arrayItemType = typeOf(value[0])
        return arrayItemType && arrayItemType[0].toUpperCase() + arrayItemType.slice(1);
    } else return null
}