function $(id) {
    return document.getElementById(id);
}

//Globális változók
let oldalSzam = 1; // Kezdő oldal
let limit = 8;   //Hány cikk jelenjen meg oldalanként
let oldalakSzama = 1; // Kezdetben 1 oldal, API frissíti
let betoltodik = false;
let admin = false;
let posztokDB;
let bejelentkezveMarad;

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

            adminGomb.innerHTML = '<button type="button" class="btn btn-info btn-lg" id="adminGomba" onclick="adminGomb()">Admin oldal</button> <br><br>';

            admin = true;
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

        console.log(cikkKep.name);

        if (cikkKep.name != "") {
            formData.append('kep', cikkKep); 
        }

        let lekeres = await fetch("./api/ujcikk", {
            method: "POST",
            body: formData,
        });

        if (lekeres.ok) {
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
            $("toastTitle").innerHTML = "Sikeres cikkfeltöltés!";
            $("toastBody").innerHTML = "A cikk megjelenítéséhez várjon a rendszergazda megerősítésére!";
            $("toastImg").src = "./img/green.png";
            toastBootstrap.show();

            $("cikkCim").value = "";
            $("cikkSzoveg").value = "";
            $("cikkKep").value = "";

            setLimit();
            cikkekBetoltese(oldalSzam);

        }
        else {
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
            $("toastTitle").innerHTML = "Sikertelen cikkfeltöltés!";
            $("toastBody").innerHTML = "Próbálja újra később!";
            $("toastImg").src = "./img/red.png";
            toastBootstrap.show();
        }
    }
    else {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
        $("toastTitle").innerHTML = "Sikertelen cikkfeltöltés!";
        $("toastBody").innerHTML = "Kérjük töltsön ki minden kötelező mezőt!";
        $("toastImg").src = "./img/yellow.png";
        toastBootstrap.show();
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
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
        $("toastTitle").innerHTML = "Sikertelen regisztráció!";
        $("toastBody").innerHTML = "Kérjük töltsön ki minden kötelező mezőt!";
        $("toastImg").src = "./img/yellow.png";
        toastBootstrap.show();
    }


    else if(jelszo != jelszoUjra) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
        $("toastTitle").innerHTML = "Sikertelen regisztráció!";
        $("toastBody").innerHTML = "A két jelszó nem egyezik!";
        $("toastImg").src = "./img/yellow.png";
        toastBootstrap.show();

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
            let keres = await fetch("./api/diakNevAlapjan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "nev" : felhasznaloNev
                }),
            });


            email.innerHTML = "";
            teljesNev = "";
            felhasznaloNev = "";
            iskola = "";
            osztaly = "";
            jelszo = "";
            jelszoUjra = "";

            if(keres.ok)
            {
                let adatok = await keres.json();
                let url = document.location.href;
                let ujUrl = url.replace("/login.html", "/index.html");
                document.location.href = ujUrl;
    
                document.cookie = "felhasznalonev=" + adatok[0]["felhasznalonev"] + ";";
                document.cookie = "id=" + adatok[0]["id"] + ";";
            }
        }

        else {
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
            $("toastTitle").innerHTML = "Sikertelen regisztráció!";
            $("toastBody").innerHTML = "Kérjük próbálja újra  később!";
            $("toastImg").src = "./img/red.png";
            toastBootstrap.show();
        }
    }
}

