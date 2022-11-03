
    /*  window.location = `
https://api.whatsapp.com/send?phone=573015304944&text=Quedo a la espera de mi pedido:%0A
${producto}%0A

`; */
//VARIABLE CONTENEDOR DE LOS SLIDER SECTION,
//VARIABLE DE LAS SECTIONS DE LOS SLIDER LET
//OBTENEMOS LA ULTIMA SECTION DEL ELEMENTO SECTION
const $slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider__section");
let slider__sectionLast = sliderSection[sliderSection.length -1];
const $btnLeft = document.querySelector("#btn-left");
const $btnRight = document.querySelector("#btn-right");
//VARIABLES CARRITO DE COMPRAS
const $btnCarrito = document.querySelector('#btn-carrito');
const $contCarrito = document.querySelector('#carrito');
const $productos = document.querySelector('#slider');
const $contList = document.querySelector('#list-carrito tbody');
const $limpiarCarrito = document.querySelector('#limpiar-carrito');
let $carritoProductos = [];
//VARIABLE PEDIR
const $pedir = document.querySelector('#pedir');
//MODAL
const $modal = document.querySelector('#sect-modal');
let $contador = document.querySelector('#contador');

window.addEventListener('DOMContentLoaded', (event) => { 
   
    $slider.insertAdjacentElement('afterbegin', slider__sectionLast);
    $btnRight.addEventListener('click',function(){
        sliderRight(); 
    });
    $btnLeft.addEventListener('click',function(){
        sliderLeft(); 
    });  
    $btnCarrito.addEventListener('click', function(){
        mostrarProductos();
    });
    /** FUNCIONES CARRITO */
    $productos.addEventListener('click', agregarProducto);
    //eliminar productos
    $contCarrito.addEventListener('click', eliminarProducto);
    //LimpiarCarrito
    $limpiarCarrito.addEventListener('click', () =>{
        $carritoProductos = [];
        mostrarCarrito();

    });

});




const sliderRight = () =>{
    let sliderSectionFirst = document.querySelectorAll(".slider__section")[0];
    $slider.style.marginLeft = "-200%";
    $slider.style.transtion = "all 0.5s";
    
    setTimeout(function(){
        $slider.style.transtion = "none";  
        $slider.insertAdjacentElement('beforeend', sliderSectionFirst); 
        $slider.style.marginLeft = "-100%"; 
    },500);
};

const sliderLeft = () =>{
    let sliderSection = document.querySelectorAll(".slider__section");
    let slider__sectionLast = sliderSection[sliderSection.length -1];
    $slider.style.marginLeft = "0";
    $slider.style.transtion = "all 0.5s";
    
    setTimeout(function(){
        $slider.style.transtion = "none";  
        $slider.insertAdjacentElement('afterbegin', slider__sectionLast); 
        $slider.style.marginLeft = "-100%"; 
    },500);
};

/** FUNCIONALIDAD CARRITO  */
const mostrarProductos = () =>{
    $contCarrito.classList.toggle('carrito-visible');
}

const agregarProducto = (e) =>{
   if(e.target.classList.contains('agregar-carrito')){
    const productoSeleccionado = e.target.parentElement.parentElement.parentElement;
    leerDatos(productoSeleccionado);
   }
   //VENTANA MODAL 
   if(e.target.classList.contains('agregar-carrito')){
    $modal.classList.remove("sect-modal_active");
    setTimeout(() => {
        $modal.classList.add("sect-modal_active");
      }, 1000)
   }
   
}

// eliminar cursos de
const eliminarProducto = (e)=>{
    if(e.target.classList.contains('borrar-producto')){
        const productoId = e.target.getAttribute('data-id');
        //elimina del arreglo
        $carritoProductos = $carritoProductos.filter(producto => producto.id !== productoId );
        mostrarCarrito();
    }
}
 
const leerDatos = (producto) =>{
    //CREAMOS UN OBJ CON EL CONTENIDO ACTUAL
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h2').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad:1
    }
   

    //revisa si el elemento ya existe
    const existe = $carritoProductos.some( producto => producto.id === infoProducto.id);
    if(existe){
        //actualizamos cantidad
        const seleccionProducto = $carritoProductos.map( producto =>{
            if(producto.id === infoProducto.id){
                producto.cantidad++;
                return producto;
            }else{
                return producto;
            }
        }); 

        $carritoProductos = [...seleccionProducto];
       
    }else{
         //Agrega los elementos al carrito producto
        $carritoProductos = [...$carritoProductos, infoProducto];

    }
    console.log($carritoProductos.length);
    //ENVIAMOS DATOS POR WHATSAPP
    $pedir.addEventListener('click',()=>{
        switch ($carritoProductos.length) {
            case 1:
                window.location = `
                https://api.whatsapp.com/send?phone=573015304944&text=QUEDO A LA ESPERA DE MI PEDIDO⏱️:%0A🍣${$carritoProductos[0].titulo}🍣%0A🧑🏻‍🍳🍣EN UN MOMENTO SE COMUNICARA ALGUNO DE NUESTROS MESEROS PARA CONFIRMA TU PEDIDO🍣🧑🏻‍🍳`;
                break;
            case 2:
                window.location = `
                https://api.whatsapp.com/send?phone=573015304944&text=QUEDO A LA ESPERA DE MI PEDIDO⏱️:%0A🍣${$carritoProductos[0].titulo}🍣%0A🍣${$carritoProductos[1].titulo}🍣%0A🧑🏻‍🍳🍣EN UN MOMENTO SE COMUNICARA ALGUNO DE NUESTROS MESEROS PARA CONFIRMA TU PEDIDO🍣🧑🏻‍🍳`;
                break;
            case 3:
                window.location = `
                https://api.whatsapp.com/send?phone=573015304944&text=QUEDO A LA ESPERA DE MI PEDIDO⏱️:%0A🍣${$carritoProductos[0].titulo}🍣%0A🍣${$carritoProductos[1].titulo}🍣%0A🍣${$carritoProductos[2].titulo}🍣%0A🧑🏻‍🍳🍣EN UN MOMENTO SE COMUNICARA ALGUNO DE NUESTROS MESEROS PARA CONFIRMA TU PEDIDO🍣🧑🏻‍🍳`;
                break;
        
            default:
                alert("El CARRITO ESTA VACIO");
                break;
        }
       
    });

    mostrarCarrito();
   /*  console.log($carritoProductos); */ 
}

// muestra los articulos en el carrito de compras en el HTML

const mostrarCarrito = ()=>{
    //Limpiar el HTML
    limpiarHtml();
    //Recorre el carrito y genera el HTML
    $carritoProductos.forEach((producto)=>{
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="100"/>
            </td>
            <td>
                ${producto.titulo}
            </td>
            <td>
                ${producto.precio}
            </td>
            <td>
                ${producto.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}"> X </a>
            </td>
        `;
        //agregar hml5 en el tbody
        $contList.appendChild(row);
       
    });
    
    $contador.innerHTML = `${$carritoProductos.length}`;
}

//Eliminar los productos del carrito
const limpiarHtml = () =>{
    while($contList.firstChild){
        $contList.removeChild($contList.firstChild);
    }
}



