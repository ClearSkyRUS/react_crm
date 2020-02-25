import React, { useState, useContext } from 'react'
import { Form, TextArea, Input, Loader, Visibility, Segment, Dimmer } from 'semantic-ui-react'
import { Table } from 'components'

export default ({ model, pages, onBottom, selected, onSelect, multi }) => {

    return (
        <Table
            headArr={model.preview}
            onBottom={onBottom}
            bodyArr={pages}
            selected={selected}
            onSelect={onSelect}
            multi={multi}
        />
    )
}