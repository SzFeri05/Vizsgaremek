<?php
include "./php/databaseConnect.php";
?>

<html lang="hu">

<head>
    <!--"meta" tagek-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--Bootstrap 5 CSS-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <!--Saját CSS-->
    <link rel="stylesheet" href="./css/index.css">

    <!--"title" tag-->
    <title>Suliújság</title>
</head>

<body>
    <!--LOGIN, REGISTER, ÚJ CIKK modals-->

    <!--login-->
    <div class="modal fade" id="loginModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Bejelentkezés</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="loginFelahsznaloNev" class="form-label">Felhasználónév:</label>
                            <input type="text" class="form-control" id="loginFelahsznaloNev">
                        </div>

                        <div class="mb-3">
                            <label for="loginJelszo" class="form-label">Jelszó:</label>
                            <input type="password" class="form-control" id="loginJelszo">
                        </div>

                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="loginMarad">
                            <label class="form-check-label" for="loginMarad">Maradjak bejelentkezve</label>
                        </div>

                        <button type="button" class="btn btn-primary" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight">Bejelentkezés!</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!--register-->
    <div class="modal fade" id="registerModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Regisztráció</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="registerEmail" class="form-label">Email cím:</label>
                            <input type="email" class="form-control" id="registerEmail">
                        </div>

                        <div class="mb-3">
                            <label for="registerTeljesNev" class="form-label">Teljes név:</label>
                            <input type="text" class="form-control" id="registerTeljesNev">
                        </div>

                        <div class="mb-3">
                            <label for="registerFelahsznaloNev" class="form-label">Felhasználónév:</label>
                            <input type="text" class="form-control" id="registerFelahsznaloNev">
                        </div>

                        <div class="mb-3">
                            <label for="registerIskola" class="form-label">Iskola:</label>

                            <select class="form-select" id="registerIskola">

                            </select>
                        </div>


                        <div class="mb-3">
                            <label for="registerOsztaly">Osztály:</label>
                            <select class="form-select" id="registerOsztaly">

                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="registerJelszo" class="form-label">Jelszó:</label>
                            <input type="password" class="form-control" id="registerJelszo">
                        </div>

                        <div class="mb-3">
                            <label for="registerJelszoUjra" class="form-label">Jelszó újra:</label>
                            <input type="password" class="form-control" id="registerJelszoUjra">
                        </div>

                        <button type="button" class="btn btn-info" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight">Regisztráció!</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!--Új cikk feltöltése modal-->
    <div class="modal fade" id="ujcikkModal" tabindex="-1" aria-labelledby="ujcikkModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ujcikkModalLabel">Új Cikk Létrehozása</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"></button>
                </div>
                <div class="modal-body">
                    <form action="./php/ujcikk.php" method="POST">
                        <div class="mb-3">
                            <label for="cikkCim" class="form-label">Cím:</label>
                            <input type="text" class="form-control" id="cikkCim">
                        </div>
                        <div class="mb-3">
                            <label for="cikkSzoveg">Szöveg:</label>
                            <textarea class="form-control" id="cikkSzoveg" style="height: 100px"></textarea>
                        </div>
                        <br>
                        <div class="input-group mb-3">
                            <input type="file" class="form-control" id="cikkKep">
                        </div>
                        <button type="button" class="btn btn-success" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight" id="cikkFeltoltes">Feltöltés!</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>



    <!--Fő "div", az újság lapjait tartamlazza-->
    <div id="foDiv" class="container-fluid">
        <div class="row">
            <div class="col col-md-1">
                <!--Navbar-->
                <button class="btn btn-dark bg-secondary" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" id="hamburgerButton"><img
                        src="./img/hamburgerMenu.png" id="hamburgerIcon"></button>
            </div>

            <div class="col col-md-11">
                <div class="row" id="foKep">
                    <!--Bal oldalléptető nyíl-->
                    <div class="oldalLeptetoNyil col col-md-1" id="balNyilDiv">
                        <img id="balraNyil" src="./img/balNyíl.png">
                    </div>

                    <!--Az első "újságoldal"-->
                    <div class="col col-md-4" id="elsoLap">
                        <!--Ide jön a BAL oldali újságlap tartalma-->
                        <div class="row">
                            <div class="ujsagCol col col-3">
                                <!--Bal oldali vékony-->
                            </div>

                            <div class="ujsagCol col col-6">
                                <!--Középső vastag-->
                            </div>

                            <div class="ujsagCol col col-3">
                                <!--Jobb oldali vékony-->
                            </div>
                        </div>
                    </div>


                    <!--A második "újságoldal"-->
                    <div class="col col-md-4" id="masodikLap">
                        <!--Ide jön a JOBB oldali újságlap tartalma-->
                    </div>

                    <!--Jobb oldalléptető nyíl-->
                    <div class="oldalLeptetoNyil col col-md-1" id="jobbNyilDiv">
                        <img id="jobbraNyil" src="./img/jobbNyíl.png">
                    </div>
                </div>
            </div>
        </div>

        <!--Offcanvas-->
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <img src="./img/TesztPFP.jpg" alt="Profilkép" id="profilKep" title="Feri">

                <h5 class="offcanvas-title" id="offcanvasTitle">Felhasznalonev</h5>

                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
            </div>

            <hr>

            <div class="offcanvas-body">
                <h4 class="h4OC">Iskola</h4>
                <h5 class="h5OC">VSZC Ipari Technikum</h5>

                <h4 class="h4OC">Név</h4>
                <h5 class="h5OC">Tivadari Soma István</h5>

                <hr>

                <!--Gombok-->
                <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#loginModal"
                    data-bs-dismiss="offcanvas">Bejelentkezés</button>
                <br>
                <br>
                <button type="button" id="registerButton" class="btn btn-info btn-lg" data-bs-toggle="modal" data-bs-target="#registerModal"
                    data-bs-dismiss="offcanvas">Regisztráció</button>
                <br>
                <br>
                <button type="button" class="btn btn-success btn-lg" data-bs-toggle="modal"
                    data-bs-target="#ujCikkModal" data-bs-dismiss="offcanvas">Új cikk feltöltése</button>
            </div>
        </div>


        <!--Bootstrap 5 JavaScript Bundle-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"></script>

        <!--Saját JavaScript-->
        <script src="./js/index.js"></script>
</body>

</html>