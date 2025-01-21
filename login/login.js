document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Obtener los valores del formulario
        const email = document.getElementById("input-registro-email").value.trim();
        const contraseña = document.getElementById("input-registro-contraseña").value.trim();

        // Validar campos vacíos
        const emailError = document.getElementById("error-email");
        const passwordError = document.getElementById("error-password");

        emailError.classList.add("d-none");
        passwordError.classList.add("d-none");

        if (!email) {
            emailError.textContent = "El correo electrónico es obligatorio.";
            emailError.classList.remove("d-none");
            return;
        }

        if (!contraseña) {
            passwordError.textContent = "La contraseña es obligatoria.";
            passwordError.classList.remove("d-none");
            return;
        }

        try {
            // Enviar los datos al backend
            const response = await fetch("http://localhost:8080/api/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, contraseña })
            });

            if (response.ok) {
                const result = await response.json();
                
                // Redirigir con la ID del usuario como parámetro en la URL
                window.location.href = `http://127.0.0.1:5500/principal.html?id=${result.id}`;


            } else if (response.status === 401) {
                alert("Correo electrónico o contraseña incorrectos.");
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            alert("Ocurrió un error al intentar iniciar sesión. Intenta de nuevo más tarde.");
        }
    });
});
