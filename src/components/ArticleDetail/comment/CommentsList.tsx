import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
	Avatar,
	Box,
	Button,
	Grid,
	List,
	ListItemButton,
	Paper,
	Typography,
} from '@mui/material';
import { RootState } from 'app/store';
import { commentActions } from 'features/comment/commentSlice';
import { commentModel } from 'models';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bubbleChat from '../icons/bubble-chat.png';
import hearIcon from '../icons/heart.png';
import styles from './styles.module.scss';

type Props = {
	slug: string;
	comments: commentModel[];
};
interface showOption {
	id: string;
	show: boolean;
}
export default function CommentsList({ slug, comments }: Props) {
	const [showOptionsArr, setShowOptionArr] = useState<showOption[]>([]);
	const dispatch = useDispatch();
	useEffect(() => {
		if (comments.length > 0) {
			setShowOptionArr(
				comments.map((c) => {
					return {
						id: c.id as string,
						show: false,
					};
				})
			);
		}
	}, [comments.length]);

	const currentUser = useSelector(
		(state: RootState) => state.auth.userState.user.username
	);
	const showOptions = (id: string) => {
		let newShowOptionArr: showOption[] | undefined = showOptionsArr.filter(
			(item: any) => {
				return item.id !== id;
			}
		);
		let commentChoosed: showOption | undefined = showOptionsArr.find(
			(item: any) => {
				return item.id === id;
			}
		);
		setShowOptionArr([
			...(newShowOptionArr as showOption[]),
			{
				id: id,
				show: !(commentChoosed as showOption).show,
			},
		]);
	};
	const deleteComment = (id: string) => {
		dispatch(commentActions.removeComment({ slug, id }));
	};
	if (comments.length > 0 && comments.length == showOptionsArr.length) {
		return (
			<div className="CommentsList">
				{comments.map((comment: commentModel) => {
					let dateCreated = new Date((comment as any).createdAt).toDateString();
					return (
						<div key={comment.id}>
							<Box className={styles.Comment}>
								<Grid container spacing={2}>
									{/* show avata start */}
									<Grid item xs={1}>
										<Avatar
											sx={{
												marginTop: '16px',
											}}
											alt="Remy Sharp"
											src={(comment.author as any).image}
										/>
									</Grid>
									{/* show avata end */}

									<Grid
										item
										xs={11}
										sx={{
											textAlign: 'left',
										}}
									>
										<Box
											sx={{
												border: '1px solid #f0f0f0',
												borderRadius: '8px',
												padding: '8px',
											}}
										>
											{/* header start */}
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'space-between',
													alignItems: 'center',
												}}
											>
												<Box
													sx={{
														display: 'inline-flex',
														justifyContent: 'space-between',
														alignItems: 'center',
													}}
												>
													<Button
														sx={{
															fontFamily: 'Segoe UI Bold',
															fontSize: '16px',
															fontWeight: '500',
															color: '#333',
														}}
													>
														{(comment.author as any).username}
													</Button>
													<Box
														sx={{
															display: 'inline-block',
															height: '4px',
															width: '4px',
															borderRadius: '50%',
															backgroundColor: '#bdbdbe',
														}}
													></Box>
													<Typography
														sx={{
															marginLeft: '8px',
															fontSize: '14px',
															fontWeight: '400',
															fontFamily: 'Segoe UI Regular',
														}}
													>
														{dateCreated}
													</Typography>
												</Box>
												{/* options start*/}
												<Box
													sx={{
														position: 'relative',
													}}
												>
													<Button
														className={styles.Options}
														onClick={() => showOptions(comment.id as string)}
													>
														<MoreHorizIcon
															sx={{
																color: '#333',
															}}
														></MoreHorizIcon>

														<Paper
															className={styles.OptionsList}
															sx={{
																width: '200px',
															}}
														>
															<List component="nav">
																{currentUser === comment.author.username ? (
																	<ListItemButton
																		color="error"
																		sx={{
																			color: '#404040',
																		}}
																		onClick={() =>
																			deleteComment(comment.id as string)
																		}
																	>
																		Delete
																	</ListItemButton>
																) : null}
																<ListItemButton
																	sx={{
																		color: '#404040',
																	}}
																>
																	Copy Link
																</ListItemButton>
																<ListItemButton
																	sx={{
																		color: '#404040',
																	}}
																>
																	Report abuse
																</ListItemButton>
															</List>
														</Paper>
													</Button>
												</Box>
												{/* options end */}
												{/* header end */}
											</Box>
											<Typography
												variant="body2"
												sx={{
													textAlign: 'justify',
													padding: '8px',
												}}
											>
												{comment.body}
											</Typography>
										</Box>
										{/* Like and reply */}
										<Box
											sx={{
												display: 'inline-flex',
												gap: '8px',
												marginTop: '6px',
												textAlign: 'left',
												paddingBottom: '16px',
											}}
										>
											<Button className={styles.like}>
												<img
													style={{
														height: '16px',
														width: '16px',
														marginRight: '8px',
													}}
													src={hearIcon}
													alt="heart_like"
												></img>
												<Box>
													<span>0 </span>Like
												</Box>
											</Button>
											<Button className={styles.reply}>
												<img
													style={{
														height: '16px',
														width: '16px',
														opacity: '0.8',
														marginRight: '8px',
													}}
													src={bubbleChat}
													alt="bubbleChat"
												></img>
												<Box> Reply</Box>
											</Button>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</div>
					);
				})}
			</div>
		);
	} else {
		return <Box>There are still no comments</Box>;
	}
}
