import {
	Box,
	Button,
	Center,
	Stack,
	Stepper,
	Text,
	Title,
} from '@mantine/core';
import { IconArrowBack, IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ParcelCreate } from '~/features/booking/ParcelCreate';
import { ReceiverCreate } from '~/features/booking/ReceiverCreate';
import { SenderCreate } from '~/features/booking/SenderCreate';
import { api } from '~/utils/api';

export type SRType = {
	id: string;
	name: string;
};

function Bookings() {
	const [active, setActive] = useState(0);

	const [sender, setSender] = useState<SRType>({ id: '', name: '' });
	const [receiver, setReceiver] = useState<SRType>({ id: '', name: '' });

	const router = useRouter();

	//*=========================================================================
	const { data: city } = api.location.getCity.useQuery();

	const cityData: { value: string; label: string }[] =
		city !== 'Error' && city !== undefined
			? city.map((c) => ({ value: c.id, label: c.name }))
			: [];

	const { data: township, isLoading: townshipIsLoading } =
		api.location.getTownship.useQuery();

	const townshipData =
		!townshipIsLoading && township !== 'Error' && township !== undefined
			? township.map((town) => ({
					value: town.id,
					label: town.name,
			  }))
			: [{ value: '', label: '' }];

	//*=========================================================================

	const nextStep = (formIsFail: boolean) =>
		setActive((current) => {
			if (formIsFail) {
				return current;
			}
			return current < 3 ? current + 1 : current;
		});

	// const prevStep = () =>
	// 	setActive((current) => (current > 0 ? current - 1 : current));

	return (
		<Center w={'100vw'}>
			<Box w={800} mt={50}>
				<Stack>
					<Button
						disabled={active > 0 && active <= 2}
						w={100}
						leftIcon={<IconArrowBack size={20} />}
						variant='outline'
						onClick={() => void router.back()}
					>
						Back
					</Button>

					<Stepper active={active} breakpoint='sm'>
						<Stepper.Step label='First step' description='Sender (You)'>
							<SenderCreate
								cityData={cityData}
								nextStep={nextStep}
								townshipData={townshipData}
								getSender={setSender}
							/>
						</Stepper.Step>

						<Stepper.Step label='Second step' description='Receiver (Customer)'>
							<ReceiverCreate
								cityData={cityData}
								nextStep={nextStep}
								townshipData={townshipData}
								getReceiver={setReceiver}
							/>
						</Stepper.Step>

						<Stepper.Step label='Final step' description='Parcel Info'>
							<ParcelCreate
								sender={sender}
								receiver={receiver}
								nextStep={nextStep}
							/>
						</Stepper.Step>

						<Stepper.Completed>
							<Stack my={50}>
								<Center>
									<Title>Completed!</Title>
								</Center>
								<Center>
									<Text c={'gray.6'} fz={'md'}>
										You have successfully created the booking!
									</Text>
								</Center>

								<Center>
									<Button
										leftIcon={<IconPlus size={20} />}
										onClick={() => {
											setActive(0);
											setSender({ name: '', id: '' });
											setReceiver({ name: '', id: '' });
										}}
									>
										Create Booking Again
									</Button>
								</Center>
							</Stack>
						</Stepper.Completed>
					</Stepper>

					{/* <Group position='right' mt='xl'>
					{active !== 0 && (
						<Button variant='default' onClick={prevStep}>
							Back
						</Button>
					)}
				</Group> */}
				</Stack>
			</Box>
		</Center>
	);
}

export default Bookings;
