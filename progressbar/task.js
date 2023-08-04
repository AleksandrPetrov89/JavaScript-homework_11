const form = document.getElementById("form");
form.addEventListener("submit", submitsForm);
const progress = document.getElementById( 'progress' );


function submitsForm (e) {
    // Функция-обработчик отправки формы. Отменяет действия браузера по умолчанию.
    // Отправляет файл из формы в виде "POST" запроса и отображает прогресс загрузки.
    // При полной загрузке файла выводит соответствующее сообщение и обнуляет полосу загрузки
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");
    xhr.upload.onprogress = (ev) => progress.value = ev.loaded / ev.total;
    let formData = new FormData(form);
    xhr.send(formData);
    xhr.onload = () => {
        alert("Файл успешно загружен!");
        progress.value = 0;
    };
};