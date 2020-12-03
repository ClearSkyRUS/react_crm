import React from "react"
import {
	Table,
	Checkbox,
	Button,
	Visibility,
	Image,
	Loader
} from "semantic-ui-react"
import Img from "react-image"
import ReactJson from "react-json-view"
import {apiUrl} from "config"

export default ({
	keys,
	arr,
	deleteItem,
	setToEdit,
	onBottom,
	selected,
	onSelect,
	multi,
	setActive
}) => {
	if (!arr) return <Table.Body />
	if (onBottom) {
		return arr.map((page, key) => (
			<Visibility
				as={Table.Body}
				key={key}
				fireOnMount
				onBottomVisible={onBottom}
			>
				{!page.docs
					? ""
					: page.docs.map((el, key) => (
							<TableRow
								key={key}
								el={el}
								keys={keys}
								deleteItem={deleteItem}
								setToEdit={setToEdit}
								selected={selected}
								onSelect={onSelect}
								multi={multi}
								setActive={setActive}
							/>
					  ))}
			</Visibility>
		))
	}
	return (
		<Table.Body>
			{arr.map((el, key) => (
				<TableRow
					key={key}
					el={el}
					keys={keys}
					deleteItem={deleteItem}
					setToEdit={setToEdit}
					selected={selected}
					onSelect={onSelect}
					multi={multi}
					setActive={setActive}
				/>
			))}
		</Table.Body>
	)
}

const TableRow = ({
	el,
	keys,
	deleteItem,
	setToEdit,
	onBottom,
	selected,
	onSelect,
	multi,
	setActive
}) => (
	<Table.Row>
		<Table.Cell collapsing>
			{!setActive ? (
				""
			) : (
				<Checkbox
					onChange={(e, {checked}) => {
						let newEl = JSON.parse(JSON.stringify(el))
						newEl.isActive = checked
						setActive(newEl)
					}}
					checked={el.isActive}
					toggle
				/>
			)}
			{!onSelect ? (
				""
			) : (
				<Checkbox
					radio={!multi}
					onChange={(e, {checked}) => onSelect(checked, el._id)}
					checked={
						selected
							? Array.isArray(selected)
								? selected.find((id) => id === el._id)
									? true
									: false
								: el._id === selected
							: false
					}
				/>
			)}
		</Table.Cell>
		{keys.map((field, keyI) => (
			<Table.Cell key={keyI}>
				{field === "imagePreview" ? (
					<div style={{display: "flex", width: "80px", margin: "auto"}}>
						<Img
							style={{margin: "auto", width: "80px"}}
							src={[
								`${apiUrl}file?width=80&id=${el[field] || el._id}`,
								"assets/images/holder.png"
							]}
							loader={<Loader style={{margin: "auto"}} active inline />}
						/>
					</div>
				) : el[field] && typeof el[field] === "object" ? (
					<ReactJson
						collapsed={1}
						enableClipboard={false}
						displayDataTypes={false}
						name={false}
						src={el[field]}
					/>
				) : el[field] ? (
					el[field].toString()
				) : (
					"none"
				)}
			</Table.Cell>
		))}
		<Table.Cell collapsing>
			{!setToEdit ? (
				""
			) : (
				<Button
					circular
					color="linkedin"
					icon="edit outline"
					onClick={() => setToEdit(el)}
				/>
			)}
			{!deleteItem ? (
				""
			) : (
				<Button
					circular
					color="google plus"
					icon="delete"
					onClick={() => deleteItem(el._id)}
				/>
			)}
		</Table.Cell>
	</Table.Row>
)
