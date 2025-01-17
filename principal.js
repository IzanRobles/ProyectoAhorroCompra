document.addEventListener("DOMContentLoaded", () => {
    // Obtener la ID del usuario de la URL
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");

    if (userId) {
        console.log(`ID del usuario: ${userId}`);
        // Aquí puedes usar la ID para realizar solicitudes o mostrar datos específicos del usuario
    } else {
        console.error("No se encontró la ID del usuario en la URL.");
    }
});





