document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("input-registro-nombre");
    const lastNameInput = document.getElementById("input-registro-apellidos");
    const emailInput = document.getElementById("input-registro-email");
    const passwordInput = document.getElementById("input-registro-contraseña");
    const confirmPasswordInput = document.getElementById("input-registro-confirmar-contraseña");

    // Función para mostrar mensaje de error
    const showError = (input, message) => {
        input.classList.add("is-invalid"); // Agregar borde rojo
        let errorDiv = input.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains("invalid-feedback")) {
            errorDiv = document.createElement("div");
            errorDiv.className = "invalid-feedback";
            input.parentElement.appendChild(errorDiv);
        }
        errorDiv.textContent = message; // Mostrar mensaje de error
    };

    // Función para limpiar errores
    const clearError = (input) => {
        input.classList.remove("is-invalid"); // Quitar borde rojo
        const errorDiv = input.parentElement.querySelector(".invalid-feedback");
        if (errorDiv) {
            errorDiv.remove(); // Eliminar mensaje de error
        }
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevenir el envío del formulario

        // Limpiar errores previos
        clearError(nameInput);
        clearError(lastNameInput);
        clearError(emailInput);
        clearError(passwordInput);
        clearError(confirmPasswordInput);

        const name = nameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        let hasError = false;

        // Validar nombre
        if (name === "") {
            showError(nameInput, "El nombre es obligatorio.");
            hasError = true;
        }

        // Validar apellidos
        if (lastName === "") {
            showError(lastNameInput, "Los apellidos son obligatorios.");
            hasError = true;
        }

        // Validar correo electrónico
        if (!validateEmail(email)) {
            showError(emailInput, "El correo electrónico debe incluir un '@' y un dominio válido.");
            hasError = true;
        }

        // Validar contraseñas
        if (password !== confirmPassword) {
            showError(confirmPasswordInput, "Las contraseñas no coinciden.");
            hasError = true;
        }

        if (password.length < 6) {
            showError(passwordInput, "La contraseña debe tener al menos 6 caracteres.");
            hasError = true;
        }

        // Si no hay errores, enviar formulario
        if (!hasError) {
            alert("¡Cuenta creada con éxito!");
            form.submit();
        }
    });

    // Función para validar formato de correo electrónico
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});
