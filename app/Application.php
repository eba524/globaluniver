<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
	protected $table = 'applications';

	protected $fillable = ['firstname', 'lastname', 'gender', 'birth', 'birthplace', 
	'nationality', 'register', 'passport', 'address', 'telephone', 'mobile', 'email', 
	'family', 'schooladdress', 'country', 'score', 'number', 'certificate', 'profession',
	'payment', 'amount', 'photo'];
}
