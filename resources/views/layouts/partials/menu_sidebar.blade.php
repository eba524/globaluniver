            <aside class="l-region l-region--sidebar-second">
                <div id="block-ccd-custom-ccd-sidebar-menu" class="block block--ccd-custom block--ccd-custom-ccd-sidebar-menu">
                    <div class="block__content">
                        <div class="menu-block-wrapper menu-block-ccd_sidebar_menu menu-name-main-menu parent-mlid-0 menu-level-4">
                            <ul class="menu">
                                <li class="first leaf menu-mlid-1901"><a href="http://enkhbat.xyz/assets/files/xhE2cFDO1fEIuTZBQcjU.pdf" target="_blank">2016-2017 Academic Calendar</a></li>
                                <li class="leaf menu-mlid-2888"><a href="#">Library</a></li>
                                <li class="leaf menu-mlid-3006"><a href="#" class="" title="">GLU Philosophy</a></li>
                                <li class="leaf menu-mlid-1585"><a href="#">Meet the Staff</a></li>
                                <li class="last leaf menu-mlid-2173"><a href="{{route('apply_path')}}" class="" title="">Application Form</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="block-views-44b0e7d7c00a4d8d637a178baf48a640" class="block block--views block--views-44b0e7d7c00a4d8d637a178baf48a640">
                    <h2 class="block__title">Contact Information</h2>
                    <div class="block__content">
                        <div class="view view-contact-information view-id-contact_information view-display-id-contact_info view-dom-id-ffe10fd28909e9bbbf0ab3328c43da62">
                            <div class="view-content">
                                <div class="views-row views-row-1 views-row-odd views-row-first views-row-last">
                                    <div class="views-field views-field-field-address">
                                        <div class="field-content">
                                            <p dir="ltr"><a href="mailto:info@glu.edu.mn">Munkhjargal Damdinsuren</a><br />President of Academic Affairs
                                                <br> 99011662
                                            </p>
                                            <p dir="ltr">
                                                <div class="col-1-2">Global Leadership University
                                                    <br> 51 Green Lake street
                                                    <br> 11th khoroo, Sukhbaatar District  
                                                    <br> Ulaanbaatar 210620</div>
                                                <div style="clear:both;"></div>
                                                <h3 dir="ltr">Get in touch with the University</h3>
                                                <p dir="ltr">We welcome dialog and conversations with GLU students via <a href="https://twitter.com/altanhuy" target="_blank">Twitter</a> and <a href="https://www.facebook.com/GlobalLeadershipUniversity" target="_blank">Facebook</a>.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="block-views-events-org-event" class="block block--views block--views-events-org-event">
                    <h2 class="block__title">Events</h2>
                    <div class="block__content">
                        <div class="view view-events view-id-events view-display-id-org_event sidebar-events view-dom-id-12c5c82c66d19806fc153f1f61ec2fda">
                            <div class="view-content">
                            @foreach($events as $event)
                                <div class="views-row views-row-2 views-row-even">
                                    <div class="views-field views-field-field-event-date">
                                        <div class="field-content"><span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2016-09-06T11:00:00-06:00">{{$event->date}}</span></div>
                                    </div>
                                    <div class="views-field views-field-title"> <span class="field-content"><a href="../event/community-dialogue-september-6.html">{{$event->title}}</a></span> </div>
                                    <div class="views-field views-field-field-event-date-1">
                                        <div class="field-content"><span lass="date-display-single">{{$event->time}}</span>
                                        </div>
                                    </div>
                                    <div class="views-field views-field-field-event-location">
                                    </div>
                                </div>
                            @endforeach()
                            </div>
                        </div>
                    </div>
                </div>
                <div id="block-views-news-org-blog" class="block block--views block--views-news-org-blog">
                    <h2 class="clearfix block__title"><span>News</span></h2>
                    <div class="block__content">
                        <div class="view view-news view-id-news view-display-id-org_blog sidebar-news view-dom-id-678ec2eb3286a62192a136f8cda030cd">
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
            </aside>