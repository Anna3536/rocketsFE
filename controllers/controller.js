"use strict";
let rocket;
let rockets = [];
const form = document.getElementById("form_rocket");
function createRocket() {
    let i = rockets.length;
    if (rockets.length === 0) {
        let coet = new Rocket('32WESSDS', 3, [10, 30, 80]);
        rockets.push(coet);
        console.log(coet);
        console.log(rockets);
        rocket = coet;
        createProgressBar(i);
    }
    else if (rockets.length === 1) {
        let coet = new Rocket('LDSF5A32', 6, [30, 40, 50, 50, 30, 10]);
        rockets.push(coet);
        console.log(coet);
        console.log(rockets);
        rocket = coet;
        createProgressBar(i);
        document.getElementById("create_rocket").classList.add("d-none");
        form.classList.remove("d-none");
    }
    else if (rockets.length >= 2) {
        let code = document.getElementById("coderocket").value;
        let thursters_form = document.getElementById("thurstersrocket").value;
        let maxPower_form = document.getElementById("maxpowerrocket").value;
        let thursters = Number(thursters_form);
        let maxPower = maxPower_form.split(",").map(Number);
        let rocketvalidate = validateRocket(code, thursters_form, maxPower_form);
        if (rocketvalidate === true) {
            let existe = existeRocket(code);
            if (existe === false) {
                let coet = new Rocket(code, thursters, maxPower);
                rockets.push(coet);
                console.log(coet);
                console.log(rockets);
                rocket = coet;
                createProgressBar(i);
            }
            else if (existe === true) {
                alert(`rocket ya esta creado!`);
            }
        }
    }
}
function existeRocket(code) {
    let existe = false;
    for (let i = 0; i < rockets.length; i++) {
        if (rockets[i].code == code) {
            existe = true;
        }
    }
    return existe;
}
function VerifyRocket() {
    let progressbar;
    let numRocket = 0;
    for (let i = 0; i < rockets.length; i++) {
        progressbar = document.getElementsByName("progressbar");
        if (progressbar[i].checked == true) {
            console.log(progressbar);
            numRocket = i;
        }
    }
    return numRocket;
}
function validateRocket(code, thursters_form, maxPower_form) {
    let acumErrores = 0;
    let form = document.getElementById("form_rocket");
    form.classList.remove('is-invalid');
    if (code == "") {
        document.getElementById("coderocket").classList.add("is-invalid");
        document.getElementById("errorCode").textContent = "Añade el codigo";
        acumErrores++;
    }
    else if (code.length != 8) {
        document.getElementById("coderocket").classList.add("is-invalid");
        document.getElementById("errorCode").textContent = "8 carateres";
        acumErrores++;
    }
    if (thursters_form == "") {
        document.getElementById("thurstersrocket").classList.add("is-invalid");
        document.getElementById("errorThursters").textContent = "Añade los propulsores";
        acumErrores++;
    }
    else if (isNaN(Number(thursters_form))) {
        document.getElementById("thurstersrocket").classList.add("is-invalid");
        document.getElementById("errorThursters").textContent = "Es un numero";
        acumErrores++;
    }
    if (maxPower_form == "") {
        document.getElementById("maxpowerrocket").classList.add("is-invalid");
        document.getElementById("errorMaxPower").textContent = "Añade la potencia máxima";
        acumErrores++;
    }
    else if (validarNumDePotencias(maxPower_form, thursters_form) === false) {
        document.getElementById("maxpowerrocket").classList.add("is-invalid");
        document.getElementById("errorMaxPower").textContent = `${Number(thursters_form)} propulsores  entre comas`;
        acumErrores++;
    }
    else if (validarEsMultiplo(maxPower_form) === false) {
        document.getElementById("maxpowerrocket").classList.add("is-invalid");
        document.getElementById("errorMaxPower").textContent = "Multiplos de 10";
        acumErrores++;
    }
    if (acumErrores > 0) {
        return false;
    }
    else {
        return true;
    }
}
function validarEsMultiplo(maxPower_form) {
    let maxPower = maxPower_form.split(",").map(Number);
    console.log(maxPower);
    let num;
    let count = 0;
    for (let i = 0; i < maxPower.length; i++) {
        num = maxPower[i] / 10;
        if (!Number.isInteger(num)) {
            count += 1;
        }
    }
    if (count == 0) {
        return true;
    }
    else {
        return false;
    }
}
function validarNumDePotencias(maxPower_form, thursters_form) {
    let maxPower = maxPower_form.split(",").map(Number);
    let thursters = Number(thursters_form);
    if (maxPower.length === thursters) {
        return true;
    }
    else {
        return false;
    }
}
function createProgressBar(i) {
    let progressInfo = document.getElementById("coet");
    let progressbar = document.createElement('div');
    progressbar.innerHTML = ` 
        <div class="col-12">
            <label>Rocket ${(i + 1)}:</label>
            <input name="progressbar" type="radio" checked><div class="progress">
            <div id="progress-bar${(i + 1)}" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">
            </div>
            </input>
        </div>
    `;
    console.log(progressbar);
    progressInfo === null || progressInfo === void 0 ? void 0 : progressInfo.appendChild(progressbar);
}
function accelerateRocket() {
    let i = VerifyRocket();
    rocket = rockets[i];
    if (JSON.stringify(rocket.getActualPower()) == JSON.stringify(rocket.getMaxPower())) {
        console.log(JSON.stringify(rocket.getActualPower()));
        console.log(JSON.stringify(rocket.getMaxPower()));
        alert("La aceleracion esta al maximo!");
    }
    else {
        let rocketInfo = document.getElementById("rocketInfo");
        let element = document.createElement('div');
        element.innerHTML = `<div>Actual Power Rocket${(i + 1)}: ${rocket.accelerar()}</div>`;
        console.log("element:", element);
        rocketInfo === null || rocketInfo === void 0 ? void 0 : rocketInfo.appendChild(element);
        pintarProgressBar(i);
    }
}
function breakRocket() {
    let i = VerifyRocket();
    rocket = rockets[i];
    let breakRocket = isBreak(i);
    if ((rocket.getActualPower()).length === 0) {
        alert("Para frenar es necesario acelerar!!!");
    }
    else {
        if (breakRocket === true) {
            alert(`El rocket ${(i + 1)} ya ha frenado!!`);
        }
        else {
            let rocketInfo = document.getElementById("rocketInfo");
            let element = document.createElement('div');
            element.innerHTML = `<div>Actual Power Rocket${(i + 1)}: ${rocket.frenar()}</div>`;
            console.log(element);
            rocketInfo === null || rocketInfo === void 0 ? void 0 : rocketInfo.appendChild(element);
            pintarProgressBar(i);
        }
    }
}
function isBreak(i) {
    rocket = rockets[i];
    let count = 0;
    let potencia = rocket.getMaxPower();
    let breakRocket = rocket.getActualPower();
    for (let i = 0; i < potencia.length; i++) {
        if (breakRocket[i] == 0) {
            count += 1;
        }
    }
    if (count === potencia.length) {
        return true;
    }
    else if (count != potencia.length) {
        return false;
    }
}
function printRocket() {
    let i = VerifyRocket();
    rocket = rockets[i];
    rocket = rockets[i];
    if (rocket == undefined) {
        document.getElementById("printRocketInfo").innerHTML = `Por el momento no hay rockets`;
    }
    else {
        document.getElementById("numeroDeRocket").innerHTML = `Rocket${i + 1}`;
        document.getElementById("printRocketInfo").innerHTML = `
        <div>${rocket.toString()}</div>
       `;
    }
}
function printAllRockets() {
    if (rockets.length == 0) {
        document.getElementById("printAllRocketsInfo").innerHTML = `Por el momento no hay rockets`;
    }
    else {
        let printarAllRocketsInfo = document.getElementById("printAllRocketsInfo");
        let pintar = "";
        for (let j = 0; j < rockets.length; j++) {
            console.log(rockets);
            pintar += `<li>${rockets[j].toString()}</li>`;
        }
        printarAllRocketsInfo.innerHTML = pintar;
    }
}
function pintarProgressBar(i) {
    let suma = 0;
    let total = 0;
    let width;
    let arr = rocket.getActualPower();
    for (let z = 0; z < arr.length; z++) {
        suma += arr[z];
        console.log(suma);
    }
    let arr2 = rocket.getMaxPower();
    for (let j = 0; j < arr2.length; j++) {
        total += arr2[j];
    }
    width = (suma / total) * 100;
    let progress = document.getElementById(`progress-bar${(i + 1)}`);
    progress.style.width = width + "%";
}
if (form) {
    form.addEventListener("blur", (event) => {
        if (event.target.value != "")
            event.target.classList.remove("is-invalid");
    }, true);
}
