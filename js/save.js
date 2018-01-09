function loadStorage(){
	//loaded object is string (only strings can be stored), so we take the string
	//and "parse" it back into an object.
	var petJSON = localStorage.getItem("petSave");
	pet = JSON.parse(petJSON);
	var globalValJSON = localStorage.getItem("globalValSave");
	globalVal = JSON.parse(globalValJSON);
	
	if (pet == null){
		pet = {
			name : "BBQ MAN",
			sex : "M",
			age : 5,
			health : 50,
			happiness : 50,
			hunger : 50,
			mood : "Neutral",
			size : 60,
			sick : false,
			poop : 0,
		};
	}
	if (globalVal == null){
		globalVal = {
		money : 500
		};
	}
}

function saveStorage(){
	//convert our object into a sting and store it to the browser.
	localStorage.setItem("petSave", JSON.stringify(pet));
	localStorage.setItem("globalValSave",JSON.stringify(globalVal));
}

function resetStorage(){
	localStorage.removeItem("petSave");
	localStorage.removeItem("globalValSave");
	pet = {
			name : "BBQ MAN",
			sex : "M",
			age : 5,
			health : 50,
			happiness : 50,
			hunger : 50,
			mood : "Neutral",
			size : 60,
			sick : false,
			poop : 0,
	};
	globalVal ={
		money : 500
	};
}

function saveItem(name,spriteIndex,desc){
	this.mainText = name;
	this.descText = desc;
	this.spriteIndex = spriteIndex;
	this.select = function(){
		switch(this.mainText){
			case "Save":
				saveStorage();
				break;
			case "Load":
				loadStorage();
				break;
			case "Reset":
				resetStorage();
				break;
		}
		game.state.start("main");
	}
}
//
saveArray = [
	new saveItem("Save",0,"Save your game"),
	new saveItem("Load",0,"Load your game"),
	new saveItem("Reset",0,"Reset your game,\nand lose all your progress")
];

var save = {
	preload: function(){
		
	},
	create: function(){
		drawGameBody();
		drawGameUI(saveArray,"foodSheet");
		costText.alpha = 0;
		button12.mode="use";
		
		if(!saveArray.length){
		button12.alpha = 0;
		button11.alpha = 0;
		button10.alpha = 0;
		sprite.alpha = 0;
		}
	
	},
	update: function(){
		
		displaySlide(saveArray);
		
		tickCheck();	
	}
}