<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subimage extends Model
{
	protected $table = 'subimages';

	protected $fillable = ['title', 'image', 'imagebig', 'url', 'position', 'special'];
}
