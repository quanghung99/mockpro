import { Route, Switch, MemoryRouter } from 'react-router';
import App from 'App';
import { shallow, render, mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'utils/history';
import React from 'react';
import { store } from 'app/store';
import { Provider } from 'react-redux';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import ArticleDetail from 'components/ArticleDetail';
import EditArticlePage from 'components/EditArticle/index';
import LoginPage from 'components/LogIn';
import ProfilePage from 'components/Profile';
import Settings from 'components/Settings';
import SignUpPage from 'components/SignUp';
import Article from 'features/articles/Article';
import { WithAuth } from 'utils/authGuard';
describe('test router in App', () => {
	test("path='/editor' match component EditArticlePage", () => {
		const app = (
			<MemoryRouter initialEntries={['/editor']}>
				<Provider store={store}>
					<App></App>
				</Provider>
			</MemoryRouter>
		);
		const wrapper = mount(app);
		console.log('test', wrapper.find(Route).props().component, EditArticlePage);
		expect(wrapper.find(Route).props().component).toBe(EditArticlePage);
	});
	test("path='/editor' match component EditArticlePage", () => {
		const app = (
			<MemoryRouter initialEntries={['/editor']}>
				<Provider store={store}>
					<App></App>
				</Provider>
			</MemoryRouter>
		);
		const wrapper = mount(app);
		expect(wrapper.find(Route).props().component).toBe(EditArticlePage);
	});
	test("path='/blog' match component Article", () => {
		const app = (
			<MemoryRouter initialEntries={['/blog']}>
				<Provider store={store}>
					<App></App>
				</Provider>
			</MemoryRouter>
		);
		const wrapper = mount(app);
		expect(wrapper.find(Route).props().component).toBe(Article);
	});
	test("path='/settings' match component Settings", () => {
		const app = (
			<MemoryRouter initialEntries={['/setting']}>
				<Provider store={store}>
					<App></App>
				</Provider>
			</MemoryRouter>
		);
		const wrapper = mount(app);
		expect(wrapper.find(Route).props().component).toBe(Settings);
	});
	test("path='/profile' match component ProfilePage", () => {
		const app = (
			<MemoryRouter initialEntries={['/profile']}>
				<Provider store={store}>
					<App></App>
				</Provider>
			</MemoryRouter>
		);
		const wrapper = mount(app);
		expect(wrapper.find(Route).props().component).toBe(ProfilePage);
	});
	test("path='/article/:slug' match component ArticleDetail", () => {
		const app = (
			<MemoryRouter initialEntries={['/article/slug']}>
				<Provider store={store}>
					<App></App>
				</Provider>
			</MemoryRouter>
		);
		const wrapper = mount(app);
		expect(wrapper.find(Route).props().component).toBe(ArticleDetail);
	});
	test("path='/editor/:slug' match component EditArticlePage", () => {
		const app = (
			<MemoryRouter initialEntries={['/editor/slug']}>
				<Provider store={store}>
					<App></App>
				</Provider>
			</MemoryRouter>
		);
		const wrapper = mount(app);
		expect(wrapper.find(Route).props().component).toBe(EditArticlePage);
	});
	test("path='/login' match component WithAuth(LoginPage)", () => {
		const app = (
			<MemoryRouter initialEntries={['/login']}>
				<Provider store={store}>
					<App></App>
				</Provider>
			</MemoryRouter>
		);
		const wrapper = mount(app);
		const commponent = WithAuth(LoginPage);

		expect(wrapper.find(Route).props().component.toString()).toBe(
			commponent.toString()
		);
	});
	test("path='/register' match component SignUpPage", () => {
		const app = (
			<MemoryRouter initialEntries={['/register']}>
				<Provider store={store}>
					<App></App>
				</Provider>
			</MemoryRouter>
		);
		const wrapper = mount(app);
		expect(wrapper.find(Route).props().component).toBe(SignUpPage);
	});
	test("path='/register' match component SignUpPage", () => {
		const app = (
			<MemoryRouter initialEntries={['/']}>
				<Provider store={store}>
					<App></App>
				</Provider>
			</MemoryRouter>
		);
		const wrapper = mount(app);
		expect(wrapper.find(Route).props().component).toBe(Article);
	});
});
