<?php

namespace App\Controllers;

use App\Core\Controller;

class SurveyController extends Controller {
    public function index() {
        if (!isset($_SESSION['user_id'])) {
            header('Location: /auth/login');
        } else {
            $this->view('survey');
        }
    }

    public function submit() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $responses = $_POST['responses'];
            $surveyModel = $this->model('Survey');
            $surveyModel->create($_SESSION['user_id'], $responses);
            header('Location: /home');
        } else {
            header('Location: /survey');
        }
    }
}
