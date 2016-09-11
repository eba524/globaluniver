<?php
/**
 * User model config
 */
return array(
    'title' => 'Users',
    'single' => 'Users',
    'model' => 'App\User',
    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'name',
        'email',
        'birth'
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
        'name' => array(
            'title' => 'Name:',
            'type' => 'text',
        ),
        'email' => array(
            'title' => 'Email:',
            'type' => 'text',
        ),
        'password' => array(
            'title' => 'Password',
            'type' => 'text',
        ),
        'role' => array(
            'type' => 'relationship',
            'title' => 'Хэрэглэгчийн эрх',
            'name_field' => 'name', //what column or accessor on the other table you want to use to represent this object
        ),
    ),
);