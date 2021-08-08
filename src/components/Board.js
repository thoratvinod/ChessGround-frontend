import { charCode0, charCodeA, charCodeH, positionToArrayIndex } from '../core/Utility';
import { ChessPiece, Color, ChessBoardType } from '../core/Enums';
import Settings from '../core/Settings';

import { handleDragStart, handleDropEvent } from '../core/DragNDrop';

import Session from '../core/session';
import '../scss/board.scss';
// import '../static/images/pawn'

const images = {
    pawn: {
        black : require('../static/images/pawn_black.svg'),
        white : require('../static/images/pawn_white.svg')
    },
    king: {
        black : require('../static/images/king_black.svg'),
        white : require('../static/images/king_white.svg')
    },
    queen: {
        black : require('../static/images/queen_black.svg'),
        white : require('../static/images/queen_white.svg')
    },
    rook: {
        black : require('../static/images/rook_black.svg'),
        white : require('../static/images/rook_white.svg')
    },
    knight: {
        black : require('../static/images/knight_black.svg'),
        white : require('../static/images/knight_white.svg')
    },
    bishop:{
        black : require('../static/images/bishop_black.svg'),
        white : require('../static/images/bishop_white.svg')
    },
}

const baseImageURL = '../src/static/images/';

export function setupChessBoard()
{


    const boardUI = document.querySelector('#chess-board');

    for (let i = 8; i >= 1; i--) {
        let black = i % 2 === 1;

        for (let j = charCodeA; j <= charCodeH; j++) {

            boardUI.innerHTML += `<div class="chess-cell ${black ? 'black' : 'white'}" id="${String.fromCharCode(j)}${i}"></div>`;
            black = !black;
            
        }
    }

    function addImgNodeInGrid (piece, color, grid) {
        const img = document.createElement("img");
        img.src = images[piece][color];
        img.classList.add(`svg-piece`);
        img.classList.add(`${color}-piece`);
        img.dataset.position = grid;
        img.dataset.piece = ChessPiece[piece.toUpperCase()]
        
        document.getElementById(grid).appendChild(img);
    }

    for (let j = charCodeA; j <= charCodeH; j++) {

        addImgNodeInGrid('pawn', 'black', `${String.fromCharCode(j)}7`);
        addImgNodeInGrid('pawn', 'white', `${String.fromCharCode(j)}2`);
    }2

    // queen
    addImgNodeInGrid('queen', 'white', 'd1');
    addImgNodeInGrid('queen', 'black', 'd8');

    // king
    addImgNodeInGrid('king', 'white', 'e1');
    addImgNodeInGrid('king', 'black', 'e8');

    // bishops
    addImgNodeInGrid('bishop', 'black', 'c8');
    addImgNodeInGrid('bishop', 'black', 'f8');
    addImgNodeInGrid('bishop', 'white', 'c1');
    addImgNodeInGrid('bishop', 'white', 'f1');
    
    // knights 
    addImgNodeInGrid('knight', 'black', 'b8');
    addImgNodeInGrid('knight', 'black', 'g8');
    addImgNodeInGrid('knight', 'white', 'b1');
    addImgNodeInGrid('knight', 'white', 'g1');
    
    // rooks
    addImgNodeInGrid('rook', 'black', 'a8');
    addImgNodeInGrid('rook', 'black', 'h8');
    addImgNodeInGrid('rook', 'white', 'a1');
    addImgNodeInGrid('rook', 'white', 'h1');

    //   Rooks
    Board.setByIndex(1, { piece: ChessPiece.ROOK, color: Color.WHITE });
    Board.setByIndex(8, { piece: ChessPiece.ROOK, color: Color.WHITE });
    Board.setByIndex(57, { piece: ChessPiece.ROOK, color: Color.BLACK });
    Board.setByIndex(64, { piece: ChessPiece.ROOK, color: Color.BLACK });

    //   Knights
    Board.setByIndex(2, { piece: ChessPiece.KNIGHT, color: Color.WHITE });
    Board.setByIndex(7, { piece: ChessPiece.KNIGHT, color: Color.WHITE });
    Board.setByIndex(58, { piece: ChessPiece.KNIGHT, color: Color.BLACK });
    Board.setByIndex(63, { piece: ChessPiece.KNIGHT, color: Color.BLACK });

    //   Bishops
    Board.setByIndex(3, { piece: ChessPiece.BISHOP, color: Color.WHITE });
    Board.setByIndex(6, { piece: ChessPiece.BISHOP, color: Color.WHITE });
    Board.setByIndex(59, { piece: ChessPiece.BISHOP, color: Color.BLACK });
    Board.setByIndex(62, { piece: ChessPiece.BISHOP, color: Color.BLACK });

    //   Queens
    Board.setByIndex(4, { piece: ChessPiece.QUEEN, color: Color.WHITE });
    Board.setByIndex(60, { piece: ChessPiece.QUEEN, color: Color.BLACK });

    //   Kings
    Board.setByIndex(5, { piece: ChessPiece.KING, color: Color.WHITE });
    Board.setByIndex(61, { piece: ChessPiece.KING, color: Color.BLACK });

    //   Pawns
    for (let i = 0; i < 8; i++) {
        Board.setByIndex(9+i, { piece: ChessPiece.PAWN, color: Color.WHITE });
        Board.setByIndex(49+i, { piece: ChessPiece.PAWN, color: Color.BLACK });

    }

    // setting up the pieces
    
    if (Settings.chessBoardType === ChessBoardType.PlayGround) {

        // make pieces draggable
        $(`.svg-piece`).draggable({
            start: handleDragStart,
            cursor: 'move',
            revert: "invalid",
            revertDuration: 200
        });

        $(".chess-cell").droppable({
            drop: handleDropEvent,          
        });

        $(".svg-piece").click((event) => {
            console.log(event);
            let { position, piece} = event.target.dataset
            let gridPiece = Board.board[positionToArrayIndex(position)];
            Board.highlightPossibleMoves(position, gridPiece.piece, gridPiece.color);
        });

        

        // $(".chess-cell").click((event) => {
        //     let id = event.target.id;   

        //     // if (Board.validMoves.includes(id)) {
        //     //     console.log("Change position");
        //     //     pieceSelected = false
        //     // }
        //     // else {
        //     //     console.log("Don't changes position.");
        //     //     pieceSelected = false;
        //     // }
        // })
    }
    else if (Settings.chessBoardType === ChessBoardType.Match) {
        
        // make pieces draggable
        $(`.${Session.myColor === Color.WHITE ? 'white' : 'black'}-piece`).draggable({
            start: handleDragStart,
            cursor: 'move',
            revert: "invalid",
            revertDuration: 200
        });

        $(`.${Session.opponentColor === Color.WHITE ? 'white' : 'black'}-piece`).attr("draggable", false);
        $(`.${Session.opponentColor === Color.WHITE ? 'white' : 'black'}-piece`).css('cursor', 'auto');

        $(".chess-cell").droppable({
            drop: handleDropEvent,          
        });

        $(".svg-piece").click((event) => {
            console.log(event);
            let { position, piece } = event.target.dataset;
            let gridPiece = Board.board[positionToArrayIndex(position)];
            Board.highlightPossibleMoves(position, gridPiece.piece, gridPiece.color);
        })
    }
    else if (Settings.chessBoardType === ChessBoardType.Disabled) {

        $(`.svg-piece`).attr("draggable", false);
        $(`.svg-piece`).css('cursor', 'auto');
    }

}



