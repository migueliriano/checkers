
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

function getPieceMovement(){
	
	var coordX = parseInt($(this).attr('name')[0]);
	var coordY = parseInt($(this).attr('name')[1]);
	
	if(board[coordX][coordY] == 1){
        selectedPieceColor = 1;
		getleftRightIndex(coordX, coordY);
		

	}else if(board[coordX][coordY] == -1){
        selectedPieceColor = -1;
		getleftRightIndex(coordX, coordY);
		
	}
	
	if(isSelected){
		if(rigthPiecePlace == (coordX + '' + coordY) )
			moveSelectedPiece(coordX + '' + coordY, rigthPiecePlace, selectedPieceColor);
		if(leftPiecePlace == (coordX + '' + coordY) )
			moveSelectedPiece(coordX + '' + coordY, leftPiecePlace, selectedPieceColor);
	}

	isSelected = true;
}

function getleftRightIndex(crdX, crdY){
    var topLeftBoxIndex = (selectedPieceColor == 1) ? ( ( (crdX > 0) && (crdY > 0) ) ? (crdX-1) + '' + (crdY-1) : null)
                                                    : ( ( (crdX > 0) && (crdY > 0) ) ? (crdX+1) + '' + (crdY-1) : null);
	
	var topRightBoxIndex = (selectedPieceColor == 1) ? ( ( (crdX > 0) && (crdY > 0) ) ? (crdX-1) + '' + (crdY+1) : null)
                                                     : ( ( (crdX > 0) && (crdY > 0) ) ? (crdX+1) + '' + (crdY+1) : null);
	selectedPiece = crdX + '' + crdY;
	coloredPiecePlaces(topLeftBoxIndex, topRightBoxIndex);
}

function coloredPiecePlaces(left, right) {
	if(left != null)
		if( board[left[0]][left[1]] == 0){
			$(this).css("background-color", "yellow");
			$('.white-box[name=' + left + ']').css("background-color", "yellow");
			leftPiecePlace = left;
		}


	if(right != null)
		if(board[right[0]][right[1]] == 0){
			$(this).css("background-color", "yellow");
			$('.white-box[name=' + right + ']').css("background-color", "yellow");
			rigthPiecePlace = right;		
	}

}



function moveSelectedPiece(currentPiecePlace, newPiecePlace, pieceColor){
	if(selectedPiece != null){
		if(newPiecePlace == currentPiecePlace ){
			$('.white-box[name=' + selectedPiece + ']').children().remove();
			board[selectedPiece[0]][selectedPiece[1]] = 0;
			
			if(pieceColor==1){
				$('.white-box[name=' + newPiecePlace + ']').append("<div class='black-piece'>");
				board[newPiecePlace[0]][newPiecePlace[1]] = 1;
				
			}else if(pieceColor==-1){
				$('.white-box[name=' + newPiecePlace + ']').append("<div class='white-piece'>");
				board[newPiecePlace[0]][newPiecePlace[1]] = -1;
			}

			isSelected = false;

			$('.white-box[name=' + selectedPiece + ']').css("background-color", "white");
			$('.white-box[name=' + rigthPiecePlace + ']').css("background-color", "white");
			$('.white-box[name=' + leftPiecePlace + ']').css("background-color", "white");
			
			selectedPiece = null;
			rigthPiecePlace = null;
			leftPiecePlace = null;
		}
		
	}
}
