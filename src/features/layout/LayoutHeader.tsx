import { Box, Group, Text } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const Header = () => {
	const router = useRouter();

	console.log(router.pathname);

	return (
		<Box
			sx={{
				height: '4rem',
				position: 'sticky',
				top: 0,
				backgroundColor: 'transparent',
				padding: '30px 144px 0 144px',
			}}
		>
			<Group position='apart'>
				<Box sx={{ cursor: 'pointer' }} onClick={() => void router.push('/')}>
					<Image src='/img/logo.svg' alt='logo' width={90} height={32} />
				</Box>

				<Group spacing={50} mr={60}>
					{routes.map(({ name, navLink }) => (
						<Text
							sx={{ cursor: 'pointer' }}
							key={name}
							fz={20}
							color={router.pathname === navLink ? 'orange' : 'white'}
							onClick={() => void router.push(navLink)}
						>
							{name}
						</Text>
					))}
				</Group>
			</Group>
		</Box>
	);
};

const routes = [
	{ name: 'Home', navLink: '/' },
	{ name: 'Contact us', navLink: '/contact-us' },
];
