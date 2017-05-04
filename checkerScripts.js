
init();

function init(){
	createCheckersBoard();
	addPiecesOnBoard();

    document.getElementById('btn-newGame').onclick = makeNewGame;
}


function createCheckersBoard(){
	var  rowChangeColor = 0;
	var boxChangeColor = 0;
	var table = document.getElementById('board');
	for (var i = 0; i < 8; i++) {
		//Creating a row for each loop
		var row = table.insertRow();

		//This loop will add 8 blocks in each row
		for(var j = 0; j < 8; j++ ){
				var bloc = row.insertCell();

				if(rowChangeColor == 0){

					if(boxChangeColor == 0){
						bloc.className = 'white-box';
						boxChangeColor = 1;

					}else{
						bloc.className = 'black-box';
						boxChangeColor = 0;
					}
				}else{

					if(boxChangeColor == 0){
						bloc.className = 'black-box';
						boxChangeColor = 1;
					}else{
						bloc.className = 'white-box';
						boxChangeColor = 0;
					}
				
				}

				bloc.setAttribute('name', i+''+j);
				bloc.onclick = setPieceMovement;
		}

		rowChangeColor = (rowChangeColor == 0) ? 1:0;

	}
}


function addPiecesOnBoard(){
	var tbody = document.getElementById('board').children;
	var boardRowChildren = tbody[0].children;

	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){

			//The white pieces -------------------------------------
			if(i<3){
				var pieceWhite = document.createElement("div");
				if(i%2 == 0 && j%2 == 0){
					pieceWhite.className = 'white-piece';
					boardRowChildren[i].children[j].appendChild(pieceWhite);

				}else if(i%2 != 0 && j%2 != 0){
					pieceWhite.className = 'white-piece';
					boardRowChildren[i].children[j].appendChild(pieceWhite);
				}

			//The black pieces -------------------------------------
			}else if(i >= 5){
				var pieceBlack = document.createElement("div");
				if(i%2!=0 && j%2!=0){
					pieceBlack.className = 'black-piece';
					boardRowChildren[i].children[j].appendChild(pieceBlack);

				}else if(i%2==0 && j%2==0){
					pieceBlack.className = 'black-piece';
					boardRowChildren[i].children[j].appendChild(pieceBlack);
				}
			}

		}
	}
}



var board = [
    			 [-1, 0,-1, 0,-1, 0,-1, 0],
    		     [ 0,-1, 0,-1, 0,-1, 0,-1],
    			 [-1, 0,-1, 0,-1, 0,-1, 0],
    			 [ 0, 0, 0, 0, 0, 0, 0, 0],
    			 [ 0, 0, 0, 0, 0, 0, 0, 0],
    			 [ 0, 1, 0, 1, 0, 1, 0, 1],
    			 [ 1, 0, 1, 0, 1, 0, 1, 0],
    			 [ 0, 1, 0, 1, 0, 1, 0, 1]
			];

var isSelected = false;
var selectedPiece = null;
var rigthPiecePlace = null;
var leftPiecePlace = null;
var selectedPieceColor = null;
var pieceRemove = null;
var handPlay = 1;
var keepJumping = null;
var opponentJump = null;
var currentSelectedPiece = null;
var opponentMove = null;
var kingListMove = [null, null, null, null];
var kingSelected = null;
var hasNotJump = false;


if(localStorage){
    try{
        loadPieceMove();
    }catch(e){
        storePieceMove();
    }
}



