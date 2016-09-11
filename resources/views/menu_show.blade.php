@extends('layouts.master')
@section('content')
<div class="page-node">
<div class="l-page has-one-sidebar has-sidebar-second">

    <div class="l-main container no-h1">
            <div class="l-content" role="main">
                <a id="main-content"></a>
                <div id="block-views-image-slideshows-slideshow" class="block block--views block--views-image-slideshows-slideshow">
                    <div class="block__content">
                        <div class="view view-image-slideshows view-id-image_slideshows view-display-id-slideshow view-dom-id-9ad929cca506f4b50873b127c677f90a">
                            <div class="view-content">
                                <div id="flexslider-1" class="flexslider">
                                    <ul class="slides">
                                        <li>
                                            <div class="views-field views-field-field-basic-image">
                                                <div class="field-content">
                                                    <div id="file-5854" class="file file-image file-image-jpeg" class="file file-image file-image-jpeg">
                                                        <h2 class="element-invisible"><a href="../files-detail/2016breakfastofchampionsprogram-1-1jpg.html">2016BreakfastOfChampions_program-1-1.jpg</a></h2>
                                                        <div class="content">
                                                            <img typeof="foaf:Image" src="/assets/articles/{{$article->photobottom}}" width="800" height="475" alt="" /> </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div about="/org/office-president" typeof="sioc:Item foaf:Document" class="ds-1col node node--organization view-mode-full node--full node--organization--full clearfix">
                    <div class="field field--name-body field--type-text-with-summary field--label-hidden">
                        <div class="field__items">
                            <div class="field__item even" property="content:encoded">
                                <h2 dir="ltr">{{$article->title}}</h2>
                                {!!$article->body!!}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            @include('layouts.partials.menu_sidebar')
        </div>
    </div>
</div>    
@stop        