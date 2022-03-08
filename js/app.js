import UI from "./Classes/UI.Class.js";
import { crearDB } from "./DB/db.js";

( function(){
    //Variables
    let DB;
    const listadoCliente = document.querySelector( '#listado-clientes' );
    const ui = new UI;

    //Eventos
    document.addEventListener( 'DOMContentLoaded', () => {
        crearDB();

        if( window.indexedDB.open( 'crm', 1 ) ) {
            obtenerCliente();
        }

        listadoCliente.addEventListener( 'click', eliminarCliente )
    } );

    //Funciones
    
    //Obtener el cliente
    function obtenerCliente() {
        console.log( 'Obteniendo cliente ...' );
        //Abrimos la conexion
        const abrirConexion = window.indexedDB.open( 'crm', 1 );

        abrirConexion.onerror = () => {
            console.log( 'Hubo un error' );
        }

        abrirConexion.onsuccess = () => {
            DB = abrirConexion.result;

            const objectStore = DB.transaction('crm').objectStore('crm');

            //Iteramos el objectstore con cursor
            objectStore.openCursor()
            .onsuccess = (e) => {
                const cursor = e.target.result;

                //Creamos el html
                if( cursor ){
                    ui.crearHTML( cursor.value );

                    cursor.continue();
                }else {
                    console.log( 'No hay registros' );
                }
                
            }
        }   
    }


    //Eliminar al cliente
    function eliminarCliente( e ) {
        e.preventDefault()
        if( e.target.classList.contains( 'eliminar' ) ) {
            const idEliminar = Number( e.target.dataset.cliente );
            const confirmar = confirm( '¿Deseas eliminar este cliente?' );

            if( confirmar ) {
                const transaction = DB.transaction( ['crm'], 'readwrite' );

                const objectStore = transaction.objectStore( 'crm' );

                objectStore.delete( idEliminar );

                transaction.oncomplete = () => {

                    //Quitar el html
                    e.target.parentElement.parentElement.remove();
                }

                transaction.onerror = () => {
                    console.log( 'Hubo un error' );
                }
            }
        }
    }
} )();