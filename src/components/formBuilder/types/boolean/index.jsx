import React from "react"
import {Form, Checkbox} from "semantic-ui-react"

export default ({checked, setValue, field}) => {
	if (checked !== true && checked !== false) {
		setValue(false)
		return ""
	}
	return (
		<Form.Field>
			<Checkbox
				checked={checked}
				onChange={(e, {checked}) => setValue(checked)}
				toggle
				label={field}
			/>
		</Form.Field>
	)
}
