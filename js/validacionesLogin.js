
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const emailInput = document.getElementById("input-registro-email");
        const passwordInput = document.getElementById("input-registro-contraseña");
        const errorEmail = document.getElementById("error-email");
        const errorPassword = document.getElementById("error-password");

        let isValid = true;

        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue) {
            errorEmail.textContent = "Este campo es obligatorio.";
            errorEmail.classList.remove("d-none");
            emailInput.classList.add("is-invalid");
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            errorEmail.textContent = "El correo debe tener un formato válido (ejemplo@dominio.com).";
            errorEmail.classList.remove("d-none");
            emailInput.classList.add("is-invalid");
            isValid = false;
        } else {
            errorEmail.classList.add("d-none");
            emailInput.classList.remove("is-invalid");
        }
        if (!passwordInput.value.trim()) {
            errorPassword.classList.remove("d-none");
            passwordInput.classList.add("is-invalid");
            isValid = false;
        } else {
            errorPassword.classList.add("d-none");
            passwordInput.classList.remove("is-invalid");
        }
        if (isValid) {
            form.submit();
        }
    });
});
