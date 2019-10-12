<?php


class Controller404 extends Controller
{
    public function action_index()
    {
        header("HTTP/1.1 404 Not Found", true, 404);
        echo "<h1>404</h1><p><a href='/'>home page</a></p>";
    }
}
