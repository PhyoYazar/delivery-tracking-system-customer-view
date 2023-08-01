import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import ApiClient from '~/server/apiClient';
import type { City, Township } from '~/types/address';

export const locationRouter = createTRPCRouter({
	getCity: publicProcedure.query(async () => {
		const [response, error] = await ApiClient()
			.get<City[]>('/city')
			.then((res) => [res, null] as const)
			.catch((e: unknown) => [null, e] as const);

		if (response === null || error) {
			return 'Error';
		}

		return response.data;
	}),

	getTownship: publicProcedure.query(async () => {
		const [response, error] = await ApiClient()
			.get<Township[]>('/township')
			.then((res) => [res, null] as const)
			.catch((e: unknown) => [null, e] as const);

		if (response === null || error) {
			return 'Error';
		}

		return response.data;
	}),
});
