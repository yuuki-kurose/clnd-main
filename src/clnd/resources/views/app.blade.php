<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <!-- Script -->
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
    <!-- csrfトークンをreact側で読み込むためjavascript変数に変える -->
    <script>
      window.csrfToken = "{{ csrf_token() }}";
    </script>
  </head>
  <body>
    @inertia
  </body>
</html>