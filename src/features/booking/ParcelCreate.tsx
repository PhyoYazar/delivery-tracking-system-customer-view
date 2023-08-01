import { Button, Group, Loader, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { type SRType } from '~/pages/bookings';
import { api } from '~/utils/api';

interface Parcel {
	price: number;
	sender: string;
	receiver: string;
}

interface Props {
	sender: SRType;
	receiver: SRType;
	nextStep: (formIsFail: boolean) => void;
}

export const ParcelCreate = (props: Props) => {
	const { sender, receiver, nextStep } = props;

	const form = useForm({
		initialValues: {
			price: 0,
			sender: sender.name,
			receiver: receiver.name,
		},

		validate: {
			price: isNotEmpty('Price must not be empty'),
			sender: isNotEmpty('Sender must not be empty'),
			receiver: isNotEmpty('Receiver must not be empty'),
		},
	});

	const createParcel = api.parcel.createParcel.useMutation({
		onSuccess: () => {
			nextStep(form.validate().hasErrors);
		},
		onError: () => {},
	});

	const onSubmit = (values: Parcel) => {
		if (form.validate().hasErrors) return;

		createParcel.mutate({
			price: +values.price,
			sender_id: sender.id,
			receiver_id: receiver.id,
		});
	};

	return (
		<form onSubmit={form.onSubmit((values) => onSubmit(values))}>
			<Stack spacing={30} mt={25}>
				<TextInput
					size='md'
					withAsterisk
					label='Price'
					placeholder='john'
					{...form.getInputProps('price')}
				/>
				<TextInput
					variant='filled'
					readOnly
					size='md'
					withAsterisk
					label='Sender (You)'
					placeholder='09987654321'
					{...form.getInputProps('sender')}
				/>
				<TextInput
					variant='filled'
					readOnly
					size='md'
					withAsterisk
					label='Receiver (Customer)'
					placeholder='No.234, Some Street, ...'
					{...form.getInputProps('receiver')}
				/>
			</Stack>

			<Group position='right' mt='md'>
				<Button
					w={120}
					type='submit'
					size='md'
					disabled={createParcel.isLoading}
				>
					{createParcel.isLoading ? <Loader size={'sm'} /> : 'Create'}
				</Button>
			</Group>
		</form>
	);
};
