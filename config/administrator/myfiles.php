<?php
/**
 * User model config
 */
return array(
    'title' => 'File upload',
    'single' => 'File upload',
    'model' => 'App\Myfile',
    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'title',  
        'media' => array(
            'title' => 'link to file',
            'output' => '<a href="/assets/files/(:value)" target="_blank">Show file</a>',
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
    ),
    /**
     * The editable fields
     */
    'edit_fields' => array(
        'title' => array(
            'title' => 'Гарчиг',
            'type' => 'text',
        ),         
        'body' => array(
            'title' => 'Text:',
            'type' => 'wysiwyg',
        ),      
        'media' => array(
            'title' => 'File',
            'type' => 'file',
            'location' =>  public_path() . '/assets/files/',
            'naming' => 'random',
            'length' => 20,
            'size_limit' => 2,
            'mimes' => 'pdf,doc',
        )          
               
    ),
);