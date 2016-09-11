<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', [
    'as'=>'home_path',
    'uses'=>'HomeController@index'
]);
Route::get('/article/{url}', [
    'as'=>'article_path',
    'uses'=>'ArticleController@show'
]);
Route::get('/tag/{id}', [
    'as'=>'tag_path',
    'uses'=>'ArticleController@show'
]);
Route::get('/menu/{url}', [
    'as'=>'menu_path',
    'uses'=>'ArticleController@menuShow'
]);
Route::get('/event/{id}', [
    'as'=>'event_path',
    'uses'=>'ArticleController@eventShow'
]);
Route::get('/apply', [
    'as'=>'apply_path',
    'uses'=>'ArticleController@applyShow'
]);
Route::post('/apply', [
    'as'=>'apply_path',
    'uses'=>'ArticleController@applyStore'
]);
Route::post('/application/photo', [
    'as'=>'save_photo_path',
    'uses'=>'ArticleController@photo'
]);
Route::auth();
