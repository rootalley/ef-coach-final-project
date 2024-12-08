// Function to display the selected section and hide the others
function showSection(sectionId) {
  // Get all sections and sidebar links
  const sections = document.querySelectorAll('section');
  const links = document.querySelectorAll('.sidebar nav ul li a');

  // Loop through each section
  sections.forEach(section => {
    // Display the selected section, hide the others
    section.style.display = section.id === sectionId ? 'block' : 'none';
  });


  // Load tasks if the Time Management page is shown
  if (sectionId === 'time-management') {
    loadDefaultTasks();
  }

  // Loop through each link
  links.forEach(link => {
    // Check if the link's href matches the selected sectionId
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.classList.add('active'); // Add the active class to the selected link
    } else {
      link.classList.remove('active'); // Remove the active class from other links
    }
  });
}

//add a Tasks Functionality
function addTask(taskName, priority = false) {
    const taskList = document.getElementById('task-list');
    const listItem = document.createElement('li');

    listItem.classList.add('task-item');
    listItem.innerHTML = `${taskName} <span style="color: grey;">✔</span>`;
    listItem.style.cursor = 'pointer'; // Indicate it's clickable
    listItem.addEventListener('click', () => handleTaskSelection(taskName)); // Attach click handler
    taskList.appendChild(listItem); // Add the task to the list
}

function loadDefaultTasks() {
  const defaultTasks = [
    { name: "#1 Priority Task", priority: true },
    { name: "#2 Priority Task", priority: true },
    { name: "#3 Priority Task", priority: true },
  ];
  const taskList = document.getElementById('task-list');
  if (taskList && taskList.children.length === 0) { // Only load tasks if none exist
    defaultTasks.forEach(task => addTask(task.name, task.priority));
  }
}

