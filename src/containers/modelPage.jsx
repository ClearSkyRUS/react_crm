import React, {useEffect, useState, useContext} from "react"
import {useLocation} from "hooks"
import {ItemsContext} from "context"
import {modelsApi} from "utils/api"
import {request} from "actions"

import {Button, Loader, Dimmer, Segment, Input} from "semantic-ui-react"

import {ModelList, ModelModal} from "components"

const ModelPage = ({pageModel, selected, onSelect, multi}) => {
	const {pageState, history, addToHistory, isSync, setSync} = useLocation(
		pageModel
	)
	const {store, dispatch} = useContext(ItemsContext)
	const [isOpen, setOpen] = useState(false)
	const [upload, setUpload] = useState(false)
	const [toEdit, setToEdit] = useState({})
	const currentModel = store?.models?.find(
		(obj) => obj.name === pageState.params.model
	)
	const currentModelName = pageState.params.model
	const currentModelData = store?.modelsData?.[currentModelName]

	const editItem = (item) => {
		const params = `?model=${currentModelName}&_id=${item._id}&image=findOne`
		request(modelsApi, "get", params, null, (data) => {
			if (data) {
				setToEdit(data)
				setOpen(true)
			}
		})
	}
	const closeModal = (bySync) => {
		if (bySync || window.confirm("Sure you want to close without save?")) {
			setOpen(false)
			setUpload(false)
			setToEdit({})
		}
	}
	const sync = (withModels = false) => {
		if (!pageState.params.model) return
		setSync(true)
		if (withModels) {
			request(modelsApi, "getModels", "", null, (data) => {
				if (!Array.isArray(data)) return
				setModels(data)
				updateList()
			})
		}
		updateList()
		closeModal(true)
	}
	const setModels = (data) => {
		dispatch({
			type: "SET",
			payload: {models: data}
		})
	}
	const updateList = () => {
		const model = store.models?.find(
			(model) => model.name === pageState.params.model
		)
		const image = model?.images?.backList ? "backList" : "list"
		const params = `${pageState.search}&image=${image}`
		request(modelsApi, "get", params, "SET", (data) => {
			setModelsData(data)
			endRequest()
		})
	}
	const setModelsData = (data) => {
		dispatch({
			type: "SET",
			payload: {
				modelsData: {[currentModelName]: data}
			}
		})
	}
	const endRequest = (data) => {
		if (
			data &&
			pageState.params.page &&
			(data.totalPages < pageState.params.page || pageState.params.page < 1)
		)
			paginate(null, {
				activePage:
					data.totalPages < pageState.params.page ? data.totalPages : 1
			})
		setSync(false)
		setUpload(false)
	}
	const paginate = (e, {activePage}) => {
		setSync(true)
		addToHistory({page: activePage})
	}
	const deleteItem = (id) => {
		setUpload(true)
		if (window.confirm("Sure you want to delete?")) {
			request(modelsApi, "delete", `${pageState.search}&id=${id}`, null, () =>
				sync(currentModelName === "model")
			)
		}
	}
	const createItem = (item) => {
		setUpload(true)
		request(modelsApi, "post", pageState.search, item, (data) =>
			data ? sync(currentModelName === "model") : setUpload(false)
		)
	}
	const updateItem = (item) => {
		setUpload(true)
		request(modelsApi, "put", pageState.search, item, (data) =>
			data ? sync() : setUpload(false)
		)
	}
	const setSearch = (queryVal) => {
		addToHistory({search: queryVal})
	}

	useEffect(() => {
		sync()
	}, [pageState.search])

	return (
		<Segment className="full-heght">
			<Button
				className="actionsBar__sync"
				onClick={() => sync()}
				circular
				icon="sync"
			/>
			<Button
				className="actionsBar__add"
				onClick={() => setOpen(true)}
				circular
				color="google plus"
				icon="plus"
			/>
			<Input
				value={pageState.params.search ? pageState.params.search : ""}
				onChange={(e, {value}) => setSearch(value)}
				className="pageHeader-header__search"
				icon="search"
				size="mini"
				placeholder="Search..."
			/>
			<Dimmer
				active={
					isSync ||
					(currentModelName && (!store.modelsData || !currentModelData))
				}
				inverted
			>
				<Loader />
			</Dimmer>
			{!isSync && currentModelData && currentModel ? (
				<div>
					{currentModelData.docs.length === 0 ? (
						<h1>No items yet</h1>
					) : (
						<ModelList
							items={currentModelData}
							model={currentModel}
							deleteItem={deleteItem}
							setToEdit={editItem}
							paginate={paginate}
							selected={selected}
							onSelect={onSelect}
							multi={multi}
							setActive={
								currentModel.schemaObj.isActive ? updateItem : undefined
							}
						/>
					)}
					<ModelModal
						model={currentModel}
						upload={upload}
						toEdit={toEdit}
						createItem={createItem}
						updateItem={updateItem}
						deleteItem={deleteItem}
						openStatus={isOpen}
						closeModal={closeModal}
					/>
				</div>
			) : (
				""
			)}
		</Segment>
	)
}

export default ModelPage
