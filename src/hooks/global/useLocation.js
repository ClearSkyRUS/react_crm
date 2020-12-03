import { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useHistory } from "react-router-dom"

const useLocation = model => {
	const _history = useHistory()
	const [isSync, setSync] = useState(false)
	const [history, setHistory] = useState({})
	const addToHistory = param => {
		setHistory({
			...history,
			...param
		})
	}
	useEffect(() => {
		const modelToSet = !model
			? queryString.parse(_history.location.search).model
			: model
		addToHistory({model: modelToSet})
	}, [_history.location.search])
	const pageState = getLocationObj(history)
	return { pageState, history, addToHistory, isSync, setSync }
}

const getLocationObj = (params) => {
	const firstParam = Object.keys(params)[0]
	return {
		title: queryString.stringify(params) !== '' ? `${firstParam}: ${params[firstParam]}` : 'home',
		params: params,
		search: '?' + queryString.stringify(params)
	}
}

export default useLocation