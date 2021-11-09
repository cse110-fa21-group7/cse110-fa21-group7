# Prepopulate the recipe app from a list of curated recipes

* Status: Accepted
* Deciders: Vince Rothenberg, Kunal Arora, Chris Harness, Yalong Tian
* Date: 11/8/2021

## Context and Problem Statement
The app should have some content that can be easily used without manually entering recipes.  

## Considered Options

1. Select and store specific recipes with a predictable JSON structure that can be loaded into the app upon first visit.
2. Enable the user to search other websites using an API, then scrape the recipes and store them locally.

## Decision Outcome
We decided to use a curated list of about 10 recipes which would provide enough content for a new user.

## Pros and Cons of the Options

### [option 1]
Pros: Simple to implement.  Recipe JSON format is known and predictable.  We can choose interesting recipes suited for our target audience.

Cons: Not dynamic.  User can't search for new recipes from the broader internet.  

### [option 2]
Pros: Much more dynamic.  Allows users greater variety and content.  

Cons: More complexity.  Greater risk of recipes being malformed.  Possible legal risk over copyrights if put into commercial production.  
