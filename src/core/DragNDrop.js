import { positionToArrayIndex } from './Utility';
import { ChessPiece, Color } from './Enums';
import { moveSound } from './Sounds';

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
        if (piece === ChessPiece.KING || piece === ChessPiece.ROOK) {

            //
        }
        // update position in ChesschessBoard Array
        chessBoard.board[positionToArrayIndex(startPosition)] = { piece: ChessPiece.EMPTY, color: Color.EMPTY };
        chessBoard.board[positionToArrayIndex(destPosition)] = { piece: piece, color: color};

        // play sound
        moveSound.play();
        ui.draggable.draggable('option', 'revert', "invalid");
    }
}