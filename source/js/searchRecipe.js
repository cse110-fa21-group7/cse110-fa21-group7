function searchRecipe(key,apiKey){
  let query = "https://api.spoonacular.com/recipes/complexSearch?apiKey="+apiKey+"&query="+key;
  const recipeData = {}
  fetch(query)
  .then(response => response.json())
  .then(data => {
    for(let i=0;i<=data["results"].length;i++){
      
      let id = data["results"][i]["id"];
      let title = data["results"][i]["title"];
      let image = data["results"][i]["image"];
      let description = 0;
      let cost;
      let ingredients = []
        
      fetch("https://api.spoonacular.com/recipes/"+id+"/information?apiKey="+apiKey)
      .then(response => response.json())
      .then(data => {
        cost = data["pricePerServing"];
        description = data["summary"];
        let ingInfo = data["extendedIngredients"];
        ingredients = [];
        for(let i=0;i<ingInfo.length;i++){
          let ingredient = ingInfo[i]["name"];
          let amount = ingInfo[i]["amount"] + " " + ingInfo[i]["unit"];
          ingredients.push({"name":ingredient,"amount":amount});
        }
        recipeData[id] = {"img-url":image,"title":title,"description":description,
        "totalCost":cost,"ingredients":ingredients,"steps":0}; 
        let steps = [];
        fetch("https://api.spoonacular.com/recipes/"+id+"/analyzedInstructions?apiKey="+apiKey)
        .then(response => response.json())
        .then(data => {
          var stepsData = data[0]["steps"];
          steps = [];
          for(let i=0;i<stepsData.length;i++){
            steps.push(stepsData[i]["step"]);
          }
          recipeData[id]["steps"] = steps;
        });
        
            
      });
    }
  });
  
  return recipeData;  
}