rerunCounter = 5;
function playItem(name,spriteIndex,cost,desc,happinessRestore){
	this.mainText = name;
	this.descText = desc;
	this.spriteIndex = spriteIndex;
	this.cost = cost;
	this.happinessRestore = happinessRestore;
	this.select = function() {
		rerunCounter+100;
		console.log("hit");
		if (this.cost>globalVal.money){
			console.log("INSUFFICIENT FUNDS");
			addTempText("INSUFFICIENT FUNDS",2);
			//TODO, have text in the screen be displayed for x amount of time
			return;
		}
		if (this.mainText == "PetFlix"){
			console.log("hit");
			rerunCounter++;
			//update the text in the object
			this.descText = "Watch reruns of 'The Office',\nfor the "+rerunCounter+"th time.\nCosts $3";
		}
		pet.happiness += this.happinessRestore;
		globalVal.money = globalVal.money-this.cost;
		game.state.start("main");
	}
}
//TODO: allow for new playItems to be stacked onto this array when purchased from the shop
playArray = [
	new playItem("Vacation",0,100,"Chill\nCosts $100",100),
	new playItem("Board Games",1,20,"More like Bored Games amiright\nCosts $1",5),
	new playItem("Work",2,-50,"Make $$$, but at the expense\n of some happiness.\nPays $50",-10),
	new playItem("PetFlix",3,3,"Watch reruns of 'The Office',\nfor the "+rerunCounter+"th time.\nCosts $3",5),
	new playItem("PRAISE STEVE JOBS",4,999,"APPLE DOES WHAT WINDON'T\nCosts $999",40),
	new foodItem("coffee",5,20,"Bitter drink\nCosts $20",20),
	new foodItem("drumstick",6,20,"Bird flesh\nCosts $20",20),
	new foodItem("shoe",7,150,"You pay for the design\nCosts $150",2),
	new foodItem("chicken",8,20,"Fresh chicken\nCosts $20",20)
];



var play = {
	preload: function(){
		
	},
	create: function(){
		drawGameBody();
		drawGameUI(playArray,"foodSheet");

		/*
		//draw food sprite
		foodSprite = game.add.sprite(this.game.world.centerX,this.game.world.centerY,"foodSheet");
		//change its "center point";
		foodSprite.frame = 0;
		foodSprite.anchor.setTo(0.5);
		mainText = game.add.bitmapText(game.world.centerX, height*(1/4),"pixel","ERROR",32);
		mainText.anchor.setTo(0.5);
		foodText = game.add.bitmapText(game.world.centerX, height*(4/6),"pixel","ERROR",22);
		foodText.anchor.setTo(0.5);
		foodText.align = "center";
		*/
	},
	update: function(){
		displaySlide(playArray);
		tickCheck();	
	}
}