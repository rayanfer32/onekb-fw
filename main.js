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
    class="border p-2"
    type="text"
    value=${props.value}
    oninput=${props.oninput}
    placeholder=${props.placeholder}
    onkeydown=${props.onkeydown}
  />`;
};

const Button = (props) => {
  return html`<button
    class="bg-blue-500 text-white p-2"
    style=${props.style}
    onclick=${props.onclick}
  >
    ${props.children}
  </button>`;
};


// Render the app
const app = html`<div class="bg-zinc-100 h-screen p-4 flex flex-col">
  <h1 class="mb-4 text-2xl">Todo App (keyed each)</h1>
  <div class="flex flex-row gap-2">
    ${TextInput({
      placeholder: "Add a new todo",
      value: newTodo,
      oninput: (e) => {
        newTodo(e.target.value);
      },
      onkeydown: (e) => {
        if (e.key === "Enter") addTodo();
      },
    })}
    ${Button({ onclick: addTodo, children: "Add Todo" })}
  </div>

  <ul>
    ${each(
      todos,
      (item) => item,
      (todo) => html`<li class="flex flex-row gap-2 items-center mt-2">
        <input
          type="checkbox"
          checked=${() => todo.completed}
          onchange=${() => toggleTodo(todo)}
        />
        <span
          style=${() => (todo.completed ? "text-decoration: line-through" : "")}
        >
          ${todo.text}
        </span>
        ${Button({
          style:
            "background-color: crimson; height: 1.5rem; display: flex; align-items: center; justify-content: center;",
          onclick: () => removeTodo(todo),
          children: "x",
        })}
      </li>`
    )}
  </ul>

  <p class="mt-4 text-xl bg-zinc-200 p-2 w-fit">${remainingTodos} items left</p>
</div>`;

// Mount the app to the DOM
document.body.append(...app);
