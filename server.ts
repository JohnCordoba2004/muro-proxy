import express from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";

const app = express();
const port = 3000;
const distPath = fileURLToPath(new URL("./dist", import.meta.url));
app.use(cors());
app.use(express.json());

//get
app.get("/api/posts", async (req, res) => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Response Status: ${response.status}`);

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Errror al obtener los posts" });
  }
});

//post
app.post("/api/posts", async (req, res) => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  try {
    const { title, body } = req.body;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok)
      throw new Error(`Error al crear el post, ${response.status}`);

    const data = await response.json();
    res.status(201).json(data); //201 = created
  } catch (error) {
    res.status(500).json({ error: "Error al crear el post" });
  }
});
//put
app.put("/api/posts/:id", async (req, res) => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  try {
    const { title, body } = req.body;
    const response = await fetch(`${url}/${req.params.id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: parseInt(req.params.id),
        title,
        body,
        userId: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok)
      throw new Error(`Error al actualizar el post, ${response.status}`);

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "Error al cargar el post" });
  }
});
//delete
app.delete("/api/posts/:id", async (req, res) => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  try {
    const response = await fetch(`${url}/${req.params.id}`, {
      method: "DELETE",
    });

    if (!response.ok)
      throw new Error(`Error al actualizar el post, ${response.status}`);

    res.status(200).json({ message: "Post eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar el post" });
  }
});

app.use(express.static(distPath));

app.listen(port, () => {
  console.log(`servidor moderno corriendo en http://localhost:${port}`);
});
