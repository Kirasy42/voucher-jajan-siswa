<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




use App\Http\Controllers\SiswaController;

Route::get('/siswa', [SiswaController::class, 'index']);
Route::post('/siswa', [SiswaController::class, 'store']);
Route::get('/siswa/{id}', [SiswaController::class, 'show']);
Route::put('/siswa/{id}', [SiswaController::class, 'update']);
Route::delete('/siswa/{id}', [SiswaController::class, 'destroy']);
Route::get('/siswa/search/{name}', [SiswaController::class, 'search']);




use App\Http\Controllers\VoucherController;

Route::post('/vouchers/make/{id}', [VoucherController::class, 'make']);
Route::get('/vouchers', [VoucherController::class, 'index']);
Route::get('/vouchers/{id}', [VoucherController::class, 'voucherOwner']); // id dari si VOUCHER
Route::get('/balance/{id}', [VoucherController::class, 'checkBalance']); // id dari si SISWA




use App\Http\Controllers\TransaksiController;

Route::post('/transactions', [TransaksiController::class, 'recordTransaction']);
Route::get('/transactions/{id}', [TransaksiController::class, 'getTransactionsByVoucher']);
Route::get('/transactions', [TransaksiController::class, 'getTransactions']);