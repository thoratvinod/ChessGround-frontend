import { ChessPiece } from './Enums';
import { positionToArrayIndex } from './Utility'
import { Board } from './Board';

export function getValidMoves(currentPosition, piece, color) {

    function addEntry(i, j) {
        const pos = `${String.fromCharCode(i)}${j}`;
        const index = positionToArrayIndex(pos);

        if (chessBoard[index].piece === ChessPiece.EMPTY || chessBoard[index].color === color) {

            validMoves.push(pos);
            return chessBoard[index].color === color ? false :true;
        }
        return false;
    }

    Board.validMoves = [];
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
                let gridPiece = chessBoard[positionToArrayIndex(pos)];

                if (gridPiece.piece !== ChessPiece.EMPTY && gridPiece.color !== color) {
                    validMoves.push(pos)
                }

            }
            if (letter - 1 >= charCodeA && num - 1 >= 1) {

                let pos = `${String.fromCharCode(letter-1)}${num-1}`;
                let gridPiece = chessBoard[positionToArrayIndex(pos)];

                if (gridPiece.piece !== ChessPiece.EMPTY && gridPiece.color !== color) {
                    validMoves.push(pos)
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
                let gridPiece = chessBoard[positionToArrayIndex(pos)];

                if (gridPiece.piece !== ChessPiece.EMPTY && gridPiece.color !== color) {
                    validMoves.push(pos)
                }

            }
            if (letter - 1 >= charCodeA && num + 1 <= 8) {

                let pos = `${String.fromCharCode(letter-1)}${num+1}`;
                let gridPiece = chessBoard[positionToArrayIndex(pos)];

                if (gridPiece.piece !== ChessPiece.EMPTY && gridPiece.color !== color) {
                    validMoves.push(pos)
                }

            }

        }
        
    }

}