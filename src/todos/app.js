import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos } from './use-cases';
import Swal from 'sweetalert2';

const elementIDs = {
    ClearCompleted: '#clear-completed',
    TodoList: '#todoEnlistener',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    TotalPending: '#total-pending',
    TextPending: '#text-pending',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    todoStore.setFilter(Filters.All);

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(elementIDs.TodoList, todos);

        const NumTotalPending = document.querySelector(elementIDs.TotalPending).innerHTML = todoStore.getTodos(Filters.Pending).length;
        document.querySelector(elementIDs.TextPending).innerHTML = (NumTotalPending === 1) ? 'pendiente' : 'pendientes';
    }

    // Cuando la función App se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector(elementIDs.NewTodoInput);
    const todoListUL = document.querySelector(elementIDs.TodoList);
    const clearCompleted = document.querySelector(elementIDs.ClearCompleted);
    const filtersLIs = document.querySelectorAll(elementIDs.TodoFilters);

    newDescriptionInput.addEventListener('keyup', event => {
        if (event.keyCode != 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener("click", event => {
        const element = event.target.closest('[data-id]')

        if (!element.getAttribute('data-id')) return;

        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener("click", event => {
        const element = event.target.closest('[data-id]');
        if (event.target.getAttribute('id') != 'destroy') return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Eliminado exitosamente"
          });
    });

    clearCompleted.addEventListener("click", event => {

        if (todoStore.getTodos(Filters.Completed).length === 0) {
            return Swal.fire({
                title: 'Oh oh!',
                text: 'No tienes ninguna tarea completada...',
                icon: 'error',
                confirmButtonText: 'Confirmar'
            })
        };

        todoStore.deleteCompleted();
        displayTodos();

        Swal.fire({
            title: 'Tareas borradas exitosamente!',
            text: 'Acabas de borrar todas tus tareas marcadas como completadas.',
            icon: 'success',
            timer: 2000
        })
    });

    filtersLIs.forEach(element => {
        element.addEventListener('click', element => {

            filtersLIs.forEach(el => {
                el.classList.remove("from-sky-400", "to-blue-400", "text-white", "border-none", "shadow-lg", "hover:scale-105", "hover:from-pink-400", "hover:to-fuchsia-400");
                el.classList.add("bg-slate-100", "hover:text-pink-400", "hover:border-pink-300", "hover:scale-105", "hover:bg-white");
            });
            element.target.classList.remove("bg-slate-100", "hover:text-pink-400", "hover:border-pink-300", "hover:scale-105", "hover:bg-white");
            element.target.classList.add("from-sky-400", "to-blue-400", "text-white", "border-none", "shadow-lg", "hover:scale-105", "hover:from-pink-400", "hover:to-fuchsia-400");

            switch (element.target.getAttribute('id')) {
                case 'all-todos':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'pending-todos':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'completed-todos':
                    todoStore.setFilter(Filters.Completed);
                    break;
            }

            displayTodos();
        });
    });
}