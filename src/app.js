import { setupChessBoard } from './components/Board';

async function App() {
  
  setupChessBoard();
  const template = document.createElement('template')
  template.innerHTML = `
    <div id="chess-board"></div>
  `
  // Return a new node from template
  return template.content.cloneNode(true)
}

export default App;