function searchRecipe(key){
    let query = "https://api.spoonacular.com/recipes/complexSearch?apiKey=48d15a6f601f4207861fb19c299525fa&query="+key;
    const recipeData = {}
    fetch(recipes[i])
    .then(response => response.json())
    .then(data => {
        console.log(data["results"]);
        for(let i=0;i<=data["results"].length;i++){
          let id = data["results"][i]["id"];
          let title = data["results"][i]["title"];
          let image = data["results"][i]["image"];
          let description = key;
          let cost;
          let ingredients = []
          
          fetch("https://api.spoonacular.com/recipes/"+id+"/information?apiKey=4350a143d3e84d11b671b2e9e1506f3c")
          .then(response => response.json())
          .then(data => {
            cost = data["pricePerServing"];
            let ingInfo = data["extendedIngredients"];
            ingredients = [];
            for(let i=0;i<ingInfo.length;i++){
              let ingredient = ingInfo[i]["name"];
              let amount = ingInfo[i]["amount"] + " " + ingInfo[i]["unit"];
              ingredients.push({"name":ingredient,"amount":amount});
            }
            let steps = [];
            fetch("https://api.spoonacular.com/recipes/"+id+"/analyzedInstructions?apiKey=4350a143d3e84d11b671b2e9e1506f3c")
            .then(response => response.json())
            .then(data => {
              var stepsData = data[0]["steps"];
              steps = [];
              for(let i=0;i<stepsData.length;i++){
                steps.push(stepsData[i]["step"]);
              }
            });
            console.log(steps);
            recipeData[id] = {"img-url":image,"title":title,"description":description,
            "totalCost":cost,"ingredients":ingredients,"steps":steps}; 
          });
    
        }
        console.log(recipeData);
    });

}