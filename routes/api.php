<?php

use App\Http\Controllers\CikkekController;
use App\Http\Controllers\DiakokController;
use App\Http\Controllers\IskolakController;
use App\Http\Controllers\SzakokController;
use Illuminate\Support\Facades\Route;

Route::get("/posztok", [CikkekController::class, "CikkekLekerdezesse"]);
Route::post("/ujcikk", [CikkekController::class, "ujCikkController"]);


Route::get("/iskolak", [IskolakController::class, "Iskolak"]);
Route::post("/evfolyamok", [IskolakController::class, "Evfolyamok"]);


Route::post("/szakok", [SzakokController::class, "Szakok"]);


Route::get("/diakok", [DiakokController::class, "DiakLekerdezes"]);
Route::post("/diakNevAlapjan", [DiakokController::class, "DiakNevController"]);
Route::post("/registerDiak", [DiakokController::class, "RegisterDiak"]);
Route::post("/loginDiak", [DiakokController::class, "LoginDiak"]);