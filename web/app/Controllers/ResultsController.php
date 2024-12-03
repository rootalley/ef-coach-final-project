<?php

namespace App\Controllers;

use App\Core\Controller;

class ResultsController extends Controller {
    public function index() {
        header('Location: /home');
    }

    public function show($id) {
        if (!isset($_SESSION['user_id'])) {
            header('Location: /auth/login');
        } else {
            $surveyModel = $this->model('Survey');
            $survey = $surveyModel->findById($id);
            if ($survey['user_id'] != $_SESSION['user_id']) {
                header('Location: /home');
            } else {
                $data = [
                    'survey' => $survey
                ];
                $this->view('results', $data);
            }
        }
    }
}
