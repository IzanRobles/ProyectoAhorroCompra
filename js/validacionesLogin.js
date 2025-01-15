document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const emailInput = document.getElementById("input-registro-email");
        const passwordInput = document.getElementById("input-registro-contraseña");
        const errorEmail = document.getElementById("error-email");
        const errorPassword = document.getElementById("error-password");

        let isValid = true;

        // Validación del correo electrónico
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailValue) {
            showError(emailInput, errorEmail, "Por favor, introduce tu correo electrónico.");
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            showError(emailInput, errorEmail, "El formato del correo no es válido. Ejemplo: usuario@dominio.com.");
            isValid = false;
        } else if (emailValue.split("@")[1].split(".").length < 2) {
            showError(emailInput, errorEmail, "El dominio del correo debe ser válido.");
            isValid = false;
        } else {
            clearError(emailInput, errorEmail);
        }

        // Validación de la contraseña
        const passwordValue = passwordInput.value.trim();
        if (!passwordValue) {
            showError(passwordInput, errorPassword, "Por favor, introduce tu contraseña.");
            isValid = false;
        } else if (passwordValue.length < 8) {
            showError(passwordInput, errorPassword, "La contraseña debe tener al menos 8 caracteres.");
            isValid = false;
        } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(passwordValue)) {
            showError(passwordInput, errorPassword, "La contraseña debe incluir una mayúscula, una minúscula y un número.");
            isValid = false;
        } else {
            clearError(passwordInput, errorPassword);
        }

        // Enviar el formulario si es válido
        if (isValid) {
            // Mostrar una animación o mensaje de carga
            const submitButton = form.querySelector("button[type='submit']");
            submitButton.disabled = true;
            submitButton.textContent = "Validando...";

            setTimeout(() => {
                form.submit();
            }, 1000); // Simulación de tiempo de validación
        }
    });

    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.remove("d-none");
        input.classList.add("is-invalid");
    }

    function clearError(input, errorElement) {
        errorElement.textContent = "";
        errorElement.classList.add("d-none");
        input.classList.remove("is-invalid");
    }
});
