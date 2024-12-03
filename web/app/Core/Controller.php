<?php

namespace App\Core;

class Controller {
    public function model($model) {
        $modelClass = "\\App\\Models\\$model";
        require_once __DIR__ . "/../Models/{$model}.php";
        return new $modelClass();
    }

    public function view($view, $data = []) {
        extract($data);
        require_once __DIR__ . "/../Views/{$view}.php";
    }
}
