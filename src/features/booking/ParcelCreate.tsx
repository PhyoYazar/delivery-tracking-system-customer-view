import {
	Button,
	Group,
	Loader,
	Stack,
	TextInput,
	Textarea,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { type SRType } from '~/pages/bookings';
import { api } from '~/utils/api';

interface Parcel {
	name: string;
	description: string;
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
			name: '',
			description: '',
			sender: sender.name,
			receiver: receiver.name,
		},

		validate: {
			name: isNotEmpty('Name must not be empty'),
			sender: isNotEmpty('Sender must not be empty'),
			receiver: isNotEmpty('Receiver must not be empty'),
		},
	});

	const autoAssign = api.parcel.autoAssign.useMutation();
	const autoAssignSchedule = api.parcel.autoAssignSchedule.useMutation();

	const createParcel = api.parcel.createParcel.useMutation({
		onSuccess: (resp) => {
			nextStep(form.validate().hasErrors);

			if (resp) {
				autoAssign.mutate({ id: resp.id, role: 'picker' });
				autoAssignSchedule.mutate({ id: resp.id, role: 'picker' });
			}
		},
		onError: () => {},
	});

	const onSubmit = (values: Parcel) => {
		if (form.validate().hasErrors) return;

		createParcel.mutate({
			name: values.name,
			description: values.description,
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
					label='Product Name'
					placeholder='john'
					{...form.getInputProps('name')}
				/>
				<Textarea
					size='md'
					label='Description'
					placeholder='write description ...'
					autosize
					minRows={2}
					maxRows={4}
					{...form.getInputProps('description')}
				/>
				<TextInput
					variant='filled'
					readOnly
					size='md'
					withAsterisk
					label='Sender (You)'
					{...form.getInputProps('sender')}
				/>
				<TextInput
					variant='filled'
					readOnly
					size='md'
					withAsterisk
					label='Receiver (Customer)'
					{...form.getInputProps('receiver')}
				/>
			</Stack>

			<Group position='right' mt='md'>
				<Button
					w={130}
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
