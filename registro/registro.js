function registrarUsuario () {
        // Obtener los valores del formulario
        const nombre = document.getElementById("input-registro-nombre").value.trim();
        const apellidos = document.getElementById("input-registro-apellidos").value.trim();
        const email = document.getElementById("input-registro-email").value.trim();
        const contraseña = document.getElementById("input-registro-contraseña").value.trim();
        const confirmarContraseña = document.getElementById("input-registro-confirmar-contraseña").value.trim();

        // Validar las contraseñas
        if (contraseña !== confirmarContraseña) {
            alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
            return;
        }
        // Crear un objeto de usuario
        const userData = {
            nombre,
            apellidos,
            email,
            contraseña
        };



    fetch('http://localhost:8080/api/usuarios/create', {
        method: 'POST', // Especificamos el mÃ©todo de la peticiÃ³n
        headers: {
          'Content-Type': 'application/json' // Indicamos que los datos estÃ¡n en formato JSON
        },
        body: JSON.stringify(userData) // Convertimos el objeto data a un string JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
        }
          return response.json(); // Convertimos la respuesta en formato JSON
        })
        .then(data => {
          console.log('Respuesta del servidor:', data); // AquÃ­ procesamos la respuesta del servidor
        })
        .catch(error => {
          console.error('Error durante la peticiÃ³n:', error); // Manejo de errores
        }
    );

}
