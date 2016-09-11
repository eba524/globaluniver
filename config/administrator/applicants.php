<?php
/**
 * User model config
 */
return array(
    'title' => 'Application',
    'single' => 'Application',
    'model' => 'App\Application',
    /**
     * The display columns
     */
    'columns' => array(
        'firstname',
        'lastname',
        'gender',
        'photo' => array(
            'title' => 'Зураг',
            'output' => '<img src="/assets/applicants/(:value)" height="100" />',
        ),       
    ),
    /**
     * The filter set
     */
    'form_width' => 500,
    'filters' => array(
        'firstname' => array(
            'title' => 'First name',
            'type'  => 'text',
        ),   
        'lastname' => array(
            'title' => 'Last name',
            'type'  => 'text',
        ), 
        'gender' => array(
            'title' => 'Gender',
            'type'  => 'text',
        ),         

    ),
    /**
     * The editable fields
     */
    'edit_fields' => array(
        'firstname' => array(
            'title' => 'First name',
            'type'  => 'text',
        ),   
        'lastname' => array(
            'title' => 'Last name',
            'type'  => 'text',
        ), 
        'gender' => array(
            'title' => 'Gender',
            'type'  => 'text',
        ), 
        'birth' => array(
            'title' => 'Date of birth',
            'type' => 'date',
        ),    
        'birthplace' => array(
            'title' => 'Place of birth',
            'type' => 'text',
        ), 
        'nationality' => array(
            'title' => 'Nationality',
            'type' => 'text',
        ),     
        'register' => array(
            'title' => 'Register',
            'type' => 'text',
        ),   
        'passport' => array(
            'title' => 'Passport number',
            'type' => 'text',
        ),   
        'address' => array(
            'title' => 'Address',
            'type' => 'text',
        ),   
        'telephone' => array(
            'title' => 'Telephone',
            'type' => 'text',
        ), 
        'mobile' => array(
            'title' => 'Mobile phone',
            'type' => 'text',
        ),   
        'email' => array(
            'title' => 'E-mail',
            'type' => 'text',
        ),   
        'family' => array(
            'title' => 'About family',
            'type' => 'wysiwyg',
        ),    
        'schooladdress' => array(
            'title' => 'Address of school',
            'type' => 'text',
        ),   
        'country' => array(
            'title' => 'Country',
            'type' => 'text',
        ),   
        'score' => array(
            'title' => 'Score',
            'type' => 'text',
        ),
        'number' => array(
            'title' => 'Number',
            'type' => 'text',
        ),   
        'certificate' => array(
            'title' => 'Certificate',
            'type' => 'text',
        ),   
        'profession' => array(
            'title' => 'Profession',
            'type' => 'text',
        ),                                                                                           
        'payment' => array(
            'title' => 'Payment',
            'type' => 'text',
        ),                                                                                           
        'amount' => array(
            'title' => 'Currency',
            'type' => 'text',
        ),                                                                                           
        'photo' => array(
            'title' => 'Image 1500x280',
            'type' => 'image',
            'location' => public_path() . '/assets/applicants/',
            'naming' => 'random',
            'length' => 20,
            'size_limit' => 2,
            'sizes' => array(
                array(200, 200, 'crop', public_path() . '/assets/applicants/', 100),

            )
        ),               
    ),
);