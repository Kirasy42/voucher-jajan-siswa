<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransaksisTable extends Migration
{
    public function up()
    {
        Schema::create('transaksi', function (Blueprint $table) {
            $table->id('id_transaksi'); // Auto-incrementing ID
            $table->unsignedBigInteger('id_voucher'); // Foreign key
            $table->decimal('jumlah_pengurangan', 10, 2); // Jumlah pengurangan
            $table->decimal('sisa_saldo', 10, 2); // Sisa saldo
            $table->dateTime('tanggal'); // Tanggal transaksi
            $table->timestamps(); // Menambahkan created_at dan updated_at

            // Menambahkan foreign key constraint
            $table->foreign('id_voucher')->references('id_voucher')->on('vouchers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transaksi');
    }
}