document.getElementById("form").addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    const body = JSON.stringify({ nome: name, email, senha: pass });

    const result = await fetch("https://spacesecret.herokuapp.com/registro", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await result.json();
    if (!result.ok) {
      alert(json.error);
      return;
    }

    localStorage.setItem("idUser", json.usuario._id);
    location.href = "/home.html";
  } catch (err) {
    console.log(err);
  }
});
