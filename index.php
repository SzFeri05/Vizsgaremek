<?php
    include "./php/databaseConnect.php";
?>

<html lang="hu">
<head>
    <!--"meta" tagek-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!--Bootstrap 5 CSS-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <!--Saját CSS-->
    <link rel="stylesheet" href="./css/index.css">

    <!--"title" tag-->
    <title>Suliújság</title>
</head>
<body>
    <!--Fő "div", az újság lapjait tartamlazza-->
    <div id="foDiv">

        <!--Navbar-->
        <button class="btn btn-dark bg-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" id="hamburgerButton"><img src="./img/hamburgerMenu.png" id="hamburgerIcon"></button>

        <!--Offcanvas-->
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <img src="./img/TesztPFP.jpg" class="card-img-top rounded-circle" id="pfp">
                <h5 id="offcanvasRightLabel">Iskola Teljes Neve</h5>
                <h5 id="offcanvasRightLabel">Név, osztály</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body" id="offcanvasUjCikkGomb">
                <button type="button" class="btn btn-secondary btn-lg">Új cikk feltöltése</button>
            </div>
            <div class="offcanvas-body" id="offcanvasDatum">
                <div class="card mb-3">
                    <div class="card-body">
                        <p class="card-text">Év.Hónap.Nap</p>
                        <p class="card-text"><small class="text-muted">Óra.Perc.Másodperc</small></p>
                    </div>
                </div>
            </div>
        </div>

        <!--Bal oldalléptető nyíl-->
        <div class="oldalLeptetoNyil" id="balNyilDiv">
            <img id="balraNyil" src="./img/balNyíl.png">
        </div>
        <!--Az első "újságoldal"-->
        <div id="elsoLap">
            <!--Ide jön a BAL oldali újságlap tartalma-->
        </div>

        <!--A második "újságoldal"-->
        <div id="masodikLap">
            <!--Ide jön a JOBB oldali újságlap tartalma-->
        </div>
        <!--Jobb oldalléptető nyíl-->
        <div class="oldalLeptetoNyil" id="jobbNyilDiv">
            <img id="jobbraNyil" src="./img/jobbNyíl.png">
        </div>
    </div>


    <!--Bootstrap 5 JavaScript Bundle-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <!--Saját JavaScript-->
    <script src="./js/index.js"></script>
</body>
</html>