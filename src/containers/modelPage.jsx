import React, {useEffect, useState, useContext} from "react"
import {useLocation} from "hooks"
import {ItemsContext} from "context"
import {modelsApi} from "utils/api"
import {request} from "actions"

import {Button, Loader, Dimmer, Segment} from "semantic-ui-react"

import {ModelList, ModelModal} from "components"

const ModelPage = () => {
	const {pageState, history, setHistory, isSync, setSync} = useLocation()
	const {store, dispatch} = useContext(ItemsContext)
	const [isOpen, setOpen] = useState(false)
	const [upload, setUpload] = useState(false)
	const [toEdit, setToEdit] = useState({})
	const currentModel = store?.models?.find(
		(obj) => obj.name === pageState.params.model
	)
	const currentModelName = pageState.params.model
	const currentModelData =
		currentModelName && store.modelsData
			? store.modelsData[currentModelName]
			: null
	const editItem = (item) => {
		setToEdit(item)
		setOpen(true)
	}
	const closeModal = (bySync) => {
		if (bySync || window.confirm("Sure you want to close without save?")) {
			setOpen(false)
			setUpload(false)
			setToEdit({})
		}
	}
	const sync = () => {
		setSync(true)
		request(modelsApi, "getModels", "", null, (data) => {
			setModels(data)
			updateList()
		})
		closeModal(true)
	}
	const setModels = (data) => {
		dispatch({
			type: "SET",
			payload: {models: data}
		})
	}
	const updateList = () => {
		request(modelsApi, "get", pageState.search, "SET", (data) => {
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
		setHistory({page: activePage})
	}
	const deleteItem = (id) => {
		setUpload(true)
		if (window.confirm("Sure you want to delete?")) {
			request(modelsApi, "delete", `${pageState.search}&id=${id}`, null, sync)
		}
	}
	const createItem = (item) => {
		setUpload(true)
		request(modelsApi, "post", pageState.search, item, (data) =>
			data ? sync() : setUpload(false)
		)
	}
	const updateItem = (item) => {
		setUpload(true)
		request(modelsApi, "put", pageState.search, item, (data) =>
			data ? sync() : setUpload(false)
		)
	}

	useEffect(() => {
		sync()
	}, [history.location])

	return (
		<Segment className="full-heght">
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
			<div className="actionsBar">
				<Button
					className="actionsBar__sync"
					onClick={sync}
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
			</div>
		</Segment>
	)
}

export default ModelPage
