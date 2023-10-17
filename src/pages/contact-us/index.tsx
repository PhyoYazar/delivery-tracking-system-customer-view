import { Box, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';
import Image from 'next/image';
import { Header } from '~/features/layout/LayoutHeader';
import styles from './../index.module.css';

const AboutUsPage = () => {
	return (
		<div className={styles.root}>
			<Header />

			<main className={styles.main}>
				<Box w='100%' p={'9rem'}>
					<Grid gutter={50}>
						{/* <Grid.Col span={7}>
							<Image
								src='/img/about-us.jpg'
								alt='company photo'
								width={600}
								height={400}
							/>
						</Grid.Col>
						<Grid.Col span={5}>
							<Stack>
								<Title c='white'>About Us</Title>

								<Text c='white'>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit
									non, eius ex, id tempore fugit voluptates nam accusantium,
									ratione saepe nemo? Ut quia sit ipsa voluptatibus, cum ea quas
									doloremque, eum necessitatibus quisquam corrupti, iste maxime
									beatae accusamus. Voluptate, omnis. Lorem ipsum dolor sit amet
									consectetur adipisicing elit. Maxime, ratione enim?
									Perferendis aut delectus necessitatibus repudiandae, iste, a
									dignissimos similique ut repellat tenetur quaerat facere
									deleniti iusto esse reiciendis unde.
								</Text>
							</Stack>
						</Grid.Col> */}

						<Grid.Col span={6}>
							<Stack spacing={24}>
								<Title fz={60} c='white'>
									Contact Us
								</Title>

								{/* <Text color='gray.6'>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit
									non, eius ex, id tempore fugit voluptates nam accusantium,
									ratione saepe nemo? Ut quia sit ipsa voluptatibus.
								</Text> */}

								<Stack mt={10}>
									{contactInfo.map(({ icon, value }) => (
										<Group key='value' spacing={24} noWrap align='flex-start'>
											<Box
												component={icon}
												width={24}
												height={24}
												color='white'
											/>
											<Text c='white'>{value}</Text>
										</Group>
									))}
								</Stack>
							</Stack>
						</Grid.Col>
						<Grid.Col span={6}>
							<Image
								src='/img/contact-us.svg'
								alt='company photo'
								width={700}
								height={400}
							/>
						</Grid.Col>
					</Grid>
				</Box>
			</main>
		</div>
	);
};

export default AboutUsPage;

const contactInfo = [
	{ icon: IconPhone, value: '09-790-222-878, 09-423-667-800' },
	{ icon: IconMail, value: 'dts.official@deli.com' },
	{
		icon: IconMapPin,
		value:
			'Branch(1) => No.24-6(A), Tile Aein Yar, Taw Win Street, Kamayut Township, Yangon',
	},
	{
		icon: IconMapPin,
		value:
			'Branch(2) => No.214-2(A), Nat Nat Taw Street, Tarmwe Township, Yangon',
	},
];
