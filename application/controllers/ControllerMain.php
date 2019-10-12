<?php


class ControllerMain extends Controller
{
    public function action_index()
    {
        header('Location: /public');
    }
}
