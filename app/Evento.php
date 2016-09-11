<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    protected $table = 'eventos';

    protected $fillable = ['id', 'url', 'title', 'photo', 'photobottom', 'body', 'date', 'time'];

    protected $dates = ['date'];

    public function shorten($num = 100){

        $string = strip_tags($this->body);

        $string = str_limit($string, $limit = $num, $end = '...');

        return $string;

    }  
}
