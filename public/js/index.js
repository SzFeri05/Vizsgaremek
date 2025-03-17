function $(id) {
    return document.getElementById(id);
}

//Globális változók
let oldalSzam = 1; // Kezdő oldal
let limit = 8;   //Hány cikk jelenjen meg oldalanként
let oldalakSzama = 1; // Kezdetben 1 oldal, API frissíti
let betoltodik = false;

function setLimit() {
    if(window.innerWidth < 992 && window.innerWidth > 767)
    {
        limit = 4;
    }
    else if(window.innerWidth < 768 && window.innerWidth > 0)
    {
        limit = 1;
    }
    else
    {
        limit = 8;
    }
}

async function diakAdatok() {
    let cookies = document.cookie;
    let felhasznalonev = cookies.split(";")[0].split("=")[1];
    
    let diakAdatai = await fetch("/api/diakNevAlapjan", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "nev" : felhasznalonev
        })
    });

    if(diakAdatai.ok)
    {
        let eredmeny = await diakAdatai.json();

        if(eredmeny[0]["adminE"] == 1)
        {
            let adminGomb = document.getElementById("adminGomb");

            adminGomb.innerHTML = '<button type="button" class="btn btn-info btn-lg" id="adminGomba" onclick="adminGomb()">Admin oldal</button> <br><br>'
        }
    }
}

async function ujCikk() {
    let cookies = document.cookie;
    let cikkCim = $("cikkCim").value;
    let cikkSzoveg = $("cikkSzoveg").value;
    let cikkKep = $("cikkKep").files[0];
    let idCookie = parseInt(cookies.split(";")[1].split("=")[1]);

    if (cikkCim != "" && cikkSzoveg != "") {
        let formData = new FormData(); 
        formData.append('postCim', cikkCim); 
        formData.append('postSzoveg', cikkSzoveg);
        formData.append('diakId', idCookie);

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

            setLimit();
            cikkekBetoltese(oldalSzam);

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
    
    if(selectedIskola == 1)  {
        $("registerOsztaly").disabled = true;
    }

    else {
        $("registerOsztaly").disabled = false;
    }

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
                opt.innerHTML = i + "." + szak.szakJeloles + " (" + szak.nev + ")";

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
            email.innerHTML = "";
            teljesNev = "";
            felhasznaloNev = "";
            iskola = "";
            osztaly = "";
            jelszo = "";
            jelszoUjra = "";

            let url = document.location.href;
            let ujUrl = url.replace("/login.html", "/index.html");
            document.location.href = ujUrl;

            document.cookie = "felhasznalonev=" + resp["valasz"] + ";";
            document.cookie = "id=" + adatok[0]["id"] + ";";
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
    oldalakSzama = (valasz.oldalakSzama - 1); // Globális változó frissítése

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
    //Bal nyíl letiltása, ha az első oldalon vagyunk
    balraNyil.disabled = (oldalSzam === 1);
    balraNyil.style.opacity = (oldalSzam === 1) ? 0.5 : 1; //opacitás

    //Jobb nyíl letiltása, ha az utolsó oldalon vagyunk
    jobbraNyil.disabled = (oldalSzam === oldalakSzama);
    jobbraNyil.style.opacity = (oldalSzam === oldalakSzama) ? 0.5 : 1; //opacitás
}

async function mentesElfogadvaEsTorles() {
    let cookies = document.cookie;
    let adminId = parseInt(cookies.split(";")[1].split("=")[1]);
    let cikkSzoveg = "";
    let cikkSzoveg2 = "";
    let elfogadvacheckBoxok = document.getElementsByName("elfogadva");
    let elfogadvacheckboxHossz = elfogadvacheckBoxok.length;
    let torolvecheckBoxok = document.getElementsByName("torles");
    let torolvecheckboxHossz = torolvecheckBoxok.length;
    let nemJelolt = 0;
    let torolvenemJelolt = 0;
    let eredmeny;
    let eredmeny2;

    for (const box of elfogadvacheckBoxok) {
        if(box.checked)
        {
            cikkSzoveg = box.value;
            let cikkElfogadasa = await fetch(`./api/cikkelfogadas`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    "adminId" : adminId,
                    "cikkSzoveg" : cikkSzoveg
                })
            });

            eredmeny = await cikkElfogadasa.json();
        }
        else
        {
            nemJelolt++;
        }
    }

    for (const box of torolvecheckBoxok) {
        if(box.checked)
        {
            cikkSzoveg2 = box.value;
            let cikkTorles = await fetch(`./api/cikktorles`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    "cikkSzoveg" : cikkSzoveg2
                })
            });

            eredmeny2 = await cikkTorles.json();
        }
        else
        {
            torolvenemJelolt++;
        }
    }

    if(nemJelolt == elfogadvacheckboxHossz && torolvenemJelolt == torolvecheckboxHossz)
    {
        alert("Legalább egyet jelöljön ki!");
    }
    else
    {
        alert(eredmeny2.valasz);
        nemElfogadottCikkek(oldalSzam);
    }
}

