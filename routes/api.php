<?php

use App\Http\Controllers\CikkekController;
use App\Http\Controllers\DiakokController;
use App\Http\Controllers\IskolakController;
use App\Http\Controllers\SzakokController;
use Illuminate\Support\Facades\Route;

//Cikkek(Controller)
Route::get("/posztok", [CikkekController::class, "CikkekLekerdezesse"]);
Route::post("/ujcikk", [CikkekController::class, "ujCikkController"]);
Route::get("/adminposztok", [CikkekController::class, "AdminCikkekLekerdezesse"]);
Route::post("/cikkelfogadas", [CikkekController::class, "cikkElfogadasController"]);
Route::post("/cikktorles", [CikkekController::class, "cikkTorlesController"]);


//Iskolak(Controller)
Route::get("/iskolak", [IskolakController::class, "Iskolak"]);
Route::post("/evfolyamok", [IskolakController::class, "Evfolyamok"]);


//Szakok(Controller)
Route::post("/szakok", [SzakokController::class, "Szakok"]);


//Diakok(Controller)
Route::get("/diakok", [DiakokController::class, "DiakLekerdezes"]);
Route::post("/diakNevAlapjan", [DiakokController::class, "DiakNevController"]);
Route::post("/registerdiak", [DiakokController::class, "RegisterDiak"]);
Route::post("/loginDiak", [DiakokController::class, "LoginDiak"]);
Route::post("/diakIdAlapjan", [DiakokController::class, "DiakIdController"]);
Route::post("/diakmodositas", [DiakokController::class, "DiakModositController"]);
Route::post("/diaktorles", [DiakokController::class, "DiakTorlesController"]);