// 'use strict';
// Работа с формой загрузки изображений и редактирование фотографий пользователя
(function () {

    let uploadImage = document.querySelector('#upload-file');
    let imgUploadOverlay = document.querySelector('.img-upload__overlay');
    let imgUploadCancel = document.querySelector('.img-upload__cancel');

    let scaleControlSmaller = document.querySelector('.scale__control--smaller');
    let scaleControlBigger = document.querySelector('.scale__control--bigger');
    let scaleControlValue = document.querySelector('.scale__control--value');
    let imgUploadPreview = document.querySelector('.img-upload__preview img');

    let slider = document.querySelector('.img-upload__effect-level');
    let effectLevelPin = document.querySelector('.effect-level__pin');
    let effectLevelLine = document.querySelector('.effect-level__line');
    let effectLevelValue = document.querySelector('.effect-level__value');
    let effectLevelDepth = document.querySelector('.effect-level__depth');
    let photoEffect = document.querySelectorAll('.effects__radio');

    let textHashtags = document.querySelector('.text__hashtags');
    let textDescription = document.querySelector('.text__description');

    uploadImage.addEventListener('change', () => {
        openImgUploadOverlay();
    })
    // Открытие формы
    function openImgUploadOverlay() {
        imgUploadOverlay.classList.remove('hidden');
        document.addEventListener('keydown', onImgUploadOverlayEscPress);
        imgUploadCancel.addEventListener('click', () => {
            closeImgUploadOverlay();
        })
        scaleControlSmaller.addEventListener('click', () => {
            makeScaleSmaller();
        });
        scaleControlBigger.addEventListener('click', () => {
            makeScaleBigger();
        });
    }
    // Закрытие формы
    function closeImgUploadOverlay() {
        imgUploadOverlay.classList.add('hidden');
        document.removeEventListener('keydown', onImgUploadOverlayEscPress);
        uploadImage.value = '';
    }

    function onImgUploadOverlayEscPress(evt) {
        if (evt.keyCode === 27 && evt.target !== textHashtags && evt.target !== textDescription) {
            closeImgUploadOverlay();
        }
    }

    function makeScaleBigger() {
        let scaleNumber = parseInt(scaleControlValue.value);
        if (scaleNumber < 100) {
            scaleControlValue.value = scaleNumber + 25 + '%';
        }
        imgUploadPreview.style.transform = `scale(${parseInt(scaleControlValue.value) / 100})`;
    }

    function makeScaleSmaller() {
        let scaleNumber = parseInt(scaleControlValue.value);
        if (scaleNumber > 25) {
            scaleControlValue.value = scaleNumber - 25 + '%';
        }
        imgUploadPreview.style.transform = `scale(${parseInt(scaleControlValue.value) / 100})`
    }
    // переключение фильтров
    function toggleFilter(filterName) {
        removePhotoEffect();
        imgUploadPreview.classList.add('effects__preview--' + filterName);
    }

    function removePhotoEffect() {
        for (let i = 0; i < photoEffect.length; i++) {
            imgUploadPreview.classList.remove('effects__preview--' + photoEffect[i].value);
        }
    }

    // Добавление обработчика событий каждой кнопке
    for (let i = 0; i < photoEffect.length; i++) {
        photoEffect[i].addEventListener('click', () => {
            toggleFilter(photoEffect[i].value);


            // setEffectLevelValue(100);
            setLevelPinAndValue(455);

            if (i == 0) {
                slider.classList.add('hidden');
            }
            else {
                slider.classList.remove('hidden');
            }
        })
    }

    // Перемещение пина
    var RangeBlock = {
        WIDTHINPX: 455,
        PADDING: 20,
        MAX: 100,
        MIN: 0,
        RATIO: 100
    };

    effectLevelPin.addEventListener('mousedown', (evt) => {
        evt.preventDefault();

        let startCoords = {
            x: evt.clientX,
            y: evt.clientY,
        };

        function onMouseMove(moveEvt) {
            moveEvt.preventDefault();

            // eslint-disable-next-line prefer-const
            let shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY,
            };

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY,
            };

            setLevelPinAndValue(effectLevelPin.offsetLeft - shift.x);

        }

        function onMouseUp(upEvt) {
            upEvt.preventDefault();

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function setLevelPinAndValue(value) {
        if (value > RangeBlock.WIDTHINPX) {
            value = RangeBlock.WIDTHINPX;
        }
        if (value < 0) {
            value = 0;
        }
        effectLevelPin.style.left = value + 'px';
        effectLevelDepth.style.width = value + 'px';
        let valueInPercent = Math.round((value / RangeBlock.WIDTHINPX) * RangeBlock.RATIO);
        setEffectLevelValue(valueInPercent);
    }

    function setEffectLevelValue(val) {
        if (val >= 0 && val <= 100) {
            effectLevelValue.value = val;
            setIntensityOfEffect(val);
        }
    }

    function setIntensityOfEffect(value) {
        if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
            imgUploadPreview.style.filter = `grayscale(${value / 100})`;
        }
        else if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
            imgUploadPreview.style.filter = `sepia(${value / 100})`;
        }
        else if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
            imgUploadPreview.style.filter = `invert(${value}%)`;
        }
        else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
            imgUploadPreview.style.filter = `blur(${value * 3 / 100}px)`;
        }
        else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
            imgUploadPreview.style.filter = `brightness(${value * 3 / 100})`;
        }
        else if (imgUploadPreview.classList.contains('effects__preview--none')) {
            imgUploadPreview.style.filter = '';
        }
    }

    // функция загрузает выбранную фотографию
    // function setFileLoad() {
    //     let file = uploadImage.files[0];
    //     let fileName = file.name;

    //     let reader = new FileReader();

    //     reader.addEventListener('load', function () {
    //         imagePreview.src = reader.result;
    //         effectsPreview.forEach(function (item) {
    //           item.style.backgroundImage = 'url(' + reader.result + ')';
    //         });
    //       });
    // } 
})();