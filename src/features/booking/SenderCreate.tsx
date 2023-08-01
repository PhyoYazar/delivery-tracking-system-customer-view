import { Button, Group, Loader, Select, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import type { Dispatch, SetStateAction } from 'react';
import { type SRType } from '~/pages/bookings';
import type { Customer } from '~/types/customer';
import { api } from '~/utils/api';
import type { Town } from './ReceiverCreate';

interface Props {
	townshipData: Town[];
	nextStep: (formIsFail: boolean) => void;
	getSender: Dispatch<SetStateAction<SRType>>;
}

export const SenderCreate = (props: Props) => {
	const { nextStep, townshipData, getSender } = props;

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
			phone_number: isNotEmpty('Phone Number must not be empty'),
			address: isNotEmpty('Address must not be empty'),
			township_id: isNotEmpty('Township must not be empty'),
			city_id: isNotEmpty('City must not be empty'),
		},
	});

	const createSender = api.sender.createSender.useMutation({
		onSuccess: (data) => {
			// notifications.show({
			// 	message: 'Successfully updated.',
			// 	icon: <IconCheck size='1rem' />,
			// 	autoClose: true,
			// 	withCloseButton: true,
			// 	color: 'green',
			// });
			if (data?.id) {
				getSender({ id: data.id, name: data.name });
			}

			nextStep(form.validate().hasErrors);
		},
		onError: () => {
			// notifications.show({
			// 	message: 'Failed to update. Please try again',
			// 	icon: <IconAlarm size='1rem' />,
			// 	autoClose: true,
			// 	withCloseButton: true,
			// 	color: 'red',
			// });
		},
	});

	const onSubmit = (values: Customer) => {
		if (form.validate().hasErrors) return;

		createSender.mutate(values);
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
								value: 'e63c061a-4879-4ef2-b102-aee381a1eaea',
								label: 'Yangon',
							},
						]}
						{...form.getInputProps('city_id')}
					/>
				</Group>
			</Stack>

			<Group position='right' mt='md'>
				<Button
					w={120}
					type='submit'
					size='md'
					disabled={createSender.isLoading}
				>
					{createSender.isLoading ? <Loader size={'sm'} /> : ' Next Step'}
				</Button>
			</Group>
		</form>
	);
};
