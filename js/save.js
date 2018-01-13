var pet = {
	name : "BBQ MAN",
	sex : "M",
	age : 0,
	health : 50,
	happiness : 50,
	hunger : 50,
	mood : "Neutral",
	size : 60,
	sick : false,
	poop : 0
	//poop refers to legitimate fecal matter the pet makes. It is not immaturity on my side.
};

var globalVal ={
	money : 500,
    counterEnabled: true,
    
};
/* MIGHT NOT BE NEEDED
var defaultPet={
    name : "BBQ MAN",
	sex : "M",
	age : 0,
	health : 50,
	happiness : 50,
	hunger : 50,
	mood : "Neutral",
	size : 60,
	sick : false,
	poop : 0,
};

var defaultGlobalVal={
    money : 500
};
*/
var defaultPetJSON = JSON.stringify(pet);
var defaultGlobalValJSON = JSON.stringify(globalVal);

//Attempt to load JSON with key string, and assign that to assignToVar, if cannot load JSON load abort and return false.
function loadJSON(key){
    var loadedJSON = localStorage.getItem(key);
    var testJSON = JSON.parse(loadedJSON);
    console.log(JSON.parse(loadedJSON));
    if (testJSON == null){
        addTempText("Cannot Load File!");
        console.log("ERROR! Cannot load save!");
        return false;
    }
    else{
        console.log("hit");
        return testJSON;
    }
}

function loadStorage(){
	//loaded object is string (only strings can be stored), so we take the string
	//and "parse" it back into an object.
    if(loadJSON("petSave")){
        pet = loadJSON("petSave");
        globalVal = loadJSON("globalValSave");
    }
}

function saveStorage(){
	//convert our object into a sting and store it to the browser.
	localStorage.setItem("petSave", JSON.stringify(pet));
    localStorage.setItem("globalValSave",JSON.stringify(globalVal));
}

function resetStorage(){
    
    pet = JSON.parse(defaultPetJSON);
    globalVal = JSON.parse(defaultGlobalValJSON);
    
	localStorage.removeItem("petSave");
	localStorage.removeItem("globalValSave");
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
	new saveItem("Load",1,"Load your game"),
	new saveItem("Reset",2,"Reset your game,\nand lose all your progress")
];
//
var save = {
	preload: function(){
	},
	create: function(){
		drawGameBody();
		drawGameUI(saveArray,"saveSheet");
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