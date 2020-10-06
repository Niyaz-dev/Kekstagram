'use strict';
// валидация хештегов и комментариев
(function () {
    let textHashtags = document.querySelector('.text__hashtags');

    textHashtags.addEventListener('input', () => {
        setCorrectTags(textHashtags.value, textHashtags);
    })

    let hashtagErrorText = '';

    function isThereErrorText(hashtagErrorText, errorText) {
        if (hashtagErrorText.indexOf(errorText) == -1) {
            return false;
        }
        return true;
    }

    function setCorrectTags(tags, input) {
        hashtagErrorText = '';
        let tagsArray = tags.trim().toLowerCase().split(' ');

        tagsArray.forEach(item => {
            if (item[0] !== '#') {
                if (!isThereErrorText(hashtagErrorText, 'Хэш-тег должен начинаться с символа решетки')) {
                    hashtagErrorText += 'Хэш-тег должен начинаться с символа решетки ';
                }
            }
            if (item[0] === '#' && item.length === 1) {
                if (!isThereErrorText(hashtagErrorText, 'Хеш-тег не может состоять только из одной решётки')) {
                    hashtagErrorText += 'Хеш-тег не может состоять только из одной решётки ';
                } 
            }
            if (item.indexOf('#') !== item.lastIndexOf('#')) {
                if (!isThereErrorText(hashtagErrorText, 'Хэш-теги разделяются пробелами')) {
                    hashtagErrorText += 'Хэш-теги разделяются пробелами ';
                } 
            }
            if (item.length > 20) {
                if (!isThereErrorText(hashtagErrorText, 'Максимальная длина одного хэш-тега 20 символов, включая решётку')) {
                    hashtagErrorText += 'Максимальная длина одного хэш-тега 20 символов, включая решётку ';
                } 
            }
        });

        for (let i = 0; i < tagsArray.length; i++) {
            if (tagsArray.indexOf(tagsArray[i]) !== tagsArray.lastIndexOf(tagsArray[i])) {
                hashtagErrorText += 'Один и тот же хэш-тег не может быть использован дважды ';
                break;
            }
        }

        if (tagsArray.length > 5) {
            hashtagErrorText += 'Нельзя указать больше пяти хэш-тегов ';
        }



        if (tags == '') hashtagErrorText = '';

        if(hashtagErrorText) {
            input.style.border = '2px solid red';
        }
        else {
            input.style.border = '';
        }
        input.setCustomValidity(hashtagErrorText);
    }

})();


