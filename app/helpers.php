<?php
/**
 * Created by PhpStorm.
 * User: puje
 * Date: 9/11/14
 * Time: 12:20 PM
 */
function set_active($path, $active = 'active')
{
    return Request::is($path) ? $active : '';
}


function user_photos_path()
{
    return (public_path() . '/uploads/companies/' . Auth::user()->name . '/');
}

function weburl($url)
{
    if(starts_with($url, 'http://')){
        return $url;
    } else {
        $url = 'http://' . $url;
        return $url;
    }
}

function allow_new_line($string){
    return strip_tags(nl2br($string), '<br><br/>');
}

function flash($title = null, $message = null){

	$flash = app('App\Http\Flash');

	if (func_num_args() == 0){
		return $flash;
	}

	return $flash->message($title, $message);


}
