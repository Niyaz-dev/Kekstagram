'use strict';
// Для работы со своим изображением

(function () {
    let FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    let fileChooser = document.querySelector('#upload-file');
    let preview = document.querySelector('.img-upload__preview img');

    fileChooser.addEventListener('change', function () {
        let file = fileChooser.files[0];
        let fileName = file.name.toLowerCase();

        let matches = FILE_TYPES.some(function (it) {
            return fileName.endsWith(it);
        });

        if (matches) {
            let reader = new FileReader();

            reader.addEventListener('load', function () {
                preview.src = reader.result;
            });

            reader.readAsDataURL(file);
        }
    });
})();