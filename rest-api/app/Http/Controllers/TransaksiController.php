<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use App\Models\Voucher;
use Illuminate\Http\Request;

class TransaksiController extends Controller
{
    public function recordTransaction(Request $request)
    {
        // Validasi input
        $request->validate([
            'id_voucher' => 'required|exists:vouchers,id_voucher', // Pastikan id_voucher ada di tabel vouchers
            'jumlah_pengurangan' => 'required|numeric|min:0',
        ]); 

        // Contoh penggunaan di Postman (Method POST)
        // {
        //     "id_voucher": 1,
        //     "jumlah_pengurangan": 2000
        // }

        // Mencari voucher berdasarkan ID
        $voucher = Voucher::find($request->id_voucher);
        
        if (!$voucher) {
            return response()->json(['message' => 'Voucher tidak ditemukan.'], 404);
        }

        // Cek apakah saldo cukup
        if ($voucher->sisa_saldo < $request->jumlah_pengurangan) {
            return response()->json(['message' => 'Saldo tidak cukup.'], 400);
        }

        // Mengurangi saldo voucher
        $voucher->sisa_saldo -= $request->jumlah_pengurangan;
        $voucher->save();

        // Mencatat transaksi
        $transaksi = Transaksi::create([
            'id_voucher' => $voucher->id_voucher,
            'jumlah_pengurangan' => $request->jumlah_pengurangan,
            'sisa_saldo' => $voucher->sisa_saldo,
            'tanggal' => now(),
        ]);

        return response()->json([
            'message' => 'Transaksi berhasil dicatat.',
            'data' => $transaksi
        ], 201);
    }

    public function getTransactionsByVoucher($id){
        $transaksi = Transaksi::where('id_voucher', $id)->get();

        if ($transaksi->isEmpty()) {
            return response()->json(['message' => 'Tidak ada transaksi ditemukan untuk voucher ini.'], 404);
        }

        return response()->json(
            [
                'message' => 'Transaksi Ditemukan!',
                'data' => $transaksi
            ], 200);
    }
}