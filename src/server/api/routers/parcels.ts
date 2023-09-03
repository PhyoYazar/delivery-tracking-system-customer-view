import { TRPCClientError } from '@trpc/client';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { default as ApiClient, default as apiClient } from '~/server/apiClient';
import type { ParcelResponse } from '~/types/parcel';

export const parcelRouter = createTRPCRouter({
	createParcel: publicProcedure
		.input(
			z.object({
				name: z.string(),
				description: z.string().nullable().optional(),
				sender_id: z.string(),
				receiver_id: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const resp = await ApiClient().post<ParcelResponse>('/parcels', input);

			if (!resp.data) {
				throw new Error('Error in creating parcel');
			}

			return resp.data;
		}),

	getAllParcels: publicProcedure
		.input(
			z.object({
				name: z.string().optional(),
				phone_number: z.string().optional(),
				// sender_township: z.string().nullable(),
				// receiver_township: z.string().nullable(),
			}),
		)
		.query(async ({ input }) => {
			const [response, error] = await apiClient()
				.get<ParcelResponse[]>('/parcels/track', { params: input })
				.then((res) => [res, null] as const)
				.catch((e: unknown) => [null, e] as const);

			if (response === null || error) {
				throw new TRPCClientError('Something wrong!');
			}

			return response.data;
		}),

	autoAssign: publicProcedure
		.input(
			z.object({
				id: z.string(),
				role: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const [response, error] = await apiClient()
				.patch<ParcelResponse>(`/parcels/auto-assign/${input.id}`, {
					role: input.role,
				})
				.then((res) => [res, null] as const)
				.catch((e: unknown) => [null, e] as const);

			if (response === null || error) {
				throw new TRPCClientError('Something wrong!');
			}

			return response.data;
		}),

	autoAssignSchedule: publicProcedure
		.input(
			z.object({
				id: z.string(),
				role: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const [response, error] = await apiClient()
				.patch<ParcelResponse>(`/parcels/auto-assign/schedule/${input.id}`, {
					role: input.role,
				})
				.then((res) => [res, null] as const)
				.catch((e: unknown) => [null, e] as const);

			if (response === null || error) {
				throw new TRPCClientError('Something wrong!');
			}

			return response.data;
		}),
});
