import ClearIcon from '@mui/icons-material/Clear';
import {
	Box,
	Button,
	Container,
	Paper,
	TextareaAutosize,
	TextField,
	Typography,
} from '@mui/material';
import { RootState } from 'app/store';
import { articleAction } from 'features/articles/articleSlice';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProps } from 'react-router-dom';
import { articleModel, articleParamCreate } from '../../models/article';
import styles from './styles.module.scss';
enum Guide {
	None,
	Title,
	Tag,
	Content,
}
interface Inputs {
	title: string;
	tags?: string;
	content?: string;
	otherTags: string;
}
interface Tag {
	id: number;
	content: string;
}
let startEdit = true;
export default function EditArticlePage(props: RouterProps) {
	const slug = (props as any).match.params.slug;
	const [guide, setGuide] = useState<Guide>(Guide.None);
	const [tagsCache, setTagsCache] = useState<Array<Tag>>([]);
	const [donePrepare, setDonePrepare] = useState<boolean>(false);
	const articles = useSelector((state: RootState) => state.article.articles);
	let dispatch = useDispatch();
	useEffect(() => {
		dispatch(articleAction.getListArticle({}));
	}, [dispatch]);
	let article: articleModel | null | undefined =
		articles.length > 0
			? articles.find((a) => {
					return a.slug === slug;
			  })
			: null;
	const { register, handleSubmit, reset } = useForm<Inputs>({
		defaultValues: {
			title: '',
			tags: '',
			otherTags: '',
			content: '',
		},
	});
	if (
		article !== null &&
		article !== undefined &&
		tagsCache.length === 0 &&
		donePrepare === false &&
		startEdit === true
	) {
		setDonePrepare(true);
		setTagsCache(
			article.tagList.map((t, i) => {
				return {
					id: i,
					content: t,
				};
			})
		);
		reset({
			title: article.title,
			tags: '',
			otherTags: '',
			content: article.body,
		});
	}

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		let formData: articleParamCreate = {
			article: {
				title: data.title,
				description: ' ',
				body: data.content,
				tagList: tagsCache.map((tag) => tag.content),
			},
		};
		if (slug === undefined) {
			reset({
				title: '',
				tags: '',
				otherTags: '',
				content: '',
			});
			setTagsCache([]);
		}
		if (slug === undefined) {
			dispatch(articleAction.addArticle(formData));
		} else {
			dispatch(
				articleAction.updateArticle({
					formData: {
						article: {
							title: data.title,
							body: data.content,
							tagList: tagsCache.map((m) => m.content),
						},
					},
					slug: slug,
				})
			);
		}
	};
	const handleTag = (e: any) => {
		if (e.key === ' ' || e.code === 'Enter') {
			e.preventDefault();
			let value = (e.target as any).value;
			setTagsCache([
				...tagsCache,
				{
					id:
						tagsCache[tagsCache.length - 1] !== undefined
							? tagsCache[tagsCache.length - 1].id + 1
							: 0,
					content: value,
				},
			]);
			reset({
				tags: '',
				otherTags: '',
			});
		} else if (e.key === 'Backspace') {
			let value = (e.target as any).value;

			if (value === '') {
				setTagsCache(tagsCache.splice(0, tagsCache.length - 1));
				reset({
					tags: '',
					otherTags: '',
				});
			}
		}
	};
	const deleteTag = (id: number) => {
		setTagsCache([
			...tagsCache.filter((tag) => {
				return tag.id !== id;
			}),
		]);
	};

	return (
		<Box
			className={styles.EditArticlePage}
			sx={{
				backgroundColor: '#f5f5f5',
				padding: '8px',
			}}
		>
			<Container>
				<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
					{/* Guide */}
					<Box
						gridColumn="span 4"
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{guide === Guide.Title ? (
							<div
								className={styles.guide}
								style={{ transform: 'translateY(-100px)' }}
							>
								<Typography component={'h3'}>
									Writing a Great Post Title
								</Typography>

								<ul>
									<li>
										Think of your post title as a super short (but compelling!)
										description ??? like an overview of the actual post in one
										short sentence.
									</li>
									<li>
										Use keywords where appropriate to help ensure people can
										find your post by search
									</li>
								</ul>
							</div>
						) : null}
						{guide === Guide.Tag ? (
							<div className={styles.guide}>
								<Typography component={'h3'}>Tagging Guidelines</Typography>
								<ul>
									<li>Tags help people find your post.</li>
									<li>
										Add up to four comma-separated tags per post. Combine tags
										to reach the appropriate subcommunities.
									</li>
									<li>Use existing tags whenever possible.</li>
									<li>
										Some tags, such as ???help??? or ???healthydebate???, have special
										posting guidelines.
									</li>
									<li>
										Think of tags as the topics or categories that best describe
										your post.
									</li>
								</ul>
							</div>
						) : null}
						{guide === Guide.Content ? (
							<div className={styles.guide}>
								<Typography
									component={'h3'}
									sx={{
										width: '100%',
									}}
								>
									Content Guidelines
								</Typography>
								<ul
									style={{
										width: '100%',
									}}
								>
									<li>Use can use markdown to write</li>
									<li>Just write what ever you want</li>
								</ul>
							</div>
						) : null}
					</Box>
					{/* Form */}
					<Box gridColumn="span 8">
						<form onSubmit={handleSubmit(onSubmit)}>
							{/* Paper_start */}
							<Paper
								elevation={6}
								sx={{
									border: '1px solid #e1e1e1',
									backgroundColor: '#fff',
									borderRadius: '8px',
									marginTop: '2px',
								}}
							>
								<Box
									sx={{
										textAlign: 'left',
										padding: '32px 64px 16px',
										paddingLeft: '64px',
									}}
								>
									<Box>
										<Button variant="outlined">Add a cover image</Button>
									</Box>
									{/* Paper_Title */}
									<TextField
										{...register('title', { required: true })}
										className={styles.articleTitle}
										type="text"
										fullWidth
										placeholder="Write the title here..."
										variant="standard"
										onFocus={() => setGuide(Guide.Title)}
										onBlur={() => setGuide(Guide.None)}
									></TextField>
									{/* Paper_Tags */}

									{tagsCache.length === 0 ? (
										<TextField
											{...register('tags')}
											type="text"
											fullWidth
											placeholder="Add up to 4 tags..."
											variant="standard"
											sx={{
												paddingTop: '16px',
												fontSize: '16px',
											}}
											onFocus={() => setGuide(Guide.Tag)}
											onBlur={() => setGuide(Guide.None)}
											onKeyDown={(e) => handleTag(e)}
										></TextField>
									) : (
										<Box
											sx={{
												display: 'flex',
											}}
										>
											{tagsCache.map((tag) => {
												return (
													<span key={tag.id} className={styles.tag}>
														<span># </span>
														<span>{tag.content} </span>
														<span onClick={() => deleteTag(tag.id)}>
															<ClearIcon></ClearIcon>
														</span>
													</span>
												);
											})}
											{/* Input tag */}
											{tagsCache.length < 4 ? (
												<TextField
													{...register('otherTags')}
													type="text"
													fullWidth
													placeholder="Add other tags..."
													variant="standard"
													sx={{
														paddingTop: '16px',
														fontSize: '16px',
													}}
													autoFocus={true}
													onFocus={() => setGuide(Guide.Tag)}
													onBlur={() => setGuide(Guide.None)}
													onKeyDown={(e) => handleTag(e)}
												></TextField>
											) : null}
										</Box>
									)}
								</Box>
								<Box sx={{ backgroundColor: '#f9f9f9', height: '24px' }}></Box>
								{/* Paper_Content */}
								<Box
									sx={{
										textAlign: 'left',
										padding: '16px 64px',
									}}
								>
									<TextareaAutosize
										{...register('content')}
										placeholder="Write your article content here..."
										minRows="10"
										maxRows="12"
										className={styles.articleContent}
										style={{
											fontSize: '18px',
										}}
										onFocus={() => setGuide(Guide.Content)}
										onBlur={() => setGuide(Guide.None)}
									/>
								</Box>
							</Paper>
							{/* Paper_end */}
							{/* Button start */}
							<Box
								sx={{
									textAlign: 'left',
									padding: '16px',
								}}
							>
								{slug === undefined ? (
									<Button
										type="submit"
										size="large"
										variant="contained"
										sx={{
											backgroundColor: 'royalblue',
										}}
									>
										Publish
									</Button>
								) : (
									<Button
										type="submit"
										size="large"
										variant="contained"
										sx={{
											backgroundColor: 'royalblue',
										}}
									>
										Update
									</Button>
								)}
							</Box>
							{/* Button end */}
						</form>
					</Box>
				</Box>
			</Container>
		</Box>
	);
}
