import React from "react"
import {Table} from "components"

export default ({
	match,
	location,
	history,
	items,
	model,
	deleteItem,
	setToEdit,
	paginate,
	setActive
}) => (
	<Table
		headArr={model.preview}
		bodyArr={items.docs}
		pagination={items}
		deleteItem={deleteItem}
		setToEdit={setToEdit}
		paginate={paginate}
		setActive={setActive}
	/>
)
