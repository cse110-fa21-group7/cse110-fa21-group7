# Caching Spoonacular API

* Status: Accepted
* Deciders: Vince Rothenberg, Chris Harness, Yalong Tian
* Date: 11/8/2021

## Context and Problem Statement
In order to enable the feature of costs for each ingredient we would need to query an API. 
The Spoonacular API supports costs per gram for various generic ingredients, however the free functionality only allows 150 searches a day.

## Considered Options

1. Create a generic food ingredient object and store relevant information like cost, check before querying.   
2. Query the API for each ingredient.

## Decision Outcome
We decided to pursue storing the results of queries to the Spoonacular API in a dictionary, then saving that in a JSON file to the cache.  

## Pros and Cons of the Options

### [option 1]
Pros: Faster response time.  Reduces number of calls to API.  Saves money / reduces chance of hitting limit of 150 searches money. 

Cons: More complex / difficult to implement.

### [option 2]
Pros: Simple to implement.

Cons: Slower and more expensive.
