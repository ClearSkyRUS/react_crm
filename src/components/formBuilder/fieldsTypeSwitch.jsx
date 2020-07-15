import React, {useContext, useState} from "react"
import {Form, Checkbox, Input, TextArea} from "semantic-ui-react"
import {Dropzone} from "components"

import {Object, Array, Boolean, Simple, ObjectId} from "./types"

const FieldsTypesSwitch = ({type, field, object, newObject, setNewObject}) => {
	const [value, setValue] = useState(newObject[field] ? newObject[field] : null)
	if (newObject[field] !== value) {
		let objectHolder = newObject
		objectHolder[field] = value
		setNewObject(objectHolder)
	}
	switch (type) {
		case "String":
		case "Number":
		case "Date":
			return (
				<Simple value={value} setValue={setValue} field={field} type={type} />
			)
		case "Boolean":
			return <Boolean checked={value} setValue={setValue} field={field} />
		case "ObjectId":
			return (
				<ObjectId
					multi={false}
					modelName={object.ref}
					value={value}
					setValue={setValue}
					field={field}
				/>
			)
		case "Array":
			return (
				<Array
					type={type}
					field={field}
					newObject={value}
					setNewObject={setValue}
					object={object}
				/>
			)
		case "Object":
			return (
				<Object
					type={type}
					field={field}
					newObject={value}
					setNewObject={setValue}
				/>
			)
		default:
			return (
				<Form.Field>
					<label>No defined {field} type</label>
				</Form.Field>
			)
	}
}

export default FieldsTypesSwitch
