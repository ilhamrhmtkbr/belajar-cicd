<!DOCTYPE html>
<html>
<head>
    <title>{{ __('email.subject') }}</title>
</head>
<body style="font-family: Arial, sans-serif; text-align: center;">
<div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px;">
    <h2>{{ __('email.greeting', ['name' => $name]) }}</h2>
    <p>{{ __('email.message') }}</p>

    <a href="{{ $signedUrl }}"
       style="display: inline-block; background-color: #027bdb; color: white; padding: 6px 13px;
                  text-decoration: none; border-radius: 4px; font-size: 13px;">
        {{ __('email.button') }}
    </a>

    <p>{{ __('email.footer') }}</p>
    <br>
    <p>{{ __('email.regards') }}</p>
    <p><strong>{{ __('email.team', ['app' => config('app.name')]) }}</strong></p>
</div>
</body>
</html>