function setPieceMovement(){

	var coordX = parseInt($(this).attr('name')[0]);
	var coordY = parseInt($(this).attr('name')[1]);

    currentSelectedPiece = coordX + '' + coordY;

    if(handPlay > 0){
    	if(board[coordX][coordY] == 1){
            selectedPieceColor = handPlay;
    		getleftRightIndex(coordX, coordY);
    	}else if(board[coordX][coordY] == 2){
            colorKingMove(coordX, coordY, 2);
        }
    }

    if(handPlay < 0){  
        if(board[coordX][coordY] == -1){
            selectedPieceColor = handPlay;
    		getleftRightIndex(coordX, coordY);  
    	}else if(board[coordX][coordY] == -2){
            colorKingMove(coordX, coordY, -2);
        }
    }


    if(isSelected){
       
        if(kingSelected != null){
            
            if(pieceRemove != null){
                if(rigthPiecePlace == (coordX + '' + coordY)){
                    jumpSelectedKing(rigthPiecePlace);
                }
                if(leftPiecePlace == (coordX + '' + coordY)){
                    jumpSelectedKing(leftPiecePlace);
                }
            }else{
                if(board[kingSelected[0]][kingSelected[1]] == 2){
                    moveSelectedKing(coordX + '' + coordY);
                }else if(board[kingSelected[0]][kingSelected[1]] == -2){
                    moveSelectedKing(coordX + '' + coordY);
                }
            }

        }else{

            if(rigthPiecePlace == (coordX + '' + coordY) ){
                moveSelectedPiece(coordX + '' + coordY, rigthPiecePlace, selectedPieceColor);
            }

            if(leftPiecePlace == (coordX + '' + coordY) ){
                moveSelectedPiece(coordX + '' + coordY, leftPiecePlace, selectedPieceColor);
            }
        }

    }
	
    isSelected = true;

}


function getleftRightIndex(crdX, crdY){

    var leftBoxIndex = (selectedPieceColor == 1) ? ( ( (crdX > 0) && (crdY > 0) ) ? (crdX-1) + '' + (crdY-1) : null)
                                                 : ( ( (crdY > 0) ) ? (crdX+1) + '' + (crdY-1) : null);
	
	var rightBoxIndex = (selectedPieceColor == 1) ? ( ( (crdX > 0) && (crdY+1 < 8) ) ? (crdX-1) + '' + (crdY+1) : null)
                                                  : ( ( (crdX+1 < 8) && (crdY+1 < 8) ) ? (crdX+1) + '' + (crdY+1) : null);

	selectedPiece = crdX + '' + crdY;

    if(keepJumping != null){
        if(opponentMove == null)
            return [leftBoxIndex, rightBoxIndex];
    } 
	
    coloredPiecePlaces(leftBoxIndex, rightBoxIndex);
}


function coloredPiecePlaces(left, right) {

    clearBoxColored();



	if(left != null){
        var leftX = parseInt(left[0]);
        var leftY = parseInt(left[1]);
        leftPiecePlace = left;


		if( (leftX >= 0 && leftY >= 0) && board[leftX][leftY] == 0 && right != null && board[right[0]][right[1]] == 0){
            if(opponentMove == null)
                colorBoxInYellow(left);

		}else if(leftX >=0 && leftY >=0){
            coloredLeftOrRightPiece(left, right, 'L');
        }

    }


	if(right != null){
        var rightX = parseInt(right[0]);
        var rightY = parseInt(right[1]);
        rigthPiecePlace = right;

        
		if( (rightX < 8 && rightY < 8) && board[rightX][rightY] == 0 && left != null && board[left[0]][left[1]] == 0){
            if(opponentMove == null)
                colorBoxInYellow(right);

        }else if(rightX < 8 && rightY < 8){ 
            coloredLeftOrRightPiece(left, right, 'R');
        }
    }

    storePieceMove();
}

function colorBoxInYellow(box){
    $('.white-box[name=' + box + ']').css("background-color", "yellow");
}

function clearBoxInYellow(box){
    $('.white-box[name=' + box + ']').css("background-color", "white");
}

