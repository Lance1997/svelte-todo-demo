<script lang="ts">
  import Theme from "./lib/Theme.svelte";
  import { v4 as uuidv4 } from "uuid";

  let alertMessage: string;
  let element: HTMLDivElement;

  function hideNotification() {
    element.classList.remove("block");
    element.classList.add("hidden");
  }

  function showNotification(notification) {
    alertMessage = notification;
    element.classList.remove("hidden");
    element.classList.add("block");

    setTimeout(() => {
      element.classList.remove("block");
      element.classList.add("hidden");
    }, 2500);
  }

  type todosType = {
    id: string;
    text: string;
    completed: boolean;
  };

  //`<strong>You won the jackpot!</strong><br>
  // Click <a href="#" target="_blank">here</a> for details! 😛`

  function refreshLocalStorage(): void {
    //check if user has local storage available
    if (Storage) {
      //set the todo item in storage
      // conver the array to string then store it.
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }

  let todos: todosType[] = [];
  //set todos to look for it from the localstorage if storage available
  if (Storage) {
    // function helps to get everything from local storage
    function getFromLocalStorage() {
      const reference = localStorage.getItem("todos");
      // if reference exists
      if (reference) {
        // converts back to array and store it in todos array
        todos = JSON.parse(reference);
      }
    }

    // initially get everything from localStorage
    getFromLocalStorage();
  }
  //state to store new item
  let newItem: string = "";

  const addNewItem = (event) => {
    //check for enter key and submit or save the todo
    if (event.key === "Enter" || event.code === "Enter") {
      //send error if input is empty
      if (newItem === "") {
        showNotification("Task empty!");
      } else {
        //add todos new item
        todos = [...todos, { id: uuidv4(), text: newItem, completed: false }];
        //reset the newItem to empty
        newItem = "";
        refreshLocalStorage();
        showNotification("Task Added Successfully!");
      }
    } else {
      //set the value to the new item state
      newItem = event.target.value;
    }
  };

  // deletes a todo from todos array, then updates localstorage and renders updated list to screen
  const deleteItem = (event) => {
    //get the id attribute of item
    const id = event.target.getAttribute("data-key");
    // filters out the <li> with the id and updates the todos array
    todos = todos.filter(function (item) {
      // use != not !==, because here types are different. One is number and other is string
      return item.id != id;
    });
    showNotification("Task deleted!");
    // update the localStorage
    refreshLocalStorage();
    //update page todos
    todos = todos;
  };

  const removeAllItems = () => {
    if (todos && todos.length) {
      //empty todos
      todos = [];
      //empty localstorage
      refreshLocalStorage();
      //delete all todos
      localStorage.removeItem('todos')

      showNotification("All Tasks cleared!");
    }
  };
</script>

<div
  class="fixed inset-0 z-50 flex items-end justify-center p-2 pointer-events-none sm:items-start sm:justify-end"
>
  <div
    bind:this={element}
    class="hidden max-w-sm overflow-hidden rounded shadow-lg pointer-events-auto w-72 bg-lime-600"
    role="status"
    aria-live="polite"
  >
    <div class="p-4">
      <div class="flex items-start space-x-2">
        <div class="flex items-center flex-grow space-x-2">
          <i
            class="flex-shrink-0 w-5 h-5 text-white stroke-current bi bi-check-all"
          />

          <div class="flex-grow">
            <p class="text-sm text-white">{alertMessage}</p>
          </div>
        </div>

        <div class="flex flex-shrink-0">
          <button
            on:click={hideNotification}
            class="text-white transition-colors duration-200 hover:text-gray-100 focus:outline-none"
          >
            <span class="sr-only">Close</span>
            <i class="w-5 h-5 fill-current bi-x-circle-fill bi" />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<main
  class="container px-4 mx-auto text-black md:px-0 pmax-w-sm dark:text-white md:max-w-xl lg:max-w-2xl xl:max-w-4xl"
>
  <h1 class="m-5 text-6xl font-bold text-center text-lime-500">TODO</h1>

  <p class="my-12 text-2xl tracking-wide text-center text-lime-500">Todos are stored in your browser if it allows it, you can visit anytime to see your todos. Use the <a href="#clearall" class="text-gray-500">Clear All Items</a> Button to remove all todos from your browser.</p>
  <Theme />

  <!-- Button Group -->
  <div
    class="grid grid-cols-2 p-4 my-5 bg-gray-500 rounded-lg shadow-2xl dark:bg-transparent"
  >
    <label class="text-lg text-white dark:text-gray-500" for="newItem"
      >Add New Item: <small>Press Enter after typing to add new item</small></label
    >
    <input
      bind:value={newItem}
      on:keydown={addNewItem}
      type="text"
      class="block w-full col-span-2 p-2 my-5 tracking-wide rounded-xl dark:bg-white focus:outline-none dark:text-black"
      placeholder="Type here..."
      id="newItem"
    />

    <button
      id="clearall"
      on:click={removeAllItems}
      class="px-4 col-span-2 md:col-span-1 py-2 m-2 text-white transform bg-red-500 rounded-xl focus:outline-none hover:translate-y-0.5 dark:text-red-500 dark:bg-white hover:bg-red-400 dark:hover:bg-red-100"
    >
      <i class="bi bi-x-circle-fill" />
      Clear All Items
    </button>
  </div>

  <div class="my-12">
    <ul class="">
      {#each todos as todo (todo.id)}
        <li class="flex justify-around p-2 text-2xl rounded-lg shadow-lg">
          <span>{todo.text}</span>
          <i
            on:click={deleteItem}
            data-key={todo.id}
            class="ml-3 text-red-500 cursor-pointer bi bi-x-circle-fill dark:hover:text-white hover:text-red-900"
          />
        </li>
      {/each}
    </ul>
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>
