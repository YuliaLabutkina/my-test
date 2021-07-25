import * as basicLightbox from 'basiclightbox';

import './sass/main.scss';

import './js/createBox';
import './js/string-builder';

import galleryCard from './template/galleryCard.hbs';
import error from './js/plugin-pnotify';
import ApiService from './js/apiService';
import { refsGallery } from './js/refs';

const newsApiService = new ApiService();

const appendGalleryMarkup = (images) => {
    const markupGallery = images.reduce((acc, el) => acc + `<li class="gallery__item">${galleryCard(el)}</li>`, '');
    refsGallery.galleryRef.insertAdjacentHTML('beforeend', markupGallery);
};

const resetMarkup = () => {
    refsGallery.galleryRef.innerHTML = '';
};

const makeRequest = async () => {
    try {
        const { hits, totalHits } = await newsApiService.fetchImg();

        if(hits.length) {
            appendGalleryMarkup(hits);
            newsApiService.page ===1 && newsApiService.calculatePages(totalHits);
            return;
        };

        if(totalHits === 0) new error('Error! No results were found for your request! Try again!');
    } catch(err) {
        new error(`Error! ${err}`);
    };
};

const imageSearch = ({target}) => {
    resetMarkup();
    newsApiService.query = target.value.trim();
    refsGallery.buttonSearchRef.removeAttribute('disabled');
};

const startImageSearch = (event) => {
    event.preventDefault();
    newsApiService.resetPage();
    makeRequest();
    refsGallery.buttonSearchRef.setAttribute('disabled', '')
};

const showLargeImage = (event) => {
    event.preventDefault();
    const largeURL = event.target.getAttribute('data-action');
    basicLightbox.create(`<img width="1400" height="900" src="${largeURL}">`).show();
};

refsGallery.searchQueryRef.addEventListener('input', imageSearch);
refsGallery.buttonSearchRef.addEventListener('click', startImageSearch);
refsGallery.galleryRef.addEventListener('click', showLargeImage);

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && newsApiService.query !== '') {
            if(newsApiService.currentPage < newsApiService.pages) {
                newsApiService.incrementPage();
                makeRequest();
            }
        }
    });
};

const observer = new IntersectionObserver(onEntry, {
    rootMargin: '150px',
});

observer.observe(refsGallery.sentinel);