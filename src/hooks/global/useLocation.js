import { useEffect, useState, useCallback } from 'react'
import queryString from 'query-string'
import { useHistory } from "react-router-dom"

const useLocation = model => {
	const _history = useHistory()
	const [isSync, setSync] = useState(false)
	const [history, setHistory] = useState({})
	const addToHistory = useCallback(param => {
		setHistory({
			...history,
			...param
		})
	}, [history])
	useEffect(() => {
		const modelToSet = !model
			? queryString.parse(_history.location.search).model
			: model
		if (history.model !== modelToSet) {
			addToHistory({model: modelToSet})
		}
	}, [_history.location.search, model, history.model, addToHistory])
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