<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    protected $table = 'transaksi';

    protected $fillable = [
        'id_voucher',
        'jumlah_pengurangan',
        'sisa_saldo',
        'tanggal',
    ];

    public function voucher()
    {
        return $this->belongsTo(Voucher::class, 'id_voucher');
    }
}