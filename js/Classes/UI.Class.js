class UI {

    imprimirMensaje( mensaje, tipo ) {
        const formulario = document.querySelector( '#formulario' );
        const alerta = document.querySelector( '.alerta' );
        if( !alerta ) {
            //Crear la alerta
            const divMensaje = document.createElement( 'div' );

            divMensaje.classList.add( 'px-4', 'py-3', 'rounded', 'max-w-lg','mx-auto', 'mt-6', 'text-center','alerta', 'border' );

            if( tipo === 'error' ) {
                divMensaje.classList.add( 'bg-red-100', 'border-red-400', 'text-red-700' );
            }else {
                divMensaje.classList.add( 'bg-green-100', 'border-green-400', 'text-green-700' );
            }

            divMensaje.textContent = mensaje;

            formulario.appendChild( divMensaje );
        
            setTimeout(() => {
            divMensaje.remove();
            }, 3000);
        }
    
    }

    crearHTML( { nombre, email, telefono, empresa, id } ) {
        const listadoCliente = document.querySelector( '#listado-clientes' );

        listadoCliente.innerHTML += ` <tr>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                    <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                    <p class="text-gray-700">${telefono}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                    <p class="text-gray-600">${empresa}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                    <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                    <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                </td>
            </tr>
        `;
    }

}

export default UI;