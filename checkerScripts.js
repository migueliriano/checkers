
init();

function init(){
	createCheckersBoard();

}


function createCheckersBoard(){

	var  rowChangeColor = 0;

	var boxChangeColor = 0;

	for (var i = 0; i < 8; i++) {
		//Creating a row for each loop
		var row = document.createElement('div');
		row.style.cssText = 'display: table-row; z-index: -1;';

		//This loop will add 8 blocks in each row
		for(var j = 0; j < 8; j++ ){
				var bloc = document.createElement('div');

				if(rowChangeColor==0){

					if(boxChangeColor==0){
						bloc.className = 'white-box';
						boxChangeColor=1;

					}else{
						bloc.className = 'black-box';
						boxChangeColor=0;
					}
				}else{

					if(boxChangeColor==0){
						bloc.className = 'black-box';
						boxChangeColor=1;
					}else{
						bloc.className = 'white-box';
						boxChangeColor=0;
					}
				
				}
				row.appendChild(bloc);
		}
		rowChangeColor = (rowChangeColor==0) ? 1:0;
		
		//When 8 blocks are in a row, we add it in the board div
		document.getElementById('board').appendChild(row);
	}



	var boardRowChildren = document.getElementById('board').children;

	for(var i = 0; i<8; i++){
		for(var j = 0; j<8; j++){

			//The white pieces -------------------------------------
			if(i<3){
				var pieceWhite = document.createElement("div");
				if(i%2==0 && j%2==0){
					pieceWhite.className = 'white-piece';
					boardRowChildren[i].children[j].appendChild(pieceWhite);

				}else if(i%2!=0 && j%2!=0){
					pieceWhite.className = 'white-piece';
					boardRowChildren[i].children[j].appendChild(pieceWhite);
				}
				
	 		

			//The black pieces -------------------------------------
			}else if(i>=5){
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
