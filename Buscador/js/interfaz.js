class interfaz{
    constructor(){
        //incializa la app al instanciar
        this.init();
        //leer el resultado
        this.listado= document.getElementById('resultado-eventos');

    }
    //Metodo para cuando inicialice la app 
    init(){
        this.imprimirCategorias();    
        
    }
    
        //imprimir las categorias
    imprimirCategorias(){
        const listaCategorias = eventBride.obtenerCategorias()
            .then(categorias => {
                const cats= categorias.categorias.categories;
                //seleccionar el select que va a ser llenado con las categorias
                const selectCategoria = document.getElementById('listado-categorias');
               // recorrer el arreglo 
               cats.forEach(cat => {
                   const option = document.createElement('option');
                   option.value = cat.id;
                   option.appendChild(document.createTextNode(cat.name_localized));
                   selectCategoria.appendChild(option);
                   
               })


            })
    }
    //leer la respuesta de la API e imprimir los resultados
    mostrarEventos(eventos){
        //leer los eventos y agregarlos a una variable
        const listaEventos= eventos.events;
        //recorrer los eventos y crear su template
        listaEventos.forEach(evento=>{
            this.listado.innerHTML+=` 
                <div class="col-md-4 b-4">
                    <div class="card">
                        
                        <div class="card-body">
                            <img class=img-fluid mb-2" src="${evento.logo !==null ?
                            evento.logo.url:''}">
                        </div>

                        <div class="card-body">
                                <div class="card-text">
                                    <h2 class="text-center">${evento.name.text}</h2>
                                    <p class="lead text-info">Informacion del evento</p>
                                    <p>${evento.description.text.substring(0,280)}...</p>

                                    <span class="badge badge-primary">Capacidad:  ${evento.capacity}</span>
                                    <span class="badge badge-secondary">Fecha y hora:${evento.start.local}</span>

                                    <a href="${evento.url}" target="_blank" class="btn btn-primary btn-block mt-4">
                                    Comprar boletos</a>

                                </div>

                        </div>                    
                    
                    </div>     

                </div>
            
            `;
        })

    }
    //limpiar resultados al volver a pulsar buscar 
    limpiaResultados(){
        this.listado.innerHTML='';
    }


    //metodo para imprimir mensajes 
    mostrarMensaje(mensaje, clases){
        const div = document.createElement('div');
        div.classList = clases;
        //agregar texto
        div.appendChild(document.createTextNode(mensaje));
        //buscar un padre 
        const buscadorDiv= document.querySelector('#buscador');
        buscadorDiv.appendChild(div);
        // quitar la alerta en dos segundos
        setTimeout(() => {
            this.limpiaMensaje();
        }, 2000);

    }
    //limpiar o desaparecer div 
    limpiaMensaje(){
        const alert = document.querySelector('.alert');
        if (alert){
            alert.remove();
        }
    }
}