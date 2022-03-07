import { Avatar, Box, Button, Grid, TextareaAutosize } from '@mui/material';
import { commentActions } from 'features/comment/commentSlice';
import { addCommentBody, profileModel } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styles from '../styles.module.scss';
type Props = {
	profile: profileModel['profile'];
	lastId: number | string | undefined;
	slug: string;
};
interface formModel {
	comment: string;
}
export default function AddComments({ profile, lastId, slug }: Props) {
	const dispatch = useDispatch();
	const { register, reset, handleSubmit } = useForm<formModel>();
	const onSubmit = (data: formModel) => {
		reset({
			comment: '',
		});
		let commentData: addCommentBody = {
			comment: {
				body: data.comment,
			},
		};
		dispatch(commentActions.addComment({ commentData, slug }));
		dispatch(commentActions.getListComment(slug));
	};
	return (
		<Box className={styles.Comment}>
			<Grid container spacing={2}>
				<Grid item xs={1}>
					<Avatar
						sx={{
							marginTop: '16px',
						}}
						alt="Remy Sharp"
						src={profile.image}
					/>
				</Grid>
				<Grid item xs={11}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextareaAutosize
							{...register('comment')}
							minRows={6}
							placeholder="Add your comment..."
							style={{
								width: '100%',
								outline: 'primary',
								borderRadius: '8px',
								padding: '8px',
								boxSizing: 'border-box',
							}}
						></TextareaAutosize>
						<Box
							sx={{
								textAlign: 'left',
							}}
						>
							<Button type="submit" variant="contained" color="primary">
								Submit
							</Button>
						</Box>
					</form>
				</Grid>
			</Grid>
		</Box>
	);
}
