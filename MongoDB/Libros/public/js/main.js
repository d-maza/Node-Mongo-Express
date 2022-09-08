window.addEventListener("DOMContentLoaded", (e) => {
  updateLibros();
});

const mapCheckboxes = () => {
  document.querySelectorAll(".leido-checkbox").forEach((item) => {
    item.addEventListener("click", async (e) => {
      console.log("as");
      const id = e.target.parentNode.parentNode.id;
      let classes = e.target.parentNode.parentNode.childNodes[3].className
        .replace("leido", "")
        .trim();
      const leido = e.target.checked;

      const res = await updateLibro(id, leido);

      if (res.response === "success") {
        if (leido) {
          e.target.parentNode.parentNode.childNodes[3].className += "leido";
        } else {
          e.target.parentNode.parentNode.childNodes[3].className += "classes";
        }
      }
      location.reload();
    });
  });
};

const updateLibros = () => {
  fetch("http://localhost:3000/getall")
    .then((res) => res.json())
    .then((data) => {
      if (data.response === "success") {
        const libros = data.data;
        document.querySelector("#libros").innerHTML = "";
        libros.forEach((libro) => {
          console.log(libro.titulo);
          document.querySelector("#libros").innerHTML += `
                    <div class="libro" id="${libro._id}">
                        <div class="checkbox-container">
                            <input type="checkbox" class="leido-checkbox" ${
                              libro.leido === true ? "checked" : ""
                            } />
                        </div>
                        <div class="titulo-container ${
                          libro.leido === true ? "leido" : ""
                        }">
                            ${libro.titulo}
                        </div>
                        <div class="actions-container">
                            <a href="/delete/${
                              libro._id
                            }" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
</svg> </a>
                        </div>
                    </div>
                `;
        });

        mapCheckboxes();
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const updateLibro = async (id, leido) => {
  const res = await fetch(
    "http://localhost:3000/leido/" + id + "/" + leido
  ).then((res) => res.json());

  return res;
};

document.querySelector("#formulario").addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = document.querySelector("#titulo").value;
  if (titulo === "") return false;

  fetch("http://localhost:3000/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo: titulo }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.response === "success") {
        updateLibros();
        document.querySelector("#titulo").value = "";
      }
    });
});