function coloredLeftOrRightPiece(leftPiece, rightPiece, pieceSide) {
    
    if(pieceSide == 'L'){
        var leftX = parseInt(leftPiece[0]);
        var leftY = parseInt(leftPiece[1]);

        if(board[leftX][leftY] == selectedPieceColor){
            if(rightPiece != null && board[rightPiece[0]][rightPiece[1]] == 0 && opponentMove == null){
                colorBoxInYellow(rightPiece);
                leftPiecePlace = rightPiece;
            }
                
        }else if(board[leftX][leftY] == 0 && rightPiece == null && opponentMove == null){
            colorBoxInYellow(leftPiece);

        }else if(board[leftX][leftY] != selectedPieceColor && board[leftX][leftY] != 0){
            coloredOnJumpPiece(leftX, leftY, 'L');
        }

    
    }else{

        var rightX = parseInt(rightPiece[0]);
        var rightY = parseInt(rightPiece[1]);

        if(board[rightX][rightY] == selectedPieceColor){
            if(leftPiece != null && board[leftPiece[0]][leftPiece[1]] == 0 && opponentMove == null){
                colorBoxInYellow(leftPiece);
                rigthPiecePlace = leftPiece;  
            }

        }else if(board[rightX][rightY] == 0 && leftPiece == null && opponentMove == null){
            colorBoxInYellow(rightPiece);

        }else if(board[rightX][rightY] != selectedPieceColor && board[rightX][rightY] != 0){
            coloredOnJumpPiece(rightX, rightY, 'R');
        }
    }
}


function coloredOnJumpPiece(x, y, side){
    var place = null;

    if(selectedPieceColor > 0 && side == 'R'){
        if(x-1 >= 0 && y+1 < 8){
            if(board[x-1][y+1] == 0){
                place = (board[x][y] < 0) ? (x-1).toString() + (y+1).toString() : null;
            }
            else{
                colorBoxInYellow(leftPiecePlace);
            }
        }

        
    }else if(selectedPieceColor > 0 && side == 'L'){
        if(x-1 >= 0 && y-1 >= 0){
            if(board[x-1][y-1] == 0){
                place = (board[x][y] < 0 ) ? (x-1).toString() + (y-1).toString() : null;
            }
            else{
                colorBoxInYellow(rigthPiecePlace);
            }
        }
    

    }else if(selectedPieceColor < 0 && side == 'R'){
        if(x+1 < 8 && y+1 < 8){
            if(board[x+1][y+1] == 0){
                place = (board[x][y] > 0) ? (x+1).toString() + (y+1).toString() : null;
            }
            else{
                colorBoxInYellow(leftPiecePlace);
            }
        }


    }else if(selectedPieceColor < 0 && side == 'L'){
        if(x+1 < 8 && y-1 >= 0){
            if(board[x+1][y-1] == 0){
                place = (board[x][y] > 0) ? (x+1).toString() + (y-1).toString() : null;
            }
            else{
                colorBoxInYellow(rigthPiecePlace);
            }
        }
    }

    rigthPiecePlace = (side == 'R') ? place : rigthPiecePlace;
    leftPiecePlace = (side == 'L') ? place : leftPiecePlace;


    if(place != null){
        colorBoxInYellow(place);
        pieceRemove = (x).toString()+(y).toString();
        keepJumping = 1;
        hasNotJump = true;
    }else{
        keepJumping = null;

    }

    return;       
}


function moveSelectedPiece(placeTomove, newPiecePlace, pieceColor){
	if(selectedPiece != null){

		if(newPiecePlace == placeTomove){

            if(opponentJump != null){
                selectedPiece = opponentJump;
                opponentJump = null;
            }

            if(pieceRemove != null){
                $('.white-box[name=' + pieceRemove + ']').children().remove();
                board[pieceRemove[0]][pieceRemove[1]] = 0;
                pieceRemove = null;
            }

            $('.white-box[name=' + selectedPiece + ']').children().remove();
            board[selectedPiece[0]][selectedPiece[1]] = 0;

			addPieceToNewPlace(pieceColor, newPiecePlace);

			isSelected = false;

			clearBoxColored();
			
			selectedPiece = null;
			rigthPiecePlace = null;
			leftPiecePlace = null;

            if(opponentMove != null){
                opponentMove = null;
                keepJumping = null;
            }

            onKeepJumping(newPiecePlace, pieceColor);


            if(keepJumping == null){
                makeOpponentJump(newPiecePlace);
                turnToMoveText();
            }

           storePieceMove();
		}		
	}



}


