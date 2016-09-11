@if ($errors->any())
    <div class = "alert alert-danger">
        <h3>Доорх хэсгийг бөглөнө үү!</h3>
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif