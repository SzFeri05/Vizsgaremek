function $(id) {
    return document.getElementById(id);
}

async function ujCikk() {
    let kuldendoadatok;

    let cikkCim = $("cikkCim").value;
    let cikkSzoveg = $("cikkSzoveg").value;
    let cikkKep = $("cikkKep").value;

    if (cikkCim != "" && cikkSzoveg != "") {
        if (cikkKep != "") {
            kuldendoadatok = {
                "postCim": cikkCim,
                "postSzoveg": cikkSzoveg,
                "postVanKep": 1,
                "postKepElerhetoseg": cikkKep,
            }
        }
        else {
            kuldendoadatok = {
                "postCim": cikkCim,
                "postSzoveg": cikkSzoveg,
                "postVanKep": 0,
                "postKepElerhetoseg": null,
            }
        }
    }
    else {
        alert("Kérem minden mezőt töltsön ki!", "Hiányos adatok!");
    }


    let lekeres = await fetch("./php/SQLkeresek.php/ujcikk", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(kuldendoadatok),
    });

    if(lekeres.ok) {
        alert("Sikeres cikkfeltöltés!");
    }

    else {
        alert("Sikertelen cikkfeltöltés!");
    }

    cikkCim.innerHTML= "";
    cikkSzoveg.innerHTML = "";
    cikkKep.innerHTML = "";
}

async function registerFormFeltoltes() {
    let iskolaSelect = $("registerIskola");

    let iskolakLekeres = await fetch("./php/SQLkeresek.php/iskolak");

    if(iskolakLekeres.ok) {
        let iskolak = await iskolakLekeres.json();

        iskolak.forEach(iskola => {
            let opt = document.createElement("option");

            opt.value = iskola.id;
            opt.innerHTML = iskola.nev;

            iskolaSelect.appendChild(opt);
        });

        osztalyokFeltoltes();
    }
}

async function osztalyokFeltoltes() {
    
}


function datumEsIdo() {
    //Órát és dátumot kiíró dom elemek
    let oraSpan = document.getElementById("ora");
    let datumSmall = document.getElementById("datum");

    //Dátumok
    let teljesDatum = new Date();

    let ev = teljesDatum.getFullYear();
    let honap = teljesDatum.getMonth();
    let nap = teljesDatum.getDate();

    let ora = teljesDatum.getHours();
    let perc = teljesDatum.getMinutes();

    //Óra beállítása
    oraSpan.innerHTML =
        (ora < 10 ? "0" + ora : ora) + ":" + (perc < 10 ? "0" + perc : perc);

    //Dátum beállítása
    datumSmall.innerHTML =
        ev + ". " + (honap < 9 ? "0" + (honap+1) : (honap+1)) + ". " + (nap < 10 ? "0" + nap : nap) + ".";
}


window.addEventListener("load", () => {
    setInterval(datumEsIdo, 1000);
    datumEsIdo();
});

$("registerButton").addEventListener("click", () => {
    registerFormFeltoltes();
})

$("registerIskola").addEventListener("change", () => {
    osztalyokFeltoltes();
})

$("cikkFeltoltes").addEventListener("click", ujCikk);

