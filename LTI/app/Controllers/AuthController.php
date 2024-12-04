<?php

namespace App\Controllers;

use App\Core\Controller;

class AuthController extends Controller {
    public function login() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $username = $_POST['username'];
            $password = $_POST['password'];
            $userModel = $this->model('User');
            $user = $userModel->verifyPassword($username, $password);
            if ($user) {
                $_SESSION['user_id'] = $user['id'];
                header('Location: /home');
            } else {
                $data['danger'] = 'Invalid username or password.';
                $this->view('auth/login', $data);
            }
        } else {
            $this->view('auth/login');
        }
    }

    public function register() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $username = $_POST['username'];
            $password = $_POST['password'];
            $email = $_POST['email'];
            $timezone = $_POST['timezone'];
            $userModel = $this->model('User');
            if ($userModel->create($username, $password, $email, $timezone)) {
                $data['success'] = 'Registration successful. Please log in.';
            } else {
                $data['danger'] = 'Registration failed. Please try again.';
            }
            $this->view('auth/login', $data);
        } else {
            $this->view('auth/register');
        }
    }

    public function logout() {
        session_destroy();
        header('Location: /');
    }
}
