import { Box, Button, Container, Typography } from '@mui/material';
import { RootState } from 'app/store';
import { commentActions } from 'features/comment/commentSlice';
import { commentModel, profileModel } from 'models';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddComments from './AddComments';
import CommentsList from './CommentsList';
type Props = { slug: string; profile: profileModel['profile'] };

export default function Comments({ slug, profile }: Props) {
	const dispatch = useDispatch();
	const comments: commentModel[] = useSelector(
		(state: RootState) => state.comment.commentList
	);
	let lastId: number | string | undefined;
	if (comments.length > 0) {
		lastId = comments[0].id;
	} else {
		lastId = undefined;
	}
	console.log('profile in comment', profile);
	useEffect(() => {
		dispatch(commentActions.getListComment(slug));
	}, []);
	return (
		<div>
			<Container
				className="comments"
				sx={{
					borderTop: '1px solid #e0e0e0',
					padding: '32px 0 64px',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						padding: '8px 0',
					}}
				>
					<Typography
						variant="h5"
						sx={{
							fontFamily: 'Segoe UI Bold',
							fontWeight: '400',
						}}
					>
						Comments ({comments.length})
					</Typography>
					<Button
						key="abc"
						variant="outlined"
						color="primary"
						sx={{
							fontFamily: 'Segoe UI Bold',
							fontWeight: '300',
						}}
					>
						Subscribe
					</Button>
				</Box>
				<AddComments
					slug={slug}
					profile={profile}
					lastId={lastId}
				></AddComments>
				<CommentsList slug={slug} comments={comments}></CommentsList>
			</Container>
		</div>
	);
}
