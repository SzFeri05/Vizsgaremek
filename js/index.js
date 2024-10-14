async function cikkekKiirasa() {
    try {
        let eredmeny = await fetch("php/jsDatabaseConnect.php/cikkek");
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

window.addEventListener("load", cikkekKiirasa);