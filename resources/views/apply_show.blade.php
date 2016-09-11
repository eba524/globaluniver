@extends('layouts.master')
@section('css')
    <link rel="stylesheet" href="/css/dropzone.css">
@stop
@section('content')
<div class="page-node">
<div class="l-page has-one-sidebar has-sidebar-second">

    <div class="l-main container no-h1">
            <div class="l-breadcrumb clearfix">
                <div class="l-region l-region--breadcrumb">
                    <div id="block-ccd-custom-ccd-breadcrumb-block" class="block block--ccd-custom block--ccd-custom-ccd-breadcrumb-block">
                        <div class="block__content">
                            <h2 class="element-invisible">You are here</h2>
                            <ul class="breadcrumb">
                                <li><a href="../index.html" title="Home"><i class="fa fa-home"></i></a></li>
                                <li><a href="../administration.html" class="megamenu-item" title="Administration">Administration</a></li>
                                <li><a href="../departments.html" class="" title="Non-Academic Departments">Non-Academic Departments</a></li>
                                <li><span title='Office of the President'>Office of the President</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="l-content" role="main">
                <div about="/org/office-president" typeof="sioc:Item foaf:Document" class="ds-1col node node--organization view-mode-full node--full node--organization--full clearfix">
                    <div class="field field--name-body field--type-text-with-summary field--label-hidden">
                        <div class="field__items">
                            <div class="field__item even" property="content:encoded">
                                <h2 dir="ltr">Apply to GLU</h2>
                                <div class="row" style="margin-bottom:2em;">
                                	<div class="col-md-12">
							            <form action="/application/photo"
							                  class="dropzone"
							                  id="my-awesome-dropzone">
							            {{csrf_field()}}
							            </form>  
                                	</div>
                                </div>
                                @include('layouts.partials.errors')
                              
                                {!! Form::open(['url' => '/apply']) !!}
                                <!-- First name form input -->
                                <div class="form-group">
                                    {!! Form::label('firstname', 'First name:') !!}
                                    {!! Form::text('firstname', null, ['class' => 'form-control']) !!}
                                </div>
                                <!-- Last name form input -->
                                <div class="form-group">
                                    {!! Form::label('lastname', 'Last name:') !!}
                                    {!! Form::text('lastname', null, ['class' => 'form-control']) !!}
                                </div>
                                <!-- gender form input -->
                                <div class="form-group">
                                    {!! Form::label('gender', 'Gender:') !!}                                
									<label class="radio-inline">
									  <input type="radio" name="gender" id="inlineRadio1" value="Male" checked="true"> Male
									</label>
									<label class="radio-inline">
									  <input type="radio" name="gender" id="inlineRadio2" value="Female"> Female
									</label>
                                </div>
                                <!-- Date of birth form input -->
                                <div class="form-group">
                                    {!! Form::label('birth', 'Date of birth:') !!}
                                    {!! Form::date('birth', null, ['class' => 'form-control']) !!}
                                </div>
                                <!-- Place of birth form input -->
                                <div class="form-group">
                                    {!! Form::label('birthplace', 'Place of birth:') !!}
                                    {!! Form::text('birthplace', null, ['class' => 'form-control']) !!}
                                </div>
                                <!-- Nationality form input -->
                                <div class="form-group">
                                    {!! Form::label('nationality', 'Nationality:') !!}
                                    {!! Form::text('nationality', null, ['class' => 'form-control']) !!}
                                </div>
                                <!-- Registration number form input -->
                                <div class="form-group">
                                    {!! Form::label('register', 'Registration number:') !!}
                                    {!! Form::text('register', null, ['class' => 'form-control']) !!}
                                </div>
                                <!-- address form input -->
                                <div class="form-group">
                                    {!! Form::label('address', 'Address:') !!}
                                    {!! Form::text('address', null, ['class' => 'form-control']) !!}
                                </div>
                                <!-- Telephone form input -->
                                <div class="form-group">
                                    {!! Form::label('telephone', 'Telephone:') !!}
                                    {!! Form::text('telephone', null, ['class' => 'form-control']) !!}
                                </div>
                                <!-- Mobilde phone form input -->
                                <div class="form-group">
                                    {!! Form::label('mobile', 'Mobilde phone:') !!}
                                    {!! Form::text('mobile', null, ['class' => 'form-control']) !!}
                                </div>
                                <!-- Email form input -->
                                <div class="form-group">
                                    {!! Form::label('email', 'Email:') !!}
                                    {!! Form::text('email', null, ['class' => 'form-control']) !!}
                                </div>
                                <!-- Message form input -->
                                <div class="form-group">
                                    {!! Form::label('family', 'About family:') !!}
                                    {!! Form::textarea('family', null, ['class' => 'form-control']) !!}
                                </div>
                                <!-- Haanaas elssen form input -->
                                <div class="form-group">
                                    {!! Form::label('schooladdress', 'Haanaas elssen:') !!}
                                    {!! Form::text('schooladdress', null, ['class' => 'form-control']) !!}
                                </div>
                                <!-- country form input -->
                                <div class="form-group">
                                    {!! Form::label('country', 'Country:') !!}
                                    {!! Form::text('country', null, ['class' => 'form-control']) !!}
                                </div>
                                <!-- Score form input -->
                                <div class="form-group">
                                    {!! Form::label('score', 'Score:') !!}
                                    {!! Form::text('score', null, ['class' => 'form-control']) !!}
                                </div>
                                <!-- Tomiloltin dugaar form input -->
                                <div class="form-group">
                                    {!! Form::label('number', 'Tomiloltin dugaar:') !!}
                                    {!! Form::text('number', null, ['class' => 'form-control']) !!}
                                </div>
                                <!-- Certificate number form input -->
                                <div class="form-group">
                                    {!! Form::label('certificate', 'Certificate number:') !!}
                                    {!! Form::text('certificate', null, ['class' => 'form-control']) !!}
                                </div>
                                <!-- Profession form input -->
                                <div class="form-group">
                                    {!! Form::label('profession', 'Profession:') !!}
                                    {!! Form::text('profession', null, ['class' => 'form-control']) !!}
                                </div>
                                <!-- Payment form input -->
                                <div class="form-group">
                                    {!! Form::select('payment', ['huviaraa' => 'Huviaraa', 'baiguullaga' => 'baiguullaga', 'busad' => 'busad'], null, ['placeholder' => 'Pick a payment method...', 'class'=>'form-control']); !!}
                                </div>
                                <!-- Amount form input -->
                                <div class="form-group">
                                    {!! Form::select('amount', ['USD' => 'USD', 'MNT' => 'MNT'], null, ['placeholder' => 'Pick a currency...', 'class'=>'form-control']); !!}

                                </div>        
                                <div class="form-group">
                                    {!! Form::label('agreement', 'Дээрхи бичсэн  зүйлс үнэн болохыг баталж байна') !!} 
                                    {!! Form::checkbox('agreement', 'true', 'false'); !!}
                                </div>                                                        
                                <!-- Submit form input -->
                                <div class="form-group">    
                                    {!! Form::submit('Apply now', ['class' => 'btn btn-primary btn-block'])!!}
                                </div>
                                {!! Form::close() !!}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            @include('layouts.partials.menu_sidebar')
        </div>
    </div>
</div>    
@stop    
@section('script')
    <script src="/js/dropzone.js"></script>
    <script>
        Dropzone.options.myAwesomeDropzone = {
          paramName: "file", // The name that will be used to transfer the file
          maxFilesize: 2, // MB
          dictDefaultMessage: 'Photo / Drop your photo here /',
          dictFallbackMessage: 'Таны хөтөч зураг хуулахыг дэмжихгүй байна',
          maxFiles: 1,
          acceptedFiles: '.jpg, .jpeg, .png',
          dictMaxFilesExceeded: 'Нэг зар дээр хамгийн ихдээ 4 зураг оруулах боломжтой',
          accept: function(file, done) {
            if (file.name == "justinbieber.jpg") {
              done("Naha, you don't.");
            }
            else { done(); }
          }
        };  
    </script>
  
@stop   