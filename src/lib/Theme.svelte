<script lang="ts">
    let appMode:HTMLButtonElement;

    let theme:string;

    localStorage.getItem("theme") !== null && localStorage.getItem('theme') === 'light' ? theme = 'Dark Theme' : theme = 'Light Theme';
  
    const setTheme = (event):void => {
      //check if theme is set and set it to different one (light/dark)
      if(localStorage.getItem("theme") === null) {
        localStorage.setItem('theme','dark');
      }
      else {
        //set the storage value
        localStorage.theme === 'light' ? localStorage.setItem('theme','dark') : localStorage.setItem('theme','light');
        //change button text
        localStorage.theme === 'light' ? appMode.innerText = "Dark Theme" : appMode.innerText = "Light Theme";
      }
      // On page load or when changing themes, best to add inline in `head` to avoid FOUC
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        // Whenever the user explicitly chooses light mode
        //localStorage.theme = 'light'
  
        // Whenever the user explicitly chooses dark mode
        //localStorage.theme = 'dark'
  
        // Whenever the user explicitly chooses to respect the OS preference
        //localStorage.removeItem('theme')
    }
  </script>
  
  <button on:click={setTheme} bind:this={appMode} class="px-4 py-2 m-2 text-white transform bg-lime-500 rounded-xl focus:outline-none hover:translate-y-1 dark:text-lime-500 dark:bg-white">
    {theme}
  </button>
  
  <style>
    
  </style>
  