<?php
/**
 * User model config
 */
return array(
    'title' => 'Events',
    'single' => 'Бусад цэс',
    'model' => 'App\Evento',
    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'url',
        'title',
        'special',
        'photo' => array(
            'title' => 'Зураг',
            'output' => '<img src="/assets/events/thumbs/(:value)" height="100" />',
        ),
        'photobottom' => array(
            'title' => 'Зураг доод',
            'output' => '<img src="/assets/events/thumbs/(:value)" height="100" />',
        ),        
    ),
    /**
     * The filter set
     */
    'form_width' => 500,
    'filters' => array(
        'title' => array(
            'title' => 'Гачиг',
            'type'  => 'text',
        ),   
        'url' => array(
            'title' => 'Цэсний хаяг',
            'type'  => 'text',
        ),                
    ),
    /**
     * The editable fields
     */
    'edit_fields' => array(
        'url' => array(
            'title' => 'URL',
            'type' => 'text',
        ),  
        'title' => array(
            'title' => 'Title',
            'type' => 'text',
        ),    
        'date' => array(
            'title' => 'Date',
            'type' => 'date',
        ),  
        'time' => array(
            'title' => 'Time',
            'type' => 'text',
        ),
        'special' => array(
            'title' => 'Is it special?',
            'type' => 'bool',
        ),                            
        'body' => array(
            'title' => 'Text:',
            'type' => 'wysiwyg',
        ),      
        'photo' => array(
            'title' => 'Image 315x240',
            'type' => 'image',
            'location' => public_path() . '/assets/events/',
            'naming' => 'random',
            'length' => 20,
            'size_limit' => 2,
            'sizes' => array(
                array(200, 100, 'portrait', public_path() . '/assets/events/thumbs/', 100),
                array(315, 240, 'crop', public_path() . '/assets/events/', 100),

            )
        ),                
    ),
);