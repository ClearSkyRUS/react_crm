import React from "react"
import {Form, TextArea, Input} from "semantic-ui-react"

import CKEditor from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

export default ({value, setValue, field, type}) => {
	if (typeof value !== "string" && typeof value !== "number") {
		setValue("")
		return ""
	}
	if (field.includes("text")) {
		if (field.includes("Html")) {
			return (
				<Form.Field>
					<CKEditor
						editor={ClassicEditor}
						data={value}
						onChange={(event, editor) => setValue(editor.getData())}
					/>
				</Form.Field>
			)
		} else {
			return (
				<Form.Field>
					<TextArea
						value={value}
						onChange={(e, {value}) => setValue(value)}
						type={type}
						placeholder={field}
					/>
				</Form.Field>
			)
		}
	} else {
		return (
			<Form.Field>
				<Input
					value={value}
					onChange={(e, {value}) => setValue(value)}
					type={type}
					label={field}
					placeholder={field}
				/>
			</Form.Field>
		)
	}
}
