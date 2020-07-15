import React, {useState} from "react"
import {Button, Modal, Form} from "semantic-ui-react"

export default ({type, field, children, childrenType, add, clear}) => {
	const [open, setOpen] = useState(false)
	return (
		<Form.Field inline>
			<label>{field}</label>
			<Modal
				onClose={() => setOpen(false)}
				open={open}
				trigger={
					<Button
						onClick={() => setOpen(true)}
						color="linkedin"
						icon="edit outline"
						content={
							!childrenType ? `Edit ${type}` : `Edit ${type} of ${childrenType}`
						}
					/>
				}
				closeIcon
			>
				<Modal.Header>{`Edit ${type} of ${field}`}</Modal.Header>
				<Modal.Content>
					<Form>{children}</Form>
				</Modal.Content>
				<Modal.Actions>
					<Button circular icon="plus" onClick={add} />
					<Button
						negative
						content="Clear"
						onClick={() => {
							if (window.confirm(`Sure you want to clear ${type}?`)) clear()
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
			</Modal>
		</Form.Field>
	)
}
