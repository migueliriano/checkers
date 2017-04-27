
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

function getPieceMovement(){
	
	var coordX = parseInt($(this).attr('name')[0]);
	var coordY = parseInt($(this).attr('name')[1]);

    if(handPlay == 1){
    	if(board[coordX][coordY] == 1){
            selectedPieceColor = handPlay;
    		getleftRightIndex(coordX, coordY);
    	}
    }

    if(handPlay == -1){  
        if(board[coordX][coordY] == -1){
            selectedPieceColor = handPlay;
    		getleftRightIndex(coordX, coordY);
    	}
    }
	
    
	if(isSelected){
		if(rigthPiecePlace == (coordX + '' + coordY) ){
			moveSelectedPiece(coordX + '' + coordY, rigthPiecePlace, selectedPieceColor);
        }
		if(leftPiecePlace == (coordX + '' + coordY) ){
			moveSelectedPiece(coordX + '' + coordY, leftPiecePlace, selectedPieceColor);
        }
	}

	isSelected = true;
}


function getleftRightIndex(crdX, crdY){
    var topLeftBoxIndex = (selectedPieceColor == 1) ? ( ( (crdX > 0) && (crdY > 0) ) ? (crdX-1) + '' + (crdY-1) : null)
                                                    : ( ( (crdY > 0) ) ? (crdX+1) + '' + (crdY-1) : null);
	
	var topRightBoxIndex = (selectedPieceColor == 1) ? ( ( (crdX > 0) && (crdY+1 < 8) ) ? (crdX-1) + '' + (crdY+1) : null)
                                                     : ( ( (crdX+1 < 8) && (crdY+1 < 8) ) ? (crdX+1) + '' + (crdY+1) : null);

	selectedPiece = crdX + '' + crdY;

    if(keepJumping != null){
        return [topLeftBoxIndex, topRightBoxIndex];
    }
	
    coloredPiecePlaces(topLeftBoxIndex, topRightBoxIndex);
}


function coloredPiecePlaces(left, right) {

	if(left != null){
        var leftX = parseInt(left[0]);
        var leftY = parseInt(left[1]);
        leftPiecePlace = left;

		if( (leftX >= 0 && leftY >= 0) && board[leftX][leftY] == 0 && right != null && board[right[0]][right[1]] == 0){
    		$(this).css("background-color", "yellow");
    		$('.white-box[name=' + left + ']').css("background-color", "yellow");

		}else if(leftX >=0 && leftY >=0){
            
            if(board[leftX][leftY] == selectedPieceColor){
                if(right != null && board[right[0]][right[1]] == 0){
                    $('.white-box[name=' + right + ']').css("background-color", "yellow");
                    leftPiecePlace = right;
                }
            
            }else if(board[leftX][leftY] == 0 && right == null){
                $('.white-box[name=' + left + ']').css("background-color", "yellow");

            }else if(board[leftX][leftY] != selectedPieceColor && board[leftX][leftY] != 0){
                coloredOnJumpPiece(leftX, leftY, 'L');
            }
        }

    }


	if(right != null){
        var rightX = parseInt(right[0]);
        var rightY = parseInt(right[1]);
        rigthPiecePlace = right;

        

		if( (rightX < 8 && rightY < 8) && board[rightX][rightY] == 0 && left != null && board[left[0]][left[1]] == 0){
			$(this).css("background-color", "yellow");
			$('.white-box[name=' + right + ']').css("background-color", "yellow");

        }else if(rightX < 8 && rightY < 8){ 
            
            if(board[rightX][rightY] == selectedPieceColor){
                if(left != null && board[left[0]][left[1]] == 0){
                    $('.white-box[name=' + left + ']').css("background-color", "yellow");
                    rigthPiecePlace = left;  
                }

            }else if(board[rightX][rightY] == 0 && left == null){
                $('.white-box[name=' + right + ']').css("background-color", "yellow");

            }else if(board[rightX][rightY] != selectedPieceColor && board[rightX][rightY] != 0){
                coloredOnJumpPiece(rightX, rightY, 'R');
            }
        }
    }


}


function coloredOnJumpPiece(x, y, side){
    var place = null;
    
    if(selectedPieceColor == 1 && side == 'R'){
        if(board[x-1][y+1] == 0){
            place = (board[x][y] == -1) ? (x-1).toString() + (y+1).toString() : null;
        }else{
            $('.white-box[name=' + leftPiecePlace + ']').css("background-color", "yellow");
        }

        
    }else if(selectedPieceColor == 1 && side == 'L'){
        if(board[x-1][y-1] == 0){
            place = (board[x][y] == -1) ? (x-1).toString() + (y-1).toString() : null;
        }
        else{
            $('.white-box[name=' + rigthPiecePlace + ']').css("background-color", "yellow");
        }
    

    }else if(selectedPieceColor == -1 && side == 'R'){
        if(board[x+1][y+1] == 0){
            place = (board[x][y] == 1) ? (x+1).toString() + (y+1).toString() : null;
        }
        else{
            $('.white-box[name=' + leftPiecePlace + ']').css("background-color", "yellow");
        }
    

    }else if(selectedPieceColor == -1 && side == 'L'){
        if(board[x+1][y-1] == 0){
            place = (board[x][y] == 1) ? (x+1).toString() + (y-1).toString() : null;
        }
        else{
            $('.white-box[name=' + rigthPiecePlace + ']').css("background-color", "yellow");
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


function moveSelectedPiece(currentPiecePlace, newPiecePlace, pieceColor){
	if(selectedPiece != null){

		if(newPiecePlace == currentPiecePlace ){

            if(pieceRemove != null){
                $('.white-box[name=' + pieceRemove + ']').children().remove();
                board[pieceRemove[0]][pieceRemove[1]] = 0;
                pieceRemove = null;
            }

            $('.white-box[name=' + selectedPiece + ']').children().remove();
            board[selectedPiece[0]][selectedPiece[1]] = 0;


			if(pieceColor==1){
				var pieceMove = $('.white-box[name=' + newPiecePlace + ']')
                if(newPiecePlace[0] == '0'){
                    $(pieceMove.append("<div class='black-piece'>").children()[0]).append("<div class='king-piece'>");
                    board[newPiecePlace[0]][newPiecePlace[1]] = 2;

                }else{
                    pieceMove.append("<div class='black-piece'>");
				    board[newPiecePlace[0]][newPiecePlace[1]] = 1;

                }
				
			}else if(pieceColor==-1){
                var pieceMove = $('.white-box[name=' + newPiecePlace + ']');
                if(newPiecePlace[0] == '7'){
				    $(pieceMove.append("<div class='white-piece'>").children()[0]).append("<div class='king-piece'>");
				    board[newPiecePlace[0]][newPiecePlace[1]] = -2;

                }else{
                    pieceMove.append("<div class='white-piece'>");
                    board[newPiecePlace[0]][newPiecePlace[1]] = -1;

                }
			}


			isSelected = false;

			$('.white-box[name=' + selectedPiece + ']').css("background-color", "white");
			$('.white-box[name=' + rigthPiecePlace + ']').css("background-color", "white");
			$('.white-box[name=' + leftPiecePlace + ']').css("background-color", "white");
			
			selectedPiece = null;
			rigthPiecePlace = null;
			leftPiecePlace = null;

            onKeepJumping(newPiecePlace)

            handPlay = (handPlay == 1) ? -1 : 1;
		}
		
	}

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
