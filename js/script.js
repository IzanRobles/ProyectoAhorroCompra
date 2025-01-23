// Referencias a elementos del DOM
const recipeContainer = document.getElementById('recipeContainer');
const saveRecipeBtn = document.getElementById('saveRecipeBtn');
const saveEditedRecipeBtn = document.getElementById('saveEditedRecipeBtn');
const addIngredientBtn = document.getElementById('addIngredientBtn');
const botonPapelera = document.getElementsByClassName('delete-recipe');
let modalEditar = new bootstrap.Modal(document.getElementById('recipeDetailsModal'));
let modalMostrar = new bootstrap.Modal(document.getElementById('recipeViewModal'));


const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
let recetas = {};
let ingredientes = {};

let temporaryIngredients = [];

/*Función para reposicionar la tarjeta de añadir receta
function repositionAddRecipeCard() {
    const addRecipeCard = document.querySelector('.add-recipe-card').parentElement;
    const allCards = Array.from(recipeContainer.querySelectorAll('.col-md-4'));
    const lastCard = allCards[allCards.length - 2]; // Penúltima tarjeta (antes de la de añadir receta)

    if (lastCard) {
        lastCard.insertAdjacentElement('afterend', addRecipeCard);
    }
}
*/
// Añadir ingrediente




function eliminarIngrediente(id, id_receta){
    const url = 'http://localhost:8080/api/ingredientes/delete?id_ingrediente=' + id;
        fetch(url, {  
            method: 'DELETE'
              
        })  
            .then(response => {  
                if (!response.ok) {  
                    throw new Error('Error en la respuesta del servidor');  
                }  
                getListaIngredientesAñadir(id_receta);  
                getListaIngredientesEditar(id_receta)
            })  
              
            .catch(error => {  
                console.error('Error durante la petición:', error);  
            });  
}


function añadirIngrediente(id_receta){
   /* const nombreIng = ;
    const cantidadIng = ;
    const unidadesIng = ;
*/


        const ingrediente_a_añadir = {
            ingrediente: document.getElementById('ingredientName').value.trim(),
            cantidad: document.getElementById('ingredientQuantity').value.trim(),
            unidades: document.getElementById('ingredientUnit').value.trim(),
        };
        console.log("Ingrediente: ", ingrediente_a_añadir)
    
        fetch(`http://localhost:8080/api/ingredientes/create?id_receta=${id_receta}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ingrediente_a_añadir)
            
        })
        .then(response => {
            if (!response.ok) {
                console.log("Ingrediente: ", ingrediente_a_añadir)
                throw new Error('Error en la respuesta del servidor');
        }
          return response;
          
        })
        
        .then(data => {
          console.log('Respuesta del servidor:', data); 
          getListaIngredientesAñadir(id_receta)
          
          //location.reload();
        })
        .catch(error => {
          console.error('Error durante la peticiÃ³n:', error);
        });
        
        
    
    

        /*const ingredientList = document.getElementById('ingredientList');
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `${quantity} ${unit} de ${name}`;
        ingredientList.appendChild(listItem);
        temporaryIngredients.push(`${quantity} ${unit} de ${name}`);
*/
        // Limpiar campos
        document.getElementById('ingredientName').value = '';
        document.getElementById('ingredientQuantity').value = '';
        document.getElementById('ingredientUnit').value = '';
}
    
function añadirIngredienteEditar(id_receta){
    /* const nombreIng = ;
     const cantidadIng = ;
     const unidadesIng = ;
 */
 
 
         const ingrediente_a_añadir = {
             ingrediente: document.getElementById('ingredientEditName').value.trim(),
             cantidad: document.getElementById('ingredientEditQuantity').value.trim(),
             unidades: document.getElementById('ingredientEditUnit').value.trim(),
         };
         console.log("Ingrediente: ", ingrediente_a_añadir)
     
         fetch(`http://localhost:8080/api/ingredientes/create?id_receta=${id_receta}`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(ingrediente_a_añadir)
             
         })
         .then(response => {
             if (!response.ok) {
                 console.log("Ingrediente: ", ingrediente_a_añadir)
                 throw new Error('Error en la respuesta del servidor');
         }
           return response;
           
         })
         
         .then(data => {
           console.log('Respuesta del servidor:', data); 
           getListaIngredientesEditar(id_receta)
           
           //location.reload();
         })
         .catch(error => {
           console.error('Error durante la peticiÃ³n:', error);
         });
         
         
     
     
 
         /*const ingredientList = document.getElementById('ingredientList');
         const listItem = document.createElement('li');
         listItem.classList.add('list-group-item');
         listItem.textContent = `${quantity} ${unit} de ${name}`;
         ingredientList.appendChild(listItem);
         temporaryIngredients.push(`${quantity} ${unit} de ${name}`);
 */
         // Limpiar campos
         document.getElementById('ingredientName').value = '';
         document.getElementById('ingredientQuantity').value = '';
         document.getElementById('ingredientUnit').value = '';
 }
    

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

