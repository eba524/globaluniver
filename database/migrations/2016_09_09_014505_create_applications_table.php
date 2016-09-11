<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateApplicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->increments('id');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('gender');
            $table->date('birth');
            $table->string('birthplace');
            $table->string('nationality');
            $table->string('register');
            $table->string('passport');
            $table->string('address');
            $table->string('telephone');
            $table->string('mobile');
            $table->string('email');
            $table->text('family');
            $table->string('schooladdress');
            $table->string('country');
            $table->string('score');
            $table->string('number');
            $table->string('certificate');
            $table->string('profession');
            $table->string('payment');
            $table->string('amount');
            $table->string('photo');
            $table->timestamps();
        }); 
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('applications');
    }
}
