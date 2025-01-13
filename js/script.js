// Referencias a elementos del DOM
const recipeContainer = document.getElementById('recipeContainer');
const saveRecipeBtn = document.getElementById('saveRecipeBtn');
const saveEditedRecipeBtn = document.getElementById('saveEditedRecipeBtn');
const addIngredientBtn = document.getElementById('addIngredientBtn');

let temporaryIngredients = [];

// Función para reposicionar la tarjeta de añadir receta
function repositionAddRecipeCard() {
    const addRecipeCard = document.querySelector('.add-recipe-card').parentElement;
    const allCards = Array.from(recipeContainer.querySelectorAll('.col-md-4'));
    const lastCard = allCards[allCards.length - 2]; // Penúltima tarjeta (antes de la de añadir receta)

    if (lastCard) {
        lastCard.insertAdjacentElement('afterend', addRecipeCard);
    }
}

// Añadir ingrediente
addIngredientBtn.addEventListener('click', () => {
    const name = document.getElementById('ingredientName').value.trim();
    const quantity = document.getElementById('ingredientQuantity').value.trim();
    const unit = document.getElementById('ingredientUnit').value.trim();

    if (name && quantity && unit) {
        const ingredientList = document.getElementById('ingredientList');
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `${quantity} ${unit} de ${name}`;
        ingredientList.appendChild(listItem);
        temporaryIngredients.push(`${quantity} ${unit} de ${name}`);

        // Limpiar campos
        document.getElementById('ingredientName').value = '';
        document.getElementById('ingredientQuantity').value = '';
        document.getElementById('ingredientUnit').value = '';
    } else {
        alert('Por favor, completa todos los campos del ingrediente.');
    }
});

// Guardar receta desde el modal de crear receta
saveRecipeBtn.addEventListener('click', () => {
    const title = document.getElementById('recipeTitle').value.trim();
    const description = document.getElementById('recipeDescription').value.trim();
    const servings = document.getElementById('recipeServings').value.trim();
    const time = document.getElementById('recipeTime').value.trim();

    if (title && description && servings && time && temporaryIngredients.length > 0) {
        const newCard = document.createElement('div');
        newCard.classList.add('col-md-4');
        const recipeDetails = {
            title,
            description,
            servings,
            time,
            ingredients: [...temporaryIngredients],
            steps: document.getElementById('recipeSteps').value.trim() || '',
        };

        newCard.innerHTML = `
            <div class="recipe-card position-relative">
                <h5 class="recipe-title" data-details='${JSON.stringify(recipeDetails)}' data-bs-toggle="modal" data-bs-target="#recipeViewModal">${title}</h5>
                <p>Tiempo de preparación: ${time} min</p>
                <button>
                    <span class="circle1"></span>
                    <span class="circle2"></span>
                    <span class="circle3"></span>
                    <span class="circle4"></span>
                    <span class="circle5"></span>
                    <span class="text">Cocinar</span>
                </button>
                <i class="fas fa-edit position-absolute top-0 end-0 m-2 text-secondary" data-bs-toggle="modal" data-bs-target="#recipeDetailsModal" style="cursor: pointer;"></i>
                <i class="fas fa-trash-alt delete-recipe position-absolute top-0 start-0 m-2 text-danger" style="cursor: pointer;"></i>
            </div>`;

        recipeContainer.insertBefore(newCard, document.querySelector('.add-recipe-card').parentElement);
        repositionAddRecipeCard();

        // Limpiar formulario
        document.getElementById('recipeForm').reset();
        document.getElementById('ingredientList').innerHTML = '';
        temporaryIngredients = [];
        bootstrap.Modal.getInstance(document.getElementById('recipeModal')).hide();
    } else {
        alert('Completa todos los campos y añade al menos un ingrediente.');
    }
});

// Mostrar detalles en el modal de vista
recipeContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('recipe-title')) {
        const details = JSON.parse(event.target.dataset.details);

        // Mostrar los detalles en el modal
        document.getElementById('viewRecipeTitle').textContent = details.title;
        document.getElementById('viewRecipeDescription').textContent = details.description;
        document.getElementById('viewRecipeServings').textContent = details.servings;
        document.getElementById('viewRecipeTime').textContent = details.time;

        const ingredientList = document.getElementById('viewIngredientList');
        ingredientList.innerHTML = '';
        details.ingredients.forEach((ingredient) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = ingredient;
            ingredientList.appendChild(listItem);
        });

        document.getElementById('viewRecipeSteps').textContent = details.steps || 'Sin pasos adicionales';
    }
});

// Manejar el borrado de recetas
recipeContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-recipe')) {
        if (confirm('¿Estás seguro de que deseas borrar esta receta?')) {
            event.target.closest('.recipe-card').remove();
            repositionAddRecipeCard();
        }
    }
});

// Mostrar detalles en el modal de edición
recipeContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-edit')) {
        const card = event.target.closest('.recipe-card');
        const details = JSON.parse(card.querySelector('.recipe-title').dataset.details);

        // Rellenar el formulario de edición
        document.getElementById('editRecipeTitle').value = details.title;
        document.getElementById('editRecipeDescription').value = details.description;
        document.getElementById('editRecipeServings').value = details.servings;
        document.getElementById('editRecipeTime').value = details.time;

        const ingredientList = document.getElementById('editIngredientList');
        ingredientList.innerHTML = '';
        details.ingredients.forEach((ingredient) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = ingredient;
            ingredientList.appendChild(listItem);
        });

        document.getElementById('editRecipeSteps').value = details.steps || '';

        saveEditedRecipeBtn.dataset.cardIndex = Array.from(recipeContainer.children).indexOf(card);
    }
});

// Guardar cambios en receta desde el modal de edición
saveEditedRecipeBtn.addEventListener('click', () => {
    const updatedDetails = {
        title: document.getElementById('editRecipeTitle').value.trim(),
        description: document.getElementById('editRecipeDescription').value.trim(),
        servings: document.getElementById('editRecipeServings').value.trim(),
        time: document.getElementById('editRecipeTime').value.trim(),
        ingredients: Array.from(document.getElementById('editIngredientList').children).map((item) => item.textContent),
        steps: document.getElementById('editRecipeSteps').value.trim(),
    };

    const cardIndex = saveEditedRecipeBtn.dataset.cardIndex;
    const card = recipeContainer.children[cardIndex].querySelector('.recipe-card');

    card.querySelector('.recipe-title').dataset.details = JSON.stringify(updatedDetails);
    card.querySelector('.recipe-title').textContent = updatedDetails.title;
    card.querySelector('p').textContent = `Tiempo de preparación: ${updatedDetails.time} min`;

    bootstrap.Modal.getInstance(document.getElementById('recipeDetailsModal')).hide();
});
