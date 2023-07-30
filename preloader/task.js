let xhr = new XMLHttpRequest();
xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/slow-get-courses");
xhr.responseType = "json"
xhr.send();
xhr.onload = leadsToTheSite;


function leadsToTheSite () {
    const items = document.getElementById("items");
    let currencies = xhr.response.response.Valute;
    for (key in currencies) {
        let currency = document.createElement("div");
        currency.classList.add("item");

        currency.innerHTML = `<div class="item__code">\n
            ${currencies[key].CharCode}\n
        </div>\n
        <div class="item__value">\n
            ${currencies[key].Value}\n
        </div>\n
        <div class="item__currency">\n
            руб.\n
        </div>`;

        items.append(currency);
    };
    const loader = document.getElementById("loader");
    loader.classList.remove("loader_active");
};