import { positionToArrayIndex } from './Utility';
import { ChessPiece, Color } from './Enums';
import { moveSound } from './Sounds';
import chessBoard from './chessBoard';

export const handleDragStart = (event) => {

    let { position, piece } = event.target.dataset;
    event.target.style.zIndex = '9999';
    chessBoard.eraseValidMoves();
    let gridPiece = chessBoard.board[positionToArrayIndex(position)]
    chessBoard.highlightPossibleMoves(position, gridPiece.piece, gridPiece.color);
}

export const handleDropEvent = (event, ui) => {

    let pieceUI = ui.draggable[0];
    const startPosition = pieceUI.dataset.position
    const destPosition = event.target.id;

    console.log(`start postion: ${startPosition}, destination postion: ${destPosition}`);

    if(startPosition === destPosition)
    {
        ui.draggable.draggable('option', 'revert', "valid");
        pieceUI.style.zIndex = '0';
        return;
    }

    if (!chessBoard.validMoves.includes(destPosition)) {
        ui.draggable.draggable('option', 'revert', "valid");
        pieceUI.style.zIndex = '0';
        return;
    }
    else {
        pieceUI.style.zIndex = '0';
        chessBoard.eraseValidMoves();
        console.log(ui.draggable[0]);
        let gridPiece = chessBoard.board[positionToArrayIndex(startPosition)];
        let destPosPiece = chessBoard.board[positionToArrayIndex(destPosition)];
        if (destPosPiece.piece !== ChessPiece.EMPTY) {
            chessBoard.removedPieces.push(destPosPiece);
            $(`#${destPosition}`).empty();
        }
        pieceUI.dataset.position = destPosition;
        pieceUI.style.top = '0px';
        pieceUI.style.left = '0px';
        event.target.append(pieceUI);
        const piece = parseInt(gridPiece.piece);
        const color = parseInt(gridPiece.color);
        // handling move made
        const move = { piece: gridPiece.piece, color: gridPiece.color, from: startPosition, to: destPosition }
        chessBoard.handleMoveMade(move);

        // play sound
        moveSound.play();
        ui.draggable.draggable('option', 'revert', "invalid");
    }
}

export function handleClickEventForChessCell (event) {

    let className = event.target.classList.value;
  
    if (this !== event.target && className !== "validMoves")
        return;
   
    let startPosition = chessBoard.validMovesFor.currentPosition;
    let destPosition = this.id;

    if (startPosition === destPosition || destPosition === '')
        return;

    if (chessBoard.validMoves.includes(destPosition)) {
        chessBoard.makeMove(startPosition, destPosition);
    }
    else {
        chessBoard.makeMove(startPosition, destPosition);
    }
}

export function handleClickEventForSVGPiece (event) {

    if (this !== event.target)
        return;
    console.log("SVG Piece clicked");

    console.log(event);
    let { position, piece } = event.target.dataset
    let gridPiece = chessBoard.board[positionToArrayIndex(position)];
    chessBoard.highlightPossibleMoves(position, gridPiece.piece, gridPiece.color);
}

export function handleRightClickEvent(event) {

    $(this).toggleClass("rightClickEffect");
    return false;
}