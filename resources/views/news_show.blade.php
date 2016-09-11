@extends('layouts.master')
@section('content')
<div class="section-blog page-node">
    <div class="l-page has-one-sidebar has-sidebar-second ">
        <div class="l-herowide-wrapper">
            <div class="l-hero">
                <div class="l-region l-region--hero">
                    <div id="block-views-blog-categories-header-image" class="block block--views block--views-blog-categories-header-image">
                        <div class="block__content">
                            <div class="view view-blog-categories view-id-blog_categories view-display-id-header_image view-dom-id-d8df9cbad6f91e3f36aef1602c914c01">
                                <div class="view-content">
                                    <div class="views-row views-row-1 views-row-odd views-row-first views-row-last">
                                        <div class="views-field views-field-field-blog-header-image">
                                            <div class="field-content"><img typeof="foaf:Image" src="/assets/articles/{{$article->photo}}" width="1500" height="280" alt="" /></div>
                                        </div>
                                        <div class="container"> <span><div class="views-field-field-blog-profile-image">
        <img typeof="foaf:Image" src="/sites/default/files/CityHawk_Square.png" width="200" height="200" alt="" />
        </div>
        <div class="views-field-display-title">
        <a href="/cityhawk-talk.html">CityHawk Talk</a>
        </div></span> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="l-main container no-h1">
            <div class="l-content" role="main">
                <a id="main-content"></a>
                <div about="/blog/cityhawk-talk/presidents-desk-welcome-fall-semester" typeof="sioc:Item foaf:Document" class="ds-1col node node--blog-article node--promoted view-mode-full node--full node--blog-article--full clearfix">
                    <div id="node-blog-article-full-group-author-details" class=" group-author-details field-group-div">
                        <div class="field field-name-post-date">August 23, 2016</div>
                        <div class="field field-name-ccd-comment-count">
                            <div class="disqus-comment-wrapper" data-disqus-url="presidents-desk-welcome-fall-semester.html"><span class="disqus-comment-count">0</span></div>
                        </div>
                    </div>
                    <H1 class="field field-name-field-display-title">{{$article->title}}</H1>
                    <div class="field field-name-addtoany">
                    <span class="a2a_kit a2a_kit_size_32 a2a_target addtoany_list" id="da2a_1">
                        <a class="a2a_button_facebook"></a>
                        <a class="a2a_button_twitter"></a>
                        <a class="a2a_button_google_plus"></a>
                        <a class="a2a_button_email"></a>
                        <a class="a2a_dd addtoany_share_save" href="https://www.addtoany.com/share#url=https%3A%2F%2Fwww.ccd.edu%2Fblog%2Fcityhawk-talk%2Fpresidents-desk-welcome-fall-semester&amp;title=President%27s%20Desk%20-%20Welcome%20to%20Fall%20Semester"></a>

                    </span>
                        <script type="text/javascript">
                        <!--//--><![CDATA[//><!--
                        if (window.da2a) da2a.script_load();
                        //--><!]]>
                        </script>
                    </div>
                    <div class="field field-name-images-slideshow">
                        <div class="view view-image-slideshows view-id-image_slideshows view-display-id-blog_images view-dom-id-d970226a4c53ccad09f2b015eda5f066">
                            <div class="view-content">
                                <div id="flexslider-1" class="flexslider">
                                    <ul class="slides">
                                        <li>
                                            <div class="views-field views-field-field-images-and-video">
                                                <div class="field-content">
                                                    <div id="file-5936" class="file file-image file-image-jpeg" class="file file-image file-image-jpeg">
                                                        <h2 class="element-invisible"><a href="../../files-detail/everettefreemanconfluencestepstestjpg.html">EveretteFreeman_ConfluenceSteps_test.jpg</a></h2>
                                                        <div class="content">
                                                            <img typeof="foaf:Image" src="/assets/articles/{{$article->photobottom}}" width="740" height="416" alt="a black man standing on the steps in front of a building" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field field-name-body">
                        {!!$article->body!!}
                    </div>

                    <div id="disqus_thread">
                        <noscript>
                            <p><a href="http://communitycollegeofdenver.disqus.com/?url=https%3A%2F%2Fwww.ccd.edu%2Fblog%2Fcityhawk-talk%2Fpresidents-desk-welcome-fall-semester">View the discussion thread.</a></p>
                        </noscript>
                    </div>
                </div>
            </div>
            <aside class="l-region l-region--sidebar-second">
                <div id="block-views-exp-blog-posts-blogs" class="block block--views block--views-exp-blog-posts-blogs">
                    <div class="block__content">
                        <form class="views-exposed-form-blog-posts-blogs" action="https://www.ccd.edu/blog/cityhawk-talk" method="get" id="views-exposed-form-blog-posts-blogs" accept-charset="UTF-8">
                            <div>
                                <div class="views-exposed-form">
                                    <div class="views-exposed-widgets clearfix">
                                        <div id="edit-search-wrapper" class="views-exposed-widget views-widget-filter-combine">
                                            <div class="views-widget">
                                                <div class="form-item form-type-textfield form-item-search">
                                                    <input placeholder="Search this Blog" type="text" id="edit-search" name="search" value="" size="30" maxlength="128" class="form-text" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="views-exposed-widget views-submit-button">
                                            <input type="submit" id="edit-submit-blog-posts" name="" value="Search" class="form-submit" /> </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="block-ccd-blog-ccd-blog-sidebar-blocks" class="block block--ccd-blog block--ccd-blog-ccd-blog-sidebar-blocks">
                    <div class="block__content">
                        <div id="block-views-blog-categories-categories" class="block block--views block--views-blog-categories-categories">
                            <h2 class="clearfix block__title"><span>Categories</span></h2>
                            <div class="block__content">
                                <div class="view view-blog-categories view-id-blog_categories view-display-id-categories view-dom-id-620aa0aef187396e483221c5a6227c56">
                                    <div class="view-content">
                                    @foreach($tags as $tag)
                                        <div class="views-row views-row-1 views-row-odd views-row-first">
                                            <div class="views-field views-field-name"> <span class="field-content"><a href="{{route('tag_path', $tag->id)}}">{{$tag->title}}</a></span> </div>
                                        </div>
                                    @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="block-views-blog-posts-recent-posts" class="block block--views block--views-blog-posts-recent-posts">
                            <h2 class="clearfix block__title"><span>Recent Posts</span></h2>
                            <div class="block__content">
                                <div class="view view-blog-posts view-id-blog_posts view-display-id-recent_posts view-dom-id-ba5629b930e300af7a53fc2f7797e56f">
                                    <div class="view-content">
                                    @foreach($news as $anews)
                                        <div class="views-row views-row-1 views-row-odd views-row-first">
                                            <div class="views-field views-field-field-blog-image">
                                                <div class="field-content">
                                                    <a href="presidents-desk-welcome-fall-semester.html" class="active"><img typeof="foaf:Image" src="/assets/articles/thumbs/{{$anews->photobottom}}" width="85" height="85" alt="a black man standing on the steps in front of a building" /></a>
                                                </div>
                                            </div>
                                            <div class="views-field views-field-created"> <span class="field-content">{{$anews->created_at}}</span> </div>
                                            <div class="views-field views-field-field-display-title">
                                                <div class="field-content"><a href="presidents-desk-welcome-fall-semester.html" class="active">{{$anews->title}}</a></div>
                                            </div>
                                        </div>
                                    @endforeach()
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="block-views-blog-posts-archive" class="block block--views block--views-blog-posts-archive">
                            <h2 class="clearfix block__title"><span>Archive</span></h2>
                            <div class="block__content">
                                <div class="view view-blog-posts view-id-blog_posts view-display-id-archive view-dom-id-9d35b57846dfbcfea243035a0ef9d6ab">
                                    <div class="view-content">
                                        <div class="views-summary views-summary-unformatted"> <a href="2016.html">2016</a>
                                        </div>
                                        <div class="views-summary views-summary-unformatted"> <a href="2015.html">2015</a>
                                        </div>
                                        <div class="views-summary views-summary-unformatted"> <a href="2014.html">2014</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</div>
@stop