import { Box, Button, Center, Group, Stepper } from '@mantine/core';
import { useState } from 'react';
import { ParcelCreate } from '~/features/booking/ParcelCreate';
import { ReceiverCreate } from '~/features/booking/ReceiverCreate';
import { SenderCreate } from '~/features/booking/SenderCreate';

function Bookings() {
	const [active, setActive] = useState(0);

	const nextStep = (formIsFail: boolean) =>
		setActive((current) => {
			if (formIsFail) {
				return current;
			}
			return current < 3 ? current + 1 : current;
		});

	const prevStep = () =>
		setActive((current) => (current > 0 ? current - 1 : current));

	return (
		<Center w={'100vw'}>
			<Box w={800} mt={80}>
				<Stepper active={active} breakpoint='sm'>
					<Stepper.Step label='First step' description='Sender (You)'>
						<SenderCreate nextStep={nextStep} />
					</Stepper.Step>

					<Stepper.Step label='Second step' description='Receiver (Customer)'>
						<ReceiverCreate nextStep={nextStep} />
					</Stepper.Step>

					<Stepper.Step label='Final step' description='Social media'>
						<ParcelCreate />
					</Stepper.Step>

					<Stepper.Completed>Completed! Form values:</Stepper.Completed>
				</Stepper>

				<Group position='right' mt='xl'>
					{active !== 0 && (
						<Button variant='default' onClick={prevStep}>
							Back
						</Button>
					)}
				</Group>
			</Box>
		</Center>
	);
}

export default Bookings;
