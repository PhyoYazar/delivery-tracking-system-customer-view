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
			await ApiClient().post<Receiver>('/senders', input);
		}),
});
