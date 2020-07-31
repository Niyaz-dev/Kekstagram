let pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
let commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');
let pictures = document.querySelector('.pictures');
let BigPicture = document.querySelector('.big-picture');
let socialComments = document.querySelector('.social__comments');
let bigPictureCancel = document.querySelector('.big-picture__cancel');





function openBigPicture() {
    BigPicture.classList.remove('hidden');
}

function closeBigPicture() {
    BigPicture.classList.add('hidden');
}


bigPictureCancel.addEventListener('click', () => {
    closeBigPicture();
})


let objArray = [];




function getRandomStringFromArray(Array, numberOfComments) { // возвращает numberOfComments строк из Массива;
    let strng = '';

    for (let i = 1; i <= numberOfComments; i++) {
        strng += Array[getRandomWholeNumber(0, Array.length - 1)];
        if (i != numberOfComments) {
            strng += ' ';
        }
    }

    return strng;
}

function getArrayOfComents() {
    let arrayOfComents = [];
    let amountOfComments = getRandomWholeNumber(1, 7);

    for (let i = 1; i <= amountOfComments; i++) {
        arrayOfComents.push(getRandomStringFromArray(window.data.commentsArray, getRandomWholeNumber(1, 2)));
    }

    return arrayOfComents;
}

function getObject() {
    let obj = {
        url: `photos/${getRandomWholeNumber(1, 25)}.jpg`,
        likes: getRandomWholeNumber(15, 200),
        comments: getArrayOfComents(),
        description: getRandomStringFromArray(window.data.descriptionArray, 1),
    }

    return obj;
}

for (let i = 1; i <= 25; i++) {
    objArray.push(getObject());
}

for (let i = 0; i < objArray.length; i++) {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = objArray[i].url;
    pictureElement.querySelector('.picture__likes').textContent = objArray[i].likes;
    pictureElement.querySelector('.picture__comments').textContent = objArray[i].comments.length;
    pictureElement.addEventListener('click', () => {
        fillBigPicture(objArray[i]);
        openBigPicture();
    });

    pictures.append(pictureElement);
}

function fillBigPicture(obj) {
    BigPicture.querySelector('.big-picture__img>img').src = obj.url;
    BigPicture.querySelector('.likes-count').textContent = obj.likes;
    BigPicture.querySelector('.comments-count').textContent = obj.comments.length;
    BigPicture.querySelector('.social__caption').textContent = obj.description;
    BigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    BigPicture.querySelector('.social__comments-loader').classList.add('visually-hidden');
    // if (objArray[0].comments.length == 1) {
    //     BigPicture.querySelector('.comments-text').textContent ='комментарий' ;
    // } 
    // else if (objArray[0].comments.length == 2 || objArray[0].comments.length == 3 || objArray[0].comments.length == 4) {
    //     BigPicture.querySelector('.comments-text').textContent ='комментария' ;
    // } 
}





for (let i = 0; i < objArray[0].comments.length; i++) {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = `img/avatar-${getRandomWholeNumber(1, 6)}.svg`;
    commentElement.querySelector('.social__text').textContent = objArray[0].comments[i];

    socialComments.append(commentElement);
}


