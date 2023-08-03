const xhr = new XMLHttpRequest();
xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/poll");
xhr.responseType = "json";
xhr.send();
xhr.addEventListener("readystatechange", receivingSurvey);

const xhrPost = new XMLHttpRequest;
xhrPost.open( 'POST', 'https://students.netoservices.ru/nestjs-backend/poll' );
xhrPost.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
xhrPost.responseType = "json";
xhrPost.onload = votingResult;


function receivingSurvey () {
// Обрабатывает результат запроса по получению случайного опроса
// Формирует из полученного "json" ответа HTML-элементы с вопросом и 
// вариантами ответа на него. При нажатии на один из вариантов - 
// вызывается функция responseProcessing
    if (xhr.readyState === xhr.DONE) {
        let question = xhr.response.data.title;
        let answers = xhr.response.data.answers;

        const pollTitle = document.getElementById("poll__title");
        pollTitle.textContent = question;
        const pollAnswers = document.getElementById("poll__answers");
        for (let answer of answers ) {
            let pollAnswer = document.createElement("button");
            pollAnswer.classList.add("poll__answer");
            pollAnswer.textContent = answer;
            pollAnswers.append(pollAnswer);
            pollAnswer.addEventListener("click", responseProcessing);
        };
    };
};

function responseProcessing () {
// Выводит диалоговое окно и отправляет запрос на получение результатов опроса
    alert("Спасибо, ваш голос засчитан!");
    let id = xhr.response.id;
    let answers = xhr.response.data.answers;
    let index = answers.indexOf(this.textContent);
    xhrPost.send( `vote=${id}&answer=${index}` );
};

function votingResult () {
// Обрабатывает успешную загрузку результата запроса на получение результатов опроса.
// Подсчитывает общее количество голосов, а затем формирует HTML-элементы
// с результатами опроса
    let stat = xhrPost.response.stat;
    const pollAnswers = document.getElementById("poll__answers");
    pollAnswers.innerHTML = "";
    let allVotes = stat.reduce((sum, elem) => sum + elem.votes, 0);
    for (let statElement of stat) {
        let pollStat = document.createElement("div");
        pollStat.classList.add("poll__stat");
        let statistics = ((statElement.votes / allVotes) * 100).toFixed(2);
        pollStat.textContent = `${statElement.answer}: ${statistics}%`;
        pollAnswers.append(pollStat);
    };
};