<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'birth',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    public function setBirthAttribute($date)
    {
        $this->attributes['birth'] = Carbon::parse($date);
    }

    public function role()
    {
        return $this->belongsTo('App\Role', 'role_id');
    }

    public function isAdmin()
    {
        if ($this->role->name == 'super_admin'){

            return true;
        }  
        return false;
    }

    public function hasRole($name)
    {
        if ($this->role == $name)
        {
            return true;
        }
        
        return false;
    }

    public function posts()
    {
        return $this->hasMany('App\Post', 'user_id');
    } 

    public function orders()
    {
        return $this->hasMany('App\Order', 'user_id');
    } 
}
