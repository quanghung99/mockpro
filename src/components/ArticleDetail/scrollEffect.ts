function scrollEffect() {
	document.addEventListener('scroll', () => {
		const sideLeft: any = document.getElementsByClassName('sideLeft')[0];
		const sideRight: any = document.getElementsByClassName('sideRight')[0];
		if (sideLeft && sideRight) {
			const parentSideLeft: any = sideLeft.parentNode as any;
			const parentSideRight: any = sideRight.parentNode as any;
			const parentLeftHeight: number = (
				parentSideLeft.getBoundingClientRect() as any
			).height;
			const parentRightHeight: number = (
				parentSideRight.getBoundingClientRect() as any
			).height;
			const sideLeftHeight = sideLeft.getBoundingClientRect().height;
			const sideRightHeight = sideRight.getBoundingClientRect().height;

			if (
				(window.scrollY as number) + (sideLeftHeight as any) >
				parentLeftHeight
			) {
				sideLeft.style.position = 'absolute';
				sideLeft.style.bottom = '0px';
				sideLeft.style.top = 'unset';
			} else {
				sideLeft.style.position = 'fixed';
				sideLeft.style.bottom = 'unset';
				sideLeft.style.top = 'unset';

				// sideLeft.style.bottom = 'unset';
				// sideLeft.style.top = window.scrollY + 'px';
			}
			if (
				(window.scrollY as number) + (sideRightHeight as any) >
				parentRightHeight
			) {
				sideRight.style.bottom = '0px';
				sideRight.style.top = 'unset';
			} else {
				sideRight.style.bottom = 'unset';

				sideRight.style.top = window.scrollY + 'px';
			}
		}
	});
}
export default scrollEffect;
