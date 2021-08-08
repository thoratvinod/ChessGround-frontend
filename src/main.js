import App from './App';
import { Board } from './core/Board';

var jquery = require("jquery");
window.$ = window.jQuery = jquery; // notice the definition of global variables here
require("jquery-ui-dist/jquery-ui.js");

window.Board = Board

const app = async () => {

  // $('#app').append()

  document.getElementById('app').appendChild(await App());
};
// Load app
app();