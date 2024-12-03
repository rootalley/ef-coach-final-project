<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ESQ-R Survey</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .sticky-header {
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            background-color: gray;
            color: white;
            z-index: 1000;
        }
        .sticky-header th {
            text-align: center;
            font-weight: normal; /* Remove bold styling */
        }
    </style>
</head>
<body>
    <div class="container mt-5 mb-5">
        <h2>ESQ-R Survey</h2>
        <p>Everyone has both strengths and challenges in these skills depending on the situation they are in. Be as honest as you can in deciding what your strengths and challenges are. In particular, think about how you handle non-preferred tasks (the kinds of tasks you don't particularly like to do). Please read each item and decide how often you consider it to be a problem for you using the following scale:</p>
        <ul>
            <li>Never or Rarely</li>
            <li>Sometimes</li>
            <li>Often</li>
            <li>Very Often</li>
        </ul>
        <form action="/survey/submit" method="post">
            <?php
                $statements = [
                    "I act on impulse.",
                    "I say things without thinking.",
                    "I lose things.",
                    "I have a short temper.",
                    "I get upset when things don't go as planned.",
                    "I run out of energy before finishing a task.",
                    "It’s hard for me to set priorities when I have a lot of things to do.",
                    "My desk or workspace is a mess.",
                    "I have trouble keeping my house or room clean.",
                    "I have trouble estimating how long it will take to complete a task.",
                    "I’m slow to get ready for school, work, or appointments.",
                    "If the first solution to a problem doesn’t work, I have trouble thinking of a different one.",
                    "I skip checking my work for mistakes, even when the stakes are high.",
                    "I get annoyed when tasks are too hard.",
                    "It’s hard for me to put aside fun activities to start things I know I need to do.",
                    "I have trouble with tasks where I have to come up with my own ideas.",
                    "It’s hard for me to tell how well I’m doing on a task.",
                    "I have trouble reaching long-term goals (those that take many weeks or months to finish).",
                    "I \"go with my gut\" when making decisions.",
                    "I get so wrapped up in what I’m doing that I forget about other things I need to do.",
                    "Little things frustrate me.",
                    "I have trouble getting back on track if I’m interrupted.",
                    "I have trouble making a plan.",
                    "I focus on details and miss the big picture.",
                    "I live in the moment."
                ];

                $options = [
                    '0' => 'Never or Rarely',
                    '1' => 'Sometimes',
                    '2' => 'Often',
                    '3' => 'Very Often',
                ];
            ?>
            <table class="table">
                <thead class="sticky-header">
                    <tr>
                        <th scope="col" class="col-md-6"></th>
                        <?php foreach ($options as $label): ?>
                            <th scope="col"><?= $label ?></th>
                        <?php endforeach; ?>
                    </tr>
                </thead>
                <tbody>
                    <?php for ($i = 1; $i <= 25; $i++): ?>
                        <?php $row_class = ($i % 2 == 1) ? 'bg-light' : ''; ?>
                        <tr class="<?= $row_class ?>">
                            <td class="col-md-6"><?= $statements[$i - 1] ?></td>
                            <?php foreach ($options as $value => $label): ?>
                                <td class="text-center">
                                    <input type="radio" name="responses[<?= $i ?>]" id="q<?= $i ?>_<?= $value ?>" value="<?= $value ?>" required>
                                </td>
                            <?php endforeach; ?>
                        </tr>
                    <?php endfor; ?>
                </tbody>
            </table>
            <button type="submit" class="btn btn-primary">Score My ESQ-R</button>
        </form>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
