// Función para obtener los productos mediante AJAX - Fetch
function getProductos() {
  fetch("../data/data.json")
    .then((response) => response.json())
    .then((data) => {
      // Hacer algo con los datos de respuesta (por ejemplo, mostrarlos en una lista)
      mostrarProductos(data);
    })
    .catch((error) => {
      console.error("Error al obtener los productos:", error);
    });
}

function mostrarProductos(products) {
  // Obtener el contenedor de productos
  const container = document.getElementById("contenedor");

  // Recorrer el arreglo de productos
  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    // Crear el elemento de la tarjeta
    const card = document.createElement("div");
    card.classList.add("card");

    // Crear la imagen del producto
    const image = document.createElement("img");
    image.src = product.imagen;
    card.appendChild(image);

    // Crear el título del producto
    const title = document.createElement("h3");
    title.textContent = product.marca;
    card.appendChild(title);

    // Crear el detalle del producto
    const details = document.createElement("p");
    details.textContent =
      "Peso: " + product.peso + ", Precio: $" + product.precio;
    card.appendChild(details);

    // Crear el botón de guardar en el Local Storage
    const saveButton = document.createElement("button");
    saveButton.textContent = "Agregar al carrito";
    saveButton.addEventListener("click", function () {
      // Obtener los productos previamente guardados en el Local Storage
      const savedProducts = JSON.parse(localStorage.getItem("carro")) || [];

      // Agregar el producto actual al array de productos
      savedProducts.push(product);

      // Guardar el array de productos en el Local Storage
      localStorage.setItem("carro", JSON.stringify(savedProducts));
      
      Swal.fire({
        title: "¡Producto guardado!",
        text: "El producto se ha guardado en el carrito.",
        icon: "success",
        confirmButtonText: "Aceptar"
      });
      
    });
    card.appendChild(saveButton);

    // Agregar la tarjeta al contenedor
    container.appendChild(card);
  }
}

getProductos();
