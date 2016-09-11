<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $table = 'articles';

    protected $fillable = ['id', 'url', 'title', 'photo', 'photobottom', 'body'];

    public function shorten($num = 100){

        $string = strip_tags($this->body);

        $string = str_limit($string, $limit = $num, $end = '...');

        return $string;

    }     

    public function tags()
    {
        return $this->belongsToMany('App\Tag');
    }      
}
