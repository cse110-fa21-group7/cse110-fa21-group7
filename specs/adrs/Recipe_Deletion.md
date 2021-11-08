# [Recipe Deletion Handling]

* Status: Accepted
* Deciders: Backend
* Date: Nov 8, 2021

## Context and Problem Statement
How to handle the data when users perform deletion for specific recipes


## Considered Options

1. Remove Recipe from global database
2. Keep Recipe in global database, performing only local data change

## Decision Outcome
Keep Recipe in global but remove it from user local recipe book


## Pros and Cons of the Options

### Pro: Prevent recipes from loss for users potenilly faviorte them
