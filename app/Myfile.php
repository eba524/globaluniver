<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Myfile extends Model
{
    protected $table = 'myfiles';

    protected $fillable = ['id', 'title', 'media', 'body'];
}
