// definimos las variables seleccionando los elementos
const addForm = document.querySelector(".add-form");
const taskInput = document.querySelector(".input-text");
const deleteAllBtn = document.querySelector(".deleteAll-btn");
const tasksList = document.querySelector(".tasks-list");

// aca lo que estamos haciendo es cada vez que cargue la pagina, pedir si hay algo guardado en el localStorage y si no hay nada que guarde un array vacio, porque lo que tenemos que hacer es almacenar datos en localStorage mas adelante en el codigo, y si hay tareas guardadas en el localStorage que las muestre cuando cargue la pagina.

//recordemos un poco el pasado, el operador or que se representa con el simbolo || lo que hace es que compara las condiciones, recordemos que en el operador or una de las dos condiciones tiene que ser true, en este caso si tiene algo guardado en el localStorage va a dar true, porque hay un dato en el local, ahora si no hay nada en el lolcalStorage, va a dar false por lo que pasa a la siguiente condicion y ahi va a dar true, lo que va a hacer es guardar un array vacio.

// si nosotros no hacemos esto, va romper todo el script, porque si no hay nada en el localStorage generalmente guarda Null y eso nos puede generar problemas.

//nota del profe:almaceno en la variable el contenido del storage o un array vacio.

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

// funcion que almacena en el storage

const saveLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(taskList));
};

// funcion que crea cada tarea

const createTask = (task) =>
  `<li>${task.name}<img class="delete-btn" src="./img/delete.svg" data-id="${task.id}"/></li>`;

// funcion que renderiza la lista de tareas
// el join nos convierte el array en un string con todo el codigo sin las ","

const renderTaskList = () => {
  tasksList.innerHTML = taskList.map((task) => createTask(task)).join("");
};

// funcion que oculta el boton de borrar todas las taras.

const toggleDeleteAllButton = () => {
  if (!taskList.length) {
    // evalua que no exista length, es decir que el array este vacio
    deleteAllBtn.classList.add("hidden");
    return; // corta todo el bloque de ejecucion
  }
  deleteAllBtn.classList.remove("hidden");
};

// funcion que normaliza los datos

const correctInputValue = () => {
  return taskInput.value.trim().replace(/\s+/g, " "); //regexp
};

// funcion que verifica si la tarea es valida

const isValidTask = (taskName) => {
  let isValid = true;
  if (!taskName.length) {
    alert(`por favor ingresa una tarea`);
    isValid = false;
  } else if (
    taskList.some((task) => task.name.toLowerCase() === taskName.toLowerCase())
  ) {
    alert("Ya existe esa tarea");
    isValid = false;
  }
  return isValid;
};

// funcion que agrega la tarea

const addTask = (e) => {
  e.preventDefault();
  const taskName = correctInputValue();
  if (isValidTask(taskName)) {
    taskList = [...taskList, { name: taskName, id: Date.now() }];
    addForm.reset();
    renderTaskList();
    saveLocalStorage();
    toggleDeleteAllButton();
  }
};

// funcion que elimina tareas

const removeTask = (e) => {
  if (!e.target.classList.contains("delete-btn")) return;
  const filterId = Number(e.target.dataset.id);
  taskList = taskList.filter((task) => task.id !== filterId);
  renderTaskList();
  saveLocalStorage();
  toggleDeleteAllButton();
};

// funcion que borra todas las tareas del array de tareas
// convertimos la taskList de nuevo en un array vacio y volvemos a realizar los pasos de renderizar la lista de tareas

const removeAll = () => {
  taskList = [];
  renderTaskList();
  saveLocalStorage();
  toggleDeleteAllButton();
};

// funcion inicializadora

const init = () => {
  // ejecutar renderTaskList en el evento DOMContentLoaded
  document.addEventListener("DOMContentLoaded", renderTaskList());
  addForm.addEventListener("submit", addTask);
  tasksList.addEventListener("click", removeTask);
  deleteAllBtn.addEventListener("click", removeAll);
  document.addEventListener("DOMContentLoaded", toggleDeleteAllButton());
};

init();
