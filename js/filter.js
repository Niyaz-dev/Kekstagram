'use strict';
// Управление порядком отрисовки изображений на странице
(function () {
    let popularButton = document.querySelector('#filter-popular')
    let randomButton = document.querySelector('#filter-random')
    let discussedButton = document.querySelector('#filter-discussed')

    function unselectButton() {
        popularButton.classList.remove('img-filters__button--active');
        randomButton.classList.remove('img-filters__button--active');
        discussedButton.classList.remove('img-filters__button--active');
    }

    let fillWithPicturesDebounce = window.debounce(window.gallery.fillWithPictures);

    popularButton.addEventListener('click', function () {
        unselectButton();
        popularButton.classList.add('img-filters__button--active');
        fillWithPicturesDebounce(window.gallery.picturesData);
    });
    randomButton.addEventListener('click', function () {
        unselectButton();
        randomButton.classList.add('img-filters__button--active');
        fillWithPicturesDebounce(getRandomArrayOfPictures());
    });
    discussedButton.addEventListener('click', function () {
        unselectButton();
        discussedButton.classList.add('img-filters__button--active');
        fillWithPicturesDebounce(getDiscussedArray());
    });

    function getDiscussedArray() {
        let galleryCopy = window.gallery.picturesData.slice();
        galleryCopy.sort((left, right) => {
            return right.comments.length - left.comments.length;
        });
        return galleryCopy;
    }

    

    function getRandomArrayOfPictures() {
        let galleryCopy = [];
        let randomPhoto;

        while(galleryCopy.length !== 10) {
            randomPhoto =  window.gallery.picturesData [window.utils.getRandomWholeNumber(0, window.gallery.picturesData.length - 1)];
            if(galleryCopy.indexOf(randomPhoto) === -1 ) {
                galleryCopy.push(randomPhoto);
            }
        }

        return galleryCopy;
    }
})();