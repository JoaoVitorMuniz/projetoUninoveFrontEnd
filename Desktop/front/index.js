async function fetchPosts() {
  const list = document.getElementById("list");

  const result = await fetch("https://spacesecret.herokuapp.com/post");
  const json = await result.json();
  json.post.map((urso) => {
    const item = `
    <div class="item" onclick="fetchPost('${urso._id}')">
    <div
      style="
        background-image: url('${urso.imagem}');
      "
    >
      <h2 class="title">${urso.titulo}</h2>
    </div>
  </div>
    `;

    list.innerHTML += item;
  });
}
fetchPosts();

async function fetchPost(id) {
  try {
    const result = await fetch(`https://spacesecret.herokuapp.com/post/${id}`);
    console.log(result);
    if (!result.ok) {
      alert("Post Indisponível");
    }

    const json = await result.json();

    modal(json.post.titulo, json.post.desc, json.post.imagem,json.post._id);
  } catch (err) {
    console.log(err);
  }
}

function modal(titulo, desc, imagem,_id) {
  document.getElementById("modalContainer").innerHTML = `
  <div class="hero-img" style="background-image: url('${imagem}')"></div>
  <div class="content">
    <h1>${titulo}</h1>
    <p>${desc}</p>
    <button id="btnDeletar" onclick="deletPost('${_id}')"><img src="src/trash.svg"/></button>
    <button id="btnCloseModal">X</button>
  </div>
  `;

  document.getElementById("modalContainer").style.display = "flex";
  document.getElementById("btnCloseModal").addEventListener("click", () => {
    document.getElementById("modalContainer").style.display = "none";
  });
}

async function deletPost (id){
  
  const result = await fetch("https://spacesecret.herokuapp.com/post/" + id , {
     method: "delete",
     headers: {
         "Authorization": localStorage.getItem("idUser")     
     }
   })
   if(!result.ok){
       alert("Sem Permissao");
       return;
   }
   
   location.href = "index.html"
}
