import React from 'react';
import { Table } from 'semantic-ui-react'

export default ({ arr }) => {
    if (arr === null) return ''
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell />
                {!arr ? '' : arr.map((el, key) => (
                    <Table.HeaderCell key={key}>{el}</Table.HeaderCell>
                ))}
                <Table.HeaderCell />
            </Table.Row>
        </Table.Header>
    )
}