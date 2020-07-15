import React, {useState} from "react"
import {Button, Modal, Form, Input, Label} from "semantic-ui-react"

export default ({
	model,
	field,
	children,
	clear,
	search,
	setSearch,
	selected,
	multi
}) => {
	const [open, setOpen] = useState(false)
	return (
		<Form.Field inline>
			<label>{field}</label>
			<Modal
				centered={false}
				onClose={() => setOpen(false)}
				open={open}
				trigger={
					<Button
						onClick={() => setOpen(true)}
						color="linkedin"
						icon="edit outline"
						content={`Select ${multi ? "Array of " : ""} ${model}`}
					/>
				}
				closeIcon
			>
				<Modal.Header>
					{`Select ${model}`}
					<Input
						value={search}
						onChange={(e, {value}) => setSearch(value)}
						icon="search"
						size="mini"
						style={{marginLeft: "20px"}}
						placeholder="Search..."
					/>
				</Modal.Header>
				<Modal.Actions>
					<Label>
						Selected
						<Label.Detail>{selected}</Label.Detail>
					</Label>
					<Button
						negative
						content="Clear"
						onClick={() => {
							if (window.confirm(`Sure you want to clear selectd ${model}?`))
								clear()
						}}
					/>
					<Button
						onClick={() => setOpen(false)}
						positive
						icon="checkmark"
						labelPosition="right"
						content="Save"
					/>
				</Modal.Actions>
				<Modal.Content>
					<Form>{children}</Form>
				</Modal.Content>
			</Modal>
		</Form.Field>
	)
}
