import { axios } from 'core'

export default {
	get: () => axios.get('/models')
}