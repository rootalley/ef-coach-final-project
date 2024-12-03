<?php

namespace App\Core;

class View {
    public static function render($view, $data = []) {
        extract($data);
        require_once __DIR__ . "/../Views/{$view}.php";
    }
}