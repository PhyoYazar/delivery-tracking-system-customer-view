import { exampleRouter } from '~/server/api/routers/example';
import { createTRPCRouter } from '~/server/api/trpc';
import { locationRouter } from './routers/location';
import { parcelRouter } from './routers/parcels';
import { receiverRouter } from './routers/receiver';
import { senderRouter } from './routers/sender';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	example: exampleRouter,
	sender: senderRouter,
	receiver: receiverRouter,
	parcel: parcelRouter,
	location: locationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