/*
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
*/




function formEditarReceta(id_receta){
    document.getElementById('editRecipeTitle').value = recetas[id_receta].nombre;
    document.getElementById('editRecipeDescription').value = recetas[id_receta].descripcion;
    document.getElementById('editRecipeServings').value = recetas[id_receta].num_personas;
    document.getElementById('editRecipeTime').value = recetas[id_receta].tiempo_de_preparacion;
    document.getElementById('editRecipeSteps').value = recetas[id_receta].pasos;

    document.getElementById('saveEditedRecipeBtn').addEventListener('click', () =>{
        const data = {
            nombre: document.getElementById('editRecipeTitle').value.trim(),
            descripcion: document.getElementById('editRecipeDescription').value.trim(),
            tiempo_de_preparacion: document.getElementById('editRecipeTime').value.trim(),
            num_personas: document.getElementById('editRecipeServings').value.trim(),
            pasos: document.getElementById('editRecipeSteps').value.trim(),
        };
        console.log("receta Actualizada: " + data)
        updateReceta(id_receta, data)
        receta_a_Ingrediente_editar(id_receta)
        

    })

    modalEditar.show();
}


function updateReceta(id_receta, receta){
    const url = 'http://localhost:8080/api/recetas/update?id=' + id_receta;
        fetch(url, {  
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(receta)  
        })  
            .then(response => {  
                if (!response.ok) {  
                    throw new Error('Error en la respuesta del servidor');  
                }
                  
               // location.reload();;  
            })  
              
            .catch(error => {  
                console.error('Error durante la petición:', error);  
            }); 

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

/*
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
*/


function getListaIngredientesVisualizar(id_receta){
    fetch(`http://localhost:8080/api/ingredientes/getIngredientes?id_receta=${id_receta}`, {  
        method: 'GET'   
    })  
        .then(response => {  
            if (!response.ok) {  
                throw new Error('Error en la respuesta del servidor');  
            }  
            return response.json();    
        })  
        .then(data => {  
            mostrarListaIngredientesVisualizar(data);
        }) 
        .catch(error => {  
            console.error('Error durante la petición:', error);  // Manejo de errores  
        });  
}


function getListaIngredientesAñadir(id_receta){
    fetch(`http://localhost:8080/api/ingredientes/getIngredientes?id_receta=${id_receta}`, {  
        method: 'GET'   
    })  
        .then(response => {  
            if (!response.ok) {  
                throw new Error('Error en la respuesta del servidor');  
            }  
            return response.json();    
        })  
        .then(data => {  
            mostrarListaIngredientesAñadir(data);
        }) 
        .catch(error => {  
            console.error('Error durante la petición:', error);  // Manejo de errores  
        });  
}

function getListaIngredientesEditar(id_receta){
    fetch(`http://localhost:8080/api/ingredientes/getIngredientes?id_receta=${id_receta}`, {  
        method: 'GET'   
    })  
        .then(response => {  
            if (!response.ok) {  
                throw new Error('Error en la respuesta del servidor');  
            }  
            return response.json();    
        })  
        .then(data => {  
            mostrarListaIngredientesEditar(data);
        }) 
        .catch(error => {  
            console.error('Error durante la petición:', error);  // Manejo de errores  
        });  
}




function mostrarListaIngredientesAñadir(ingredientes){
    const ingredientList = document.getElementById('ingredientList');
    ingredientList.innerHTML = '';
    ingredientes.forEach((ingrediente) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between');
        listItem.textContent = ingrediente.ingrediente + ": " + ingrediente.cantidad + " " + ingrediente.unidades;
        
        const botonEliminarIngrediente = document.createElement('i');
        botonEliminarIngrediente.classList.add('fas', 'fa-trash', 'fa-trash-alt', 'delete-recipe', 'm-2', 'text-danger', 'justify-content-end', 'd-flex');
        botonEliminarIngrediente.setAttribute('style', 'cursor: pointer;');
        botonEliminarIngrediente.setAttribute('cursorhover', 'true');
        botonEliminarIngrediente.id = ingrediente.id_ingrediente;
        botonEliminarIngrediente.addEventListener('click', () => {
            eliminarIngrediente(ingrediente.id_ingrediente, ingrediente.id_receta);
        });
        listItem.appendChild(botonEliminarIngrediente);
        
        ingredientList.appendChild(listItem);
    });
}


