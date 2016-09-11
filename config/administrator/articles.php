<?php
/**
 * User model config
 */
return array(
    'title' => 'Article',
    'single' => 'Article',
    'model' => 'App\Article',
    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'url',
        'title',
        'photo' => array(
            'title' => 'Зураг',
            'output' => '<img src="/assets/articles/thumbs/(:value)" height="100" />',
        ),
        'photobottom' => array(
            'title' => 'Зураг доод',
            'output' => '<img src="/assets/articles/thumbs/(:value)" height="100" />',
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
        'tags' => array(
            'title' => 'Тагууд',
            'relationship' => 'tags',
            'select' => '(:table).name',
        ),                       
    ),
    /**
     * The editable fields
     */
    'edit_fields' => array(
        'url' => array(
            'title' => 'Цэсний хаяг',
            'type' => 'text',
        ),  
        'title' => array(
            'title' => 'Гарчиг',
            'type' => 'text',
        ),  
        'news' => array(
            'title' => 'Is it news?',
            'type' => 'bool',
        ),          
        'body' => array(
            'title' => 'Text:',
            'type' => 'wysiwyg',
        ),      
        'tags' => array(
            'type' => 'relationship',
            'title' => 'News tag',
            'name_field' => 'title', //what column or accessor on the other table you want to use to represent this object
        ),           
        'photo' => array(
            'title' => 'Image 1500x280',
            'type' => 'image',
            'location' => public_path() . '/assets/articles/',
            'naming' => 'random',
            'length' => 20,
            'size_limit' => 2,
            'sizes' => array(
                array(200, 100, 'portrait', public_path() . '/assets/articles/thumbs/', 100),
                array(1500, 280, 'crop', public_path() . '/assets/articles/', 100),

            )
        ),  
        'photobottom' => array(
            'title' => 'Image 740x416',
            'type' => 'image',
            'location' => public_path() . '/assets/articles/',
            'naming' => 'random',
            'length' => 20,
            'size_limit' => 2,
            'sizes' => array(
                array(100, 100, 'crop', public_path() . '/assets/articles/thumbs/', 100),
                array(740, 416, 'crop', public_path() . '/assets/articles/', 100),

            )
        ),               
    ),
);