<?php

namespace App\Controllers;

use App\Core\Controller;

class HomeController extends Controller {
    public function index() {
        if (!isset($_SESSION['user_id'])) {
            header('Location: /auth/login');
        } else {
            $userModel = $this->model('User');
            $surveyModel = $this->model('Survey');
            $user = $userModel->findById($_SESSION['user_id']);
            $surveys = $surveyModel->getSurveysByUserId($user['id']);
            $data = [
                'user' => $user,
                'surveys' => $surveys,
                'canRetake' => true,
                'daysUntilRetake' => 0
            ];
            $this->view('home', $data);
        }
    }
}
