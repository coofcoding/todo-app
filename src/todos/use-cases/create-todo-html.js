export const createTodoHTML = ( todo ) => {
    if (!todo) throw new Error('A TODO OBJECT is required');

    const { id, description, done } = todo;

    const html = `
    <label for="${id}" class="w-full">
        <input id="${id}" type="checkbox" class="hidden peer" ${ done ? 'checked' : '' }/>
        <div
        class="flex items-center gap-2 p-4 border-2 border-slate-200 rounded-lg text-wrap font-light duration-200 text-slate-400 peer-checked:border-slate-300 peer-checked:bg-slate-200 *:peer-checked:opacity-100 peer-checked:text-slate-400 peer-checked:line-through text-xl cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 opacity-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          
        <p class="max-w-52 min-[480px]:max-w-80 min-[545px]:max-w-full w-full text-base truncate break-words text-wrap sm:max-w-96">${description}</p>
        </div>
    </label>
    <button class="right-0 mr-6 absolute duration-150 opacity-0 hover:bg-pink-100 rounded-full border-2 border-transparent *:hover:stroke-pink-400 hover:border-pink-300 p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6 stroke-2 stroke-slate-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    </button>
    `;

    const liElement = document.createElement('li');
    liElement.classList.add('flex', 'row', 'w-full', 'items-center', 'relative', '*:hover:opacity-100');
    liElement.setAttribute('data-id', id);
    liElement.innerHTML = html;

    return liElement;
}