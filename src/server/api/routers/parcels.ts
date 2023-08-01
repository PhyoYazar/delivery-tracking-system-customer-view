import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { default as ApiClient, default as apiClient } from '~/server/apiClient';
import type { ParcelResponse } from '~/types/parcel';

export const parcelRouter = createTRPCRouter({
	createParcel: publicProcedure
		.input(
			z.object({
				price: z.number(),
				sender_id: z.string(),
				receiver_id: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			await ApiClient().post<{ ha: string }>('/parcels', input);
		}),

	getAllParcels: publicProcedure
		.input(
			z
				.object({
					sender_township: z.string().nullable(),
					receiver_township: z.string().nullable(),
				})
				.optional(),
		)
		.query(async ({ input }) => {
			const [response, error] = await apiClient()
				.get<ParcelResponse[]>('/parcels', { params: input })
				.then((res) => [res, null] as const)
				.catch((e: unknown) => [null, e] as const);

			if (response === null || error) {
				return 'Error';
			}

			return response.data;
		}),
});
