'use strict';
//Работа с галерей изображений

(function(){
    let commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');
    let socialComments = document.querySelector('.social__comments');
    let pictures = document.querySelector('.pictures');
    let imgFilters = document.querySelector('.img-filters');

    window.gallery = {
        picturesData: [],
    }

    function succesHandler(data) {
        window.gallery.picturesData = data;
        window.gallery.fillWithPictures(window.gallery.picturesData);  
    }
    

    function addCommentRandom(obj) {
        let fragment = document.createDocumentFragment();
        for (let i = 0; i < obj.comments.length; i++) {
            
            const commentElement = commentTemplate.cloneNode(true);
            commentElement.querySelector('.social__picture').src = `img/avatar-${window.utils.getRandomWholeNumber(1, 6)}.svg`;
            commentElement.querySelector('.social__text').textContent = obj.comments[i];
        
            fragment.appendChild(commentElement);
        }
        return fragment;
    }

    function addComment(obj) {
        let fragment = document.createDocumentFragment();
        for (let i = 0; i < obj.comments.length; i++) {

            console.log(obj);
            
            const commentElement = commentTemplate.cloneNode(true);
            commentElement.querySelector('.social__picture').src = obj.comments[i].avatar;
            commentElement.querySelector('.social__text').textContent = obj.comments[i].message;
        
            fragment.appendChild(commentElement);
        }
        return fragment;
    }

    window.gallery.fillWithPictures = function(obj) {
        clearPictures();
        for (let i = 0; i < obj.length; i++) {
            let picture = window.picture.renderPicture(obj[i]);
    
            picture.addEventListener('click', () => {
                window.preview.fillBigPicture(obj[i]);
                window.preview.openBigPicture();
                while (socialComments.firstChild) {
                    socialComments.removeChild(socialComments.firstChild);
                }
            
                socialComments.append( addComment(obj[i]));
            });
    
            pictures.append(picture);
        }
        imgFilters.classList.remove('img-filters--inactive');//Показываем блок фильтров
    }

    function clearPictures(){
        let picturesArray = pictures.querySelectorAll('.picture');
        for(let picture of picturesArray){
            picture.remove();
        }
    }
    

    window.backend.load(succesHandler, window.backend.onError);

})();



