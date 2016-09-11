@extends('layouts.master')
@section('content')
<div class="page-node">
<div class="l-page has-one-sidebar has-sidebar-second">
    <div class="l-main container no-h1">
        <div class="l-content" role="main">
            <a id="main-content"></a>
            <div about="/event/java-judi-august-24" typeof="sioc:Item foaf:Document" class="ds-1col node node--event node--promoted view-mode-full node--full node--event--full clearfix">
                <div class="field field--name-field-event-date field--type-datetime field--label-hidden">
                    <div class="field__items">
                        <div class="field__item even"><span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2016-08-24T08:00:00-06:00">{{$event->date->format('F d, Y')}} </span></div>
                    </div>
                </div>
                <div class="field field--name-title field--type-ds field--label-hidden">
                    <div class="field__items">
                        <div class="field__item even" property="dc:title">
                            <h1>{{$event->title}}</h1></div>
                    </div>
                </div>
                <div class="field field--name-body field--type-text-with-summary field--label-hidden">
                    <div class="field__items">
                        <div class="field__item even" property="content:encoded">
                        {!!$event->body!!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <aside class="l-region l-region--sidebar-second">
            <div id="block-views-event-blocks-details" class="block block--views block--views-event-blocks-details">
                <h2 class="block__title">Event Details</h2>
                <div class="block__content">
                    <div class="view view-event-blocks view-id-event_blocks view-display-id-details view-dom-id-920ccf0cd12028e906499f0fe7a93af7">
                        <div class="view-content">
                            <div class="views-row views-row-1 views-row-odd views-row-first views-row-last">
                                <div class="views-field views-field-field-event-date">
                                    <div class="field-content"><i class="fa fa-calendar"></i><span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2016-08-24T08:00:00-06:00">{{$event->date->format('D, F d, Y')}}</span></div>
                                </div>
                                <div class="views-field views-field-field-event-date-1">
                                    <div class="field-content"><i class="fa fa-clock-o"></i><span class="date-display-single">{{$event->time}} </span>
                                    </div>
                                </div>
                                <div class="views-field views-field-field-event-location">
                                    <div class="field-content"><i class="fa fa-map-marker"></i>Confluence Living Room (First Floor) 800 Curtis St.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="block-views-event-blocks-image" class="block block--views block--views-event-blocks-image">
                <div class="block__content">
                    <div class="view view-event-blocks view-id-event_blocks view-display-id-image view-dom-id-16d31463c8df36b9069f8c5ae064b290">
                        <div class="view-content">
                            <div class="views-row views-row-1 views-row-odd views-row-first views-row-last">
                                <div class="views-field views-field-field-images-and-video">
                                    <div class="field-content">
                                        <div id="file-3324" class="file file-image file-image-jpeg" class="file file-image file-image-jpeg">
                                            <h2 class="element-invisible"><a href="{{route('event_path', $event->id)}}">JavaWithJudi_webcalendar.jpg</a></h2>
                                            <div class="content">
                                                <img typeof="foaf:Image" src="/assets/events/{{$event->photo}}" alt="" /> </div>
                                        </div>
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