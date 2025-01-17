// Referencias a elementos del DOM
const recipeContainer = document.getElementById('recipeContainer');
const saveRecipeBtn = document.getElementById('saveRecipeBtn');
const saveEditedRecipeBtn = document.getElementById('saveEditedRecipeBtn');
const addIngredientBtn = document.getElementById('addIngredientBtn');
const botonPapelera = document.getElementsByClassName('delete-recipe')

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
/*
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
            <div class="recipe-card position-absolute">
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
*/
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


function editarReceta(id_receta){
    
}

// Manejar el borrado de recetas
function eliminarReceta(id_receta){
   
    if (confirm('¿Estás seguro de que deseas borrar esta receta?')) {
        const url = 'http://localhost:8080/api/recetas/delete?id=' + id_receta;
        fetch(url, {  
            method: 'DELETE'  
        })  
            .then(response => {  
                if (!response.ok) {  
                    throw new Error('Error en la respuesta del servidor');  
                }  
                location.reload();;  
            })  
              
            .catch(error => {  
                console.error('Error durante la petición:', error);  
            });  
    }
};



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



function guardarReceta() {
    const data = {
        nombre: $('#recipeTitle').val().trim(),
        descripcion: $('#recipeDescription').val().trim(),
        tiempo_de_preparacion: $('#recipeTime').val().trim(),
        num_personas: $('#recipeServings').val().trim(),
        pasos: $('#recipeSteps').val().trim(),
    };

    fetch('http://localhost:8080/api/recetas/create?id_usuario=1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
    }
      return response;
      
    })
    .then(data => {
      console.log('Respuesta del servidor:', data); 
      receta_a_Ingrediente()
      //location.reload();
    })
    .catch(error => {
      console.error('Error durante la peticiÃ³n:', error);
    });
    
    
};

function receta_a_Ingrediente(){
    const formIngredientes = document.getElementById("form-ingredientes");
    const formRecetas = document.getElementById('form-recetas');
    const botonFormulario =  document.getElementById('saveRecipeBtn');
    formRecetas.classList.add('d-none');
    formIngredientes.classList.remove('d-none');
    botonFormulario.textContent = "Guardar";
    botonFormulario.removeAttribute("onclick");

    botonFormulario.onclick = function() {
        location.reload(); 
    }
}





window.onload = function obtenerRecetas() {  
    fetch('http://localhost:8080/api/recetas/getRecetas?id_usuario=1', {  
        method: 'GET'  // Aquí se especifica correctamente el método de la petición  
    })  
        .then(response => {  
            if (!response.ok) {  
                throw new Error('Error en la respuesta del servidor');  
            }  
            return response.json();  // Convertimos la respuesta en formato JSON  
        })  
        .then(data => {  
            console.log('Recetas obtenidas:', data);  // Aquí procesamos la respuesta del servidor  
            mostrarRecetas(data);
        })  
        .catch(error => {  
            console.error('Error durante la petición:', error);  // Manejo de errores  
        });  
};

//const recetas = obtenerRecetas()
// Función para mostrar las recetas en la página
function mostrarRecetas(recetas) {
    
    // Accedemos al contenedor de recetas
    const recipeContainer = document.getElementById('recipeContainer');

    // Limpiamos el contenedor para no duplicar las recetas
    recipeContainer.innerHTML = '';

    // Verificamos si hay recetas y las mostramos
    if (recetas && recetas.length > 0) {
        recetas.forEach(function(receta) {
            // Creamos el contenedor div para cada receta
            const recetaCol = document.createElement('div');
            recetaCol.classList.add('col-md-4');

            const recetaCard = document.createElement('div');
            recetaCard.classList.add('recipe-card','position-relative');

            const recetaTitle = document.createElement('h5');
            recetaTitle.classList.add('recipe-title');
            recetaTitle.setAttribute('data-bs-toggle', 'modal');
            recetaTitle.setAttribute('data-bs-target', '#recipeDetailsModal');
            recetaTitle.textContent = receta.nombre; // Nombre de la receta

            const tiempoPrep = document.createElement('p');
            tiempoPrep.textContent = `Tiempo de preparación: ${receta.tiempo_de_preparacion} min`;

            const botonCocinar = document.createElement('button');

            const circle1 = document.createElement('span');
            circle1.classList.add('circle1');
            const circle2 = document.createElement('span');
            circle2.classList.add('circle2');
            const circle3 = document.createElement('span');
            circle3.classList.add('circle3');
            const circle4 = document.createElement('span');
            circle4.classList.add('circle4');
            const circle5 = document.createElement('span');
            circle5.classList.add('circle5');

            const buttonText = document.createElement('span');
            buttonText.classList.add('text');
            buttonText.textContent = 'Cocinar';

            // Añadimos los elementos al botón
            botonCocinar.appendChild(circle1);
            botonCocinar.appendChild(circle2);
            botonCocinar.appendChild(circle3);
            botonCocinar.appendChild(circle4);
            botonCocinar.appendChild(circle5);
            botonCocinar.appendChild(buttonText);

            //Botones de editar y eliminar

            const botonEditar = document.createElement('i');
            botonEditar.classList.add('fas','fa-edit','position-absolute','top-0','end-0','m-2','text-secondary');
            botonEditar.setAttribute("data-bs-toggle","modal");
            botonEditar.setAttribute('data-bs-target','#recipeDetailsModal');
            botonEditar.setAttribute("style","cursor: pointer;");
            botonEditar.id = receta.id
            botonEditar.addEventListener('click', () =>{
                editarReceta(receta.id)
            })   

            const botonEliminar = document.createElement('i');
            botonEliminar.classList.add("fas", "fa-trash-alt", "delete-recipe", "position-absolute", "top-0", "start-0", "m-2", "text-danger");
            botonEliminar.setAttribute("style","cursor: pointer;")
            botonEliminar.id = receta.id
            botonEliminar.addEventListener('click',() => {
                eliminarReceta(receta.id)
            })
            

            // Añadimos los elementos al card
            recetaCard.appendChild(recetaTitle);
            recetaCard.appendChild(tiempoPrep);
            recetaCard.appendChild(botonCocinar);
            recetaCard.appendChild(botonEditar);
            recetaCard.appendChild(botonEliminar);

            // Añadimos la recetaCard al contenedor de la columna
            recetaCol.appendChild(recetaCard);

            // Finalmente, añadimos la columna al contenedor principal
            recipeContainer.appendChild(recetaCol);
        });


        
    }
        const containerAnade = document.createElement('div');
        containerAnade.classList.add('col-md-4');

        const cartaAnade = document.createElement('div');
        cartaAnade.classList.add("add-recipe-card");
        cartaAnade.setAttribute('data-bs-toggle', 'modal');
        cartaAnade.setAttribute('data-bs-target', '#recipeModal');

        const icono = document.createElement('i');
        icono.classList.add('fas', 'fa-plus');
        cartaAnade.appendChild(icono);
        containerAnade.appendChild(cartaAnade);
        recipeContainer.appendChild(containerAnade); 
    
}
