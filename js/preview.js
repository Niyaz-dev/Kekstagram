'use strict';
//модуль для отрисовки увеличенного изображения
(function(){
    let BigPicture = document.querySelector('.big-picture');
    let bigPictureCancel = document.querySelector('.big-picture__cancel');

    window.preview = {
        fillBigPicture: function(obj) {
            BigPicture.querySelector('.big-picture__img>img').src = obj.url;
            BigPicture.querySelector('.likes-count').textContent = obj.likes;
            BigPicture.querySelector('.comments-count').textContent = obj.comments.length;
            BigPicture.querySelector('.social__caption').textContent = obj.description;
            BigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
            BigPicture.querySelector('.social__comments-loader').classList.add('visually-hidden');
            // if (window.utils.window.data.pictureObject[0].comments.length == 1) {
            //     BigPicture.querySelector('.comments-text').textContent ='комментарий' ;
            // } 
            // else if (window.utils.window.data.pictureObject[0].comments.length == 2 || window.utils.window.data.pictureObject[0].comments.length == 3 || window.utils.window.data.pictureObject[0].comments.length == 4) {
            //     BigPicture.querySelector('.comments-text').textContent ='комментария' ;
            // } 
        },
        openBigPicture: function() {
            BigPicture.classList.remove('hidden');
        },
        
    }

    function closeBigPicture() {
        BigPicture.classList.add('hidden');
    }

    bigPictureCancel.addEventListener('click', () => {
        closeBigPicture();
    })
})();