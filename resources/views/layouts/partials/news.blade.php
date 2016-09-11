<div class="l-post-postscript-wrapper">
    <div class="l-post-postscript container">
        <div class="l-region l-region--post-postscript">
            <div id="block-views-news-front-blog" class="block block--views block--views-news-front-blog">
                <h2 class="clearfix block__title"><span>Latest News</span></h2>
                <div class="block__content">
                    <div class="view view-news view-id-news view-display-id-front_blog view-dom-id-625e65a01f243ba2632dd6b95f175b01">
                        <div class="view-header">
                            Check Out our <a href="#">twitter channel</a> </div>
                        <div class="view-content">
                            <div id="flexslider-3" class="flexslider">
                                <ul class="slides">
                                @foreach($articles as $article)
                                    <li>
                                        <div about="/blog/cityhawk-talk/presidents-desk-welcome-fall-semester" typeof="sioc:Item foaf:Document" class="ds-1col node node--blog-article node--promoted view-mode-flex_slide node--flex-slide node--blog-article--flex-slide clearfix">
                                            <div id="node-blog-article-flex-slide-group-image-date" class=" group-image-date field-group-div">
                                                <div class="field field-name-field-blog-image dark-gradient">
                                                    <a href="{{route('article_path', $article->url)}}"><img typeof="foaf:Image" src="/assets/articles/{{$article->photobottom}}" width="315" height="245" alt="a black man standing on the steps in front of a building" /></a>
                                                </div>
                                                <div class="field field-name-post-date">August 23, 2016</div>
                                            </div>
                                            <div id="node-blog-article-flex-slide-group-blog-details" class=" group-blog-details field-group-div">
                                                <div class="field field-name-post-date-copy">August 23, 2016</div>
                                                <div class="field field-name-ccd-comment-count">
                                                    <div class="disqus-comment-wrapper" data-disqus-url="{{route('article_path', $article->url)}}"><span class="disqus-comment-count">0</span></div>
                                                </div>
                                                <div class="field field-name-field-display-title"><a href="{{route('article_path', $article->url)}}">{{$article->title}}</a></div>
                                                <div class="field field-name-body">{{$article->shorten()}}</div>
                                            </div>
                                        </div>
                                    </li>
                                @endforeach    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>