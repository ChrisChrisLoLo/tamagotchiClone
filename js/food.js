function foodItem(name,spriteIndex,cost,desc,hungRestore){
	this.mainText = name;
	this.descText = desc;
	this.spriteIndex = spriteIndex;
	this.cost = cost;
	this.hungRestore = hungRestore;
	this.select = function() {
		pet.hunger = pet.hunger+this.hungRestore;
		globalVal.money = globalVal.money-this.cost;
		game.state.start("main");
	}
}
//
foodArray = [
	new foodItem("burger",0,10,"Fast food\nCosts $10",8),
	new foodItem("steak",1,20,"Cow flesh.\nCosts $20",18),
	new foodItem("creamsicle",2,5,"I hate creamsicles\nCosts $5",3),
	new foodItem("fish",3,20,"85% Mercury free!\nCosts $20",20),
	new foodItem("egg",4,20,"Egg flesh\nCosts $20",20),
	new foodItem("coffee",5,20,"Bitter drink\nCosts $20",20),
	new foodItem("drumstick",6,20,"Bird flesh\nCosts $20",20),
	new foodItem("shoe",7,150,"You pay for the design\nCosts $150",2),
	new foodItem("chicken",8,20,"Fresh chicken\nCosts $20",20)
];



var food = {
	preload: function(){
		this.load.spritesheet("foodSheet","assets/art/items/foodSheet.png",128,128,9);
	},
	create: function(){
		drawGameBody();
		drawGameUI(foodArray,"foodSheet");
		
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
		displaySlide(foodArray);
		tickCheck();	
	}
}