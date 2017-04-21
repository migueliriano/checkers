//This k variable will determinate how the bloc has to change color differently
//For exemle when k = 0, the white block will add first and the black will be the second in the first row
//And when k = 1, the black will add first and the black will be the second to be added in the second row and so on...
var k = 0;

// This l variable will determinate the changing of the bloc color in a row.  
var l = 0;

for (var i = 0; i < 8; i++) {
	//Creating a row for each loop
	var row = document.createElement('div');
	row.style.cssText = 'display: table-row; z-index: -1;';

	//This loop will add 8 blocks in each row
	for(var j = 0; j < 8; j++ ){
		
			var bloc = document.createElement('div');

			if(k==0){
				if(l==0){
					bloc.style.cssText = 'margin: 0%; width:50px; height:50px; background-color:#8B4500; display: table-cell;';

					l=1;
				}else{
					bloc.style.cssText = 'margin: 0%; width:50px; height:50px; background-color:black; display: table-cell;';
					
					l=0;
				}
			}else{
				if(l==0){
					bloc.style.cssText = 'margin: 0%; width:50px; height:50px; background-color:black; display: table-cell;';
					l=1;
				}else{
					bloc.style.cssText = 'margin: 0%; width:50px; height:50px; background-color:#8B4500; display: table-cell;';
					l=0;
				}
			}

			bloc.id = i+''+j;
			row.appendChild(bloc);

	}

	if(k==0){k = 1;}else{k=0;}
	
	//When 8 blocks are in a row, we add it in the board div
	document.getElementById('board').appendChild(row);

}

//The white pieces -----------------------------------------------------------------------------------------------
//Row 1
for(var i = 0; i<8; i++){
	if(i%2!=0){
		var pieceW = document.createElement("div");
		pieceW.style.cssText = 'margin: 0%; width:50px; height:50px; background-color:#5E2612; border-radius: 50%;';
		document.getElementById('0'+i).appendChild(pieceW);
	}
}

//Row 2
for(var i = 0; i<8; i++){
	if(i%2==0){
		var piece = document.createElement("div");
		piece.style.cssText = 'margin: 0%; width:50px; height:50px; background-color:#5E2612; border-radius: 50%;';
		document.getElementById('1'+i).appendChild(piece);
	}
}


//Row 3
for(var i = 0; i<8; i++){
	if(i%2!=0){
		var piece = document.createElement("div");
		piece.style.cssText = 'margin: 0%; width:50px; height:50px; background-color:#5E2612; border-radius: 50%;';
		document.getElementById('2'+i).appendChild(piece);
	}
}




//The black pieces -----------------------------------------------------------------------------------------------
//Row 1
for(var i = 0; i<8; i++){
	if(i%2==0){
		var piece = document.createElement("div");
		piece.style.cssText = 'margin: 0%; width:50px; height:50px; background-color:#FF4500; border-radius: 50%;';
		document.getElementById('5'+i).appendChild(piece);
	}
}

//Row 2
for(var i = 0; i<8; i++){
	if(i%2!=0){
		var piece = document.createElement("div");
		piece.style.cssText = 'margin: 0%; width:50px; height:50px; background-color:#FF4500; border-radius: 50%;';
		document.getElementById('6'+i).appendChild(piece);
	}
}

//Row 3
for(var i = 0; i<8; i++){
	if(i%2==0){
		var piece = document.createElement("div");
		piece.style.cssText = 'margin: 0%; width:50px; height:50px; background-color:#FF4500; border-radius: 50%;';
		document.getElementById('7'+i).appendChild(piece);
	}
}

				