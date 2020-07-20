let pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
let commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');
let pictures = document.querySelector('.pictures');
let BigPicture = document.querySelector('.big-picture');
let socialComments = document.querySelector('.social__comments');

let objArray = [];
let commentsArray = [
'Всё отлично!',
'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
let descriptionArray = [
'Тестим новую камеру!',
'Затусили с друзьями на море',
'Как же круто тут кормят',
'Отдыхаем...',
'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
'Вот это тачка!   '
];

function getRandomWholeNumber(from, till){
    return Math.round(from - 0.5  + Math.random()*(till - from + 1)) ;
}

function getRandomStringFromArray(Array, numberOfComments){ // возвращает numberOfComments строк из Массива;
    let strng = '';

    for (let i = 1; i <= numberOfComments; i++) {
        strng += Array[getRandomWholeNumber(0, Array.length-1)];
        if (i != numberOfComments) {
            strng += ' ';
        }
    }

    return strng;
}

function getArrayOfComents(){
    let arrayOfComents = [];
    let amountOfComments = getRandomWholeNumber(1, 7);

    for (let i = 1; i <= amountOfComments; i++) {
        arrayOfComents.push(getRandomStringFromArray(commentsArray, getRandomWholeNumber(1, 2)));
    }

    return arrayOfComents;
}

function getObject(){
    let obj = {
        url: `photos/${getRandomWholeNumber(1, 25)}.jpg`,
        likes: getRandomWholeNumber(15, 200),
        comments: getArrayOfComents(),
        description: getRandomStringFromArray(descriptionArray, 1),
    }
    
    return obj;
}

for(let i = 1; i <=25; i++) {
    objArray.push( getObject());
}

for (let i = 0; i < objArray.length; i++) {
    const pictureElement = pictureTemplate.cloneNode(true);
    
    pictureElement.querySelector('img').src = objArray[i].url;
    pictureElement.querySelector('.picture__likes').textContent = objArray[i].likes;
    pictureElement.querySelector('.picture__comments').textContent = objArray[i].comments.length;

    pictures.append(pictureElement);
}


BigPicture.classList.remove('hidden');

BigPicture.querySelector('.big-picture__img>img').src = objArray[0].url;
BigPicture.querySelector('.likes-count').textContent = objArray[0].likes;
BigPicture.querySelector('.comments-count').textContent = objArray[0].comments.length;
BigPicture.querySelector('.social__caption').textContent = objArray[0].description;
BigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
BigPicture.querySelector('.social__comments-loader').classList.add('visually-hidden');
// if (objArray[0].comments.length == 1) {
//     BigPicture.querySelector('.comments-text').textContent ='комментарий' ;
// } 
// else if (objArray[0].comments.length == 2 || objArray[0].comments.length == 3 || objArray[0].comments.length == 4) {
//     BigPicture.querySelector('.comments-text').textContent ='комментария' ;
// } 

for (let i = 0; i < objArray[0].comments.length; i++){
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = `img/avatar-${getRandomWholeNumber(1, 6)}.svg`;
    commentElement.querySelector('.social__text').textContent = objArray[0].comments[i];

    socialComments.append(commentElement);
}


