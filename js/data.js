'use strict';
// вспомогательые файлы и тексты
(function () { 
    window.data = {
        commentsArray: [
            'Всё отлично!',
            'В целом всё неплохо. Но не всё.',
            'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
            'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
            'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
            'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
        ],
        descriptionArray: [
            'Тестим новую камеру!',
            'Затусили с друзьями на море',
            'Как же круто тут кормят',
            'Отдыхаем...',
            'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
            'Вот это тачка!   '
        ],
    }

    let objArray = [];

    function getObject() {
        let obj = {
            url: `photos/${window.utils.getRandomWholeNumber(1, 25)}.jpg`,
            likes: window.utils.getRandomWholeNumber(15, 200),
            comments: window.utils.getArrayOfComents(),
            description: window.utils.getRandomStringFromArray(window.data.descriptionArray, 1),
        }

        return obj;
    }

    for (let i = 1; i <= 25; i++) {
        objArray.push(getObject());
    }

    window.data.pictureObject = objArray;

})();