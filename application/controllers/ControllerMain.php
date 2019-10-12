<?php


class ControllerMain extends Controller
{
    public function action_index()
    {
//        header('Location: /public');
        $view = new View('users');
        $view->useTemplate();
        $this->response($view);
    }
}
