async function fetchPosts() {
  const list = document.getElementById("list");

  const result = await fetch("http://localhost:4000/post");
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
    const result = await fetch(`http://localhost:4000/post/${id}`);
    console.log(result);
    if (!result.ok) {
      alert("Post Indisponível");
    }

    const json = await result.json();

    modal(json.post.titulo, json.post.desc, json.post.imagem);
  } catch (err) {
    console.log(err);
  }
}

function modal(titulo, desc, imagem) {
  document.getElementById("modalContainer").innerHTML = `
  <div class="hero-img" style="background-image: url('${imagem}')"></div>
  <div class="content">
    <h1>${titulo}</h1>
    <p>${desc}</p>
    <button id="btnCloseModal">X</button>
  </div>
  `;

  document.getElementById("modalContainer").style.display = "flex";
  document.getElementById("btnCloseModal").addEventListener("click", () => {
    document.getElementById("modalContainer").style.display = "none";
  });
}
