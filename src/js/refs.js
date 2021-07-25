const refsBox = {
    input: document.querySelector('input[type="number"]'),
    create: document.querySelector('button[data-action="create"]'),
    destroy: document.querySelector('button[data-action="destroy"]'),
    boxes: document.querySelector('div#boxes')
};

const refsGallery = {
    searchQueryRef: document.querySelector('.search-form input'),
    buttonSearchRef: document.querySelector('.search-form__button'),
    galleryRef: document.querySelector('.gallery'),
    sentinel: document.querySelector('#sentinel')
};

export {refsBox, refsGallery };