'use strict';

// Add imports above this line
import { galleryItems } from './gallery-items';
import { createGalery } from './gallery-create';
import _default from '../../node_modules/simplelightbox/dist/simple-lightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

const qs = selector => document.querySelector(selector);
const gallery = qs('.gallery');

const query = ({ preview, original, description }) => {
  return `<a class="gallery__item" href="${original}">
            <img class="gallery__image"
             src="${preview}" 
             alt="${description}"
            />
          </a>`;
};

function defaultGalery() {
  gallery.innerHTML = createGalery(galleryItems, query); 
  new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

defaultGalery();