function addPieceToNewPlace(pieceClr, newPiecePL){
    var pieceMove = $('.white-box[name=' + newPiecePL + ']')
    var kingPlace = (pieceClr == 1) ? '0' : '7';
    var classDiv = (pieceClr == 1) ? 'black-piece' : 'white-piece';

    if(newPiecePL[0] == kingPlace){
        $(pieceMove.append("<div class=' " + classDiv + " '>").children()[0]).append("<div class='king-piece'>");
        board[newPiecePL[0]][newPiecePL[1]] = (pieceClr == 1) ? 2 : -2;

    }else{
        if(pieceMove.children().length == 0){
            pieceMove.append("<div class=' " + classDiv + " '>");
            board[newPiecePL[0]][newPiecePL[1]] = pieceClr;
        }
    }
}


function clearBoxColored() {
    $('.white-box[name=' + selectedPiece + ']').css("background-color", "white");
    $('.white-box[name=' + rigthPiecePlace + ']').css("background-color", "white");
    $('.white-box[name=' + leftPiecePlace + ']').css("background-color", "white");
}



function onKeepJumping(newPlace, pieceClr) {
    if(keepJumping != null){
        var leftRightBox = [null, null];
        var coordX = parseInt(newPlace[0]);
        var coordY = parseInt(newPlace[1]);

        leftRightBox = getleftRightIndex(coordX, coordY);

        selectedPieceColor = pieceClr;

        if(leftRightBox[0] != null){
            coloredOnJumpPiece(parseInt(leftRightBox[0][0]), parseInt(leftRightBox[0][1]), 'L');
        }

        if(leftRightBox[1] != null){
            coloredOnJumpPiece(parseInt(leftRightBox[1][0]), parseInt(leftRightBox[1][1]), 'R');
        }
    }
}


function makeOpponentJump(placeMoved){
    var leftRightBox = [];
    var coordX = parseInt(placeMoved[0]);
    var coordY = parseInt(placeMoved[1]);
    
    if(selectedPieceColor == -1){
        checkOpponentMove(coordX, coordY, 1);

    }else if(selectedPieceColor == 1){
        checkOpponentMove(coordX, coordY, -1);
    }

}


function checkOpponentMove(cX, cY , opponent) {
    keepJumping = 1;
    leftRightBox = getleftRightIndex(cX, cY);
    keepJumping = null;

    var bothSideToMove = null;

    if(leftRightBox[0] != null && leftRightBox[1] != null){
        if(board[leftRightBox[0][0]][leftRightBox[0][1]] == opponent){
            if(board[leftRightBox[1][0]][leftRightBox[1][1]] == opponent)
                bothSideToMove = 1;
        }
    }

    if(bothSideToMove == null){
        if(leftRightBox[0] != null){
            if(board[leftRightBox[0][0]][leftRightBox[0][1]] == opponent){
                selectedPieceColor = opponent;
                coloredOnJumpPiece(parseInt(selectedPiece[0]), parseInt(selectedPiece[1]), 'R');
                if(keepJumping != null)
                    opponentJump = leftRightBox[0][0] + '' + leftRightBox[0][1]; 
                
            }
        }

        if(leftRightBox[1] != null){
            if(board[leftRightBox[1][0]][leftRightBox[1][1]] == opponent){
                selectedPieceColor = opponent;
                coloredOnJumpPiece(parseInt(selectedPiece[0]), parseInt(selectedPiece[1]), 'L');
                if(keepJumping != null)
                    opponentJump = leftRightBox[1][0] + '' + leftRightBox[1][1]; 
            }
        }

    }else{
        if(!hasNotJump){
            opponentMove = 1;
            selectedPieceColor = opponent;
            hasNotJump = false;
        }
    }


}


