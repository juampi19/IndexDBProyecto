import UI from "./Classes/UI.Class.js";

( function(){

    //Instancias
    const ui = new UI;
    
    //referenias
    const formulario = document.querySelector( '#formulario' );

    //Eventos
    document.addEventListener( 'DOMContentLoaded', () => {
        //Abrimos la conexion
        conectarDB();
        
        formulario.addEventListener( 'submit', validarCliente );
    } );

    //funciones
    function validarCliente( e ) {
        e.preventDefault();
        
        //Leer los datos de los inputs
        const nombre = document.querySelector( '#nombre' ).value;
        const email = document.querySelector( '#email' ).value;
        const telefono = document.querySelector( '#telefono' ).value;
        const empresa = document.querySelector( '#empresa' ).value;

        //validamos que todos los campos esten llenos
        if( nombre === '' || email === '' || telefono === '' || empresa === '' ) {
            ui.imprimirMensaje( 'Todos los campos son obligarotios', 'error' );

            return;
        }

        //creamos un objeto con la informacion
        const cliente =  {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now(),
        }

        //Agregamos el cliente a la base de datos
        crearNuevoCliente( cliente );

        formulario.reset();

    }

    function crearNuevoCliente( cliente ) {
        const transaction = DB.transaction( ['crm'], 'readwrite' );

        const objectStore = transaction.objectStore( 'crm' );

        //Agregamos al cliente
        objectStore.add( cliente );

        //Si hubo algon error
        transaction.onerror = () => {
            ui.imprimirMensaje( 'Hubo un error', 'error' );
        }
        
        //Si la transaction se completo correctamente
        transaction.oncomplete = () => {
            console.log( 'Cliente agregado' );

            ui.imprimirMensaje( 'Cliente agregado correctamente!' );

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    }

}  )();