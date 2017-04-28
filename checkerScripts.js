
init();

function init(){
	createCheckersBoard();
	addPiecesOnBoard();
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
				bloc.onclick = getPieceMovement;
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
var oldSelectedPiece = null;

function getPieceMovement(){
	
	var coordX = parseInt($(this).attr('name')[0]);
	var coordY = parseInt($(this).attr('name')[1]);

    if(isSelected){
        if(rigthPiecePlace == (coordX + '' + coordY) ){
            moveSelectedPiece(coordX + '' + coordY, rigthPiecePlace, selectedPieceColor);
        }
        if(leftPiecePlace == (coordX + '' + coordY) ){
            moveSelectedPiece(coordX + '' + coordY, leftPiecePlace, selectedPieceColor);
        }
    }

    if(handPlay == 1){
    	if(board[coordX][coordY] == 1){
            selectedPieceColor = handPlay;
    		getleftRightIndex(coordX, coordY);
            isSelected = true;
    	}
    }

    if(handPlay == -1){  
        if(board[coordX][coordY] == -1){
            selectedPieceColor = handPlay;
    		getleftRightIndex(coordX, coordY);
            isSelected = true;
    	}
    }
	
    
	

}


function getleftRightIndex(crdX, crdY){
    var leftBoxIndex = (selectedPieceColor == 1) ? ( ( (crdX > 0) && (crdY > 0) ) ? (crdX-1) + '' + (crdY-1) : null)
                                                    : ( ( (crdY > 0) ) ? (crdX+1) + '' + (crdY-1) : null);
	
	var rightBoxIndex = (selectedPieceColor == 1) ? ( ( (crdX > 0) && (crdY+1 < 8) ) ? (crdX-1) + '' + (crdY+1) : null)
                                                     : ( ( (crdX+1 < 8) && (crdY+1 < 8) ) ? (crdX+1) + '' + (crdY+1) : null);

	selectedPiece = crdX + '' + crdY;

    if(keepJumping != null){
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

        //Color both side
		if( (leftX >= 0 && leftY >= 0) && board[leftX][leftY] == 0 && right != null && board[right[0]][right[1]] == 0){
    		//$('.white-box[name=' + selectedPiece + ']').css("background-color", "yellow");
    		$('.white-box[name=' + left + ']').css("background-color", "yellow");

		}else if(leftX >=0 && leftY >=0){
            coloredLeft_or_right_piece(left, right, 'L');
        }

    }


	if(right != null){
        var rightX = parseInt(right[0]);
        var rightY = parseInt(right[1]);
        rigthPiecePlace = right;

        //Color both side
		if( (rightX < 8 && rightY < 8) && board[rightX][rightY] == 0 && left != null && board[left[0]][left[1]] == 0){
			//$('.white-box[name=' + selectedPiece + ']').css("background-color", "yellow");
			$('.white-box[name=' + right + ']').css("background-color", "yellow");

        }else if(rightX < 8 && rightY < 8){ 
            coloredLeft_or_right_piece(left, right, 'R');
        }
    }

}

function coloredLeft_or_right_piece(leftPiece, rightPiece, pieceSide) {
    
    if(pieceSide == 'L'){
        var leftX = parseInt(leftPiece[0]);
        var leftY = parseInt(leftPiece[1]);

        if(board[leftX][leftY] == selectedPieceColor){
            if(rightPiece != null && board[rightPiece[0]][rightPiece[1]] == 0){
                $('.white-box[name=' + rightPiece + ']').css("background-color", "yellow");
                leftPiecePlace = rightPiece;
            }
                
        }else if(board[leftX][leftY] == 0 && rightPiece == null){
            $('.white-box[name=' + leftPiece + ']').css("background-color", "yellow");

        }else if(board[leftX][leftY] != selectedPieceColor && board[leftX][leftY] != 0){
            coloredOnJumpPiece(leftX, leftY, 'L');
        }

    
    }else{
        var rightX = parseInt(rightPiece[0]);
        var rightY = parseInt(rightPiece[1]);

        if(board[rightX][rightY] == selectedPieceColor){
            if(leftPiece != null && board[leftPiece[0]][leftPiece[1]] == 0){
                $('.white-box[name=' + leftPiece + ']').css("background-color", "yellow");
                rigthPiecePlace = leftPiece;  
            }

        }else if(board[rightX][rightY] == 0 && leftPiece == null){
            $('.white-box[name=' + rightPiece + ']').css("background-color", "yellow");

        }else if(board[rightX][rightY] != selectedPieceColor && board[rightX][rightY] != 0){
            coloredOnJumpPiece(rightX, rightY, 'R');
        }

    }

        
}


function coloredOnJumpPiece(x, y, side){
    var place = null;
    console.log(x, y);
    if(selectedPieceColor == 1 && side == 'R'){
        if(x-1 >= 0 && y+1 < 8){
            if(board[x-1][y+1] == 0){
                place = (board[x][y] == -1) ? (x-1).toString() + (y+1).toString() : null;
            }
            else{
                $('.white-box[name=' + leftPiecePlace + ']').css("background-color", "yellow");
            }
        }

        
    }else if(selectedPieceColor == 1 && side == 'L'){
        if(x-1 >= 0 && y-1 >= 0){
            if(board[x-1][y-1] == 0){
                place = (board[x][y] == -1) ? (x-1).toString() + (y-1).toString() : null;
            }
            else{
                $('.white-box[name=' + rigthPiecePlace + ']').css("background-color", "yellow");
            }
        }
    

    }else if(selectedPieceColor == -1 && side == 'R'){
        if(x+1 < 8 && y+1 < 8){
            if(board[x+1][y+1] == 0){
                place = (board[x][y] == 1) ? (x+1).toString() + (y+1).toString() : null;
            }
            else{
                $('.white-box[name=' + leftPiecePlace + ']').css("background-color", "yellow");
            }
        }
    

    }else if(selectedPieceColor == -1 && side == 'L'){
        if(x+1 < 8 && y-1 >= 0){
            if(board[x+1][y-1] == 0){
                place = (board[x][y] == 1) ? (x+1).toString() + (y-1).toString() : null;
            }
            else{
                $('.white-box[name=' + rigthPiecePlace + ']').css("background-color", "yellow");
            }
        }

    }

    rigthPiecePlace = (side == 'R') ? place : rigthPiecePlace;
    leftPiecePlace = (side == 'L') ? place : leftPiecePlace;


    if(place != null){
        $('.white-box[name=' + place + ']').css("background-color", "yellow");
        pieceRemove = (x).toString()+(y).toString();
        keepJumping = 1;
    }else{
        keepJumping = null;
    }

    return;
        
}


function moveSelectedPiece(placeTomove, newPiecePlace, pieceColor){
	if(selectedPiece != null){

		if(newPiecePlace == placeTomove){

            if(pieceRemove != null){
                $('.white-box[name=' + pieceRemove + ']').children().remove();
                board[pieceRemove[0]][pieceRemove[1]] = 0;
                pieceRemove = null;
            }

            if(opponentJump != null){
                selectedPiece = opponentJump;
                opponentJump = null;
            }

            $('.white-box[name=' + selectedPiece + ']').children().remove();
            board[selectedPiece[0]][selectedPiece[1]] = 0;


			if(pieceColor==1){
				var pieceMove = $('.white-box[name=' + newPiecePlace + ']')
                if(newPiecePlace[0] == '0'){
                    // $(pieceMove.append("<div class='black-piece'>").children()[0]).append("<div class='king-piece'>");
                    // board[newPiecePlace[0]][newPiecePlace[1]] = 2;

                }else{
                    pieceMove.append("<div class='black-piece'>");
				    board[newPiecePlace[0]][newPiecePlace[1]] = 1;

                }
				
			}else if(pieceColor==-1){
                var pieceMove = $('.white-box[name=' + newPiecePlace + ']');
                if(newPiecePlace[0] == '7'){
				    // $(pieceMove.append("<div class='white-piece'>").children()[0]).append("<div class='king-piece'>");
				    // board[newPiecePlace[0]][newPiecePlace[1]] = -2;

                }else{
                    pieceMove.append("<div class='white-piece'>");
                    board[newPiecePlace[0]][newPiecePlace[1]] = -1;

                }
			}


			isSelected = false;

			clearBoxColored();

			
			selectedPiece = null;
			rigthPiecePlace = null;
			leftPiecePlace = null;

            onKeepJumping(newPiecePlace)

            handPlay = (handPlay == 1) ? -1 : 1;

            //makeOpponentJump(newPiecePlace);
		}
		
	}

}

function clearBoxColored() {
    $('.white-box[name=' + selectedPiece + ']').css("background-color", "white");
    $('.white-box[name=' + rigthPiecePlace + ']').css("background-color", "white");
    $('.white-box[name=' + leftPiecePlace + ']').css("background-color", "white");
}


function onKeepJumping(newPlace) {
    if(keepJumping != null){
        var leftRightBox = [];
        var coordX = parseInt(newPlace[0]);
        var coordY = parseInt(newPlace[1]);

        leftRightBox = getleftRightIndex(coordX, coordY);

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
        keepJumping = 1;
        leftRightBox = getleftRightIndex(coordX, coordY);
        keepJumping = null;

        if(leftRightBox[0] != null){
            if(board[leftRightBox[0][0]][leftRightBox[0][1]] == 1){
                selectedPieceColor = 1;
                opponentJump = leftRightBox[0][0] + '' + leftRightBox[0][1]; 
                coloredOnJumpPiece(parseInt(selectedPiece[0]), parseInt(selectedPiece[1]), 'R');
            }
        }

        if(leftRightBox[1] != null){
            if(board[leftRightBox[1][0]][leftRightBox[1][1]] == 1){
                selectedPieceColor = 1;
                opponentJump = leftRightBox[1][0] + '' + leftRightBox[1][1]; 
                coloredOnJumpPiece(parseInt(selectedPiece[0]), parseInt(selectedPiece[1]), 'L');
            }
        }



    }else if(selectedPieceColor == 1){
        keepJumping = 1;
        leftRightBox = getleftRightIndex(coordX, coordY);
        keepJumping = null;



        if(leftRightBox[0] != null){
            if(board[leftRightBox[0][0]][leftRightBox[0][1]] == -1 && board[leftRightBox[1][0]][leftRightBox[1][1]] == 0){
                selectedPieceColor = -1;
                opponentJump = leftRightBox[0][0] + '' + leftRightBox[0][1]; 
                coloredOnJumpPiece(parseInt(selectedPiece[0]), parseInt(selectedPiece[1]), 'R');
            }

        }

        else if(leftRightBox[1] != null)
            if(board[leftRightBox[1][0]][leftRightBox[1][1]] == -1 && board[leftRightBox[0][0]][leftRightBox[0][1]] == 0){
                selectedPieceColor = -1;
                opponentJump = leftRightBox[1][0] + '' + leftRightBox[1][1]; 
                coloredOnJumpPiece(parseInt(selectedPiece[0]), parseInt(selectedPiece[1]), 'L');
            
        }

    }



}
