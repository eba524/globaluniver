@extends('layouts.master')

@section('content')
@include('layouts.partials.banner')
<div class="l-main container no-h1">
            <div class="l-breadcrumb clearfix">
                <div class="l-region l-region--breadcrumb">
                    <div id="block-ccd-custom-ccd-breadcrumb-block" class="block block--ccd-custom block--ccd-custom-ccd-breadcrumb-block">
                        <div class="block__content">
                            <h2 class="element-invisible">You are here</h2>
                            <ul class="breadcrumb">
                                <li><a href="index.html" title="Home" class="active"><i class="fa fa-home"></i></a></li>
                                <li><span title='Home'>Home</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="l-content" role="main">
                <a id="main-content"></a>
                <div id="block-boxes-find-your-future-here" class="block block--boxes block-boxes-simple block--boxes-find-your-future-here">
                    <div class="block__content">
                        <div id='boxes-box-find_your_future_here' class='boxes-box'>
                            <div class="boxes-box-content">
                                <div class="front-box-title">Global Leadership University</div>
                                <p>Global Leadership University will become a research intensive, comprehensive university renowned for its research, scholarship and innovation by creating a student centered learning environment, promoting excellence in teaching and learning, and offering internationally recognized educational programs in Mongolia and the world.</p>
                                <p class="node text-align-center"><a class="button yellow" href="/menu/apply-to-glu">Apply to GLU&nbsp;</a>
                                    @if($subbanner1)
                                    <div class="front-page-menu-thumb thumb-wide hover-red">
                                        <a href="future-students/schedule-your-visit.html">
                                            <div class="media media-element-container media-menu_thumbs">
                                                <div id="file-863" class="file file-image file-image-jpeg" class="file file-image file-image-jpeg">
                                                    <h2 class="element-invisible"><a href="files-detail/visitcampusjpg.html">visit_campus.jpg</a></h2>
                                                    <div class="content">
                                                        <img class="media-element file-menu-thumbs" typeof="foaf:Image" src="/assets/banners/subbanners/{{$subbanner1->imagebig}}" alt="" /> </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div class="thumb-menu-title"><a href="{{$subbanner1->url}}">{{$subbanner1->title}}</a></div>
                                    </div>
                                    @endif
                                    @foreach($subbanners as $key=>$subbanner)
                                    <div class="front-page-menu-thumb thumb-normal {{ ($key == 2) ? 'thumb-last' : '' }} hover-yellow">
                                        <a href="blog/cityhawk-talk/category/faculty-spotlight.html">
                                            <div class="media media-element-container media-menu_thumbs">
                                                <div id="file-5909" class="file file-image file-image-jpeg" class="file file-image file-image-jpeg">
                                                    <h2 class="element-invisible"><a href="files-detail/homepagefacultywebjpg.html">HomePageFaculty_web.jpg</a></h2>
                                                    <div class="content">
                                                        <img alt="Q&amp;amp;A with Our Faculty" class="media-element file-menu-thumbs" typeof="foaf:Image" src="/assets/banners/subbanners/{{$subbanner->image}}" /> </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div class="thumb-menu-title"><a href="{{$subbanner->url}}">{{$subbanner->title}}<br></a></div>
                                    </div>
                                    @endforeach

                                        </div>
                                        </div>  
                                        </div>
</div>
    </div>

        
  </div>
@include('layouts.partials.dates')
@include('layouts.partials.news')   
@stop

