<?php

use App\Http\Controllers\test;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/email/verify/{id}/{hash}', function($id) {

    \App\Models\User::findOrFail($id)->markEmailAsVerified();
    return response()->json(['status' => 'verified'], 200);

})->middleware( 'signed', 'throttle:6,1')->name('verification.verify');


Route::middleware(['throttle:3,1'])->post('forgot-password', [PasswordResetController::class, 'send']);

Route::post('reset-password', [PasswordResetController::class, 'reset']);