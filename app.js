// Reactive state
const localTodos = JSON.parse(localStorage.getItem("todos")) || [];
const todos = signal(localTodos);
const newTodo = signal("");

// Add a new todo
const addTodo = () => {
  if (newTodo().trim()) {
    todos([
      ...todos(),
      {
        text: newTodo(),
        completed: false,
      },
    ]);
    newTodo("");
  }
};
// Toggle todo completion
const toggleTodo = (todo) => {
  todos((items) =>
    items.map((item) =>
      item === todo
        ? {
            ...todo,
            completed: !todo.completed,
          }
        : item
    )
  );
};
// Remove a todo
const removeTodo = (todo) => {
  todos((items) => items.filter((item) => item !== todo));
};
// Computed: Count of remaining todos
const remainingTodos = computed(
  () => todos().filter((todo) => !todo.completed).length
);

// effect to sync everything to local storage
effect(() => {
  localStorage.setItem("todos", JSON.stringify(todos()));
});

// Components
const TextInput = (props) => {
  return html`<input
    class="border border-gray-200 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full text-gray-700 placeholder-gray-400"
    type="text"
    value=${props.value}
    oninput=${props.oninput}
    placeholder=${props.placeholder}
    onkeydown=${props.onkeydown}
  />`;
};

const Button = (props) => {
  const baseClasses = "px-4 py-2 rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const defaultClasses = "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400";
  const deleteClasses = "bg-red-100 text-red-600 hover:bg-red-200 focus:ring-red-400 text-sm px-2 py-1";
  
  return html`<button
    class=${props.variant === 'delete' ? `${baseClasses} ${deleteClasses}` : `${baseClasses} ${defaultClasses}`}
    onclick=${props.onclick}
    style=${props.style}
  >
    ${props.children}
  </button>`;
};

// Render the app
const app = html`<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
    <h1 class="text-3xl font-light text-gray-800 mb-6 text-center">Todo List</h1>
    
    <div class="flex flex-col sm:flex-row gap-3 mb-6">
      ${TextInput({
        placeholder: "What needs to be done?",
        value: newTodo,
        oninput: (e) => {
          newTodo(e.target.value);
        },
        onkeydown: (e) => {
          if (e.key === "Enter") addTodo();
        },
      })}
      ${Button({ onclick: addTodo, children: "Add", style: "width: 6rem" })}
    </div>

    <ul class="space-y-3">
      ${each(
        todos,
        (item) => item,
        (todo) => html`<li
          class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150"
        >
          <input
            type="checkbox"
            checked=${() => todo.completed}
            onchange=${() => toggleTodo(todo)}
            class="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-400"
          />
          <span
            class=${() =>
              todo.completed
                ? "flex-1 text-gray-400 line-through"
                : "flex-1 text-gray-700"}
          >
            ${todo.text}
          </span>
          ${Button({
            variant: 'delete',
            onclick: () => removeTodo(todo),
            children: "Delete",
          })}
        </li>`
      )}
    </ul>

    <div class="mt-6 text-center">
      <span class="text-sm font-medium text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
        ${remainingTodos} items remaining
      </span>
    </div>
  </div>
</div>`;

// Mount the app to the DOM
document.body.append(...app);
