<div class="l-postscript-wrapper">
    <div class="l-postscript container">
        <div class="l-region l-region--postscript-first">
    <div id="block-views-events-featured-events" class="block block--views block--views-events-featured-events">
        <h2 class="block__title">Important Dates &amp; Events</h2>
      <div class="block__content">
    <div class="view view-events view-id-events view-display-id-featured_events view-dom-id-35862248ea2a4f9e494fc046ca1b05d2">
            <div class="view-header">
      Mark Your Calendar for These Upcoming Events & Click to Learn Event Details <p class="node text-align-center"><a class="button yellow" href="calendar.html">View All Events</a><a class="button purple" href="event/academic-calendar.html">Academic Calendar</a></p>
                                </div>
                                <div class="view-content">
                                    <div class="views-row views-row-1 views-row-odd views-row-first">
                                        <div class="views-field views-field-field-images-and-video">
                                            <div class="field-content">
                                                <div id="file-3324" class="file file-image file-image-jpeg" class="file file-image file-image-jpeg">
                                                    <h2 class="element-invisible"><a href="files-detail/javawithjudiwebcalendarjpg.html">JavaWithJudi_webcalendar.jpg</a></h2>
                                                    <div class="content">
                                                        <img typeof="foaf:Image" src="/assets/events/{{$event1->photo}}" width="315" height="240" alt="" /> </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="views-field views-field-field-event-date">
                                            <div class="field-content"><span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2016-08-24T08:00:00-06:00">{{$event1->date->format('F Y')}}</span></div>
                                        </div>
                                        <div class="views-field views-field-field-event-date-1">
                                            <div class="field-content"><span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2016-08-24T08:00:00-06:00">{{$event1->date->day}}</span></div>
                                        </div>
                                        <div class="views-field views-field-title"> <span class="field-content"><a href="{{route('event_path', $event1->id)}}">{{$event1->title}}</a></span> </div>
                                        <div class="views-field-event-time"> <span><i class="fa fa-clock-o"></i><span class="date-display-single">{{$event1->time}}</span>
                                            </span>
                                        </div>
                                        <div class="views-field views-field-body">
                                            <div class="field-content">{{$event1->shorten(70)}}</div>
                                        </div>
                                    </div>
                                    <div class="views-row views-row-2 views-row-even views-row-last">
                                        <div class="views-field views-field-field-images-and-video">
                                            <div class="field-content">
                                                <div id="file-6886" class="file file-image file-image-png" class="file file-image file-image-png">
                                                    <h2 class="element-invisible"><a href="files-detail/foodtruckpng.html">foodtruck.png</a></h2>
                                                    <div class="content">
                                                        <img typeof="foaf:Image" src="/assets/events/{{$event2->photo}}" width="315" height="240" alt="" /> </div>
                                                    </div>
                                            </div>
                                        </div>
                                        <div class="views-field views-field-field-event-date">
                                            <div class="field-content"><span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2016-08-24T10:00:00-06:00">{{$event2->date->format('F Y')}}</span></div>
                                        </div>
                                        <div class="views-field views-field-field-event-date-1">
                                            <div class="field-content"><span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2016-08-24T10:00:00-06:00">{{$event2->date->day}}</span></div>
                                        </div>
                                        <div class="views-field views-field-title"> <span class="field-content"><a href="{{route('event_path', $event2->id)}}">{{$event2->title}}</a></span> </div>
                                        <div class="views-field-event-time"> <span><i class="fa fa-clock-o"></i><span class="date-display-single">{{$event2->time}}</span>
                                            </span>
                                        </div>
                                        <div class="views-field views-field-body">
                                            <div class="field-content">{{$event2->shorten(70)}}</div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="l-region l-region--postscript-second">
                        <div id="block-views-events-front-events" class="block block--views block--views-events-front-events">
                            <div class="block__content">
                                <div class="view view-events view-id-events view-display-id-front_events view-dom-id-226027be9bcfb297641ff4802bb73486">
                                    <div class="view-content">
                                        <div id="flexslider-2" class="flexslider">
                                            <ul class="slides">
                                                @foreach($events as $event)
                                                <li>
                                                    <div class="views-field views-field-field-event-date">
                                                        <div class="field-content"><span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2016-09-05T00:00:00-06:00">{{$event->date->format('F Y')}}</span></div>
                                                    </div>
                                                    <div class="views-field views-field-field-event-date-1">
                                                        <div class="field-content"><span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2016-09-05T00:00:00-06:00">{{$event->date->day}}</span></div>
                                                    </div>
                                                    <div class="views-field views-field-title"> <span class="field-content"><a href="{{route('event_path', $event->id)}}">{{$event->title}}</a></span></div>
                                                    <div class="views-field-event-time"> <span><i class="fa fa-clock-o"></i><span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2016-09-05T00:00:00-06:00">{{$event->time}}</span></span>
                                                    </div>
                                                </li>
                                                @endforeach()
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>