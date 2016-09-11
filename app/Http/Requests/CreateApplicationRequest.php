<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class CreateApplicationRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'firstname' => 'required',
            'lastname' => 'required',
            'gender' => 'required',
            'agreement' => 'size:4',  
            'agreement' => 'required',          
            // 'birth' => 'required',
            // 'birthplace' => 'required',
            // 'nationality' => 'required',
            // 'register' => 'required',
            // 'passport' => 'required',
            // 'address' => 'required',
            // 'telephone' => 'required',
            // 'mobile' => 'required',
            // 'email' => 'required',
            // 'family' => 'required',
            // 'schooladdress' => 'required',
            // 'country' => 'required',
            // 'score' => 'required',
            // 'number' => 'required',
            // 'certificate' => 'required',
            // 'profession' => 'required',
            // 'payment' => 'required',
            // 'amount' => 'required',
        ];
    }
}
