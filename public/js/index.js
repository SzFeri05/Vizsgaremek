//Globális változók
let oldalSzam = 1; // Kezdő oldal
const limit = 8;   //Hány cikk jelenjen meg oldalanként
let oldalakSzama = 1; // Kezdetben 1 oldal, API frissíti
let betoltodik = false;


function $(id) {
    return document.getElementById(id);
}

async function ujCikk() {
    let cookies = document.cookie;
    let cikkCim = $("cikkCim").value;
    let cikkSzoveg = $("cikkSzoveg").value;
    let cikkKep = $("cikkKep").files[0];

    console.log(cookies);

    if (cikkCim != "" && cikkSzoveg != "") {
        let formData = new FormData(); 
        formData.append('cim', cikkCim); 
        formData.append('szoveg', cikkSzoveg);

        if (cikkKep) {
            formData.append('kep', cikkKep); 
        }

        let lekeres = await fetch("./api/ujcikk", {
            method: "POST",
            body: formData,
        });

        if (lekeres.ok) {
            alert("Sikeres cikkfeltöltés!");
            $("cikkCim").value = "";
            $("cikkSzoveg").value = "";
            $("cikkKep").value = "";

        }
        else {
            alert("Sikertelen cikkfeltöltés!");
        }
    }
    else {
        alert("Kérem minden mezőt töltsön ki!", "Hiányos adatok!");
    }
}

async function registerFormFeltoltes() {
    let iskolaSelect = $("registerIskola");
    iskolaSelect.innerHTML = "";

    let iskolakLekeres = await fetch("./api/iskolak");

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

    let evfolyamLekeres = await fetch("./api/evfolyamok", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id" : selectedIskola
        })
    });
    let szakLekeres = await fetch("./api/szakok", {
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
        osztalySelect.innerHTML = "";

        for (let i = 9; i < (parseInt(evfolyamok[0].evfolyamDarab) + 8); i++) {
            szakok.forEach(szak => {
                let opt = document.createElement("option");

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
            "felhasznalonev" : felhasznaloNev,
            "iskola" : iskola,
            "osztaly" : osztaly,
            "evfolyam" : evfolyam,
            "jelszo" : jelszo
        }

        let lekeres = await fetch("./api/registerdiak", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(kuldendoAdatok),
        });
 

        if(lekeres.ok) {
            alert("Sikeres regisztráció!");
            email.innerHTML = "";
            teljesNev = "";
            felhasznaloNev = "";
            iskola = "";
            osztaly = "";
            jelszo = "";
            jelszoUjra = "";
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
            "felhasznalonev" : felhasznalonev,
            "jelszo" : jelszo
        }

        let lekeres = await fetch("./api/loginDiak", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(kuldendoAdatok),
        });

        if(lekeres.ok) {
            let resp = await lekeres.json();

            if(!resp["valasz"].includes("Sikertelen"))
            {
                let diakAdatai = await fetch("/api/diakNevAlapjan", {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify({
                        "nev" : resp["valasz"]
                    })
                });

                if(diakAdatai.ok) {
                    let adatok = await diakAdatai.json();

                    $("loginFelahsznaloNev").value = "";
                    $("loginJelszo").value = "";
                    $("loginMarad").checked = false;

                    let url = document.location.href;
                    let ujUrl = url.replace("/login.html", "/index.html");
                    document.location.href = ujUrl;

                    let bejelentkezveMarad = $("loginMarad").checked;

                    if(bejelentkezveMarad) {
                        const d = new Date();
                        let napigMaradBejelentkezve = 300;
                        d.setTime(d.getTime() + (napigMaradBejelentkezve*24*60*60*1000));
                        let lejaratiDatum = d.toUTCString();

                        document.cookie = "felhasznalonev=" + adatok[0]["felhasznalonev"] + ";expires=" + lejaratiDatum + ";";
                        document.cookie = "id=" + adatok[0]["id"] + ";expires=" + lejaratiDatum + ";";
                    }

                    else {
                        document.cookie = "felhasznalonev=" + resp["valasz"] + ";";
                        document.cookie = "id=" + adatok[0]["id"] + ";";
                    }
                }

                else {
                    alert("IDK");
                }
            }

            else
            {
                alert("Sikertelen bejelentkezés, próbálja újra később!", "Hiba!");
            }
            
        }
    
        else {
            alert("Hiba");
        }
    }
}