function mostrarListaIngredientesEditar(ingredientes){
    const ingredientList = document.getElementById('ingredientEditList');
    ingredientList.innerHTML = '';
    ingredientes.forEach((ingrediente) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between');
        listItem.textContent = ingrediente.ingrediente + ": " + ingrediente.cantidad + " " + ingrediente.unidades;
        
        const botonEliminarIngrediente = document.createElement('i');
        botonEliminarIngrediente.classList.add('fas', 'fa-trash', 'fa-trash-alt', 'delete-recipe', 'm-2', 'text-danger', 'justify-content-end', 'd-flex');
        botonEliminarIngrediente.setAttribute('style', 'cursor: pointer;');
        botonEliminarIngrediente.setAttribute('cursorhover', 'true');
        botonEliminarIngrediente.id = ingrediente.id_ingrediente;
        botonEliminarIngrediente.addEventListener('click', () => {
            eliminarIngrediente(ingrediente.id_ingrediente, ingrediente.id_receta);
        });
        listItem.appendChild(botonEliminarIngrediente);
        
        ingredientList.appendChild(listItem);
    });
}


    function mostrarListaIngredientesVisualizar(ingredientes){
        const ingredientList = document.getElementById('viewIngredientList');
        ingredientList.innerHTML = '';
        ingredientes.forEach((ingrediente) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between');
            listItem.textContent = ingrediente.ingrediente + ": " + ingrediente.cantidad + " " + ingrediente.unidades;
            /*
            const botonEliminarIngrediente = document.createElement('i');
            botonEliminarIngrediente.classList.add('fas', 'fa-trash', 'fa-trash-alt', 'delete-recipe', 'm-2', 'text-danger', 'justify-content-end', 'd-flex');
            botonEliminarIngrediente.setAttribute('style', 'cursor: pointer;');
            botonEliminarIngrediente.setAttribute('cursorhover', 'true');
            listItem.appendChild(botonEliminarIngrediente);
            */
            ingredientList.appendChild(listItem);
        });

        /*
<i class="fas fa-trash-alt delete-recipe  m-2 text-danger justify-content-end d-flex" style="cursor: pointer;" cursorshover="true"></i>

        */
    }


function mostrarDetallesReceta(receta){
    

        // Mostrar los detalles en el modal
        document.getElementById('viewRecipeTitle').textContent = receta.nombre;
        document.getElementById('viewRecipeDescription').textContent = receta.descripcion;
        document.getElementById('viewRecipeServings').textContent = receta.num_personas;
        document.getElementById('viewRecipeTime').textContent = receta.tiempo_de_preparacion;
        getListaIngredientesVisualizar(receta.id);


    /*  const ingredientList = document.getElementById('viewIngredientList');
        ingredientList.innerHTML = '';
        details.ingredients.forEach((ingredient) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = ingredient;
            ingredientList.appendChild(listItem);
        });
    */
        document.getElementById('viewRecipeSteps').textContent = receta.pasos || 'Sin pasos adicionales';

        modalMostrar.show()
}


// Guardar cambios en receta desde el modal de edición

/*
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
*/


