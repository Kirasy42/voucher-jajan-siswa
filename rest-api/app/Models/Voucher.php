<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;

    protected $table = 'vouchers'; // Nama tabel

    protected $primaryKey = 'id_voucher'; // Menentukan kolom primary key

    protected $fillable = [
        'id_siswa',
        'tanggal_berlaku',
        'saldo',
        'sisa_saldo',
    ];

    // Relasi dengan model Siswa
    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'id_siswa', 'id_siswa');
    }
}