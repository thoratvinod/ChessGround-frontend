import Header from './injectors/Header';
import Footer from './injectors/Footer';
import { setupChessBoard } from './injectors/Board'

async function App(id) {
  
  Header(id);
  
  const boardId = 'chess-board'
  const template = `<div id="${boardId}"></div>`
  $(`#${id}`).append(template);

  setupChessBoard(boardId);

  Footer(id);
}

export default App;