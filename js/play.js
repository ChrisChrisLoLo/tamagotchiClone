rerunCounter = 5;
function playItem(name,spriteIndex,cost,useCost,desc,happinessRestore){
	this.mainText = name;
	this.descText = desc;
	this.spriteIndex = spriteIndex;
	//useCost is price to use the item,cost is the price to buy the item
	this.useCost = useCost;
	this.cost = cost;
	this.happinessRestore = happinessRestore;
	this.select = function(mode) {
		console.log("hit");

		switch(mode){
			//purchasing from the store puts a foodItem instance into an inventory
			case "buy": 
				if (this.cost>globalVal.money){
					addTempText("INSUFFICIENT FUNDS",1);
					console.log("INSUFFICIENT FUNDS");
					return;
				}
				globalVal.money = globalVal.money-this.cost;
				console.log("push");
				//transfer item to your inventory
				invPlayArray.push(this);
				playArray.splice(playArray.indexOf(this),1);
				addTempText("Purchased!",1);
				//game.state.start("main");
			break;
				
			//Uses an item
			case "use":
				console.log("hit");
				if (this.useCost>globalVal.money){
					console.log("INSUFFICIENT FUNDS");
					addTempText("INSUFFICIENT FUNDS",1);
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
				globalVal.money = globalVal.money-this.useCost;

				invFoodArray.splice(invFoodArray.indexOf(this), 1 );
				game.state.start("main");
			break;
		}
	}
}
//TODO: allow for new playItems to be stacked onto this array when purchased from the shop
invPlayArray = [
	new playItem("Vacation",0,0,100,"Chill\nCosts $100",100),
	new playItem("Board Games",1,0,1,"More like Bored Games amiright\nCosts $1",5),
	new playItem("Work",2,0,-50,"Make $$$, but at the expense\n of some happiness.\nPays $50",-10),
	new playItem("PetFlix",3,0,3,"Watch reruns of 'The Office',\nfor the "+rerunCounter+"th time.\nCosts $3",5),
	new playItem("PRAISE STEVE JOBS",4,0,999,"APPLE DOES WHAT WINDON'T\nCosts $999",40)
];


var play = {
	preload: function(){
	},
	create: function(){
		drawGameBody();
		drawGameUI(invPlayArray,"playSheet");
		costText.alpha = 0;
		button12.mode = "use";
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
		displaySlide(invPlayArray);
		tickCheck();	
	}
}