import { Button, Group, Select, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import type { Customer } from '~/types/customer';

interface Props {
	nextStep: (formIsFail: boolean) => void;
}

export const SenderCreate = (props: Props) => {
	const { nextStep } = props;

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

	const onSubmit = (values: Customer) => {
		console.log(values);
		nextStep(form.validate().hasErrors);
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
						data={[
							{ value: 'react', label: 'React' },
							{ value: 'ng', label: 'Angular' },
							{ value: 'svelte', label: 'Svelte' },
							{ value: 'vue', label: 'Vue' },
						]}
						{...form.getInputProps('township')}
					/>
					<Select
						w={'100%'}
						size='md'
						label='City'
						placeholder='Select'
						withAsterisk
						data={[
							{ value: 'react', label: 'React' },
							{ value: 'ng', label: 'Angular' },
							{ value: 'svelte', label: 'Svelte' },
							{ value: 'vue', label: 'Vue' },
						]}
						{...form.getInputProps('city')}
					/>
				</Group>
			</Stack>

			<Group position='right' mt='md'>
				<Button type='submit' size='md'>
					Next Step
				</Button>
			</Group>
		</form>
	);
};
