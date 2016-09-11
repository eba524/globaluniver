<?php

namespace App\Http\Controllers;

use App\Article;
use App\Evento;
use App\Http\Requests;
use App\Image;
use App\Subimage;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $latestEvents = Evento::where('special', '=', true)->latest()->limit(2)->get();

        $event1 = $latestEvents->first();

        $event2 = $latestEvents->last();

        $events = Evento::where('special', '=', false)->latest()->limit(16)->get();

        $articles = Article::where('news', '=', true)->limit(12)->latest()->get();

        $banners = Image::orderBy('position', 'asc')->get();

        $subbanners = Subimage::where('special', '=', false)->orderBy('position', 'asc')->limit(3)->get();

        $subbanner1 = Subimage::where('special', '=', true)->first();

        return view('home')->with(compact('banners', 'articles', 'event1', 'event2', 'events', 'subbanners', 'subbanner1'));
    }
}
