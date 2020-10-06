'use strict';
// вспомогательые утилиты
(function () {
    window.utils = {
        getRandomWholeNumber: function (from, till) {
            return Math.round(from - 0.5 + Math.random() * (till - from + 1));
        },
        getRandomStringFromArray: function (Array, numberOfComments) { // возвращает numberOfComments строк из Массива;
            let strng = '';

            for (let i = 1; i <= numberOfComments; i++) {
                strng += Array[this.getRandomWholeNumber(0, Array.length - 1)];
                if (i != numberOfComments) {
                    strng += ' ';
                }
            }

            return strng;
        },
        getArrayOfComents: function () {
            let arrayOfComents = [];
            let amountOfComments = window.utils.getRandomWholeNumber(1, 7);

            for (let i = 1; i <= amountOfComments; i++) {
                arrayOfComents.push(window.utils.getRandomStringFromArray(window.data.commentsArray, window.utils.getRandomWholeNumber(1, 2)));
            }

            return arrayOfComents;
        }
    }
}) ();