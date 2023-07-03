let tablaCarrito = document.getElementById("listaProductos");
let totalHtml = document.getElementById("total");
let carro = JSON.parse(localStorage.getItem("carro")) || {};

function calcularTotal() {
  let total = 0;

  // Obtener los valores de los productos en el carrito
  const productos = Object.values(carro);

  total = productos.reduce((acumulador, producto) => {
    if (producto?.precio) {
      return acumulador + parseFloat(producto.precio);
    } else {
      return acumulador;
    }
  }, 0);

  totalHtml.innerHTML = `Total a pagar: $${total}`;

  tablaCarrito.innerHTML = "";

  Object.entries(carro).forEach(([id, prod], index) => {
    if (prod == null) {
      return;
    } else {
      const container = document.createElement("section");
      const fila = document.createElement("div");
      const imagenCelda = document.createElement("div");
      const imagen = document.createElement("img");
      imagen.src = prod?.imagen;
      imagen.alt = "Imagen del producto";
      imagen.style.width = "120px";
      imagen.style.height = "auto";
      imagenCelda.appendChild(imagen);
      fila.appendChild(imagenCelda);
      fila.innerHTML += `
      <td>${prod?.marca}</td>
      <td class="fw-bold fs-4">$${prod?.precio}</td>
      <button id=${id} class="eliminar">Eliminar Producto</button>
    `;

      container.appendChild(fila);
      tablaCarrito.appendChild(container);
    }
    let botones = document.getElementsByClassName("eliminar");
    for (const boton of botones) {
      boton.addEventListener("click", () => {
        delete carro[boton.id];
        localStorage.setItem("carro", JSON.stringify(carro));
        calcularTotal();
      });
    }
  });
}

calcularTotal();

// FINALIZAR COMPRA
let finalizarBtn = document.getElementById("finalizar");
finalizarBtn.onclick = () => {
  carro = {};
  tablaCarrito.innerHTML = "";
  totalHtml.innerHTML = `Total a pagar: $`;
  localStorage.removeItem("carro");
  
  Swal.fire({
    icon: 'success',
    title: 'Gracias por tu compra!',
    text: 'En las próximas 24 horas recibirás tu pedido!',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    /*position: 'bottom-start',*/
    toast: true,
    background: 'linear-gradient(to right, #00b09b, #96c93d)'
  });
  
};
