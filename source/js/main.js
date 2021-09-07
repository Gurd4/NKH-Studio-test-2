const active = 'active';

const iconSearch = document.querySelector('.info__item--search');
const blockSearch = document.querySelector('.search-block');
const headerFirstToggle = document.querySelector('.header-first__toggle');
const headerMain = document.querySelector('.header__main');
const headerThridToggle = document.querySelector('.header-third__toggle');
const headerThrid = document.querySelector('.header__third');
const production = document.querySelector('.production');
const catalog = document.querySelector('.catalog');
const portfolio = document.querySelector('.portfolio');
const descContent = document.querySelector('.desc-content');

iconSearch.addEventListener('click', function (event) {

	if (blockSearch.classList.contains(active)) {
			blockSearch.classList.remove('active');
	} else {
			blockSearch.classList.add('active');
	}
});

headerFirstToggle.addEventListener('click', function (event) {

	if (headerMain.classList.contains(active)) {
			headerMain.classList.remove('active');
			headerMain.style.display='none';
			catalog.classList.remove('active');
			catalog.style.display='none';
			portfolio.style.display='none';
			descContent.style.display='none';
			headerThrid.classList.add('active');
			production.classList.add('active');
	}
});

headerThridToggle.addEventListener('click', function (event) {

	if (headerThrid.classList.contains(active)) {
			headerThrid.classList.remove('active');
			production.classList.remove('active');
			headerMain.classList.add('active');
			catalog.classList.add('active');
			headerMain.classList.add('active');
			catalog.classList.add('active');
			portfolio.classList.add('active');
			descContent.classList.add('active');
	}
});
