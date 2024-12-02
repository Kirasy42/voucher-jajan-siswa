<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVouchersTable extends Migration
{
    public function up()
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id('id_voucher'); // Kolom ID unik untuk voucher
            $table->unsignedBigInteger('id_siswa'); // Kolom untuk ID siswa
            $table->dateTime('tanggal_berlaku'); // Kolom untuk tanggal berlaku
            $table->decimal('saldo', 10, 2); // Kolom untuk saldo
            $table->decimal('sisa_saldo', 10, 2); // Kolom untuk sisa saldo
            $table->timestamps(); // Kolom untuk created_at dan updated_at

            // Menambahkan foreign key
            $table->foreign('id_siswa')->references('id_siswa')->on('siswas')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('vouchers');
    }
}