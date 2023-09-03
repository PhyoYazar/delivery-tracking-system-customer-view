import {
	Box,
	Button,
	Card,
	Center,
	Group,
	Loader,
	Stack,
	Text,
	TextInput,
	Timeline,
	Title,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import {
	IconArrowBack,
	IconBook,
	IconBuildingWarehouse,
	IconCheckupList,
	IconTruckDelivery,
	TablerIconsProps,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
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

	const getTimeline = (
		type: string,
	): {
		title: string;
		desc: string;
		icon: (props: TablerIconsProps) => JSX.Element;
	} => {
		if (type === 'booking') {
			return {
				title: 'Booking',
				icon: IconBook,
				desc: 'Parcel is successfully booked.',
			};
		}
		if (type === 'start_pick_up') {
			return {
				title: 'Start pick up',
				icon: IconTruckDelivery,
				desc: 'Picker is going to pick up the parcel!',
			};
		}
		if (type === 'arrive_warehouse') {
			return {
				title: 'Arrived warehouse',
				icon: IconBuildingWarehouse,
				desc: 'Parcel is already arrived at the warehouse.',
			};
		}
		if (type === 'start_deliver') {
			return {
				title: 'Start deliver',
				icon: IconTruckDelivery,
				desc: 'Deliver are started to deliver the parcel.',
			};
		}
		if (type === 'finish') {
			return {
				title: 'Finish',
				icon: IconCheckupList,
				desc: 'Parcel are already delivered!',
			};
		}

		return { title: '', icon: IconCheckupList, desc: '' };
	};

	const getDate = (dateValue: string) => {
		return dayjs(dateValue).format('YYYY/MM/DD hh:mm A');
	};

	return (
		<Center w='100vw' my={40}>
			<Stack>
				<Button
					w={100}
					leftIcon={<IconArrowBack size={20} />}
					variant='outline'
					onClick={() => void router.back()}
				>
					Back
				</Button>

				<Card shadow='sm' padding='lg' radius='md' withBorder>
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
				</Card>

				{!isLoading ? (
					data && data.length !== 0 ? (
						<>
							{data.map(({ id, name, timeline }) => (
								<Card key={id} shadow='sm' padding='lg' radius='md' withBorder>
									<Stack spacing={32}>
										<Title>{name}</Title>

										<Timeline
											active={timeline.length - 1}
											bulletSize={32}
											lineWidth={4}
										>
											{timeline.map(({ id, type, created_at }) => (
												<Timeline.Item
													key={id}
													bullet={
														<Box component={getTimeline(type).icon} size={18} />
													}
													title={getTimeline(type).title}
												>
													<Text color='dimmed' size='sm'>
														{getTimeline(type).desc}
													</Text>
													<Text size='xs' mt={4}>
														{getDate(created_at)}
													</Text>
												</Timeline.Item>
											))}
										</Timeline>
									</Stack>
								</Card>
							))}
						</>
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
