'use strict';
//Модуль для отрисовки миниатюры

(function () {
    let pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    

    window.picture.renderPicture = function (picture) {
        const pictureElement = pictureTemplate.cloneNode(true);

        pictureElement.querySelector('img').src = picture.url;
        pictureElement.querySelector('.picture__likes').textContent = picture.likes;
        pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
        

        return pictureElement;
    }
    
})();