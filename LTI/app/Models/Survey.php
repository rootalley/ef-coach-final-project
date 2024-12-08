<?php

namespace App\Models;

use App\Core\Database;

class Survey {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function create($userId, $responses) {
        $stmt = $this->db->prepare("
            INSERT INTO surveys (user_id, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        return $stmt->execute(array_merge([$userId], $responses));
    }

    public function findById($id) {
        $stmt = $this->db->prepare("SELECT * FROM surveys WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function getSurveysByUserId($userId) {
        $stmt = $this->db->prepare("SELECT * FROM surveys WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$userId]);
        return $stmt->fetchAll();
    }
}
