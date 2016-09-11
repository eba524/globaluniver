            <aside class="l-region l-region--sidebar-second">
                <div id="block-ccd-custom-ccd-sidebar-menu" class="block block--ccd-custom block--ccd-custom-ccd-sidebar-menu">
                    <div class="block__content">
                        <div class="menu-block-wrapper menu-block-ccd_sidebar_menu menu-name-main-menu parent-mlid-0 menu-level-4">
                            <ul class="menu">
                                <li class="first leaf menu-mlid-1901"><a href="../administration/non-academic-departments/office-president/congratulations-our-academic-honor-students.html">Academic Honors</a></li>
                                <li class="collapsed menu-mlid-2888"><a href="../administration/non-academic-departments/office-president/achieving-strategic-balance-ccd.html">CCD Prioritization Process</a></li>
                                <li class="leaf menu-mlid-3006"><a href="../administration/non-academic-departments/office-provost/higher-learning-commission-re-affirmation.html" class="" title="">HLC Re-Affirmation Process</a></li>
                                <li class="leaf menu-mlid-1585"><a href="office-president/staff.html">Meet the Staff</a></li>
                                <li class="last leaf menu-mlid-2173"><a href="office-president/docs.html" class="" title="">Student Forms</a></li>
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
                                            <p dir="ltr"><a href="mailto:Everette.Freeman@ccd.edu">Everette J. Freeman</a>, CCD&nbsp;President
                                                <br> 303.556.2413
                                            </p>
                                            <p dir="ltr">
                                                <div class="col-1-2">Auraria Campus
                                                    <br> Cherry Creek Building, 301
                                                    <br> 1111 W. Colfax Ave.
                                                    <br> Denver, CO 80204</div>
                                                <div class="col-last col-1-2">Mailing Address
                                                    <br> Campus Box 250
                                                    <br> P.O. Box 173363
                                                    <br> Denver, CO 80217</div>
                                                <div style="clear:both;"></div>
                                                <h3 dir="ltr">Start a Conversation with Everette</h3>
                                                <p dir="ltr">Everette welcomes dialog and conversations with CCD students via <a href="http://www.twitter.com/EveretteCCD" target="_blank">Twitter</a> and <a href="https://www.facebook.com/EveretteFreemanCCD" target="_blank">Facebook</a>.
                                                    <br> Post your "Selfies" with Everette on Facebook or Twitter!</p>
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
                                        <div class="field-content"><span class="date-display-single">{{$event->time}}</span>
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