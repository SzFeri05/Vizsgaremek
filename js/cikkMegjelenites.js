async function cikkMegjelenites() {
    let cikkLekeres = await fetch("./php/SQLkeresek.php/posztok", {
        method : "POST"
    });
    let posztok = await cikkLekeres.json();

    console.log(posztok);


    let elsoLap = document.getElementById("elsoLap");
    let ujsagColok = document.getElementsByClassName("ujsagCol")

    /*for (const poszt of posztok) {

        let fieldset = document.createElement("fieldset");
        let legend = document.createElement("legend");
        let h1 = document.createElement("h1");
        let p = document.createElement("p");
        let small = document.createElement("small");

        legend.innerHTML = poszt.postDiakID;
        h1.innerHTML = poszt.postCim;
        p.innerHTML = poszt.postSzoveg;
        small.innerHTML = poszt.PostLetrehozasDatuma;


        fieldset.appendChild(legend);
        fieldset.appendChild(h1);
        fieldset.appendChild(p);
        fieldset.appendChild(small);

            
        for (const col of ujsagColok) {
            col.appendChild(fieldset);
        }
    }*/
}



window.addEventListener("load", cikkMegjelenites);