function guardarReceta() {
    const receta_a_añadir = {
        nombre: $('#recipeTitle').val().trim(),
        descripcion: $('#recipeDescription').val().trim(),
        tiempo_de_preparacion: $('#recipeTime').val().trim(),
        num_personas: $('#recipeServings').val().trim(),
        pasos: $('#recipeSteps').val().trim(),
    };

    fetch(`http://localhost:8080/api/recetas/create?id_usuario=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(receta_a_añadir)
        
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
    }
      return response.json();
      
    })
    .then(data => {
        
        const id_receta_creada = data;
    
        receta_a_Ingrediente_añadir(id_receta_creada);
        //location.reload();
    })
    .catch(error => {
      console.error('Error durante la peticiÃ³n:', error);
    });
    
    
};

function receta_a_Ingrediente_añadir(id_receta){
    const formIngredientes = document.getElementById("form-ingredientes");
    const formRecetas = document.getElementById('form-recetas');
    const botonFormulario =  document.getElementById('saveRecipeBtn');
    const botonAñadirIngrediente = document.getElementById('addIngredientBtn')
    formRecetas.classList.add('d-none');
    formIngredientes.classList.remove('d-none');
    botonFormulario.textContent = "Guardar";
    botonFormulario.removeAttribute("onclick");

    botonAñadirIngrediente.addEventListener("click", function() {
        añadirIngrediente(id_receta);
    });
    
    





    botonFormulario.onclick = function() {
        location.reload(); 
    }
}



function receta_a_Ingrediente_editar(id_receta){
    const formIngredientes = document.getElementById("form-ingredientes-editar");
    const formRecetas = document.getElementById('editarReceta');
    const botonFormulario =  document.getElementById('saveEditedRecipeBtn');
    const botonAñadirIngredienteEdit =  document.getElementById('addEditIngredientBtn')
    formRecetas.classList.add('d-none');
    formIngredientes.classList.remove('d-none');
    botonFormulario.textContent = "Guardar";
    botonFormulario.removeAttribute("onclick");
    getListaIngredientesEditar(id_receta)
    botonAñadirIngredienteEdit.addEventListener("click", function() {
        añadirIngredienteEditar(id_receta);
    });

    botonFormulario.onclick = function() {
        location.reload(); 
    }
}







/*document.addEventListener("DOMContentLoaded", () => {
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
*/

function obtenerRecetaById(id_receta){
    fetch(`http://localhost:8080/api/recetas/getRecetaById?id=${id_receta}`, {  
        method: 'GET'   
    })  
        .then(response => {  
            if (!response.ok) {  
                throw new Error('Error en la respuesta del servidor');  
            }  
            return response.json();    
        })  
        .then(data => {  
            mostrarDetallesReceta(data);
        }) 
        .catch(error => {  
            console.error('Error durante la petición:', error);  // Manejo de errores  
        });  
};




window.onload = function obtenerRecetas() {  

    
    console.log(`ID del usuario: ${userId}`);

    fetch(`http://localhost:8080/api/recetas/getRecetas?id_usuario=${userId}`, {  
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
            recetas = data.reduce((acc, receta) => {
                acc[receta.id] = receta;
                return acc;
            }, {});
            mostrarRecetas(data);
            console.log('Recetas obtenidas:', recetas);
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

    // Iteramos sobre las recetas
    recetas.forEach(function(receta) {
        // Creamos el contenedor div para cada receta
        const recetaCol = document.createElement('div');
        recetaCol.classList.add('col-md-4');

        const recetaCard = document.createElement('div');
        recetaCard.classList.add('recipe-card', 'position-relative');

        const recetaTitle = document.createElement('h5');
        recetaTitle.classList.add('recipe-title');
       // recetaTitle.setAttribute('data-bs-toggle', 'modal');
        //recetaTitle.setAttribute('data-bs-target', '#recipeDetailsModal');
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

        // Botones de editar y eliminar
        const botonEditar = document.createElement('i');
        botonEditar.classList.add('fas', 'fa-edit', 'position-absolute', 'top-0', 'end-0', 'm-2', 'text-secondary');
        //botonEditar.setAttribute('data-bs-toggle', 'modal');
        botonEditar.setAttribute('style', 'cursor: pointer;');
        botonEditar.id = receta.id;
        botonEditar.addEventListener('click', () => {
            formEditarReceta(receta.id);
        });

        const botonEliminar = document.createElement('i');
        botonEliminar.classList.add('fas', 'fa-trash-alt', 'delete-recipe', 'position-absolute', 'top-0', 'start-0', 'm-2', 'text-danger');
        botonEliminar.setAttribute('style', 'cursor: pointer;');
        botonEliminar.id = receta.id;
        botonEliminar.addEventListener('click', () => {
            eliminarReceta(receta.id);
        });

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

        // Agregar evento para obtener receta por ID
        recetaTitle.addEventListener('click', () => {
            obtenerRecetaById(receta.id);
        });
    });

    // Añadimos el botón para añadir receta fuera del forEach
    const containerAnade = document.createElement('div');
    containerAnade.classList.add('col-md-4');

    const cartaAnade = document.createElement('div');
    cartaAnade.classList.add('add-recipe-card');
    cartaAnade.setAttribute('data-bs-toggle', 'modal');
    cartaAnade.setAttribute('data-bs-target', '#recipeModal');

    const icono = document.createElement('i');
    icono.classList.add('fas', 'fa-plus');
    cartaAnade.appendChild(icono);

    containerAnade.appendChild(cartaAnade);
    recipeContainer.appendChild(containerAnade);
}