async function nemElfogadottCikkek(oldal) {
    let adminGomb = document.getElementById("adminGomb");

    adminGomb.innerHTML += '<button type="button" class="btn btn-primary btn-lg" id="visszaSimaOldal" onclick="simaOldal()">Cikk oldal</button> <br><br>'

    if (betoltodik) return; // Ha már betöltődik, ne indítsunk újat
    betoltodik = true;
  
    try {
      let cikkLekeres = await fetch(`./api/adminposztok?oldal=${oldal}&limit=${limit}`);
      let valasz = await cikkLekeres.json();
      let posztok = valasz.posztok;
      oldalakSzama = 1; // Globális változó frissítése
  
      let cikkekHelye = document.getElementById("cikkekHelye");
  
      if (oldal === 1) { // Első oldal betöltésekor töröljük a korábbi tartalmat
        cikkekHelye.innerHTML = "";
      }
  
      if(valasz.valasz == "Nincsenek találatok!")
      {
        alert("Nincs megjeleníthető cikk!");
        location.reload();
      }
      else
      {
        cikkekHelye.innerHTML = "";
        let seged = 0;
        for (const poszt of posztok) {
            let fodiv = document.createElement("div");
            let div = document.createElement("div");
            let div2 = document.createElement("div");
            let img = document.createElement("img");
            let h5 = document.createElement("h3");
            let p = document.createElement("p");
            let span = document.createElement("h5");
            let small = document.createElement("small");
            let checkbox = document.createElement("input");
            let label = document.createElement("label");
            let div3 = document.createElement("div");
            let checkbox2 = document.createElement("input");
            let label2 = document.createElement("label");
            let div4 = document.createElement("div");
    
            fodiv.className = "col-12 col-sm-12 col-md-6 col-lg-3 mx-auto";
    
            div.className = "card align-items-center";
            div.style = "width: auto; background-color: rgb(235, 200, 148);";
    
            img.src = "./favicon.png";
            img.classList = "card-img-top";
            img.style = "height: 55%;";
            img.style = "width: 55%;";
    
            div2.classList = "card-body";
    
            h5.classList = "card-title";
            h5.innerHTML = poszt.cim;
    
            p.classList = "card-text";
            p.innerHTML = poszt.szoveg;
            p.style = "width: 100%;";

            div3.classList = "form-check form-switch mb-3";

            checkbox.classList = "form-check-input elfogadva";
            checkbox.type = "checkbox";
            checkbox.name = "elfogadva";
            checkbox.style = "float: none;";
            checkbox.id = "elfogadva" + seged;
            checkbox.value = poszt.szoveg;

            label.classList = "form-check-label";
            label.setAttribute("for", "elfogadva" + seged);
            label.style = "font-weight: bolder;";
            label.innerHTML = "Elfogadva";

            div4.classList = "form-check form-switch mb-3";

            checkbox2.classList = "form-check-input torles";
            checkbox2.type = "checkbox";
            checkbox2.name = "torles";
            checkbox2.style = "float: none;";
            checkbox2.id = "torles" + seged;
            checkbox2.value = poszt.szoveg;

            label2.classList = "form-check-label";
            label2.setAttribute("for", "torles" + seged);
            label2.style = "font-weight: bolder;";
            label2.innerHTML = "Törlendő";
    
            span.innerHTML = poszt.felhasznalonev;
    
            small.innerHTML = poszt.datum;
    
            div3.appendChild(checkbox);
            div3.appendChild(label);

            div4.appendChild(checkbox2);
            div4.appendChild(label2);

            div2.appendChild(h5);
            div2.appendChild(p);
            div2.appendChild(div3);
            div2.appendChild(div4);
            div2.appendChild(span);
            div2.appendChild(small);
    
            div.appendChild(img);  
            div.appendChild(div2);
    
            fodiv.appendChild(div);
    
            cikkekHelye.appendChild(fodiv);

            seged++;
        }

        let mentesButton = document.createElement("button");

        mentesButton.type = "button";
        mentesButton.classList = "col-12 col-sm-12 col-md-12 col-lg-12 mx-auto btn btn-info btn-lg";

        if(window.innerWidth < 992 && window.innerWidth > 767)
            {
                mentesButton.style = "width: 70%; height: 5%; margin-top: 1%";
            }
            else if(window.innerWidth < 768 && window.innerWidth > 0)
            {
                mentesButton.style = "width: 50%; height: 5%; margin-top: 1%";
            }
            else
            {
                mentesButton.style = "width: 90%; height: 5%; margin-top: 1%";
            }

        mentesButton.innerHTML = "Mentés";
        mentesButton.id = "mentesElfogadvaEsTorles";
        mentesButton.onclick = mentesElfogadvaEsTorles;

        window.innerHeight = 912;

        cikkekHelye.appendChild(mentesButton);
    
        betoltodik = false;
        adminNyilakFrissites();
      }
    } catch (error) {
      console.error("Hiba a cikkek betöltésekor:", error);
      betoltodik = false;
    }
  }

