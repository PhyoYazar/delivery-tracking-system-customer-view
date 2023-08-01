import { Button, Group, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

interface Parcel {
	price: number;
	sender_id: string;
	receiver_id: string;
}

export const ParcelCreate = () => {
	const form = useForm({
		initialValues: {
			price: 0,
			sender_id: '',
			receiver_id: '',
		},

		validate: {
			price: isNotEmpty('Price must not be empty'),
			sender_id: isNotEmpty('Sender must not be empty'),
			receiver_id: isNotEmpty('Receiver must not be empty'),
		},
	});

	const onSubmit = (values: Parcel) => {
		console.log(values);
	};

	return (
		<form onSubmit={form.onSubmit((values) => onSubmit(values))}>
			<Stack spacing={30} mt={25}>
				<TextInput
					size='md'
					withAsterisk
					label='Price'
					placeholder='john'
					{...form.getInputProps('name')}
				/>
				<TextInput
					variant='filled'
					readOnly
					size='md'
					withAsterisk
					label='Sender (You)'
					placeholder='09987654321'
					{...form.getInputProps('sender_id')}
				/>
				<TextInput
					variant='filled'
					readOnly
					size='md'
					withAsterisk
					label='Receiver (Customer)'
					placeholder='No.234, Some Street, ...'
					{...form.getInputProps('receiver_id')}
				/>
			</Stack>

			<Group position='right' mt='md'>
				<Button type='submit' size='md'>
					Create
				</Button>
			</Group>
		</form>
	);
};
