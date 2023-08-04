const form = document.getElementById("form");
form.addEventListener("submit", submitsForm);
const progress = document.getElementById( 'progress' );


function submitsForm (e) {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");
    xhr.upload.onprogress = loadingIndication;
    let formData = new FormData(form);
    xhr.send(formData);
    xhr.onload = () => {
        alert("Файл успешно загружен!");
        progress.value = 0;
        document.querySelector(".input__wrapper-desc").textContent = "Имя файла...";
    };
};

function loadingIndication (ev) {
    progress.value = ev.loaded / ev.total;
};