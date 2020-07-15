import React from "react"
import {Form} from "semantic-ui-react"

import FieldsSwitch from "./fieldsTypeSwitch"

const Builder = ({
	object,
	parentField,
	parentType,
	newObject,
	setNewObject
}) => {
	if (!object) {
		return (
			<Form.Field>
				<label>You can't define it like that</label>
			</Form.Field>
		)
	}
	if (object.type) {
		return (
			<FieldsSwitch
				type={object.type}
				object={object}
				field={parentField}
				parentType={parentType}
				newObject={newObject}
				setNewObject={setNewObject}
			/>
		)
	} else {
		return Object.keys(object).map((field, key) => {
			if (typeof object[field] === "object") {
				if (Array.isArray(object[field])) {
					return (
						<FieldsSwitch
							object={object[field][0]}
							type={"Array"}
							field={field}
							parentType={parentType}
							key={key}
							newObject={newObject}
							setNewObject={setNewObject}
						/>
					)
				} else {
					return (
						<Form.Field key={key}>
							<Builder
								object={object[field]}
								parentField={field}
								newObject={newObject}
								setNewObject={setNewObject}
							/>
						</Form.Field>
					)
				}
			}
			return (
				<Form.Field key={key}>
					<label>No defined {field} type</label>
				</Form.Field>
			)
		})
	}
}

export default Builder
