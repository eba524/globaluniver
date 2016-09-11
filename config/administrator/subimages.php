<?php
/**
 * User model config
 */
return array(
    'title' => 'Sub banners',
    'single' => 'Sub banners',
    'model' => 'App\Subimage',
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
            'output' => '<img src="/assets/banners/subbanners/thumbs/(:value)" height="100" />',
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
        'special'  => array(
            'title' => 'Is it special?',
            'type'  => 'bool',
        ),
        'position' => array(
            'title' => 'Position',
            'type'  => 'number',
        ),
        'image' => array(
            'title' => 'Image 180x180',
            'type' => 'image',
            'location' => public_path() . '/assets/banners/subbanners/',
            'naming' => 'random',
            'length' => 20,
            'size_limit' => 2,
            'sizes' => array(
                array(180, 180, 'crop', public_path() . '/assets/banners/subbanners/', 100),
                array(100, 100, 'landscape', public_path() . '/assets/banners/subbanners/thumbs/', 100)
            )
        ),
        'imagebig' => array(
            'title' => 'Image 600X180',
            'type' => 'image',
            'location' => public_path() . '/assets/banners/subbanners/',
            'naming' => 'random',
            'length' => 20,
            'size_limit' => 2,
            'sizes' => array(
                array(600, 180, 'crop', public_path() . '/assets/banners/subbanners/', 100),
                array(300, 100, 'landscape', public_path() . '/assets/banners/subbanners/thumbs/', 100)
            )
        ),        
    ),
);