const listaPost = document.querySelector("#listaPosts");
const formulario = document.querySelector("#formulario");

//1. GET

async function cargarPost() {
  try {
    const response = await fetch("/api/posts");
    const posts = await response.json();

    listaPost.innerHTML = "";

    posts.slice(0, 10).forEach((post) => {
      listaPost.appendChild(post);
    });
  } catch (error) {
    console.error("Error al cargar", error);
  }
}

function crearTarjeta(post) {
  const div = document.createElement("div");
  div.className =
    "bg-slate-800 p-4 rounded-lg shadow-md mb-4 flex justify-between items-center";
  div.innerHTML = `
    <div>
      <h3 class="font-bold text-lg text-emerald-400">${post.title}</h3>
      <p class="text-slate-300">${post.body}</p>
    </div>
    <button onclick="borrarPost(${post.id})" class="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-500">Borrar</button>
  `;
  return div;
}

//2. POST: Crea un post
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.querySelector("#titulo").value;
  const cuerpo = document.querySelector("#cuerpo").value;

  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: titulo, body: cuerpo }),
    });

    if (response.ok) {
      const postCreado = await response.json();
      formulario.reset();
      listaPost.prepend(crearTarjeta(postCreado));
    }
  } catch (error) {
    console.error("Error al crear", error);
  }
});

// DELETE
window.borrarPost = async (id) => {
  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      cargarPost();
    }
  } catch (error) {
    console.error("Error al borrar", error);
  }
};

cargarPost();