async function login() {
    let felhasznalonev = $("loginFelahsznaloNev").value;
    let jelszo = $("loginJelszo").value;

    if(felhasznalonev == "" || jelszo == "") {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
        $("toastTitle").innerHTML = "Sikertelen bejelentkezés!";
        $("toastBody").innerHTML = "Kérjük töltsön ki minden kötelező mezőt!";
        $("toastImg").src = "./img/yellow.png";
        toastBootstrap.show();
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

                    bejelentkezveMarad = $("loginMarad").checked;

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
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
                    $("toastTitle").innerHTML = "Sikertelen bejelentkezés!";
                    $("toastBody").innerHTML = "Nincs ilyen nevű diák az adatbázisban!";
                    $("toastImg").src = "./img/red.png";
                    toastBootstrap.show();
                }
            }

            else
            {
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
                $("toastTitle").innerHTML = "Sikertelen bejelentkezés!";
                $("toastBody").innerHTML = "Kérjük próbálja újra  később!";
                $("toastImg").src = "./img/red.png";
                toastBootstrap.show();
            }
            
        }
    
        else {
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
            $("toastTitle").innerHTML = "Sikertelen bejelentkezés!";
            $("toastBody").innerHTML = "Kérjük próbálja újra  később!";
            $("toastImg").src = "./img/red.png";
            toastBootstrap.show();
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

    if(admin)
    {
        let adminGomb = document.getElementById("adminGomb");

        adminGomb.innerHTML = '<button type="button" class="btn btn-info btn-lg" id="adminGomba" onclick="adminGomb()">Admin oldal</button> <br><br>';
    }
    

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
      let h5 = document.createElement("h3");
      let p = document.createElement("p");
      let span = document.createElement("h5");
      let small = document.createElement("small");

      fodiv.className = "col-12 col-sm-12 col-md-6 col-lg-3 mx-auto";

      div.className = "card align-items-center";
      div.style = "width: auto; background-color: rgb(235, 200, 148);";

      div2.appendChild(h5);
      div2.appendChild(p);
      div2.appendChild(span);
      div2.appendChild(small);

      if(poszt.kep != "data:image\/ismeretlen;base64,")
      {
        let img = document.createElement("img");

        img.src = poszt.kep;
        img.classList = "card-img-top nagyitosKep";
        img.addEventListener("click", () => {
            KepKinagyitasa(img.src, poszt.felhasznalonev, poszt.datum);
        });
        img.style = "height: 30%;";
        img.style = "width: 30%;";

        div.appendChild(img);  
      }

      div2.classList = "card-body";

      h5.classList = "card-title";
      h5.innerHTML = poszt.cim;

      p.classList = "card-text";
      p.innerHTML = poszt.szoveg;
      p.style = "width: 100%;";

      span.innerHTML = poszt.felhasznalonev;

      small.innerHTML = poszt.datum.split(' ')[0].replaceAll('-', '.') + ". " + poszt.datum.split(' ')[1];

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

async function mentesElfogadvaEsTorles(oldal) {
    let cookies = document.cookie;
    let adminId = parseInt(cookies.split(";")[1].split("=")[1]);
    let cikkSzoveg = "";
    let cikkSzoveg2 = "";
    let eredmeny;
    let eredmeny2;
    let cikkElfogadasa;
    let cikkTorles;

    let vantorles = false;
    let vanelfogadas = false;

    for(let i = 0; i < posztokDB; i++)
    {
        let radios = document.getElementsByName("radiobutton" + i);

        for (let j = 0; j < radios.length; j++) {
            if(radios[0].checked)
            {
                cikkSzoveg = radios[0].value;
                cikkElfogadasa = await fetch(`./api/cikkelfogadas`, {
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
                vanelfogadas = true;

                break;
            }
            else if(radios[1].checked)
            {
                cikkSzoveg2 = radios[0].value;
                cikkTorles = await fetch(`./api/cikktorles`, {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({
                        "cikkSzoveg" : cikkSzoveg2
                    })
                });
    
                eredmeny2 = await cikkTorles.json();
                vantorles = true;

                break;
            }
            else
            {
                continue;
            }
        }
    }

    if(vanelfogadas == false && vantorles == false)
    {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
        $("toastTitle").innerHTML = "Sikertelen mentés!";
        $("toastBody").innerHTML = "Kérjük jelöljön ki legalább egy cikket elfogadásra/törlésre!";
        $("toastImg").src = "./img/yellow.png";
        toastBootstrap.show();
    }
    else
    {
        let cikkLekeres = await fetch(`./api/adminposztok?oldal=${oldal}&limit=${limit}`);
        let valasz = await cikkLekeres.json();
    
        if(valasz.valasz == "Nincsenek találatok!")
        {
            location.reload();
        }
        else
        {
            if(vanelfogadas && vantorles && cikkElfogadasa.ok && cikkTorles.ok)
            {
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
                $("toastTitle").innerHTML = "Cikkek kezelése sikeres!";
                $("toastBody").innerHTML = "A kiválasztott cikk(ek)et sikeresen elfogadta/törölte!";
                $("toastImg").src = "./img/green.png";
                toastBootstrap.show();
            }
            else if(vanelfogadas && cikkElfogadasa.ok)
            {
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
                $("toastTitle").innerHTML = "Cikkek elfogadása sikeres!";
                $("toastBody").innerHTML = "A kiválasztott cikk(ek)et a diákjai már olvashatják és élvezhetik is!";
                $("toastImg").src = "./img/green.png";
                toastBootstrap.show(); 
            }
            else if(vantorles && cikkTorles.ok)
            {
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
                $("toastTitle").innerHTML = "Cikkek törlése sikeres!";
                $("toastBody").innerHTML = "A kiválasztott cikk(ek)et diákjai soha nem fogják elolvasni!";
                $("toastImg").src = "./img/green.png";
                toastBootstrap.show();    
            }
            else
            {
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
                $("toastTitle").innerHTML = "Cikkek kezelése sikertelen!";
                $("toastBody").innerHTML = "Kérjük próbálja újra később!";
                $("toastImg").src = "./img/red.png";
                toastBootstrap.show(); 
            }
            nemElfogadottCikkek(oldalSzam);
        }
    }
}

async function nemElfogadottCikkek(oldal) {
    let adminGomb = document.getElementById("adminGomb");

    adminGomb.innerHTML = '<button type="button" class="btn btn-info btn-lg" id="visszaSimaOldal" onclick="simaOldal()">Cikk oldal</button> <br><br>';

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
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
        $("toastTitle").innerHTML = "Nincs megjeleníthető cikk!";
        $("toastBody").innerHTML = "Diákjai még nem töltöttek fel elfogadásra váró cikk(ek)et!";
        $("toastImg").src = "./img/yellow.png";
        toastBootstrap.show();

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
            let h5 = document.createElement("h3");
            let p = document.createElement("p");
            let span = document.createElement("h5");
            let small = document.createElement("small");
            let radio = document.createElement("input");
            let label = document.createElement("label");
            let div3 = document.createElement("div");
            let radio2 = document.createElement("input");
            let label2 = document.createElement("label");
            let div4 = document.createElement("div");
    
            fodiv.className = "col-12 col-sm-12 col-md-6 col-lg-3 mx-auto";
    
            div.className = "card align-items-center";
            div.style = "width: auto; background-color: rgb(235, 200, 148);";

                
            div3.appendChild(radio);
            div3.appendChild(label);

            div4.appendChild(radio2);
            div4.appendChild(label2);

            div2.appendChild(h5);
            div2.appendChild(p);
            div2.appendChild(div3);
            div2.appendChild(div4);
            div2.appendChild(span);
            div2.appendChild(small);


            if(poszt.kep != "data:image\/ismeretlen;base64,")
            {
                let img = document.createElement("img");
        
                img.src = poszt.kep;
                img.classList = "card-img-top nagyitosKep";
                img.addEventListener("click", () => {
                    KepKinagyitasa(img.src, poszt.felhasznalonev, poszt.datum);
                });
                img.style = "height: 30%;";
                img.style = "width: 30%;";

                div.appendChild(img); 
            }
    
            
    
            div2.classList = "card-body";
    
            h5.classList = "card-title";
            h5.innerHTML = poszt.cim;
    
            p.classList = "card-text";
            p.innerHTML = poszt.szoveg;
            p.style = "width: 100%;";

            div3.classList = "form-check form-switch mb-3";

            radio.classList = "form-check-input elfogadva";
            radio.type = "radio";
            radio.name = "radiobutton" + seged;
            radio.style = "float: none;";
            radio.id = "elfogadva" + seged;
            radio.value = poszt.szoveg;

            label.classList = "form-check-label";
            label.setAttribute("for", "elfogadva" + seged);
            label.style = "font-weight: bolder;";
            label.innerHTML = "Elfogadva";

            div4.classList = "form-check form-switch mb-3";

            radio2.classList = "form-check-input torles";
            radio2.type = "radio";
            radio2.name = "radiobutton" + seged;
            radio2.style = "float: none;";
            radio2.id = "torles" + seged;
            radio2.value = poszt.szoveg;

            label2.classList = "form-check-label";
            label2.setAttribute("for", "torles" + seged);
            label2.style = "font-weight: bolder;";
            label2.innerHTML = "Törlendő";
    
            span.innerHTML = poszt.felhasznalonev;
    
            small.innerHTML = poszt.datum.split(' ')[0].replaceAll('-', '.') + ". " + poszt.datum.split(' ')[1];
    
 
            div.appendChild(div2);
    
            fodiv.appendChild(div);
    
            cikkekHelye.appendChild(fodiv);

            seged++;
            posztokDB = posztok.length;
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
        mentesButton.onclick = () => {mentesElfogadvaEsTorles(1)};

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

async function profilModositasBetoltes()
{
    let cookies = document.cookie;
    let id = parseInt(cookies.split(";")[1].split("=")[1]);

    let fnev = document.getElementById("felhasznalonev");
    let tnev = document.getElementById("teljesnev");
    let emailcim = document.getElementById("email");

    let lekeres = await fetch("./api/diakIdAlapjan", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "id" : id
        })
    })

    if(lekeres.ok)
    {
        let eredmeny = await lekeres.json();

        for (const e of eredmeny) {
            fnev.value = e.felhasznalonev;
            tnev.value = e.nev;
            emailcim.value = e.email;
        }
    }
}

async function profilMentes()
{
    let cookies = document.cookie;
    let id = parseInt(cookies.split(";")[1].split("=")[1]);

    let fnev = document.getElementById("felhasznalonev");
    let tnev = document.getElementById("teljesnev");
    let emailcim = document.getElementById("email");
    let jelszo = document.getElementById("password");

    let kuldendoAdatok = {
        "nev" : tnev.value,
        "id" : id,
        "felhasznalonev" : fnev.value,
        "email" : emailcim.value,
        "jelszo" : jelszo.value
    }

    let keres = await fetch("./api/diakmodositas", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(kuldendoAdatok)
    })

    if(keres.ok)
    {
        let eredmeny = await keres.json();
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
        $("toastTitle").innerHTML = "Sikeres profil módosítás!";
        $("toastBody").innerHTML = "Sikeresen módosítottad a profilod adatait!";
        $("toastImg").src = "./img/green.png";
        toastBootstrap.show();

        document.cookie = "felhasznalonev=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "id=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        location.reload();

        if(bejelentkezveMarad) {
            const d = new Date();
            let napigMaradBejelentkezve = 300;
            d.setTime(d.getTime() + (napigMaradBejelentkezve*24*60*60*1000));
            let lejaratiDatum = d.toUTCString();

            document.cookie = "felhasznalonev=" + eredmeny[0].felhasznalonev + ";expires=" + lejaratiDatum + ";";
            document.cookie = "id=" + eredmeny[0].id + ";expires=" + lejaratiDatum + ";";
        }

        else {
            document.cookie = "felhasznalonev=" + eredmeny[0].felhasznalonev + ";";
            document.cookie = "id=" + eredmeny[0].id + ";";
        }
    }
    else
    {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
        $("toastTitle").innerHTML = "Sikertelen profil módosítás!";
        $("toastBody").innerHTML = "Kérlük próbáld újra  később!";
        $("toastImg").src = "./img/red.png";
        toastBootstrap.show();
    }
}

