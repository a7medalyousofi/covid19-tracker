let confirmed_stats = document.querySelector(".confirmed span"),
    new_confirmed_stats = document.querySelector(".new_cases span"),
    active_stats = document.querySelector(".active span"),
    new_recovered_stats = document.querySelector(".new_recovered span"),
    recovered_stats = document.querySelector(".recovered span"),
    deceased_stats = document.querySelector(".deceased span"),
    new_deceased_stats = document.querySelector(".new_deceased span"),
    critical_stats = document.querySelector(".critical span"),
    tests_stats = document.querySelector(".tests span"),
    table_mode = document.querySelector(".table");

const last_update = document.querySelector(".last_update span");

fetch("https://api.covid19api.com/summary")
    .then((res) => res.json())
    .then((data) => {
        new_confirmed_stats.textContent = `[ +${data.Global.NewConfirmed.toLocaleString()} ]`;
        confirmed_stats.textContent = data.Global.TotalConfirmed.toLocaleString();
        active_stats.textContent = (
            data.Global.TotalConfirmed -
            data.Global.TotalRecovered -
            data.Global.TotalDeaths
        ).toLocaleString();
        new_recovered_stats.textContent = `[ +${data.Global.NewRecovered.toLocaleString()} ]`;
        recovered_stats.textContent = data.Global.TotalRecovered.toLocaleString();
        new_deceased_stats.textContent = `[ +${data.Global.NewDeaths.toLocaleString()} ]`;
        deceased_stats.textContent = data.Global.TotalDeaths.toLocaleString();

        let date = new Date(data["lastUpdate"]);
        last_update.textContent = data.Date.toLocaleString("en-US", {
            hour12: true,
        });
    });

fetch("https://cov19.cc/report.json")
    .then((res) => res.json())
    .then((data) => {
        critical_stats.textContent = data.regions.world.totals.critical.toLocaleString();
        tests_stats.textContent = data.regions.world.totals.critical.toLocaleString();
    });

function tableData() {
    let links = document.querySelector(".t-body");
    // let lii = document.createElement("li");

    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let data = JSON.parse(request.responseText);
            let idds = data.countries;
            let cont = document.querySelector(".contr"),
                option = "",
                opt = "";
            let fgh = document.createElement("option");
            let tr = document.createElement("tr");
            let dr = document.createElement("td");

            let ghc = data.Countries.length;

            for (let i = 0; i < ghc; i++) {
                let gh = data.Countries[i].Country;
                let ghf = data.Countries[i].TotalConfirmed;
                let ghr = data.Countries[i].TotalRecovered;
                let ghd = data.Countries[i].TotalDeaths;
                let gc = ghf - ghr - ghd;

                option +=
                    '<tr><td class="red">' +
                    gh +
                    '</td><td class="conf">' +
                    ghf +
                    '</td><td class="dis">' +
                    data.Countries[i].NewConfirmed +
                    '</td><td class="rec">' +
                    ghr +
                    '</td><td class="dis">' +
                    data.Countries[i].NewRecovered +
                    '</td><td class="deth">' +
                    ghd +
                    '</td><td class="dis">' +
                    data.Countries[i].NewDeaths +
                    '</td><td class="activ">' +
                    gc +
                    "</td></tr>";
                fgh += "<option value=" + gh + ">";
            }

            links.innerHTML = option;
        }
    };

    let newUrl = "https://api.covid19api.com/summary";

    request.open("GET", newUrl, true);
    request.send();
}

tableData();

// -------- Start Checkbox for change theme --------

//create a variable to monitor the input checkbox
const colorSwitch = document.getElementById("input-color-switch");

//when the input is clicked verify the state of the checkbox
colorSwitch.addEventListener("click", checkMode);

//1. see which state the checkbox is in
//2. if it is checked enable the dark mode by adding the class
//3. if it is not checked remove dark mode by removing the class
function checkMode() {
    if (colorSwitch.checked) {
        darkModeOff();
    } else {
        darkModeOn();
    }
}

function darkModeOff() {
    document.body.classList.add("light-mode");
    table_mode.classList.remove("table-dark");
    table_mode.classList.add("table-light");
}

function darkModeOn() {
    document.body.classList.remove("light-mode");
    table_mode.classList.remove("table-light");
    table_mode.classList.add("table-dark");
}
// -------- End Checkbox for change theme --------
