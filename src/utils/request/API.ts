import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { store } from '../store/store'

const responseHandler = (
	response: AxiosResponse<Record<string, unknown>>,
	callBackOk?: (response: Record<string, unknown>) => void,
	callBackError?: (error: Record<string, unknown>) => void,
) => {
	if (response?.data?.errorList !== undefined) {
		if (callBackError) {
			callBackError(response.data)
		}
	} else if (callBackOk) {
		callBackOk(response.data)
	}
}

const errorHandler = (
	error: { data: Record<string, unknown> },
	callBackError?: (error: Record<string, unknown>) => void,
) => {
	console.log(callBackError !== undefined && error !== undefined && error.data !== undefined)
	if (
		callBackError !== undefined &&
		error !== undefined &&
		error.data &&
		typeof error.data === 'object' &&
		!Array.isArray(error.data)
	) {
		callBackError(error.data) // Теперь TS знает, что error.data — объект
	}
}

export const fetch = (
	method: string,
	url: string,
	config?: AxiosRequestConfig,
	callBackOk?: (response: Record<string, unknown>) => void,
	callBackError?: (error: Record<string, unknown>) => void,
) => {
	const token = store.getState().user.token
	const headers = { ...config?.headers, token: token ? token : undefined }

	switch (method) {
		case 'post':
			axios
				.post(url, config?.params, { headers: headers })
				.then((response) => {
					responseHandler(response, callBackOk, callBackError)
				})
				.catch((error) => {
					errorHandler(error.response, callBackError)
				})
			break
		case 'get':
			axios
				.get(url, config)
				.then((response) => {
					responseHandler(response, callBackOk, callBackError)
				})
				.catch((error) => {
					errorHandler(error.response, callBackError)
				})
			break
		case 'update':
			axios
				.put(url, config?.params, { headers: headers })
				.then((response) => {
					responseHandler(response, callBackOk, callBackError)
				})
				.catch((error) => {
					errorHandler(error.response, callBackError)
				})
			break
		case 'delete':
			axios
				.delete(url, { headers: headers })
				.then((response) => {
					responseHandler(response, callBackOk, callBackError)
				})
				.catch((error) => {
					errorHandler(error.response, callBackError)
				})
			break
	}
}
