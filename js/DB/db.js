let DB;

//Creamos la base de datos con indexDB
export function crearDB() {

    const crearDB = window.indexedDB.open( 'crm', 1 );

    //Si encuentra un error
    crearDB.onerror = () => {
        console.log( 'Hubo un error' );
    }

    //Si se crea correctamente
    crearDB.onsuccess = () => {
        DB = crearDB.result; // Guardo la referencia de la base de datos en la variable
    }

    //Creamos las columnas
    crearDB.onupgradeneeded = e => {
        const db = e.target.result;

        const objectStore = db.createObjectStore( 'crm', { keyPath: 'id', autoIncrement: true } );

        objectStore.createIndex( 'nombre', 'nombre', { unique: false } );
        objectStore.createIndex( 'email', 'email', { unique: true } );
        objectStore.createIndex( 'telefono', 'telefono', { unique: false } );
        objectStore.createIndex( 'empresa', 'empresa', { unique: false } );
        objectStore.createIndex( 'id', 'id', { unique: true } );

        console.log( 'DB lista y creada' );

    }


}