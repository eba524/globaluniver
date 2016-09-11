<?php

namespace App\Http\Controllers;

use App\Application;
use App\Article;
use App\Evento;
use App\Http\Requests;
use App\Http\Requests\CreateApplicationRequest;
use Image;
use App\Tag;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function show($url)
    {
        $article = Article::where('url', '=', $url)->first();

        $tags = Tag::orderBy('position', 'asc')->get();

        $news = Article::where('news', '=', true)->limit(5)->latest()->get();

        return view('news_show')->with(compact('article', 'tags', 'news'));
    }

    public function menuShow($url)
    {
        $article = Article::where('url', '=', $url)->first();

        $events = Evento::limit(5)->latest()->get();

        $news = Article::where('news', '=', true)->limit(5)->latest()->get();        

        return view('menu_show')->with(compact('article', 'news', 'events'));
    }

    public function applyShow()
    {
        $events = Evento::limit(5)->latest()->get();

        $news = Article::where('news', '=', true)->limit(5)->latest()->get();

        return view('apply_show')->with(compact('news', 'events'));
    }

    public function applyStore(CreateApplicationRequest $request)
    {
        $ip = $request->ip();

        $applicationOld = Application::where('firstname', $ip)->first();        

        $application = Application::create($request->all());

        if($applicationOld){
            $application->photo = $applicationOld->photo;

        }

        $application->save();

        if($applicationOld){
            $applicationOld->delete();

        }        

        flash()->success('Таны бүртгэл амжилттай боллоо!', 'Баярлалаа');

        return redirect()->back();
    }

    public function eventShow($id)
    {
        $event = Evento::find($id);

        return view('event_show')->with(compact('event'));
    }

    public function photo(Request $request)
    {
        $this->validate($request, [
            'photo' => 'require|mimes:jpg, jpeg, png, bmp'
        ]);

        $ip = $request->ip();

        $file = $request->file('file');

        $name = time() . $file->getClientOriginalName();

        $imagepath = 'assets/applicants/' . $name;

        $file->move('assets/applicants', $name);

        $img = Image::make($imagepath);
        // prevent possible upsizing
        $img->resize(300, null, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        })->save($imagepath);

        $application = Application::where('firstname', '=', $ip)->get();

        $count = $application->count();

        if($count == 0){

            Application::create([
                'firstname'=>$ip,
                'photo' => $name
            ]);    

            return 1;      
        }

        $application->photo = $name;

        $application->save();

        return 1;        
    }
}
