// Модуль загрузки данных из сети
(function () {
  const errorWindow = document.createElement('p');
  errorWindow.style.position = 'fixed';
  errorWindow.style.left = '50%';
  errorWindow.style.transform = 'translate(-50%,-50%)';
  errorWindow.style.top = '50%';
  errorWindow.style.zIndex = '4';
  errorWindow.style.backgroundColor = 'grey';
  errorWindow.style.padding = '40px';
  errorWindow.style.color = 'yellow';
  errorWindow.style.fontSize = '30px';

  window.backend = {
    onError(message) {
      console.error(message);
      errorWindow.textContent = `Ошибка: ${message}!`;
      document.body.appendChild(errorWindow);
    },
    load(onLoad, onError) {
      const URL = 'https://javascript.pages.academy/kekstagram/data';
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URL);

      xhr.addEventListener('load', () => {
        let error;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            error = 'Неверный запрос';
            break;
          case 401:
            error = 'Пользователь не авторизован';
            break;
          case 404:
            error = 'Ничего не найдено (error 404)';
            break;

          default:
            error = `Статус ответа: : ${xhr.status} ${xhr.statusText}`;
        }

        if (error) {
          onError(error);
        }
      });

      xhr.send();
    },
    save(data, onLoad, onError) {
      const URL = 'https://javascript.pages.academy/kekstagram';
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', () => {
        let error;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            error = 'Неверный запрос';
            break;
          case 401:
            error = 'Пользователь не авторизован';
            break;
          case 404:
            error = 'Ничего не найдено';
            break;

          default:
            error = `Статус ответа:  ${xhr.status} ${xhr.statusText}`;
        }

        if (error) {
          onError(error);
        }
      });

      xhr.addEventListener('error', () => {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', () => {
        onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
      });

      xhr.open('POST', URL);
      xhr.send(data);
    },
  };
}());
