import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { tagModel } from 'models';
import * as React from 'react';
import styles from './styles.module.scss';

interface Props {
	tags?: tagModel;
}

export default function ArticleFilter({ tags }: Props) {
	return (
		<div className={styles.tagSession}>
			<Typography>Filter by tag</Typography>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
				}}
			>
				{tags?.tags.map((tag, index) => (
					<div className={styles.tagSession_box} key={index}>
						{tag}
					</div>
				))}
			</Box>
		</div>
	);
}
