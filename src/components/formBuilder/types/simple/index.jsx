import React from 'react'
import { Form, TextArea, Input } from 'semantic-ui-react'

export default ({ value, setValue, field, type }) => {
    if (typeof value !== 'string' && typeof value !== 'number') {
        setValue('')
        return ''
    }
    if (field.includes('text')) {
        return (
            <Form.Field>
                <TextArea value={value} onChange={(e, { value }) => setValue(value)} type={type} label={field} placeholder={field} />
            </Form.Field>
        )
    } else {
        return (
            <Form.Field>
                <Input value={value} onChange={(e, { value }) => setValue(value)} type={type} label={field} placeholder={field} />
            </Form.Field>
        )
    }
}