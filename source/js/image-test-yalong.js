const file = document.getElementById("recipeImage");
console.log(file);

file.addEventListener("change", (e) => {
  const formdata = new FormData();
  formdata.append("image", e.target.files[0]);
  console.log(file);
  fetch("https://api.imgur.com/3/image/", {
    method: "post",
    headers: {
      Authorization: "Client-ID 1b99956c57a5642",
    },
    body: formdata,
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      const divImg = document.getElementById("img-spot");
      const img = document.createElement("img");
      console.log(data.data.link);
      img.src = data.data.link;
      img.height = "200";
      img.referrerPolicy = "no-referrer";
      const url = document.createElement("p");
      url.innerHTML = data.data.link;
      divImg.append(img, url);
    });
});
