<?php
/**
 * Tag model config
 */
return array(
    'title' => 'News tag',
    'single' => 'News tag',
    'model' => 'App\Tag',
    /**
     * The display columns
     */
    'columns'     => array(
        'id',
        'title'     => array(
            'title' => 'Title',
        ),
        'position'     => array(
            'title' => 'Position',
        )
    ),

    /**
     * The editable fields
     */
    'edit_fields' => array(
        'title'  => array(
            'title' => 'Title',
            'type'  => 'text',
        ),
        'position' => array(
            'title' => 'Position',
            'type'  => 'number',
        ),

    ),

    /**
     * Filters
     */
    'filters' => array(
        'id',
        'title' => array(
            'title' => 'Title',
        ),
        'position' => array(
            'title' => 'Position',
            'type'  => 'number',
        )
    ),
);