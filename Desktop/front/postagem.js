document.getElementById('postagem').addEventListener('submit', async(p)=>{

     try{
        p.preventDefault();
       const titulo = document.getElementById('titulo').value
       const imagem = document.getElementById('imagem').value
       const desc = document.getElementById('desc').value
    

        const body = JSON.stringify({titulo,imagem,desc})
        console.log(body)
        const result = await fetch("http://localhost:4000/post",{
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/json",
                 "Authorization": localStorage.getItem("idUser")
              }
        });

        
        const json = await result.json();
        console.log(json)

        if(!result.ok){

            alert(json.error);
            return;
        }
     
     }catch(err){

        console.log(err)
     }
});