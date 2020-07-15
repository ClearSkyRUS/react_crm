import { NotificationManager } from 'react-notifications'

const sendRequest = (api, type, params, sendData, callback) => {
	api[type](params, sendData).then(({ data }) => {
		if (data.err) {
			NotificationManager.error(data.err.name ? data.err.name : 'Error', data.err.errmsg ? data.err.errmsg : 'Unexpected error')
			if (callback)
				callback()
			return
		}

		if (callback)
			callback(data)
	}).catch((err) => {
		NotificationManager.error(err.name ? err.name : 'Error sending request', err.errmsg ? err.errmsg : 'Request not sended')
		if (callback)
			callback()
	})
}

export default sendRequest