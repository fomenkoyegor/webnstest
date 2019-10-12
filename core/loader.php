<?php
defined("DOCROOT") or die ("NO DIRECT ACCESS");
include CLASS_PATH . "Config.php";
include CLASS_PATH . "Router.php";
include CLASS_PATH . "Model.php";
include CLASS_PATH . "Entity.php";
include CLASS_PATH . "AutoLoader.php";
include CLASS_PATH . "View.php";
session_start();

spl_autoload_register("Autoloader::load");
$router = Router::getInstance();

$router->addRoute(new Route("",
    [
        "controller" => "main",
        "action" => "index"
    ]));

$router->addRoute(new Route("/api/users",
    [
        "controller" => "users",
        "action" => "get"
    ]));

$router->addRoute(new Route("/api/users/create",
    [
        "controller" => "users",
        "action" => "create"
    ]));


$router->addRoute(new Route("/api/users/{id}", [
    "controller" => "users",
    "action" => "user"
]));

$router->addRoute(new Route("/api/users/delete/{id}", [
    "controller" => "users",
    "action" => "delete"
]));

$router->addRoute(new Route("/api/users/update/{id}", [
    "controller" => "users",
    "action" => "update"
]));


try {
    $router->run();
} catch (RouterException $exception) {
    $router->redirect404();
    echo $exception->getMessage();
};
