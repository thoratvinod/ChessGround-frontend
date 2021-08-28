import App from './App';
import chessBoard  from './core/chessBoard';
import { setupChessBoard } from './injectors/Board';

// chessBoard object representation
window.chessBoard = chessBoard
// get jquery object here
const jquery = require("jquery");
// assign it to global scope
window.$ = window.jQuery = jquery;
// require jquery ui dist
require("jquery-ui-dist/jquery-ui.js");

const app = async () => {
  App("app");
};

// Load app
app();