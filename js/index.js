async function cikkekKiirasa() {
    try {
        let eredmeny = await fetch("php/jsDatabaseConnect.php/iskolak");
        let valasz = await eredmeny.json();

        valasz.forEach(e => {
            console.log(e);
        });

        /*valasz.forEach(e => {
            p.innerHTML += e["adat"];
            p.innerHTML += "<br>";
        });*/
    } catch (error) {
        console.log(error);
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
    oraSpan.innerHTML = ((ora < 10) ? "0" + ora : ora) + ":" + ((perc < 10) ? "0" + perc : perc);

    //Dátum beállítása
    datumSmall.innerHTML = ev + ". " + parseInt(honap + 1) + ". " + ((nap < 10) ? "0" + nap : nap) + ".";

    setInterval(datumEsIdo, 1000);
}



window.addEventListener("load", () => {
    cikkekKiirasa()
    datumEsIdo()
});