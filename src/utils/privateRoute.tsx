import { RootState, store } from 'app/store';
import React, { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export function PrivateRoute<T>(WrappedComponent: ComponentType<T>) {
	const EnhancedComponent = (props: T) => {
		const logged = useSelector((state: RootState) => state);
		console.log(logged, props, WrappedComponent);

		if (logged) {
			return <div>logged</div>;
		} else {
			return <div>not logged</div>;
		}
	};

	return EnhancedComponent;
}
