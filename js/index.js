function $(id) {
    return document.getElementById(id);
}

async function teszt() {
    let lekeres = await fetch("./teszt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: null,
    });

    if (lekeres.ok) {
        let eredmeny = await lekeres.json();

        console.log(eredmeny);
    }
}

async function ujCikk() {
    let lekeres = await fetch("./ujcikk", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: null,
    });

    if (lekeres.ok) {
        let eredmeny = await lekeres.json();

        console.log(eredmeny);
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
    //teszt();
    //setInterval(datumEsIdo, 1000);
    //datumEsIdo();
});
