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
        <div class="oldalLeptetoNyil">
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

        <div class="oldalLeptetoNyil">
            <img id="jobbraNyil" src="./img/jobbNyíl.png">
        </div>
    </div>


    <!--Bootstrap 5 JavaScript Bundle-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <!--Saját JavaScript-->
    <script src="./js/index.js"></script>
</body>
</html>