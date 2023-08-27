import { Button, Group, Loader, Select, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAlarm } from '@tabler/icons-react';
import type { Dispatch, SetStateAction } from 'react';
import { type SRType } from '~/pages/bookings';
import type { Customer } from '~/types/customer';
import { api } from '~/utils/api';

export interface Town {
	value: string;
	label: string;
}

interface Props {
	townshipData: Town[];
	nextStep: (formIsFail: boolean) => void;
	getReceiver: Dispatch<SetStateAction<SRType>>;
}

export const ReceiverCreate = (props: Props) => {
	const { nextStep, townshipData, getReceiver } = props;

	const form = useForm({
		initialValues: {
			name: '',
			phone_number: '',
			address: '',
			township_id: '',
			city_id: '',
		},

		validate: {
			name: isNotEmpty('Name must not be empty'),
			// phone_number: isNotEmpty('Phone Number must not be empty'),
			phone_number: (value) =>
				/[0-9]{10}/.test(value) ? null : 'Invalid phone number',
			address: isNotEmpty('Address must not be empty'),
			township_id: isNotEmpty('Township must not be empty'),
			city_id: isNotEmpty('City must not be empty'),
		},
	});

	const createReceiver = api.receiver.createSender.useMutation({
		onSuccess: (data) => {
			// notifications.show({
			// 	message: 'Successfully updated.',
			// 	icon: <IconCheck size='1rem' />,
			// 	autoClose: true,
			// 	withCloseButton: true,
			// 	color: 'green',
			// });
			if (data?.id) {
				getReceiver({ id: data.id, name: data.name });
			}

			nextStep(form.validate().hasErrors);
		},
		onError: () => {
			notifications.show({
				message: 'Something wrong. Please try again',
				icon: <IconAlarm size='1rem' />,
				autoClose: true,
				withCloseButton: true,
				color: 'red',
			});
		},
	});

	const onSubmit = (values: Customer) => {
		if (form.validate().hasErrors) return;

		createReceiver.mutate(values);
	};

	return (
		<form onSubmit={form.onSubmit((values) => onSubmit(values))}>
			<Stack spacing={30} mt={25}>
				<TextInput
					size='md'
					withAsterisk
					label='Name'
					placeholder='john'
					{...form.getInputProps('name')}
				/>
				<TextInput
					size='md'
					withAsterisk
					label='Phone Number'
					placeholder='09987654321'
					{...form.getInputProps('phone_number')}
				/>
				<TextInput
					size='md'
					withAsterisk
					label='Address'
					placeholder='No.234, Some Street, ...'
					{...form.getInputProps('address')}
				/>

				<Group w={'100%'} noWrap>
					<Select
						w={'100%'}
						size='md'
						label='Township'
						placeholder='Select'
						withAsterisk
						data={townshipData}
						{...form.getInputProps('township_id')}
					/>
					<Select
						w={'100%'}
						size='md'
						label='City'
						placeholder='Select'
						withAsterisk
						data={[
							{
								value: '3000b4c7-b1c5-4591-a7a3-8a7d81031a34',
								label: 'Yangon',
							},
						]}
						{...form.getInputProps('city_id')}
					/>
				</Group>
			</Stack>

			<Group position='right' mt='md'>
				<Button
					w={130}
					type='submit'
					size='md'
					disabled={createReceiver.isLoading}
				>
					{createReceiver.isLoading ? <Loader size={'sm'} /> : ' Next Step'}
				</Button>
			</Group>
		</form>
	);
};