function colorKingMove(x, y, kingPieceClr) {
    if(board[x][y] == kingPieceClr){
        kingSelected = x + '' + y;

        if(x-1 >= 0 && y-1 >= 0){
            if(checkColorKingMove( (x-1) +''+ (y-1), 'L', 0))
                return;
        }

        if(x-1 >= 0 && y+1 < 8){
            if(checkColorKingMove( (x-1) +''+ (y+1), 'R', 1))
                return;
        }

        if(x+1 < 8 && y-1 >= 0){
            if(checkColorKingMove( (x+1) +''+ (y-1), 'L', 2))
                return;
        }

        if(x+1 < 8 && y+1 < 8){
            if(checkColorKingMove( (x+1) +''+ (y+1), 'R', 3))
                return;
        }
    }

}


function checkColorKingMove(pos, side, index){

    if(board[pos[0]][pos[1]] == 0){
        kingListMove[index] = (pos[0]) + '' + (pos[1]);
        colorBoxInYellow(kingListMove[index]);
    }else if(board[pos[0]][pos[1]] < 0){
        if( (board[pos[0]][pos[1]] == -1 || board[pos[0]][pos[1]] == -2) && handPlay == 1){
            selectedPieceColor = 2;
            coloredOnJumpPiece(pos[0], pos[1], side);
            clearKingMoveColor();
            return true;
        }else if(board[pos[0]][pos[1]] == 0 && handPlay == -1){
            kingListMove[index] = (pos[0]) + '' + (pos[1]);
            colorBoxInYellow(kingListMove[index]);
        }
    }else if(board[pos[0]][pos[1]] > 0){
        if( (board[pos[0]][pos[1]] == 1 || board[pos[0]][pos[1]] == 2) && handPlay == -1){
            selectedPieceColor = -2;
            coloredOnJumpPiece(pos[0], pos[1], side);
            clearKingMoveColor();
            return true;
        }else if(board[pos[0]][pos[1]] == 0 && handPlay == 1){
            kingListMove[index] = (pos[0]) + '' + (pos[1]);
            colorBoxInYellow(kingListMove[index]);
        }
    }

}


function inKingMoves(move){
    for (var i = 0; i < 4; i++) {
        if(move == kingListMove[i])
            return true;
    }

    return false;
}

function moveSelectedKing(newKingPlace){
    if( inKingMoves(newKingPlace)){
    
        addKingToNewPlace(newKingPlace);

        $('.white-box[name=' + kingSelected + ']').children().remove();
        board[kingSelected[0]][kingSelected[1]] = 0;

        clearKingMoveColor();
        
        kingListMove = [null, null, null, null];
        isSelected = false;
        kingSelected = null;

        turnToMoveText();
        storePieceMove();

    }

}


function jumpSelectedKing(newKingPlace){
    $('.white-box[name=' + kingSelected + ']').children().remove();
    board[kingSelected[0]][kingSelected[1]] = 0;

    $('.white-box[name=' + pieceRemove + ']').children().remove();
    board[pieceRemove[0]][pieceRemove[1]] = 0;

    var pieceMove = $('.white-box[name=' + newKingPlace + ']');
    
    addKingToNewPlace(newKingPlace);
    
    kingListMove = [null, null, null, null];
    isSelected = false;
    pieceRemove = null;
    kingSelected = null;

    onKeepJumping(newKingPlace);
    
    turnToMoveText();
    selectedPieceColor = (selectedPieceColor > 0 ) ? 1 : -1;

    makeOpponentJump(newKingPlace);
    clearBoxInYellow(newKingPlace);

    storePieceMove();
}


function addKingToNewPlace(newKingPlace) {

    var kingColor = board[kingSelected[0]][kingSelected[1]];
    var classDiv = (kingColor == 2) ? 'black-piece' : 'white-piece';
    var pieceMove = $('.white-box[name=' + newKingPlace + ']');
    
    $(pieceMove.append("<div class=' "+classDiv+" '>").children()[0]).append("<div class='king-piece'>");
    board[newKingPlace[0]][newKingPlace[1]] = kingColor;
}


