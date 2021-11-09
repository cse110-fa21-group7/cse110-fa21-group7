# style enforcement

* Status: Accepted
* Deciders: Yalong Tian, Jingwen Liu, Jiayan Dong
* Date: 11/7/2021

## Context and Problem Statement
Decise which code style enforcement methods.

## Considered Options

1. ESLint [https://github.com/marketplace/actions/run-eslint]
2. Code Inspector [https://github.com/codeinspectorio/github-action]
3. Super Lint [https://github.com/github/super-linter]

## Decision Outcome
We decide to use Super Lint, which is a combination of multiple linters
- Front-end
  - HTML: HTMLHint
  - CSS: stylelint
- Back-end
  - JavaScript: ESLint

## Pros and Cons of the Options

### [option 1]
Pros: easy to set up and install. 
Cons: 
* Only works for javascript 
* hard for recipe creators to estimate

### [option 2]
Pros: Have a clear website interface and support most of the programming languages     
Cons: 
* Github action can't sync in time with website settings.
* Did not support HTML Linter
* Need to go to the website checking what’s the error

### [option 3]
Pros: 
* Clear GitHub action interface 
* Support most the programming languages include HTML CSS and javascript
* Vs code extensions supported           

Cons:  None
