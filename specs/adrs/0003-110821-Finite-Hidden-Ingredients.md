# Finite Amount of Hidden Elements for Ingredients and Steps

* Status: Accepted
* Deciders: Vince Rothenberg, Yifan Lu
* Date: 11/8/2021

## Context and Problem Statement
We deliberated on whether the Create Recipe page should dynamically add new elements when a user wants to add an additional ingredient or step.

## Considered Options

1.  Create 10 hidden elements for the ingredients which are incrementally revealed after a user clicks an add button.
2.  Dynamically create new elements and add them to the page.

## Decision Outcome
We decided that there should be a finite number of hidden elements to keep things simple and static, but still dynamic from the user's perspective.  

## Pros and Cons of the Options

### [option 1]
Pros: Simplicity and predictability.  Less complex to implement.

Cons: Hard upper bound on the size of recipes.

### [option 2]
Pros: Allows for arbitrarily large recipes.

Cons: More difficult to implement.  Could cause strange bugs.  
