document.getElementById("form").addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    const body = JSON.stringify({ email, senha: pass });

    const result = await fetch("http://localhost:4000/login", {
      method: "POST",
      body,
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

    location.href = "/index.html";
  } catch (err) {
    console.log(err);
  }
});
