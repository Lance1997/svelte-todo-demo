import App from './App.svelte'
//import the main css style with the tailwindcss imports
import "./main.css"

const app = new App({
  target: document.getElementById('app')
})

export default app
