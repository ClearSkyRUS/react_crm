import React from 'react';
import { Table } from 'semantic-ui-react'

import Head from './head'
import Body from './body'
import Footer from './footer'

export default ({ headArr, bodyArr, pagination, deleteItem, setToEdit, paginate, onBottom, selected, onSelect, multi, setActive }) => (
    <Table celled compact>
        {<Head arr={headArr} />}
        <Body
            keys={headArr}
            arr={bodyArr}
            deleteItem={deleteItem}
            setToEdit={setToEdit}
            onBottom={onBottom}
            selected={selected}
            onSelect={onSelect}
            multi={multi}
            setActive={setActive}
        />
        {!pagination ? <Table.Footer /> : <Footer data={pagination} colSpan={headArr.length + 2} paginate={paginate} />}
    </Table>
)