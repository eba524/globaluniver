<?php
/**
 * User model config
 */
return array(
    'title' => 'Banner',
    'single' => 'Banner',
    'model' => 'App\Image',
    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'title'     => array(
            'title' => 'Title',
        ),        
        'url'     => array(
            'title' => 'URL',
        ),
        'position'     => array(
            'title' => 'Position',
        ),
        'image' => array(
            'title' => 'Image',
            'output' => '<img src="/assets/banners/mainbanners/thumbs/(:value)" height="100" />',
        )
    ),
    /**
     * The filter set
     */
    'filters' => array(
    ),
    /**
     * The editable fields
     */
    'edit_fields' => array(
        'title'  => array(
            'title' => 'Title',
            'type'  => 'text',
        ),
        'url'  => array(
            'title' => 'URL',
            'type'  => 'text',
        ),        
        'description'  => array(
            'title' => 'Description',
            'type'  => 'text',
        ),
        'position' => array(
            'title' => 'Position',
            'type'  => 'number',
        ),
        'image' => array(
            'title' => 'Image 2100x700',
            'type' => 'image',
            'location' => public_path() . '/assets/banners/mainbanners/',
            'naming' => 'random',
            'length' => 20,
            'size_limit' => 2,
            'sizes' => array(
//                    array(65, 57, 'crop', public_path() . '/uploads/banner/thumbs/small/', 100),
//                    array(220, 138, 'fit', public_path() . '/uploads/products/thumbs/medium/', 100),
                array(2100, 650, 'crop', public_path() . '/assets/banners/mainbanners/', 100),
                array(300, 100, 'landscape', public_path() . '/assets/banners/mainbanners/thumbs/', 100)
            )
        )
    ),
);