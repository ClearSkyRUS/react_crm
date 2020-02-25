import { useState } from 'react'
import queryString from 'query-string'
import { useHistory } from "react-router-dom";

const useLocation = () => {
    const [isSync, setSync] = useState(false)
    const history = useHistory();
    const pageState = getLocationObj(history)
    const setHistory = param => {
        const query = `?${queryString.stringify(Object.assign({}, pageState.params, param))}`
        history.push({ search: query })
    }
    return { pageState, history, setHistory, isSync, setSync }
}

const getLocationObj = (history) => {
    const params = queryString.parse(history.location.search)
    const firstParam = Object.keys(params)[0]
    return {
        title: history.location.search !== '' ? `${firstParam}: ${params[firstParam]}` : history.location.pathname === '/' ? 'home' : 'some',
        params: params,
        search: history.location.search
    }
}

export default useLocation