<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    // Funcion for Make a New Voucher to SISWA id
    public function make($id){
        // Validasi untuk memastikan id_siswa yang diberikan ada di tabel siswas
        $siswa = \App\Models\Siswa::find($id);
        
        if (!$siswa) {
            return response()->json(['message' => 'Siswa tidak ditemukan.'], 404);
        }

        // Cek apakah siswa sudah memiliki voucher yang dibuat pada hari ini
        $existingVoucher = Voucher::where('id_siswa', $id)
        ->whereDate('tanggal_berlaku', now()->toDateString())
        ->first();

        if ($existingVoucher) {
            return response()->json(['message' => 'Siswa sudah memiliki voucher yang dibuat hari ini.'], 400);
        }

        try {
            // Membuat voucher baru dengan tanggal hari ini dan saldo 15000
            $voucher = Voucher::create([
                'id_siswa' => $id, // Menggunakan id dari parameter route
                'tanggal_berlaku' => now(), // Mengisi dengan tanggal hari ini
                'saldo' => 15000, // Mengisi saldo dengan 15000
                'sisa_saldo' => 15000, // Mengisi sisa saldo dengan 15000
            ]);
    
            return response()->json([
                'message' => 'Voucher berhasil dibuat.',
                'data' => $voucher
            ], 201); // Mengembalikan response dengan status 201 Created
    
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal membuat voucher: ' . $e->getMessage()
            ], 500); // Mengembalikan response dengan status 500 Internal Server Error
        }
    }

    // Get All Vouchers
    public function index(){
        // Memanggil semua data Voucher dengan relasi Siswa
        $vouchers = Voucher::with('siswa')->get();

        // Melakukan validasi apakah data $vouchers kosong
        if ($vouchers->isEmpty()) {
            $data = [
                "message" => "Data of Voucher is Empty"
            ];
            $statuscode = 200;
        } else {
            $data = [
                "message" => "Get All Data of Voucher",
                "data" => $vouchers->map(function ($voucher) {
                    return [
                        'id_voucher' => $voucher->id_voucher,
                        'id_siswa' => $voucher->id_siswa,
                        'nama_siswa' => $voucher->siswa->nama_siswa, // Ambil nama siswa dari relasi
                        'tanggal_berlaku' => $voucher->tanggal_berlaku,
                        'saldo' => $voucher->saldo,
                        'sisa_saldo' => $voucher->sisa_saldo,
                        'created_at' => $voucher->created_at,
                        'updated_at' => $voucher->updated_at,
                    ];
                })
            ];
            $statuscode = 200;
        }

        return response()->json($data, $statuscode);
    }

    // Get Owner of a Voucher
    public function voucherOwner($id){
        // Mencari voucher berdasarkan ID
        $voucher = Voucher::with('siswa')->find($id);

        // Memeriksa apakah voucher ditemukan
        if (!$voucher) {
            return response()->json([
                'message' => 'Voucher not found'
            ], 404);
        }

        // Mengembalikan informasi pemilik voucher
        return response()->json([
            'message' => 'Voucher found',
            'data' => [
                'id_voucher' => $voucher->id_voucher,
                'id_siswa' => $voucher->id_siswa,
                'nama_siswa' => optional($voucher->siswa)->nama_siswa, // Ambil nama siswa dari relasi
                'tanggal_berlaku' => $voucher->tanggal_berlaku,
                'saldo' => $voucher->saldo,
                'sisa_saldo' => $voucher->sisa_saldo,
                'created_at' => $voucher->created_at,
                'updated_at' => $voucher->updated_at,
            ]
        ], 200);
    }

    // Get Siswa Voucher Balance of the Day
    public function checkBalance($id){
        // Validasi untuk memastikan id_siswa yang diberikan ada di tabel siswas
        $siswa = \App\Models\Siswa::find($id);
        
        if (!$siswa) {
            return response()->json(['message' => 'Siswa tidak ditemukan.'], 404);
        }

        // Cek voucher yang ada untuk siswa pada hari ini
        $voucher = Voucher::where('id_siswa', $id)
            ->whereDate('tanggal_berlaku', now()->toDateString())
            ->first();

        if (!$voucher) {
            return response()->json(['message' => 'Voucher tidak ditemukan untuk siswa pada hari ini.'], 404);
        }

        // Mengembalikan saldo voucher
        return response()->json([
            'message' => 'Saldo voucher ditemukan.',
            'nama_siswa' => $voucher->siswa->nama_siswa,
            'saldo' => $voucher->sisa_saldo
        ], 200); // Mengembalikan response dengan status 200 OK
    } 
}