// Function to open the assessment form in a new window
document.getElementById("openAssessment").addEventListener("click", function() {
    window.open('assessment.html', '_blank', 'width=600,height=800');
  });

  // Initialize both charts
  // Initialize Chart.js bar chart for resdults
  const ctx = document.getElementById('resultsChart').getContext('2d');
  let resultsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Plan Management', 'Time Management', 'Organization', 'Emotional Regulation', 'Behavioral Regulation'],
      datasets: [{
        label: 'Scores',
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 3 // Assuming 4 is the max score
        }
      }
    }
  });
  // Create a Line Chart for Progress Over Time
  const ctxProgress = document.getElementById('progressChart').getContext('2d');
  let progressChart = new Chart(ctxProgress, {
      type: 'line',
      data: {
          labels: [], // Will populate with timestamps or session numbers
          datasets: [
              { label: 'Plan Management', data: [], borderColor: 'rgba(75, 192, 192, 1)', fill: false },
              { label: 'Time Management', data: [], borderColor: 'rgba(153, 102, 255, 1)', fill: false },
              { label: 'Organization', data: [], borderColor: 'rgba(255, 159, 64, 1)', fill: false },
              { label: 'Emotional Regulation', data: [], borderColor: 'rgba(255, 99, 132, 1)', fill: false },
              { label: 'Behavioral Regulation', data: [], borderColor: 'rgba(54, 162, 235, 1)', fill: false }
          ]
      },
      options: { scales: { y: { beginAtZero: true, max: 3 } } }
  });

  // Function to update both charts and table
  function updateResults(scores) {
    // Update the bar chart with the new scores
    resultsChart.data.datasets[0].data = [
      scores['Plan Management'],
      scores['Time Management'],
      scores['Organization'],
      scores['Emotional Regulation'],
      scores['Behavioral Regulation']
    ];
    resultsChart.update();

    // Update the table with the scores and feedback
    // Define customized feedback for each category and score
    const feedbackMap = {
      "Plan Management": {
          0: "Planning skills are a strength! Keep up the great job creating and managing plans.",
          1: "Planning skills are a strength! Keep up the great job creating and managing plans.",
          2: "Let's work on building stronger planning skills. Consider using Priority Matrix tool.",
          3: "Let's work on building stronger planning skills. Consider using Priority Matrix tool."
      },
      "Time Management": {
          0: "Time management skills are a strength! Keep up your efficient work.",
          1: "Time management skills are a strength! Keep up your efficient work.",
          2: "Let's work on building stronger planning skills. Consider using Time Manager tool.",
          3: "Let's work on building stronger planning skills. Consider using Time Manager tool."
      },
      "Organization": {
          0: "Organizational skills are a strength! Keep up with using systems to track your tasks",
          1: "Organizational skills are a strength! Keep up with using systems to track your tasks",
          2: "Let's work on building stronger planning skills. Consider setting a weekly reminder to use Smart Calendar tool.",
          3: "Let's work on building stronger planning skills. Consider setting a weekly reminder to use Smart Calendar tool."
      },
      "Emotional Regulation": {
          0: "Emotional control is a strength. Great job managing emotions to reach goals and to complete tasks",
          1: "Emotional control is a strength. Great job managing emotions to reach goals and to complete tasks",
          2: "Let's work on emotional regulation. Consider mindfulness exercises.",
          3: "Let's work on emotional regulation. Consider mindfulness exercises."
      },
      "Behavioral Regulation": {
          0: "Strong behavioral regulation! Keep up your self-control and thoughtfulness before acting.",
          1: "Strong behavioral regulation! Keep up your self-control and thoughtfulness before acting.",
          2: "Let's work on behavior regulation. Consider practicing deep breathing exercises before reacting to impulses.",
          3: "Let's work on behavior regulation. Consider practicing deep breathing exercises before reacting to impulses"
      }
    };

    // Update the table with scores and customized feedback
    const tableBody = document.getElementById('scoreTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear previous entries

    Object.keys(scores).forEach(category => {
        const score = scores[category];
        const roundedScore = Math.round(score);
        const feedback = feedbackMap[category][roundedScore];

        // Create table row with category, score, and feedback
        const row = document.createElement('tr');
        const categoryCell = document.createElement('td');
        const scoreCell = document.createElement('td');
        const feedbackCell = document.createElement('td');

        categoryCell.textContent = category;
        scoreCell.textContent = score.toFixed(2);
        feedbackCell.textContent = feedback;

        row.appendChild(categoryCell);
        row.appendChild(scoreCell);
        row.appendChild(feedbackCell);
        tableBody.appendChild(row);
    });
}

// Function to Update Progress Over Time Chart
function updateProgressOverTime() {
    const history = JSON.parse(localStorage.getItem('executiveFunctionScoresHistory')) || [];

    progressChart.data.labels = history.map((entry, index) => `Session ${index + 1}`);
    progressChart.data.datasets.forEach(dataset => {
        dataset.data = history.map(entry => entry[dataset.label]);
    });

    progressChart.update();
}

// Check for scores in localStorage after the assessment is completed
window.addEventListener('storage', function(event) {
  if (event.key === 'executiveFunctionScores') {
    const scores = JSON.parse(event.newValue);
    updateResults(scores);
    updateProgressOverTime();
  }
});

// Call to populate chart when page loads
updateProgressOverTime();

// Load latest scores and populate the feedback table on page load
document.addEventListener('DOMContentLoaded', function() {
    const latestScores = JSON.parse(localStorage.getItem('executiveFunctionScores'));
    if (latestScores) {
        updateResults(latestScores);  // Update the table with the latest assessment scores
        updateProgressOverTime();     // Update the progress chart
    }

    // Check if assessment has been completed and hide the description if true
    const assessmentCompleted = localStorage.getItem('assessmentCompleted');
    const accessSkillsButton = document.getElementById('openAssessment');
    if (assessmentCompleted === 'true') {
        // Check if assessment has been completed
        showSection('dashboard'); // Automatically show the dashboard
        //document.getElementById('openAssessment').disabled = true;
        document.getElementById('openAssessment').textContent = "Assessment Completed";
        localStorage.removeItem('assessmentCompleted'); // Reset the flag
    }
});

// Handle Toggle Functionality of Assessment Drop Down
document.getElementById('skillsDropdownButton').addEventListener('click', function() {
  const description = document.getElementById('skillsDescription');
  description.classList.toggle('show');
});


// Dropdown for 5 Skill Areas
document.getElementById("skillsDropdownButton").addEventListener("click", function() {
  const description = document.getElementById("skillsDescription");
  const arrow = document.querySelector("#skillsDropdownButton .arrow");

  // Toggle the display of the description content
  if (description.style.display === "block") {
    description.style.display = "none";
    arrow.innerHTML = "&#9662;";  // Down arrow
  } else {
    description.style.display = "block";
    arrow.innerHTML = "&#9652;";  // Up arrow
  }
});


// Allow dragging of tasks
function allowDrag(event) {
    event.dataTransfer.setData("taskId", event.target.id); // Store task ID for later use
}

// Allow dropping of tasks into the quadrants
function allowDrop(event) {
    event.preventDefault(); // Prevent default behavior (e.g., opening a link)
    event.stopPropagation(); // Stop the event from bubbling up
}


// Attach event listeners to tasks for dragging
const tasks = document.querySelectorAll('#taskTable tbody tr');
tasks.forEach(task => {
    task.setAttribute('draggable', 'true');
    task.addEventListener('dragstart', allowDrag);
});

// Sort function for the task table
function sortTable(columnIndex) {
    var table = document.getElementById("taskTable");
    var rows = Array.from(table.rows).slice(1); // Get rows excluding header
    var ascending = table.rows[0].cells[columnIndex].classList.toggle("asc"); // Toggle class to switch sort order

    rows.sort(function(a, b) {
        var cellA = a.cells[columnIndex].textContent.trim();
        var cellB = b.cells[columnIndex].textContent.trim();

        // Sort by Date
        if (columnIndex === 1) {
            var dateA = new Date(cellA);
            var dateB = new Date(cellB);
            return ascending ? dateA - dateB : dateB - dateA;
        }

        // Sort by Percent Weight
        if (columnIndex === 2) {
            var percentA = parseFloat(cellA.replace('%', '').trim());
            var percentB = parseFloat(cellB.replace('%', '').trim());
            return ascending ? percentA - percentB : percentB - percentA;
        }

        // Default alphabetical sort for the Task column
        return ascending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    });

    rows.forEach(function(row) {
        table.appendChild(row); // Re-attach rows in sorted order
    });
}


// Feedback for sorting correctly in Priority Matrix
// Function to check the categorization based on the task's due date and weight
// Function to analyze tasks and assign them to quadrants
function analyzeTasks() {
    const taskTable = document.getElementById('taskTable');
    const rows = Array.from(taskTable.rows).slice(1); // Exclude the header row

    let minDate = Infinity;
    let maxDate = -Infinity;
    let minWeight = 100;
    let maxWeight = 0;

    // Parse data to find min/max values for urgency and importance
    rows.forEach(row => {
        const date = new Date(row.cells[1].textContent.trim());
        const weight = parseFloat(row.cells[2].textContent.trim());
        minDate = Math.min(minDate, date.getTime());
        maxDate = Math.max(maxDate, date.getTime());
        minWeight = Math.min(minWeight, weight);
        maxWeight = Math.max(maxWeight, weight);
    });

    const urgencyThreshold = minDate + (maxDate - minDate) / 2;
    const weightThreshold = minWeight + (maxWeight - minWeight) / 2;

    rows.forEach(row => {
        const date = new Date(row.cells[1].textContent.trim());
        const weight = parseFloat(row.cells[2].textContent.trim());
        const isUrgent = date.getTime() <= urgencyThreshold;
        const isImportant = weight >= weightThreshold;

        // Assign the task to a quadrant based on its properties
        let quadrant = '';
        if (isUrgent && isImportant) quadrant = 'quadrant1'; // Urgent & Important
        else if (isUrgent && !isImportant) quadrant = 'quadrant3'; // Urgent & Not Important
        else if (!isUrgent && isImportant) quadrant = 'quadrant2'; // Not Urgent & Important
        else quadrant = 'quadrant4'; // Not Urgent & Not Important

        // Add a data attribute to the row indicating its assigned quadrant
        row.setAttribute('data-quadrant', quadrant);
    });
}

// Function to restrict dropping tasks into incorrect quadrants
function drop(event) {

    event.preventDefault();
    event.stopPropagation();

    const draggedTaskId = event.dataTransfer.getData('taskId');
    const task = document.getElementById(draggedTaskId);
    const taskId = event.dataTransfer.getData("taskId");
    const taskElement = document.getElementById(taskId);

    if (taskElement) {
        const assignedQuadrant = taskElement.getAttribute('data-quadrant');
        const targetQuadrant = event.target.id;

        if (assignedQuadrant === targetQuadrant) {
            event.target.appendChild(taskElement); // Allow drop
            // Display the customized feedback
            alert("Good job prioritizing this task!");

        } else {
            // Provide specific feedback based on mismatch
            let feedbackMessage = "This task belongs to a different quadrant.";

            // Customize feedback for specific incorrect drops
            // target is user placement
            // assigned is correct quadrant
            if (assignedQuadrant === 'quadrant1' && targetQuadrant === 'quadrant2') {
                feedbackMessage = "Try again. Reconsider urgency since this task is due sooner than average.";
            } else if (assignedQuadrant === 'quadrant1' && targetQuadrant === 'quadrant3') {
                feedbackMessage = "Try again. Reconsider importance since this task has higher weight than average.";
            } else if (assignedQuadrant === 'quadrant1' && targetQuadrant === 'quadrant4') {
                feedbackMessage = "Try again. This task has both higher weight and closer due date than average.";
            } else if (assignedQuadrant === 'quadrant3' && targetQuadrant === 'quadrant1') {
                feedbackMessage = "Try again. Reconsider importance since this task has lower weight than average.";
            } else if (assignedQuadrant === 'quadrant3' && targetQuadrant === 'quadrant2') {
                feedbackMessage = "Try again. This task has lower weight and closer due date than average.";
            } else if (assignedQuadrant === 'quadrant3' && targetQuadrant === 'quadrant4') {
                feedbackMessage = "Try again. Reconsider urgency since this task is due sooner than average.";
            } else if (assignedQuadrant === 'quadrant2' && targetQuadrant === 'quadrant1') {
                feedbackMessage = "Try again. Reconsider urgency since this task is due later than average.";
            } else if (assignedQuadrant === 'quadrant2' && targetQuadrant === 'quadrant3') {
                feedbackMessage = "Try again. This task has higher weight and further due date than average.";
            } else if (assignedQuadrant === 'quadrant2' && targetQuadrant === 'quadrant4') {
                feedbackMessage = "Try again. Reconsider importance since this task has higher weight than average.";
            }
            // Display the customized feedback
            alert(feedbackMessage);
            // Optionally, you could return the task to its original position in the table
            task.parentElement.appendChild(task);
        }
    }
}

// Re-analyze tasks and update their quadrants when the page loads or tasks change
document.addEventListener('DOMContentLoaded', analyzeTasks);


// Re-analyze and reattach listeners if tasks are updated
document.getElementById('taskTable').addEventListener('change', () => {
    analyzeTasks();
    reattachDragListeners();
});


// Attach event listeners for drag and drop only once
const quadrants = document.querySelectorAll('.quadrant');
quadrants.forEach(quadrant => {
    quadrant.removeEventListener('dragover', allowDrop); // Remove any existing listeners
    quadrant.removeEventListener('drop', drop);         // Prevent duplicates
});

function reattachDragListeners() {
    const tasks = document.querySelectorAll('#taskTable tbody tr');
    tasks.forEach(task => {
        task.setAttribute('draggable', 'true');
        task.removeEventListener('dragstart', allowDrag); // Prevent duplicate listeners
        task.addEventListener('dragstart', allowDrag);    // Attach the listener
    });
}

//Time management
document.addEventListener('DOMContentLoaded', function () {
  let timerInterval; // Stores the interval ID
  let pomodoroCount = 0; // Initialize counter
  let isRunning = false; // Tracks if the timer is active
  const modes = {
    pomodoro: 25 * 60, // 25 minutes
    shortBreak: 5 * 60, // 5 minutes
    longBreak: 15 * 60, // 15 minutes
  };
  let currentMode = 'pomodoro'; // Default mode
  let timeLeft = modes[currentMode]; // Tracks remaining time in seconds
  let currentTask = null; // Tracks the current task
  let actualPomodoros = 0; // Tracks completed Pomodoro cycles for the current task
  let estimatedPomodoros = 0; // Tracks estimated Pomodoros for the selected task

  // Function to calculate Pomodoro intervals
  function calculatePomodoros(hours, minutes) {
      const totalMinutes = hours * 60 + minutes;
      return Math.ceil(totalMinutes / 25); // Each Pomodoro is 25 minutes
  }

  // Function to handle task selection
  function handleTaskSelection(taskName) {
      const taskListItems = document.querySelectorAll('#task-list li');
      // Remove existing highlights
      taskListItems.forEach((item) => item.classList.remove('selected'));
      // Highlight the selected task
      const selectedTask = Array.from(taskListItems).find(item => item.textContent.trim() === taskName);
      if (selectedTask) {
        selectedTask.classList.add('selected');
      }
      // Store the task as the current task
      currentTask = { name: taskName, completed: false };


      const estimatedTime = prompt(`Enter the expected time for "${taskName}" in hh:mm format (e.g., 02:30):`);
      if (!estimatedTime) return; // User canceled the prompt

      const [hours, minutes] = estimatedTime.split(":").map(Number);
      if (isNaN(hours) || isNaN(minutes)) {
        alert("Invalid input. Please use hh:mm format.");
        return;
      }

      const estimatedPomodoros = calculatePomodoros(hours, minutes);
      const estimatedMinutes = hours * 60 + minutes;

      currentTask = {
        name: taskName,
        estimatedPomodoros,
        estimatedMinutes,
        actualMinutes: 0,
      };


      document.getElementById('task-controls').style.display = 'block';

      // Show Complete Task button
      document.getElementById('complete-task-button').style.display = 'inline-block';


      // Start the Pomodoro timer
      startTimer();
      toggleTimerButtons('running');
  }

  // Start Pomodoro and break cycles
  function startPomodoro() {
      if (!currentTask) {
        alert("No task selected.");
        return;
      }

      switchMode('pomodoro');
      alert(`Starting task: "${currentTask.name}". Let's focus for 25 minutes.`);
  }

  // Reset task controls
  function resetTask() {
    currentTask = null;
    actualPomodoros = 0;
    estimatedPomodoros = 0;
    document.getElementById('task-controls').style.display = 'none';
    toggleTimerButtons('paused');

  }


  // Function to update the timer display
  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    document.getElementById('timer-minutes').textContent = minutes;
    document.getElementById('timer-seconds').textContent = seconds;
  }

  // Function to switch between Pomodoro/Break modes
  function switchMode(mode) {
    clearInterval(timerInterval); // Clear the interval
    isRunning = false; // Stop the timer
    currentMode = mode; // Update the mode

    if (currentMode === "pomodoro") {
        timeLeft = 25 * 60; // 25 minutes for Pomodoro
      } else if (currentMode === "shortBreak") {
        timeLeft = 5 * 60; // 5 minutes for Short Break
      } else if (currentMode === "longBreak") {
        timeLeft = 30 * 60; // 30 minutes for Long Break
      }
    updateTimerDisplay();

    // Highlight active tab
    document.querySelectorAll('.tab').forEach((tab) => {
        if (tab.dataset.mode === mode) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    startTimer();
    toggleTimerButtons('running');

    }

  // Toggle Timer Buttons
  function toggleTimerButtons(state) {
    const startButton = document.getElementById('start-button');
    const pauseButton = document.getElementById('pause-button');
    const skipButton = document.getElementById('skip-button');

    if (state === 'running') {
      startButton.style.display = 'none';
      pauseButton.style.display = 'inline-block';
      skipButton.style.display = 'inline-block';
    } else {
      startButton.style.display = 'inline-block';
      pauseButton.style.display = 'none';
      skipButton.style.display = 'none';
    }
  }

  function startTimer() {
      if (isRunning) return; // Prevent duplicate intervals
      isRunning = true;
      timerInterval = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          updateTimerDisplay();
        } else {
          clearInterval(timerInterval);
          isRunning = false;

          if (currentMode === "pomodoro") {
            actualPomodoros++; // Increment actual Pomodoro count
            pomodoroCount++; // Increment the Pomodoro counter after each work session
            if (pomodoroCount >= 4) {
              // After 4 Pomodoros, switch to Long Break
              alert("Kudos to 4 Working Periods complete! Time for a well-deserved long break.");
              switchMode("longBreak");
              pomodoroCount = 0; // Reset Pomodoro counter after long break
            } else {
              // Otherwise, switch to Short Break
              alert("Working period complete! Time for a short break!");
              switchMode("shortBreak");
            }
          } else if (currentMode === "shortBreak" || currentMode === "longBreak") {
            // After a break, return to Pomodoro
            alert(currentMode === "shortBreak" ? "Break over. Let's return to work." : "Break over! Let's return to work");
            switchMode("pomodoro");
          }
        }
      }, 1000); // Tick every second
  }

  // Function to pause the timer
  function pauseTimer() {
    clearInterval(timerInterval); // Stop the interval
    isRunning = false; // Timer is no longer running
    document.getElementById('start-button').textContent = 'START'; // Update button text
  }

  // Handle Start/Pause button click
  function handleStartPause() {
    if (isRunning) {
      pauseTimer(); // Pause the timer
    } else {
      startTimer(); // Start the timer
    }
  }

  // Function to skip the current timer
  function skipTimer() {
    clearInterval(timerInterval); // Stop the timer
    isRunning = false; // Timer is no longer running
    if (currentMode === "pomodoro") {
        pomodoroCount++; // Increment the Pomodoro counter after each work session
        const elapsedMinutes = Math.floor((modes[currentMode] - timeLeft) / 60);
        if (currentMode === 'pomodoro' && currentTask) {
          actualPomodoros++;
          currentTask.actualMinutes += elapsedMinutes; // Add elapsed time to the actual time
        }
        if (pomodoroCount >= 4) {
          // After 4 Pomodoros, switch to Long Break
          alert("Skipping working period. Starting long break.");
          switchMode("longBreak");
          pomodoroCount = 0; // Reset Pomodoro counter after long break
        } else {
          // Otherwise, switch to Short Break
          alert("Skipping working period. Starting short break.");
          switchMode("shortBreak");
        }
      } else if (currentMode === "shortBreak" || currentMode === "longBreak") {
        // After a break, return to Pomodoro
        alert(currentMode === "shortBreak" ? "Break over. Let's return to work." : "Break over! Let's return to work");
        switchMode("pomodoro");
      }
    toggleTimerButtons('running');
    updateTimerDisplay(); // Update the timer display when skipping
  }


  //add preloadedTasks
  function addPreloadedTask() {
    const taskList = document.getElementById('task-list');
    const listItem = document.createElement('li');
    taskName = "#1 Priority Task"
    listItem.innerHTML = `${taskName} <span style="color: grey;">✔</span>`;
    listItem.style.cursor = 'pointer'; // Indicate it's clickable
    listItem.addEventListener('click', () => handleTaskSelection(taskName)); // Attach click handler
    taskList.appendChild(listItem); // Add the task to the list
  }

  // Complete Task and Display Feedback
  function completeTask() {
      pauseTimer();
      toggleTimerButtons('paused');
      if (!currentTask) {
        alert("No task is currently active.");
        return;
      }

      //calc total time
      const elapsedMinutes = Math.floor((modes[currentMode] - timeLeft) / 60);
      if (currentMode === 'pomodoro' && currentTask) {
          actualPomodoros++;
          currentTask.actualMinutes += elapsedMinutes; // Add elapsed time to the actual time
      }

      //Clear the timer
      clearInterval(timerInterval);
      isRunning = false;

      // Reset timer display based on current mode
      if (currentMode === 'pomodoro') {
        timeLeft = 25 * 60; // Reset to 25 minutes

      } else if (currentMode === 'shortBreak') {
        timeLeft = 5 * 60; // Reset to 5 minutes

      } else if (currentMode === 'longBreak') {
        timeLeft = 15 * 60; // Reset to 15 minutes
      }
      updateTimerDisplay();

      // Show Start button, hide Pause and Skip buttons
      toggleTimerButtons('paused')

      // Mark the task as completed
      const taskListItems = document.querySelectorAll('#task-list li');
      const completedTask = Array.from(taskListItems).find(
        (item) => item.textContent.trim().startsWith(currentTask.name)
      );

      if (completedTask) {
        // Add green checkmark for completed tasks and add results
        completedTask.innerHTML = `
        <span style="text-decoration: line-through; color: gray;">${currentTask.name}</span>
        <span style="color: gray;"> Act/Est : ${currentTask.actualMinutes}/${currentTask.estimatedMinutes} min</span>
        <span style="color: green;">✔</span>
    `;

        completedTask.onclick = null; // Disable further selection
        completedTask.classList.add('completed'); // Add completed class
      }

      // Show feedback modal with results
      const feedbackMessage = `
        Task "${currentTask.name}" completed!
        Estimated Time: ${currentTask.estimatedMinutes} minutes
        Actual Time: ${currentTask.actualMinutes} minutes
      `;
      alert(feedbackMessage);

      // Reset task-related variables
      currentTask = null;
      actualPomodoros = 0;
      document.getElementById('task-controls').style.display = 'none'; // Hide task controls

  }


  // Function to clear completed tasks
  function clearCompletedTasks() {
      const taskList = document.getElementById('task-list');
      const completedTasks = document.querySelectorAll('.completed');
      completedTasks.forEach(task => taskList.removeChild(task));
  }

  // Attach Event Listeners
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => switchMode(tab.dataset.mode));
  });

  // Start Button Functionality
  document.getElementById('start-button').addEventListener('click', function () {
    if (!currentTask) {
      alert("No task selected. Starting a generic Pomodoro session.");
    }
    startTimer();
    toggleTimerButtons('running');
  });
  // Pause button
  document.getElementById('pause-button').addEventListener('click', handleStartPause);
  // Sip button
  document.getElementById('skip-button').addEventListener('click', skipTimer);

  // Handle task selection for priority tasks
  document.querySelectorAll('.priority-task-button').forEach(button => {
    button.addEventListener('click', function () {
        const priority = this.dataset.priority;
        alert(`Priority Task ${priority} selected. Estimate time for completion.`);
        handleTaskSelection(`Priority Task ${priority}`);
        pomodoroCount = 0;
        actualPomodoros = 0;
    });
  });



  // Add Task Button Event Listener
  document.getElementById('add-task-button').addEventListener('click', function () {
    const taskName = prompt("Enter a name for the new task:");
    if (taskName) {
        addTask(taskName);
    }
  });
  // Task List event listener
  document.getElementById('task-list').addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
      handleTaskSelection(event.target.textContent);
    }
  });

  // Handle complete task button
  document.getElementById('complete-task-button').addEventListener('click', completeTask);

  // Initialize tasks preloaded with check marks
  document.addEventListener('DOMContentLoaded', addPreloadedTask);
  document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.getElementById('task-list');
  if (taskList) {
    defaultTasks.forEach(task => addTask(task.name, task.priority));
  }
});


  // Initialize Timer Display
  updateTimerDisplay(); // Show the initial timer values
});
