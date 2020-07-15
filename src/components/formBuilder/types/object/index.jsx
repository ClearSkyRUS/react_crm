import React, {useState} from "react"
import {Card} from "semantic-ui-react"
import ModalRedactor from "components/formBuilder/modalRedactor"
import CardObject from "./card"

export default ({newObject, setNewObject, type, field}) => {
	if (!newObject || typeof newObject !== "object" || Array.isArray(newObject)) {
		setNewObject({})
		return ""
	}

	const [keys, setKeys] = useState(Object.keys(newObject))

	const add = () => {
		if (!newObject[""]) {
			let objectHolder = newObject
			objectHolder[""] = null
			setNewObject(objectHolder)
			setKeys(Object.keys(objectHolder))
		}
	}

	const deleteKey = (key) => {
		let objectHolder = newObject
		delete objectHolder[key]
		setNewObject(objectHolder)
		setKeys(Object.keys(objectHolder))
	}

	const clear = () => {
		let objectHolder = newObject
		objectHolder = {}
		setNewObject(objectHolder)
		setKeys(Object.keys(objectHolder))
	}

	return (
		<ModalRedactor
			type={type}
			field={field}
			setNewObject={setNewObject}
			setKeys={setKeys}
			add={add}
			clear={clear}
		>
			<Card.Group centered>
				{keys.map((field, key) => [
					<CardObject
						key={key}
						newObject={newObject}
						setNewObject={setNewObject}
						field={field}
						setKeys={setKeys}
						deleteKey={deleteKey}
					/>
				])}
			</Card.Group>
		</ModalRedactor>
	)
}
