# ASAP CI/CD Pipeline Phase 1

## Pipeline Steps

### Prettier Style/ESLint checks

- The first step is to check our code style locally: We can use script npm run lint to check our js files have problems or not.
- If one of the team members did not fix their problems still push to GitHub, the GitHub action start to work to check the whole js files, if there have problems, the GitHub action will be failed.
- Team members can check their problems when they do PR to the main branch under the files changed section. If they did not pass GitHub action, the reviewer should tell them to fix problems, then push code again.

### Code Quality via Codacy

- We set up the code quality check, including checking code security and checking whether the code is error prone, by using Codacy.  
- It is set up on the Github actions, so basically it will run after each push to the repository and see the results in [codacy](https://app.codacy.com/gh/cse110-fa21-group7/cse110-fa21-group7/dashboard).  
- Based on the report in Codacy, we have improved our code grade from C to A and keep the duplication of the code around 10%.

### Automated Jest unit tests

- simple tests to check whether CI/CD pipeline is correctly set up
- unit tests for individual components
- E2E tests for interactions among individual components
- E2E test for creating recipes and checking whether they are showed on cook-book page
- test for checking add and remove ingredients/steps button
- test for uploading image while creating recipes
- E2E test for searching recipe and checking results
- E2E test for deleting recipes and checking whether they are removed from cook-book page
- E2E test for editing recipes and checking whether recipe information is changed
- test for checking maximum number constraint of ingredients and steps
- test for checking whether recipe information is correctly stored in local storage

### Generate JSDoc

- We use JSDoc to automatically generate the usage manual of the entire code and deploy it to the GitHub page of our repository.

- Programmers can use the manual generated by JSDoc to understand the use of each function, parameter types and return object types when maintaining the code.

- Programmers can just use a fixed format to comment before each function, and JSDoc can automatically generate the usage manual.

### Human Review

- The main branch is our final product result branch, and we set up some protection for it which means whenever we want to push some code to the main branch, we need to make a pull request merge code to the main branch.
- After we create a pull request, one reviewer can start to review the PR code to check they pass all GitHub pipelines or not. If they did not pass the GitHub pipeline, they should fix their code then push their code again.
- Whenever we create a pull request to the main branch, Heroku will develop our product on its server. Therefore, the reviewer can use that website to manually check the whole APP works well or not. If the APP has some problems, the reviewer should create an issue for it to make sure team members fix it.
- After passing all pipelines and manually checking, the reviewer can approval the PR and merge it to our main branch which can make sure our product works perfectly well

## Pipeline Diagram

<img src="./phase1.png" alt="diagram">

## Pipeline Demo Video
Pipeline demo video [here](./phase1.mp4)
