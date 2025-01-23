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





// Función para mostrar el modal de cocinar con todos los detalles de la receta
function mostrarDetallesYCalcular(receta) {
    const cookModal = new bootstrap.Modal(document.getElementById('cookModal'));
    const calculateBtn = document.getElementById('calculateBtn');
    const numPeopleInput = document.getElementById('numPeople');
    const ingredientsList = document.getElementById('ingredientsList');
    const calculatedIngredients = document.getElementById('calculatedIngredients');

    // Mostrar detalles de la receta
    document.getElementById('viewRecipeTitle2').textContent = receta.nombre;
    document.getElementById('viewRecipeDescription2').textContent = receta.descripcion;
    
    document.getElementById('viewRecipeTime2').textContent = receta.tiempo_de_preparacion;
    document.getElementById('viewRecipeSteps2').textContent = receta.pasos || 'Sin pasos adicionales';

    // Limpiar campos del modal
    numPeopleInput.value = '';
    ingredientsList.style.display = 'none';
    calculatedIngredients.innerHTML = '';

    // Configurar evento del botón "Siguiente"
    calculateBtn.onclick = () => {
        const numPeople = parseInt(numPeopleInput.value);

        if (isNaN(numPeople) || numPeople < 1) {
            alert('Por favor, introduce un número válido de personas.');
            return;
        }

        // Obtener los ingredientes de la receta desde el backend
        fetch(`http://localhost:8080/api/ingredientes/getIngredientes?id_receta=${receta.id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los ingredientes.');
                }
                return response.json();
            })
            .then(ingredientes => {
                // Mostrar la lista de ingredientes calculados
                ingredientsList.style.display = 'block';
                calculatedIngredients.innerHTML = '';
                ingredientes.forEach(ingrediente => {
                    const cantidadPorPersona = ingrediente.cantidad / receta.num_personas; // Ajustar según la receta
                    const cantidadFinal = cantidadPorPersona * numPeople;

                    const li = document.createElement('li');
                    li.className = 'list-group-item';
                    li.textContent = `${cantidadFinal.toFixed(2)} ${ingrediente.unidades} de ${ingrediente.ingrediente}`;
                    calculatedIngredients.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error al calcular los ingredientes:', error);
            });
    };

    // Mostrar el modal
    cookModal.show();
}




//VALIDACIONES DE INGREDIENTES
function validateName(input) {
    const warning = document.getElementById('nameWarning');
    const hasNumbers = /\d/.test(input.value);

    if (hasNumbers) {
        warning.style.display = 'block';
        input.value = input.value.replace(/\d/g, '');
    } else {
        warning.style.display = 'none';
    }
}



function validateUnit(input) {
    const allowedUnits = [// Masa
        'kg', 'kilogramo', 'kilogramos', 'hg', 'hectogramo', 'hectogramos', 'dag', 'decagramo', 'decagramos',
        'g', 'gramo', 'gramos', 'dg', 'decigramo', 'decigramos', 'cg', 'centigramo', 'centigramos',
        'mg', 'miligramo', 'miligramos',
        // Volumen
        'kl', 'kilolitro', 'kilolitros', 'hl', 'hectolitro', 'hectolitros', 'dal', 'decalitro', 'decalitros',
        'l', 'litro', 'litros', 'dl', 'decilitro', 'decilitros', 'cl', 'centilitro', 'centilitros', 'ml', 'mililitro', 'mililitros',
        // Unidades genéricas
        'unidad', 'unidades', 'pieza', 'piezas',
        // Otros términos posibles
        'cucharadita', 'cucharaditas', 'cucharada', 'cucharadas', 'taza', 'tazas', 'botella', 'botellas', 'paquete', 'paquetes',
        'sobre', 'sobres', 'pizca', 'pizcas', 'barra', 'barras'];
    const warning = document.getElementById('unitWarning');

    if (!allowedUnits.includes(input.value.trim())) {
        warning.style.display = 'block';
    } else {
        warning.style.display = 'none';
    }
}