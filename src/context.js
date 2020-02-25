import React, { useReducer, useEffect } from 'react'

import { itemsReducer } from 'reducers'

import { modelsApi } from 'utils/api'

import { request } from 'actions'

export const UserContext = React.createContext({})
export const ItemsContext = React.createContext({})

const Context = ({ children }) => {

    const [store, dispatch] = useReducer(itemsReducer, {})

    useEffect(() => {
        request(modelsApi, 'getModels', '', null, setModels)
    }, [])

    const setModels = data => {
        dispatch({
            type: 'SET',
            payload: { models: data }
        })
    }

    return (
        <UserContext.Provider value={{}}>
            <ItemsContext.Provider value={{ store, dispatch }}>
                {children}
            </ItemsContext.Provider>
        </UserContext.Provider>
    )
}

export default Context