function adminNyilakFrissites()
{
    //Bal nyíl letiltása, ha az első oldalon vagyunk
    balraNyil.disabled = (oldalSzam === 1);
    balraNyil.style.opacity = (oldalSzam === 1) ? 0.5 : 1; //opacitás

    //Jobb nyíl letiltása, ha az utolsó oldalon vagyunk
    jobbraNyil.disabled = (oldalSzam === 1);
    jobbraNyil.style.opacity = (oldalSzam === 1) ? 0.5 : 1; //opacitás
}

function kijelentkezes() {
    document.cookie = "felhasznalonev=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "id=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    let url = document.location.href;
    let ujUrl = url.replace("/index.html", "/login.html");
    document.location.href = ujUrl;
}

function osztalyValasztasEmailAlapjan(email) {
    let evfolyam = email[0] + email[1];
    let szak = email[2];

    if(email.length >= 3) {
        if(evfolyam[0] == "0") {
            evfolyam = evfolyam[1];
        }
        
        let osztaly = evfolyam + "." + szak.toUpperCase();
        let valasztahtoOsztalyok = $("registerOsztaly");

        valasztahtoOsztalyok.childNodes.forEach(vOsztaly => {
         if(vOsztaly.innerText.includes(osztaly)) {
                vOsztaly.selected = true;
            }
        });
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
        ev + ". " + (honap < 9 ? "0" + (honap+1) : (honap+1)) + ". " + (nap < 10 ? "0" + nap : nap) + ".";
}

function adminGomb()
{
    setLimit();
    nemElfogadottCikkek(oldalSzam);
}

function simaOldal()
{
    setLimit();
    cikkekBetoltese(oldalSzam);
    
    let adminGomb = document.getElementById("adminGomb");

    adminGomb.innerHTML = '<button type="button" class="btn btn-info btn-lg" id="adminGomba" onclick="adminGomb()">Admin oldal</button> <br><br>'
}

if(document.title == "Suliújság") {
    window.addEventListener("load", () => {
        setInterval(datumEsIdo, 1000);
        datumEsIdo();
        diakAdatok();
        setLimit();
        cikkekBetoltese(oldalSzam);
        loginAdatokMegjelenitese();
    });

    window.addEventListener("resize", () => {
        setLimit();
        cikkekBetoltese(oldalSzam);
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
    });
}

if(document.title == "Kezdőoldal") {
    $("registerEmail").addEventListener("input", () => {
        const email = $("registerEmail").value;

        osztalyValasztasEmailAlapjan(email);
    });

    $("registerSpan").addEventListener("click", () => {
        registerFormFeltoltes();
    });

    $("registerIskola").addEventListener("change", () => {
        osztalyokFeltoltes();
    });

    $("loginButton").addEventListener("click", login);
    $("registerButton").addEventListener("click", register);
}