<div class="l-herowide-wrapper">
    <div class="l-hero">
        <div class="l-region l-region--hero">
            <div id="block-views-9590cba8b5fb5cb1178261c5640a7894" class="block block--views block--views-9590cba8b5fb5cb1178261c5640a7894">
                <div class="block__content">
                    <div class="view view-banner-slideshow view-id-banner_slideshow view-display-id-banner_slideshow view-dom-id-5eae7e374b6f8be7eb1289f3bcd2259d">
                        <div class="view-content">
                            <div id="flexslider-1" class="flexslider">
                                <ul class="slides">
                                    @foreach($banners as $banner)
                                    <li>
                                        <div class="views-field views-field-field-banner-image">
                                            <div class="field-content"><img typeof="foaf:Image" src="/assets/banners/mainbanners/{{$banner->image}}" width="1600" height="495" alt="female graduate holding her diploma" /></div>
                                        </div>
                                        <div class="views-field views-field-field-banner-overlay">
                                            <div class="field-content"><img class="image-overlay" src="/sites/all/themes/ccd_omega/images/overlay.png"></div>
                                        </div>
                                        <div class="banner-overlay">
                                            <div class="views-field views-field-title">{{$banner->title}}</div>
                                            <div class="views-field views-field-body">
                                                <div class="field-content">
                                                    <p>{{$banner->description}}</p>
                                                </div>
                                            </div>
                                            <div class="views-field views-field-field-banner-action-button"><a href="{{$banner->url}}">Learn more</a></div>
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