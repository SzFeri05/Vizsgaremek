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
                        <p class="card-text"><span id="ora">Óra.Perc.Másodperc</span></p>
                        <p class="card-text"><small class="text-muted" id="datum">Év.Hónap.Nap</small></p>
                    </div>
                </div>
            </div>
        </div>


        <!--Login modal-->
        <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginModalLabel">Bejelentkezés</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="./php/login.php" method="POST">
                        <input type="text" name="username" id="username" placeholder="Felhasználónév" style="padding: 5px;">
                        <br>
                        <br>
                        <input type="password" name="password" id="password" placeholder="Jelszó" style="padding: 5px;">

                        <br>
                        <br>

                        <input type="submit" value="Bejelentkezés!">
                    </form>
                </div>
                <div class="modal-footer">
                    <span>Még nincs fiókja? Regisztráljon!</span>
                    <button class="btn btn-primary" data-bs-target="#registerModal" data-bs-toggle="modal" data-bs-dismiss="modal">Regisztráció</button>
                </div>
                </div>
            </div>
        </div>

        <!--Register modal-->
        <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="registerModalLabel">Regisztráció</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="./php/register.php" method="POST">
                        <input type="text" name="username" id="Rusername" placeholder="Felhasználónév" style="padding: 5px;">
                        <br>
                        <br>
                        <input type="text" name="iskola" id="Riskola" placeholder="Iskolai e-mail címe" style="padding: 5px;">
                        <br>
                        <br>
                        <input type="text" name="osztály" id="Rosztaly" placeholder="Osztály (pl.: 12.C)" style="padding: 5px;">
                        <br>
                        <br>
                        <input type="password" name="password" id="Rpassword" placeholder="Jelszó" style="padding: 5px;">
                        <br>
                        <br>
                        <input type="password" name="password" id="RpasswordUjra" placeholder="Jelszó újra" style="padding: 5px;">

                        <br>
                        <br>

                        <input type="submit" value="Regisztrálás!">
                    </form>
                </div>
                <div class="modal-footer">
                    <span>Már van fiókja? Jelentkezzen be!</span>
                    <button class="btn btn-primary" data-bs-target="#loginModal" data-bs-toggle="modal" data-bs-dismiss="modal">Bejelentkezés</button>
                </div>
                </div>
            </div>
        </div>

        <!--Login modal nyitó-->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
            Launch demo modal
        </button>


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