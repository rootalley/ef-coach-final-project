<?php

namespace App\Core;

class App {
    protected $controller = 'HomeController';
    protected $method = 'index';
    protected $params = [];

    public function __construct() {
        $url = $this->parseUrl();

        $controllerName = isset($url[0]) && $url[0] ? ucfirst($url[0]) . 'Controller' : $this->controller;
        $controllerClass = "\\App\\Controllers\\{$controllerName}";

        if (class_exists($controllerClass)) {
            $this->controller = new $controllerClass();
            unset($url[0]);
        } else {
            // Handle controller not found
            $this->controller = new $this->controller();
        }

        if (isset($url[1]) && method_exists($this->controller, $url[1])) {
            $this->method = $url[1];
            unset($url[1]);
        } elseif (isset($url[1])) {
            $this->method = 'show';
        }

        $this->params = $url ? array_values($url) : [];
        call_user_func_array([$this->controller, $this->method], $this->params);
    }

    public function parseUrl() {
        $uri = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
        return explode('/', filter_var($uri, FILTER_SANITIZE_URL));
    }
}
