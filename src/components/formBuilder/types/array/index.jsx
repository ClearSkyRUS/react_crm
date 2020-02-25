import React from 'react'
import ModalRedactor from 'components/formBuilder/modalRedactor'
import Item from './item'
import { typesList } from 'utils'
import { ObjectId } from '../'

export default ({ newObject, setNewObject, object, type, field }) => {
    if (!Array.isArray(newObject)) {
        setNewObject([])
        return ''
    }

    if (object.type === 'ObjectId') {
        return <ObjectId multi={true} modelName={object.ref} value={newObject} setValue={setNewObject} field={field} />
    }

    const add = () => {
        const defVal = typesList[object.type].default
        let objectHolder = newObject.slice()
        objectHolder.push(typeof defVal === 'object' ? JSON.parse(JSON.stringify(defVal)) : defVal)
        setNewObject(objectHolder)
    }

    const deleteIndex = index => {
        let objectHolder = newObject.slice()
        objectHolder.splice(index, 1)
        setNewObject(objectHolder)
    }

    const clear = () => {
        let objectHolder = newObject.slice()
        objectHolder = []
        setNewObject(objectHolder)
    }

    const setItem = (index, value) => {
        let objectHolder = newObject.slice()
        objectHolder[index] = value
        setNewObject(objectHolder)
    }

    return (
        <ModalRedactor type={type} field={field} childrenType={object.type} add={add} clear={clear} >
            {newObject.map((item, key) =>
                [<Item
                    key={key}
                    item={item}
                    index={key}
                    object={object}
                    parentField={field}
                    parentType={'Array'}
                    newObject={newObject}
                    setNewObject={setNewObject}
                    deleteIndex={() => deleteIndex(key)}
                    setItem={setItem}
                />]
            )}
        </ModalRedactor>
    )
}