import { Button, Container, Paper, Typography } from '@mui/material';
import InputField from 'components/common/CustomField/InputField';
import TextAreaField from 'components/common/CustomField/TextAreaField';
import { articleParamCreate } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function EditArticlePage() {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			title: '',
			description: '',
			body: '',
			tagList: '',
		},
	});
	const onsubmit = (value: any) => {
		console.log(value);
	};
	return (
		<Container maxWidth="md">
			<Typography variant="h1" component="h2">
				Edit your article
			</Typography>

			<form onSubmit={handleSubmit(onsubmit)}>
				<div>
					<InputField
						control={control}
						name="title"
						type={'text'}
						label=""
						placeholder="Article Title"
					></InputField>
					<InputField
						control={control}
						name="description"
						type={'text'}
						label=""
						placeholder="What is this article about?"
					></InputField>
					<TextAreaField
						control={control}
						name="body"
						type={'text'}
						label=""
						placeholder="Write your article "
					></TextAreaField>
					<InputField
						control={control}
						name="tagList"
						type={'text'}
						label=""
						placeholder="Enter tags"
					></InputField>
				</div>
				<Button type="submit" fullWidth variant="contained" color="primary">
					Submit
				</Button>
			</form>
		</Container>
	);
}
