import { ChessPiece, Color } from './Enums';
import { moveSound } from './Sounds';
import { charCodeA, charCodeH, charCode0, positionToArrayIndex } from './Utility';

const chessBoard = {

    canMove: true,

    myColor: Color.WHITE,
    // current position of pieces
    board: new Array(65).fill({ piece: ChessPiece.EMPTY, color: Color.EMPTY}),
    // can castle for white
    canCastleWhite: { left: true, right: true},
    // can castle for black
    canCastleBlack: { left: true, right: true},
    // valid moves for current situation
    validMoves: new Array(),
    // pieces captured
    removedPieces: new Array(),
    // moves have made
    movesMade: new Array(),
    // piece for which we have valid moves.
    validMovesFor: {},
    // get pieces by position for eg. 'a4'
    getPiece: function (position) {
        return this.board[positionToArrayIndex(position)];
    },
    // set piece by position
    setPiece: function (position, piece) {
        this.board[positionToArrayIndex(position)] = piece;
    },
    // set board array using direct index
    setByIndex: function (index, piece) {
        this.board[index] = piece;
    },
    // getMoveNotation: function (piece, position) {
    //     switch (piece) {
    //         case ChessPiece.KING   : return `K${position}`;
    //         case ChessPiece.QUEEN  : return `Q${position}`;
    //         case ChessPiece.ROOK   : return `R${position}`;
    //         case ChessPiece.BISHOP : return `B${position}`;
    //         case ChessPiece.KNIGHT : return `K${position}`;
    //         case ChessPiece.PAWN   : return `P${position}`;
    //         default: return '';
    //     }
    // },
    // evaluate array index of board from position string
    handleMoveMade: function (move) {
        chessBoard.movesMade.push(move);
        // update position in ChesschessBoard Array
        this.board[this.positionToArrayIndex(move.from)] = { piece: ChessPiece.EMPTY, color: Color.EMPTY };
        this.board[this.positionToArrayIndex(move.to)] = { piece: move.piece, color: move.color};

        if (move.piece === ChessPiece.ROOK) {

            if (this.myColor === Color.WHITE) {
                
                if (move.from[0] === 'a') {
                    this.canCastleWhite.left = false;
                }
                else if (move.from[0] === 'h') {
                    this.canCastleWhite.right = false;
                }
            }
            else {
                if (move.from[0] === 'a') {
                    this.canCastleWhite.right = false;
                }
                else if (move.from[0] === 'h') {
                    this.canCastleWhite.left = false;
                }
            }

        }
        else if (move.piece === ChessPiece.KING) {

            if (this.myColor === Color.WHITE) {
                this.canCastleWhite.left = false; this.canCastleBlack.right = false;
            }
            else {
                this.canCastleBlack.left = false; this.canCastleBlack.right = false;
            }
            if (Math.abs(this.positionToArrayIndex(move.from) - this.positionToArrayIndex(move.to)) === 2) {

                let startPosition, destPosition;

                switch (move.to) {
                    case 'c1':
                        startPosition = 'a1';
                        destPosition = 'd1';
                        break;
                    case 'g1':
                        startPosition = 'h1';
                        destPosition = 'f1';
                        break;
                    case 'c8':
                        startPosition = 'a8';
                        destPosition = 'd8';
                        break;
                    case 'g8':
                        startPosition = 'h8';
                        destPosition = 'f8';
                        break;
                }
                this.makeMove(startPosition, destPosition);
            }
            
        }
    },
    makeMove: function (from, to) {

        this.eraseValidMoves();
        let imgPiece = $(`#${from}`).find('img')[0];
        imgPiece.dataset.position = to;
        $(`#${to}`).append(imgPiece);
        let gridPiece = this.board[positionToArrayIndex(from)];
        const move = { piece: gridPiece.piece, color: gridPiece.color, from: from, to: to };
        this.handleMoveMade(move);
        
        moveSound.play();

    },
    positionToArrayIndex: function (position) {

        const letter = position.charCodeAt(0);
        const num    = position.charCodeAt(1) - charCode0;
    
        let letterNum = letter - charCodeA + 1;
        return letterNum + (num-1) * 8;
    },
    // highlight valid moves on board UI
    highlightPossibleMoves: function (currentPosition, piece, color) {
        
        const divBlock = `<div class="validMoves"></div>`;
        // let possibleMoves = getPossibleMoves(currentPosition, piece, color);
        this.eraseValidMoves();
        this.getValidMoves(currentPosition, piece, color);

        this.validMoves.forEach(move => {
            if (this.board[positionToArrayIndex(move)].piece === ChessPiece.EMPTY) {
                $(`#${move}`).append(divBlock);
            }
        });
    },
    eraseValidMoves: function () {
        this.validMoves.forEach(move => {
            if (this.board[positionToArrayIndex(move)].piece === ChessPiece.EMPTY) {
                $(`#${move}`).empty();
            }
        });
        this.validMoves = [];
    },
    // evaluates valid moves
    getValidMoves: function (currentPosition, piece, color) {

        const addEntry = (i, j) => {
            const pos = `${String.fromCharCode(i)}${j}`;
            const index = positionToArrayIndex(pos);
    
            if (this.board[index].piece === ChessPiece.EMPTY || this.board[index].color === color) {
    
                this.validMoves.push(pos);
                return this.board[index].color === color ? false :true;
            }
            return false;
        }
    
        this.validMoves = [];
        this.validMovesFor = { currentPosition: currentPosition, piece: piece, color: color };
        const letter = currentPosition.charCodeAt(0);
        const num = currentPosition.charCodeAt(1) - charCode0; 
    
        if (piece === ChessPiece.QUEEN || piece === ChessPiece.ROOK || piece === ChessPiece.BISHOP){
    
            if (piece === ChessPiece.ROOK || piece === ChessPiece.QUEEN) {
    
    
                // by row and up
                for (let i = letter + 1; i <= charCodeH; i++) {
    
                    if (!addEntry(i, num))
                        break;
                }
                // by row and down
                for (let i = letter - 1; i >= charCodeA; i--) {
                    if (!addEntry(i, num))
                        break;
                }
                // by column and right
                for (let i = num + 1; i <= 8; i++) {
                    
                    if (!addEntry(letter, i))
                        break;
                    
                }
                // by column and left
                for (let i = num - 1; i >= 1; i--) {
                    
                    if (!addEntry(letter, i))
                        break;
                    
                }
            }
    
            if (piece === ChessPiece.BISHOP || piece === ChessPiece.QUEEN) {
    
                let i = letter - 1, j = num - 1;
                // left and lower
                while (i >= charCodeA && j >= 1) {
                    if (!addEntry(i, j))
                        break;
                    i--;j--;
                }
                i = letter - 1, j = num + 1;
                // left and higher
                while (i >= charCodeA && j <= 8) {
                    if (!addEntry(i, j))
                        break;
                    i--;j++;
                }
                i = letter + 1, j = num + 1;
                // right and higher
                while (i <= charCodeH && j <= 8) {
                    if (!addEntry(i, j))
                        break;
                    i++;j++;
                }
                i = letter + 1, j = num - 1;
                // right and lower
                while (i <= charCodeH && j >= 1) {
                    if (!addEntry(i, j))
                        break;
                    i++;j--;
                }
            }
        }
        else if (piece === ChessPiece.KNIGHT) {
            
            let i = letter - 2;
    
            if (i >= charCodeA)
            {
                let j = num;
                if (j+1 <= 8) {
                    addEntry(i, j+1);
                }
                
                if (j-1 >= 1) {
                    addEntry(i, j-1);
    
                }
            }
    
            i = letter + 2;
    
            if (i <= charCodeH) {
                
                let j = num;
                if (j+1 <= 8) {
                    addEntry(i, j+1);
                    
                }
                
                if (j-1 >= 1) {
                    addEntry(i, j-1);
                }
            }
    
            let j = num - 2
    
            if (j >= 1) {
                
                let i = letter;
                if (i+1 <= charCodeH) {
                    addEntry(i+1, j);
                }
    
                if (i-1 >= charCodeA) {
                    addEntry(i-1, j);
                }
    
            }
    
            j = num + 2;
    
            if (j <= 8) {
                
                let i = letter;
                if (i+1 <= charCodeH) {
                    addEntry(i+1, j);
                }
    
                if (i-1 >= charCodeA) {
                    addEntry(i-1, j);
                }
            }
        }
        else if (piece === ChessPiece.KING)
        {
            let scenarioArray = [1, -1, 0];
    
            for (let i = 0; i < scenarioArray.length; i++) {
                
                for (let j = 0; j < scenarioArray.length; j++) {
                    
                    if (scenarioArray[i]===0 && scenarioArray[j]===0)
                        continue;
    
                    let a = letter + scenarioArray[i], b = num + scenarioArray[j];
    
                    if (a >= charCodeA && a <= charCodeH && b >= 1 && b <= 8) {
    
                        addEntry(a, b);
                    }
                    
                }
                
            }

            // Castling conditions
            let canCastle = this.myColor === Color.WHITE ? this.canCastleWhite : this.canCastleBlack;
            if (canCastle.left) {
                
                this.myColor === Color.WHITE ? addEntry(letter - 2, num) : addEntry(letter + 2, num);
            }
            if (canCastle.right) {
                
                this.myColor === Color.BLACK ? addEntry(letter - 2, num) : addEntry(letter + 2, num);
            }

        }
        else if (piece === ChessPiece.PAWN) {
    
            if (Color.BLACK === color) {
                
                let i = num - 1;
    
                if (i >= 1) {
                    addEntry(letter, i);
    
                    if (num === 7)
                        addEntry(letter, i-1);
                }
    
                if (letter + 1 <= charCodeH && num - 1 >= 1) {
    
                    let pos = `${String.fromCharCode(letter+1)}${num-1}`;
                    let gridPiece = this.board[positionToArrayIndex(pos)];
    
                    if (gridPiece.piece !== ChessPiece.EMPTY && gridPiece.color !== color) {
                        this.validMoves.push(pos)
                    }
    
                }
                if (letter - 1 >= charCodeA && num - 1 >= 1) {
    
                    let pos = `${String.fromCharCode(letter-1)}${num-1}`;
                    let gridPiece = this.board[positionToArrayIndex(pos)];
    
                    if (gridPiece.piece !== ChessPiece.EMPTY && gridPiece.color !== color) {
                        this.validMoves.push(pos)
                    }
    
                }
    
            }
            else {
    
                let i = num + 1;
    
                if (i <= 8) {
                    addEntry(letter, i)
    
                    if (num === 2)
                        addEntry(letter, i+1)
                }
    
                if (letter + 1 <= charCodeH && num + 1 <= 8) {
    
                    let pos = `${String.fromCharCode(letter+1)}${num+1}`;
                    let gridPiece = this.board[positionToArrayIndex(pos)];
    
                    if (gridPiece.piece !== ChessPiece.EMPTY && gridPiece.color !== color) {
                        this.validMoves.push(pos)
                    }
    
                }
                if (letter - 1 >= charCodeA && num + 1 <= 8) {
    
                    let pos = `${String.fromCharCode(letter-1)}${num+1}`;
                    let gridPiece = this.board[positionToArrayIndex(pos)];
    
                    if (gridPiece.piece !== ChessPiece.EMPTY && gridPiece.color !== color) {
                        this.validMoves.push(pos)
                    }
    
                }
    
            }
            
        }
    
    }

}

export default chessBoard;