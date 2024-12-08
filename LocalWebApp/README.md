# EF Skills Coach

The project builds a web application to support executive functions skills (EFS) development in college students. 

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributions](#contributions)

## 1. Introduction
EFS —time management, organization, planning, etc.— are essential for academic success, especially college students with increased responsibility for self-directed learning. Students with diverse learning needs often struggle to develop their EFS. Gaps in executive abilities can go unnoticed in K-12 education with one study estimating that only 20% of adults with ADHD were diagnosed in K-12 (Newcorn, et al, 2007). The heightened demand for self-regulated learning present in higher education learning environments tends to expose these challenges (Desmedt, 2004; Drion, 2018; Zimmerman, 2001). Therefore, an EFS support system could have widespread benefits. 

Current LMS platforms, such Canvas, lack personalized learning tools. Recent research suggests that the LMS could be improved to better support self-regulated learning (SRL) by incorporating strategies such as chunking and micro-learning (Shine & Heath, 2020). These approaches help break down complex tasks into manageable steps, offer timely feedback, and provide structured pathways to keep learners on track. This shortcoming in LMS functionality can negatively impact academic performance, increase dropout rates, and exacerbate educational inequities, particularly for neurodivergent students. Therefore, there is a critical need to integrate more effective SRL strategies within LMS environments. 

The proposed solution was to design and build an online system that supports the assessment and development of EFS, enhancing self-regulation and improving student academic outcomes. Students using this tool would complete an EFS self-assessment to identify areas of strength and weakness. Using the results, the system would deliver coaching through evidence-based activities such as prioritization or goal setting (Center on the Developing Child at Harvard University, 2014). For accessibility, the tool would integrate with existing LMS platforms (e.g., Canvas, Blackboard, Moodle), offering features to prioritize tasks, chunk assignments, and other personalized strategies. 

## 2. Features
This web app is the final prototype developed in phase III that implemented feedback from phases I and II:
1. **EFS Dashboard**
   - scores bar chart to view latest assessment results
   - feedback table for areas of improvement
   - progress chart for building skills over time
2. **Assessment**
   - EFS self-assessment using questions from EQS-R (Smart but Scattered, 2023)
   - Users should only take every 10-12 weeks. Assessment would be disabled between intervals 
3. **Plan Management**
   - Prioritization intervention using Eisenhower Matrix technique to build plan management skills
4. **Organization**
   - Scheduling intervention using chunking and Calendar/Planner techniques to build organization skills (prototype only)
5. **Time Management**
   - Time tracking activity using Pomodoro Timer technique to build time management skills

## 3. Installation
This project was created using PyCharm IDE to create HTML, JS, and CSS files. No packages need installed.

## 4. Usage
1. Download files using PyCharm IDE or similar
2. Navigate to WebApp > index.html
3. Select Play (Web App opens in local browser)
4. Navigate to Assessment using Navigation Bar on the left. 
5. Select Take Assessment selecting "Never or Rarely" for all responses
6. View results Dashboard
7. Take Assessment again  selecting "Very often" for all responses
8. View results Dashboard. Feedback table will now recommend the skill building activities.
9. Navigate to Plan Management using Navigation Bar on the left. 
10. Complete priority matrix activity
11. Navigate to Organization using Navigation Bar on the left. 
12. Watch video of prototype for calendar activity 
13. Navigate to Time Management using Navigation Bar on the left. 
14. Complete the time manager activity 
15. Close the App

## 5. Contributions
1. Fork the repo.
2. Create a new development branch.
3. Submit a pull request.