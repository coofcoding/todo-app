import { Todo } from "../todos/models/todo";

const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending',
}

const state = {
    todos: [
        new Todo('Terminar el curso de JavaScript'),
        new Todo('Terminar el curso de React'),
        new Todo('Ver el curso de TypeScript'),
        new Todo('Ver el curso de Github Actions de midudev'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    // console.log(state)
    console.log('Init Store 🥑');
}

const loadStore = () => {

}

const getTodos = ( filter = Filters.All ) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        
        case Filters.Completed:
            return state.todos.filter( todo => todo.done );

        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );

        default:
            throw new Error(`Option '${filter}' is not valid`);
    }
}

const addTodo = (description) => {
    if (!description) throw new Error(`Description is required`);

    state.todos.push(new Todo(description));
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map( todo => {
        if ( todo.id === todoId) {
            todo.done != todo.done;
        }
        return todo;
    });
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter( todo => todo.id != todoId );
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => todo.done );
}

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
};