function clearKingMoveColor(){
    for (var i = 0; i < 4; i++) {
        clearBoxInYellow(kingListMove[i]);
    }
}

function turnToMoveText() {
    handPlay = (handPlay > 0) ? -1 : 1;
    var turn = (handPlay > 0) ? 'Black' : 'Brown';
    $('#turn-text').text( turn );
}

function storePieceMove() {
    localStorage.setItem('board', JSON.stringify(board));
    localStorage.setItem('handPlay', handPlay);
    localStorage.setItem('selectedPieceColor', selectedPieceColor);
    localStorage.setItem('isSelected', isSelected);
    localStorage.setItem('rigthPiecePlace', rigthPiecePlace);
    localStorage.setItem('leftPiecePlace', leftPiecePlace);
    localStorage.setItem('selectedPiece', selectedPiece);
    localStorage.setItem('kingListMove', JSON.stringify(kingListMove));
    localStorage.setItem('kingSelected', kingSelected);
}

function loadPieceMove() {
    clearBoard();

    var boardState =  JSON.parse(localStorage.getItem('board')) ;
    board = boardState;
    var rows = $('#board tbody').children();

    for(var i = 0; i < 8; i++){
        var row = $(rows[i]);
        addPiecesInRow(row.children(), boardState[i]);
    }

    selectedPieceColor = localStorage.getItem('selectedPieceColor');
    isSelected = (localStorage.getItem('isSelected') == 'true') ? true : false;

    rigthPiecePlace = localStorage.getItem('rigthPiecePlace');
    leftPiecePlace = localStorage.getItem('leftPiecePlace');
    
    selectedPiece = localStorage.getItem('selectedPiece');
    kingListMove =  JSON.parse(localStorage.getItem('kingListMove'));

    handPlay = parseInt(localStorage.getItem('handPlay'));
    var turn = (handPlay > 0) ? 'Black' : 'Brown';
    $('#turn-text').text( turn );
    
}


function addPiecesInRow(boxes, boardRow) {
    for(var i = 0; i < 8; i++){
        
        if(boardRow[i] == -1){
            $(boxes[i]).append("<div class= white-piece>");
        }else if(boardRow[i] == 1){
            $(boxes[i]).append("<div class= black-piece>");
        }else if(boxes[i] == -2){
            $(pieceMove.append("<div class= white-piece>").children()[0]).append("<div class='king-piece'>");
        }else if(boardRow[i] == 2){
            $(pieceMove.append("<div class= black-piece>").children()[0]).append("<div class='king-piece'>");
        }

    }

}
 

function clearBoard() {
    var rows = $('#board tbody').children();
    for(var i = 0; i < 8; i++){
        $(rows[i]).children().children().remove();
    }
 }

 function nullAllVariable() {
    board = [
                 [-1, 0,-1, 0,-1, 0,-1, 0],
                 [ 0,-1, 0,-1, 0,-1, 0,-1],
                 [-1, 0,-1, 0,-1, 0,-1, 0],
                 [ 0, 0, 0, 0, 0, 0, 0, 0],
                 [ 0, 0, 0, 0, 0, 0, 0, 0],
                 [ 0, 1, 0, 1, 0, 1, 0, 1],
                 [ 1, 0, 1, 0, 1, 0, 1, 0],
                 [ 0, 1, 0, 1, 0, 1, 0, 1]
            ];

    isSelected = false;
    selectedPiece = null;
    rigthPiecePlace = null;
    leftPiecePlace = null;
    selectedPieceColor = null;
    pieceRemove = null;
    handPlay = 1;
    keepJumping = null;
    opponentJump = null;
    currentSelectedPiece = null;
    opponentMove = null;
    kingListMove = [null, null, null, null];
    kingSelected = null;
    hasNotJump = false;

    $('#turn-text').text( 'Black' );
     
 }

 function makeNewGame() {
    localStorage.clear();
    clearBoard();
    nullAllVariable();
    addPiecesOnBoard();
 }

