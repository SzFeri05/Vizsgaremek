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
    let selectedIskola = $("registerIskola").value;

    let evfolyamLekeres = await fetch("./php/SQLkeresek.php/evfolyamok", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id" : selectedIskola
        })
    });
    let szakLekeres = await fetch("./php/SQLkeresek.php/szakok", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id" : selectedIskola
        })
    });
    
    if(evfolyamLekeres.ok && szakLekeres.ok)
    {
        let evfolyamok = await evfolyamLekeres.json();
        let szakok = await szakLekeres.json();

        let osztalySelect = $("registerOsztaly");

        for (let i = 9; i < (parseInt(evfolyamok[0].evfolyamDarab) + 8); i++) {
            szakok.forEach(szak => {
                let opt = document.createElement("option");
                console.log("asddd");

                opt.value = szak.id;
                opt.innerHTML = i + ". " + szak.szakJeloles + " (" + szak.nev + ")";

                osztalySelect.appendChild(opt);
            });
        }
    }
       
    
}

async function register() {
    let email = $("registerEmail").value;
    let teljesNev = $("registerTeljesNev").value;
    let felhasznaloNev = $("registerFelahsznaloNev").value;
    let iskola = $("registerIskola").value;
    let osztaly = $("registerOsztaly").value;
    let jelszo = $("registerJelszo").value;
    let jelszoUjra = $("registerJelszoUjra").value;
    let evfolyam = $("registerOsztaly").options[$("registerOsztaly").selectedIndex].text.split('.')[0];

    if(email == "" || teljesNev == "" || felhasznaloNev == "" || iskola == "" || osztaly == "" || jelszo == "" || jelszoUjra == "") {
        alert("Kérem töltsön ki minden mezőt!");
    }


    else if(jelszo != jelszoUjra) {
        alert("A két jelszó nem egyezik!");
        $("registerJelszo").innerHTML = "";
        $("registerJelszoUjra").innerHTML = "";
    }

    else {
        let kuldendoAdatok = {
            "email" : email,
            "teljesNev" : teljesNev,
            "felhasznaloNev" : felhasznaloNev,
            "iskola" : iskola,
            "osztaly" : osztaly,
            "evfolyam" : evfolyam,
            "jelszo" : jelszo
        }

        let lekeres = await fetch("./php/SQLkeresek.php/registerdiak", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(kuldendoAdatok),
        });
 

        if(lekeres.ok) {
            alert("Sikeres regisztráció!");
        }

        else {
            alert("Sikertelen regisztráció, próbálja újra később!", "Hiba!");
        }
    }
}

async function login() {
    let felhasznalonev = $("loginFelahsznaloNev").value;
    let jelszo = $("loginJelszo").value;

    if(felhasznalonev == "" || jelszo == "") {
        alert("Kérem töltsön ki minden mezőt!");
    }

    else {
        let kuldendoAdatok = {
            "loginFelhasznaloNev" : felhasznalonev,
            "loginJelszo" : jelszo
        }

        let lekeres = await fetch("./php/SQLkeresek.php/logindiak", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(kuldendoAdatok),
        });
    }
 


/*        if(lekeres.ok) {
            let egyezes = await lekeres.json();
            if(egyezes[0])
            {
                alert("Sikeres bejelentkezés");
            }
            else
            {
                alert("Sikertelen bejelentkezés, próbálja újra később!", "Hiba!");
            }
            
        }

        else {
            alert("Hiba");
        }
*/
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

$("registerButtonModal").addEventListener("click", () => {
    registerFormFeltoltes();
})

$("registerIskola").addEventListener("change", () => {
    osztalyokFeltoltes();
})

$("cikkFeltoltes").addEventListener("click", ujCikk);

$("loginButton").addEventListener("click", login);
$("registerButton").addEventListener("click", register);