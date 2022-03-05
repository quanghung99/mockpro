import { Box, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import scrollEffect from './scrollEffect';
import React, { useEffect } from 'react';

type Props = {};

export default function SideLeft({}: Props) {
	useEffect(() => {
		// two sides animation
		scrollEffect();
	});
	return (
		<Box
			className="sideLeft"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '20px',
				padding: '32px 0px',
				position: 'fixed',
				transition: 'linear',
				scrollBehavior: 'smooth',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '8px',
				}}
			>
				<Button
					variant="outlined"
					sx={{
						boxSizing: 'border-box',
						borderRadius: '16px',
						border: 'none',
						color: '#3d3d3d',
					}}
				>
					<FavoriteBorderIcon></FavoriteBorderIcon>
				</Button>
				<span>7</span>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '8px',
				}}
			>
				<Button
					variant="outlined"
					sx={{
						boxSizing: 'border-box',
						borderRadius: '16px',
						border: 'none',
						color: '#3d3d3d',
					}}
				>
					<PermPhoneMsgIcon></PermPhoneMsgIcon>
				</Button>
				<span>3</span>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '8px',
				}}
			>
				<Button
					variant="outlined"
					sx={{
						boxSizing: 'border-box',
						borderRadius: '16px',
						border: 'none',
						color: '#3d3d3d',
					}}
				>
					<BookmarkBorderIcon></BookmarkBorderIcon>
				</Button>
				<span>1</span>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '8px',
				}}
			>
				<Button
					variant="outlined"
					sx={{
						boxSizing: 'border-box',
						borderRadius: '16px',
						border: 'none',
						color: '#3d3d3d',
					}}
				>
					<MoreHorizIcon></MoreHorizIcon>
				</Button>
			</Box>
		</Box>
	);
}
