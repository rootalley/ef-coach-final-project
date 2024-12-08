<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ESQ-R Results</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5 mb-5">
        <h2>ESQ-R Results</h2>
        <p>Assessment Date: <?= date('Y-m-d H:i:s', strtotime($survey['created_at'])) ?></p>
        <ul class="list-group">
            <li class="list-group-item">Plan Management: <?= $survey['plan_management'] ?></li>
            <li class="list-group-item">Time Management: <?= $survey['time_management'] ?></li>
            <li class="list-group-item">Organization: <?= $survey['organization'] ?></li>
            <li class="list-group-item">Emotional Regulation: <?= $survey['emotional_regulation'] ?></li>
            <li class="list-group-item">Behavioral Regulation: <?= $survey['behavioral_regulation'] ?></li>
            <li class="list-group-item">Total: <?= $survey['total'] ?></li>
        </ul>
        <h3 class="mt-4">Responses</h3>
        <?php
        $statements = [
            "I act on impulse",
            "I say things without thinking",
            "I lose things",
            "I have a short temper",
            "I get upset when things don't go as planned",
            "I run out of energy before finishing a task",
            "It’s hard for me to set priorities when I have a lot f things to do.",
            "My desk or workspace is a mess",
            "I have trouble keeping my house or room clean",
            "I have trouble estimating how long it will take to complee a task.",
            "I’m slow to get ready for school, work, or appointments",
            "If the first solution to a problem doesn’t work, I hae trouble thinking of a different one.",
            "I skip checking my work for mistakes, even when the staks are high.",
            "I get annoyed when tasks are too hard",
            "It’s hard for me to put aside fun activities to start thins I know I need to do.",
            "I have trouble with tasks where I have to come up with y own ideas.",
            "It’s hard for me to tell how well I’m doing on a task",
            "I have trouble reaching long-term goals (those that tae many weeks or months to finish).",
            "I \"go with my gut\" when making decisions",
            "I get so wrapped up in what I’m doing that I forget abot other things I need to do.",
            "Little things frustrate me",
            "I have trouble getting back on track if I’m interrupted",
            "I have trouble making a plan",
            "I focus on details and miss the big picture",
            "I live in the moment"
        ];

        $options = [
            '0' => 'Never or Rarely',
            '1' => 'Sometimes',
            '2' => 'Often',
            '3' => 'Very Often',
        ];
        ?>
        <ul class="list-group">
            <?php for ($i = 1; $i <= 25; $i++): ?>
                <li class="list-group-item"><?= $statements[$i - 1] ?>: <b><?= $options[$survey['q' . $i]] ?></b>.</li>
            <?php endfor; ?>
        </ul>
        <a href="/home" class="btn btn-primary mt-3">Back to Home</a>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
