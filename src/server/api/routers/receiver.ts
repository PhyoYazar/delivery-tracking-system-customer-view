import { TRPCClientError } from '@trpc/client';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { default as ApiClient } from '~/server/apiClient';
import type { Receiver } from '~/types/receiver';

export const receiverRouter = createTRPCRouter({
	createSender: publicProcedure
		.input(
			z.object({
				name: z.string(),
				phone_number: z.string(),
				address: z.string(),
				city_id: z.string(),
				township_id: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const [response, error] = await ApiClient()
				.post<Receiver>('/receiver', input)
				.then((res) => [res, null] as const)
				.catch((e: unknown) => [null, e] as const);

			if (!response?.data || error) {
				throw new TRPCClientError('Something wrong!');
			}

			return response?.data;
		}),
});
