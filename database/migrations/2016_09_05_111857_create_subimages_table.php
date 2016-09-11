<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubimagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subimages', function(Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->boolean('special');
            $table->string('image');
            $table->string('imagebig');
            $table->string('url');
            $table->integer('position');
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
        Schema::drop('subimages');   
    }
}
