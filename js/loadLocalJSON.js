let seccionProducto = document.getElementById('seccion-productos');

let contenedorProductos = document.createElement('div');

contenedorProductos.classList.add('contenedor-producto');

async function cargarJSON() {
  try {

    const response = await fetch('../js/paquetes.json');

    const data = await response.json();

    seccionProducto.innerHTML = '';

    let contenedorProductos = document.createElement('div');

    contenedorProductos.classList.add('contenedor-producto');
    data.forEach(producto => {
      let precio = producto.price;
      let nombre = producto.name.replace("'", "`");
      let objToPass = {
        price : precio
      }

      let card = document.createElement('div');
      card.classList.add('card');

      let img = document.createElement('img');
      img.id = 'imagen';
      img.className = 'imagen';
      img.src = producto.image;
      img.alt = producto.name;
      img.classList.add('imagen-ajustada');
      card.appendChild(img);

      let divPrecio = document.createElement('div');
      divPrecio.id = 'precio';
      divPrecio.setAttribute('name', 'precio');
      divPrecio.textContent = producto.price + ' $';
      card.appendChild(divPrecio);
      card.appendChild(document.createElement('br'));

      let divNombre = document.createElement('div');
      divNombre.id = 'nombre';
      divNombre.setAttribute('name', 'nombre');
      divNombre.className = 'nombre';
      divNombre.textContent = producto.name;
      card.appendChild(divNombre);
      card.appendChild(document.createElement('br'));

      let divDesc = document.createElement('div');
      divDesc.id = 'desc';
      divDesc.setAttribute('name', 'desc');
      divDesc.className = 'desc';
      divDesc.textContent = producto.description;
      card.appendChild(divDesc);

      let boton = document.createElement('button');
      boton.className = 'button';
      boton.textContent = 'Agregar 🛒';
      boton.addEventListener('click', () => {
        addWishList(producto);
      });
      card.appendChild(boton);
      contenedorProductos.appendChild(card);
    });
 
    seccionProducto.appendChild(contenedorProductos);
  } catch (error) {
    seccionProducto.innerHTML = '<p class="error">No se pudieron cargar los productos.</p>';
    console.error("Error al obtener productos:", error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cargarJSON();
  mostrarWishList();
});

function addWishList(producto) {
  try {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const index = wishlist.findIndex(item => item.id === producto.id);
    if (index !== -1) {

      wishlist[index].cantidad = (wishlist[index].cantidad || 1) + 1;
    } else {
  
      let productoCopia = { ...producto, cantidad: 1 };
      wishlist.push(productoCopia);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    mostrarWishList(); 
  } catch (error) {
    console.error("Error al procesar producto : ", error);
  }
}

function mostrarWishList() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  let lista = document.getElementById('wishlist-list');
  if (!lista) {
 
    const wishlistSection = document.createElement('section');
    wishlistSection.id = 'wishlist';
    const titulo = document.createElement('h2');
    titulo.textContent = 'Lista de deseos';
    lista = document.createElement('ul');
    lista.id = 'wishlist-list';
    wishlistSection.appendChild(titulo);
    wishlistSection.appendChild(lista);
  
    document.body.appendChild(wishlistSection);
  } else {
    lista.innerHTML = '';
  }
  wishlist.forEach(producto => {
    const li = document.createElement('li');
    li.textContent = `${producto.name} - Cantidad: ${producto.cantidad}`;
    lista.appendChild(li);
  });
}

function eliminar(id) {
  let idx = id.toString();
  console.log(idx);
  localStorage.removeItem(idx);
  actualizarPagina();
}

const btnDeleteAll = document.getElementById('delete-all');
btnDeleteAll.addEventListener('click', eliminarDeseados);

async function eliminarDeseados() {
  try {
    localStorage.clear();
    actualizarPagina();
  } catch(error) {
    console.log(error);
  }
}

function actualizarPagina() {
  location.reload();
}