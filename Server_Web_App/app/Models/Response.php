<?php

namespace App\Models;

use App\Core\Database;

class Response {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function create($surveyId, $questionId, $response) {
        $stmt = $this->db->prepare("INSERT INTO responses (survey_id, question_id, response) VALUES (?, ?, ?)");
        return $stmt->execute([$surveyId, $questionId, $response]);
    }

    public function findBySurveyId($surveyId) {
        $stmt = $this->db->prepare("SELECT * FROM responses WHERE survey_id = ?");
        $stmt->execute([$surveyId]);
        return $stmt->fetchAll();
    }
}
