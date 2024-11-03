<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProtectedController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protege a rota de logout com o middleware `auth:api`
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');

// Outras rotas protegidas com o middleware `auth:api`
Route::get('/me', [AuthController::class, 'me'])->middleware('auth:api');
Route::middleware('auth:api')->get('/protected', [ProtectedController::class, 'index']);


