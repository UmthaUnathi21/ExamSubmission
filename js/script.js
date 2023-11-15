"use strict";

//Date formatting
const getDateString = date => 
`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const displayPicture = data => {
    let html = "";
    if (data.error) {
        html += `<span class="error">${data.error.message}</span>`;
    } else if (data.code) {
        html += `<span class="error">${data.code} - ${data.msg}</span>`;
    } else {
        html += `<h1>${data.title}</h1>`;
        const width = 700;
        switch (data.media_type) {
            case "image":
                html += `<div class="center-image">`;  // Add a div for centering
                html += `<img src="${data.url}" width="${width}" alt="NASA photo" class="img-fluid">`;  // Apply center-image class to the img
                html += `</div>`;
                break;
            case "video":
                html += `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
                break;
            default:
                html += `<img src="images/notavailable.png" width="${width}" alt="NASA photo" class="img-fluid">`;
        }

        html += `<div class="display-3">`;  // Apply display-3 class to the div
        html += `${data.date}`;
        if (data.copyright) {
            html += `<span class="right">&copy; ${data.copyright} </span>`;
        }
        html += "</div>";

        html += `<p>${data.explanation}</p>`;
    }

    $("#display").html(html);
};

const displayError = error => 
{
    let html = `<span class="error">${error.message}</span>`;
    $("#display").html(html);
};

$(document).ready( () =>
{
    const today = new Date();
    let dateStr = getDateString(today);

    const dateTextbox = $("#date");
    dateTextbox.val(dateStr);
    dateTextbox.focus();

    $("#view_button").click( () =>
    {
        dateStr = $("#date").val();
        const dateObj = new Date(dateStr);

        if(dateObj == "Invalid Date")
        {
            const msg = "Please enter valid date in YYYY-MM-DD format.";
            $("#display").html(`<span class="error">${msg}</span>`);
        }
        else
        {
            dateStr = getDateString(dateObj);

            const domain = `https://api.nasa.gov/planetary/apod`;
            const request = `?api_key=BRJYPPAgRnUgHfgCJ0qpow3bs1plhLvUe01lpRsF&date=${dateStr}`;
            const url = domain + request;

            fetch(url)
             .then (response => response.json())
             .then (json => displayPicture(json))
             .catch(e => displayError(e));
        }
        $("#data").focus();
    });
});

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if(window.pageYOffset > 100) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
})