async function loginAdatokMegjelenitese() {
    let decodedCookies = decodeURIComponent(document.cookie);
    let cookies = decodedCookies.split(';');
    let felhaszNevCookie = "";

    cookies.forEach(cookie => {
        if(cookie.includes("felhasznalonev")) {
            felhaszNevCookie = cookie.split('=')[1];
        }
    });
    
    let diakAdatai = await fetch("/api/diakNevAlapjan", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "nev" : felhaszNevCookie
        })
    });

    if(diakAdatai.ok) {
        let adatok = await diakAdatai.json();

        $("offcanvasTitle").innerHTML = felhaszNevCookie;
        $("offcanvasIskola").innerHTML = adatok[0]["iNev"];
        $("offcanvasNev").innerHTML = adatok[0]["dNev"];
    }
}

async function cikkekBetoltese(oldal) {
  if (betoltodik) return; // Ha már betöltődik, ne indítsunk újat
  betoltodik = true;

  try {
    let cikkLekeres = await fetch(`./api/posztok?oldal=${oldal}&limit=${limit}`);
    let valasz = await cikkLekeres.json();
    let posztok = valasz.posztok;
    oldalakSzama = valasz.oldalakSzama; // Globális változó frissítése

    let cikkekHelye = document.getElementById("cikkekHelye");

    if (oldal === 1) { // Első oldal betöltésekor töröljük a korábbi tartalmat
      cikkekHelye.innerHTML = "";
    }

    cikkekHelye.innerHTML = "";
    for (const poszt of posztok) {
      let fodiv = document.createElement("div");
      let div = document.createElement("div");
      let div2 = document.createElement("div");
      let img = document.createElement("img");
      let h5 = document.createElement("h3");
      let p = document.createElement("p");
      let span = document.createElement("h5");
      let small = document.createElement("small");

      fodiv.className = "col-12 col-sm-12 col-md-6 col-lg-3 mx-auto";

      div.className = "card align-items-center";
      div.style = "width: auto; background-color: rgb(235, 200, 148);";

      img.src = "./favicon.png";
      img.classList = "card-img-top";
      img.style = "height: 75%;";
      img.style = "width: 75%;";

      div2.classList = "card-body";

      h5.classList = "card-title";
      h5.innerHTML = poszt.cim;

      p.classList = "card-text";
      p.innerHTML = poszt.szoveg;
      p.style = "width: 100%;";

      span.innerHTML = poszt.felhasznalonev;

      small.innerHTML = poszt.datum;

      div2.appendChild(h5);
      div2.appendChild(p);
      div2.appendChild(span);
      div2.appendChild(small);

      div.appendChild(img);  
      div.appendChild(div2);

      fodiv.appendChild(div);

      cikkekHelye.appendChild(fodiv);
    }

    betoltodik = false;
    frissitNyilak(); // Nyilak állapotának frissítése
  } catch (error) {
    console.error("Hiba a cikkek betöltésekor:", error);
    betoltodik = false;
  }
}


function frissitNyilak() {
    let balDiv = document.getElementById("balNyilDiv");
    //Bal nyíl letiltása, ha az első oldalon vagyunk
    balraNyil.disabled = (oldalSzam === 1);
    balraNyil.style.opacity = (oldalSzam === 1) ? 0.5 : 1; //opacitás

    //Jobb nyíl letiltása, ha az utolsó oldalon vagyunk
    jobbraNyil.disabled = (oldalSzam === oldalakSzama);
    jobbraNyil.style.opacity = (oldalSzam === oldalakSzama) ? 0.5 : 1; //opacitás
}

function kijelentkezes()
{
    document.cookie = "felhasznalonev=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "id=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    let url = document.location.href;
    let ujUrl = url.replace("/index.html", "/login.html");
    document.location.href = ujUrl;
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

if(document.title == "Suliújság") {
    window.addEventListener("load", () => {
        setInterval(datumEsIdo, 1000);
        datumEsIdo();
        cikkekBetoltese(oldalSzam);
        loginAdatokMegjelenitese();
    });
    
    $("cikkFeltoltes").addEventListener("click", () => {  
        ujCikk();
    });

    $("jobbNyilDiv").addEventListener("click", () => {
        if (oldalSzam < oldalakSzama) {
            oldalSzam++;
            cikkekBetoltese(oldalSzam);
        }
    });
    
    $("balNyilDiv").addEventListener("click", () => {
        if (oldalSzam > 1) {
            oldalSzam--;
            cikkekBetoltese(oldalSzam);
        }
    });

    $("kijelentkezesButton").addEventListener("click", () => {
        kijelentkezes();
    })
}

if(document.title == "Kezdőoldal") {
    $("registerSpan").addEventListener("click", () => {
        registerFormFeltoltes();
    });

    $("registerIskola").addEventListener("change", () => {
        osztalyokFeltoltes();
    });

    $("loginButton").addEventListener("click", login);
    $("registerButton").addEventListener("click", register);
}