<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h2>Welcome, <?= htmlspecialchars($user['username']) ?>!</h2>
        <p>The Executive Skills Questionnaire-Revised (ESQ-R) is a self-assessment that helps you understand your executive skill strengths and challenges.</p>
        <?php if ($canRetake): ?>
            <a href="/survey" class="btn btn-primary">Take the ESQ-R Assessment</a>
        <?php else: ?>
            <button class="btn btn-secondary" disabled>Available for Retake in <?= $daysUntilRetake ?> Days</button>
        <?php endif; ?>
    </div>
    <div class="container mt-5 mb-5">
        <h3>Previous ESQ-R Assessments</h3>
        <?php if (empty($surveys)): ?>
            <p>No previous assessments found.</p>
        <?php else: ?>
            <ul class="list-group">
                <?php foreach ($surveys as $survey): ?>
                    <li class="list-group-item">
                        <a href="/results/<?= $survey['id'] ?>"><?= date('Y-m-d H:i:s', strtotime($survey['created_at'])) ?></a>
                        - Plan Management: <?= $survey['plan_management'] ?>
                        - Time Management: <?= $survey['time_management'] ?>
                        - Organization: <?= $survey['organization'] ?>
                        - Emotional Regulation: <?= $survey['emotional_regulation'] ?>
                        - Behavioral Regulation: <?= $survey['behavioral_regulation'] ?>
                        - Total: <?= $survey['total'] ?>
                        <a href="/results/<?= $survey['id'] ?>" class="btn btn-link">Details</a>
                    </li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
        <a href="/auth/logout" class="btn btn-danger mt-3">Sign Out</a>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
