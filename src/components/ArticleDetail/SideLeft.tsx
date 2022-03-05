import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import scrollEffect from './scrollEffect';

interface Props {
	favorited: boolean;
	favoritesCount: number;
	handleFavorite: () => void;
	handleUnfavorite: () => void;
}
interface typeFavorite {
	isFavorited: Boolean;
	favoriteCount: number;
}
export default function SideLeft({
	favorited,
	favoritesCount,
	handleFavorite,
	handleUnfavorite,
}: Props) {
	useEffect(() => {
		// two sides animation
		scrollEffect();
	});
	const [favoriteCounting, setFavoriteCounting] = useState<typeFavorite>({
		isFavorited: favorited,
		favoriteCount: favoritesCount,
	});
	const handleClickFavorite = () => {
		handleFavorite();
		setFavoriteCounting({
			isFavorited: !favoriteCounting.isFavorited,
			favoriteCount: favoriteCounting.favoriteCount + 1,
		});
	};
	const handleClickUnFavorite = () => {
		handleFavorite();
		setFavoriteCounting({
			isFavorited: !favoriteCounting.isFavorited,
			favoriteCount: favoriteCounting.favoriteCount - 1,
		});
	};
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
				onClick={() => {
					favoriteCounting.isFavorited
						? handleClickUnFavorite()
						: handleClickFavorite();
				}}
			>
				<Button
					variant={favoriteCounting.isFavorited ? 'contained' : 'outlined'}
					color="primary"
					sx={{
						boxSizing: 'border-box',
						borderRadius: '16px',
						border: 'none',
						fontSize: '18px',
					}}
				>
					❤
				</Button>
				<span>{favoriteCounting.favoriteCount}</span>
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
