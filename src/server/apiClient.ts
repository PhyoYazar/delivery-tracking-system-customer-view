import axios, { type AxiosError } from 'axios';
import { env } from '~/env.mjs';

// export interface TOptionalToken {
// 	token: string;
// }

// event bus for handling global http errors with singleton pattern
const ApiClient = () => {
	const instance = axios.create({
		baseURL: env.NEXT_APP_API_URL,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	instance.interceptors.request.use((_request) => {
		return _request;
	});

	instance.interceptors.response.use(
		(response) => {
			return response;
		},
		(error: AxiosError) => {
			console.log(
				'error => ',
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				error.response?.request?.path || '',
				JSON.stringify(error.response?.data, null, 2),
			);
			return Promise.reject(error);
		},
	);
	return instance;
};

export default ApiClient;
