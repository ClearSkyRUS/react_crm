import React, {useState} from "react"
import {Form, Input} from "semantic-ui-react"

import {Object} from "../"

export default ({
	item,
	newObject,
	setNewObject,
	object,
	field,
	setKeys,
	deleteIndex,
	index,
	setItem
}) => {
	if (newObject === null) setNewObject([])
	const [valueField, setValue] = useState(item)
	const type = object.type
	const changeValue = (value) => {
		setValue(value)
		setItem(index, value)
	}
	switch (type) {
		case "String":
		case "Number":
		case "Date":
			return (
				<Form.Field>
					<Input
						type={type}
						value={valueField}
						onChange={(e, {value}) => changeValue(value)}
						action={{
							icon: "delete",
							color: "google plus",
							onClick: deleteIndex
						}}
						placeholder={field}
					/>
				</Form.Field>
			)
		case "Object":
			return (
				<Form.Group inline>
					<Object
						type={type}
						field={index}
						newObject={valueField}
						setNewObject={changeValue}
					/>
					<Form.Button
						circular
						color="google plus"
						icon="delete"
						onClick={deleteIndex}
					/>
				</Form.Group>
			)
		default:
			return (
				<Form.Field>
					<label>No defined {field} type</label>
				</Form.Field>
			)
	}
}
