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

}

async function registerFormFeltoltes() {
    let iskolakSelect = $("registerIskola");
    let iskolaLekeres = await fetch("./php/SQLkeresek.php/iskolak");

    if (iskolaLekeres.ok) {
        let iskolak = await iskolaLekeres.json();

        iskolak.forEach(iskola => {
            let iskolaOption = document.createElement("option");
            iskolaOption.value = iskola.iskID;
            iskolaOption.innerHTML = iskola.iskNev;

            iskolakSelect.appendChild(iskolaOption);
        });
    }
}

async function osztalyokFeltoltes() {
    let iskolakSelect = $("registerIskola");
    let index = iskolakSelect.options[iskolakSelect.selectedIndex].value;
    let osztalySelect = $("registerOsztaly");

    let kuldendoAdat = {
        "id" : parseInt(index)
    };

    let evfolyamokLekeres = await fetch("./php/SQLkeresek.php/evfolyamok", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(kuldendoAdat)
    });

    let szakLekeres = await fetch("./php/SQLkeresek.php/szakok", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(kuldendoAdat)
    })

    if (evfolyamokLekeres.ok && szakLekeres.ok) {
        let evfolyamok = await evfolyamokLekeres.json();
        let szakok = await szakLekeres.json();

        for (i in evfolyamok) {
            for (j in szakok) {
                console.log(i + "." + j);
            }
        }
    }
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
        ev + ". " + parseInt(honap + 1) + ". " + (nap < 10 ? "0" + nap : nap) + ".";
}


window.addEventListener("load", () => {
    //setInterval(datumEsIdo, 1000);
    //datumEsIdo();
});

$("registerButton").addEventListener("click", () => {
    registerFormFeltoltes();
})

$("registerIskola").addEventListener("change", () => {
    osztalyokFeltoltes();
})

$("cikkFeltoltes").addEventListener("click", ujCikk);