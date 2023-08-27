import {
	Box,
	Button,
	Center,
	Group,
	Loader,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconArrowBack } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { api } from '~/utils/api';

type SearchValue = { name: string; phone_number: string };

const SearchProductsPage = () => {
	const [name, setName] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');

	const router = useRouter();

	const form = useForm({
		initialValues: {
			name: '',
			phone_number: '',
		},

		validate: {
			name: isNotEmpty('Name must not be empty'),
			phone_number: isNotEmpty('Phone Number must not be empty'),
		},
	});

	const { data, isLoading, isFetching } = api.parcel.getAllParcels.useQuery(
		{
			name,
			phone_number: phoneNumber,
		},
		{
			enabled: name !== '' && phoneNumber !== '',
		},
	);

	const onSubmit = (values: SearchValue) => {
		setName(values.name);
		setPhoneNumber(values.phone_number);
	};

	let condition: string;

	if (data && !data[0]?.picked_up) {
		condition = 'Your products have not arrived at the warehouse yet.';
	} else if (data && data[0]?.picked_up && !data[0].arrived_warehouse) {
		condition = 'Your products have not arrived at the warehouse yet.';
	} else if (data && data[0]?.arrived_warehouse && !data[0].deliver) {
		condition = 'Your products have arrived at the warehouse';
	} else if (data && data[0]?.deliver && !data[0].finish) {
		condition = 'Your products are on their way to you now. ';
	} else {
		condition = 'Your products are delivered!';
	}

	return (
		<Center w='100vw' my={50}>
			<Stack>
				<Button
					w={100}
					leftIcon={<IconArrowBack size={20} />}
					variant='outline'
					onClick={() => void router.back()}
				>
					Back
				</Button>

				<form onSubmit={form.onSubmit((values) => onSubmit(values))}>
					<Group align='end'>
						<TextInput
							withAsterisk
							label='Name'
							placeholder='john terry'
							{...form.getInputProps('name')}
						/>

						<TextInput
							withAsterisk
							label='Phone Number'
							placeholder='098766544432'
							{...form.getInputProps('phone_number')}
						/>

						<Button disabled={isFetching} type='submit'>
							{isFetching ? <Loader size={'sm'} /> : 'Search'}
						</Button>
					</Group>
				</form>

				{!isLoading ? (
					data && data.length !== 0 ? (
						<Box>
							<Title>{condition}</Title>
						</Box>
					) : (
						<Text>Not found!</Text>
					)
				) : null}

				{/* {!isLoading && <pre>{JSON.stringify(data, null, 3)}</pre>} */}
			</Stack>
		</Center>
	);
};

export default SearchProductsPage;