function KepKinagyitasa(src, feltoltoDiak, datum) {
    const modal = $("kepModal");
    const modalImg = $("nagyKep");
    const modalText = $("caption");

    modal.style.display = "block";
    modalImg.src = src;
    modalText.innerText = feltoltoDiak + "\n" + datum.split(' ')[0].replaceAll('-', '. ') + ".";

    var span = $("kepModalBezaras");

    span.onclick = function() {
        modal.style.display = "none";
    }
}

async function fiokTorles()
{
    let cookies = document.cookie;
    let id = parseInt(cookies.split(";")[1].split("=")[1]);

    let keres = await fetch("./api/diaktorles", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "id" : id
        })
    });

    if(keres.ok)
    {
        document.cookie = "felhasznalonev=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "id=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
        $("toastTitle").innerHTML = "Sikeresen törölte profilját!";
        $("toastBody").innerHTML = "Reméljük újralátjuk!";
        $("toastImg").src = "./img/sad.png";
        toastBootstrap.show();

        let url = document.location.href;
        let ujUrl = url.replace("/index.html", "/login.html");
        document.location.href = ujUrl;
    }
    else
    {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("liveToast"));
        $("toastTitle").innerHTML = "Sikertelen törlés!";
        $("toastBody").innerHTML = "Kérjük próbálja újra később!";
        $("toastImg").src = "./img/red.png";
        toastBootstrap.show();
    }
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

    $("profilSzerkesztes").addEventListener("click", () => {
        profilModositasBetoltes();
    });

    $("profilMentes").addEventListener("click", () => {
        profilMentes();
    });

    $("fiokTorlesIgen").addEventListener("click", () => {
        fiokTorles();
    })
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