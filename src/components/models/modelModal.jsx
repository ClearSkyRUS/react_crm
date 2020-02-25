import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Dimmer, Loader } from 'semantic-ui-react'
import Builder from 'components/formBuilder'
import { Dropzone } from 'components'

export default ({ model, toEdit, createItem, updateItem, deleteItem, openStatus, closeModal, upload }) => {
    const editMode = Object.keys(toEdit).length > 0
    const [newObject, setNewObject] = useState(null)
    useEffect(() => {
        if (openStatus === true) {
            setNewObject(editMode ? JSON.parse(JSON.stringify(toEdit)) : {})

        } else setNewObject(null)
    }, [openStatus])
    if (newObject === null) return ('')
    return (
        <div>
            <Modal size='fullscreen' open={openStatus} onClose={() => closeModal()} closeIcon>
                <Dimmer active={upload} inverted>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>
                <Modal.Header>{editMode ? 'Edit ' : 'New '}{model?.name} </Modal.Header>
                <Modal.Content>
                    <Form>
                        {!model.name.endsWith('.files') || editMode
                            ? <Builder object={model.schemaObj} newObject={newObject} setNewObject={setNewObject} editMode={editMode} />
                            : <Dropzone newObject={newObject} setNewObject={setNewObject} />
                        }
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        negative
                        icon='delete'
                        labelPosition='right'
                        content={editMode ? 'Delete' : 'Cancel'}
                        onClick={editMode ? () => deleteItem(toEdit._id) : () => closeModal()}
                    />
                    <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content={editMode ? 'Save' : 'Create'}
                        onClick={editMode ? () => updateItem(newObject) : () => createItem(newObject)}
                    />
                </Modal.Actions>
            </Modal>
        </div>
    )
}