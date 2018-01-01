var shop = {
	preload: function(){	
	},
	create: function(){
		drawGameBody();
		drawGameMenu("shopFood","Buy Food","shopItem","Buy Items");
	},
	update: function(){
		tickCheck();
		
	}
}

var shopItem = {
	preload: function(){	
	},
	create: function(){
		drawGameBody();
		drawGameUI(playArray,"playSheet");
		button12.mode = "buy";
	},
	update: function(){
		displaySlide(playArray);
		tickCheck();
	}
}

var shopFood = {
	preload: function(){	
	},
	create: function(){
		drawGameBody();
		drawGameUI(foodArray,"foodSheet");
		button12.mode = "buy";
	},
	update: function(){
		displaySlide(foodArray);
		tickCheck();
	}
}


//items sold by the store
foodArray = [
	new foodItem("Burger",0,10,"Fast food",8),
	new foodItem("Steak",1,20,"Cow flesh",18),
	new foodItem("Creamsicle",2,5,"I hate creamsicles",3),
	new foodItem("Fish",3,20,"85% Mercury free!",20),
	new foodItem("Egg",4,20,"Egg flesh",20),
	new foodItem("Coffee",5,20,"Bitter drink",20),
	new foodItem("Drumstick",6,20,"Bird flesh",20),
	new foodItem("Shoe",7,150,"You pay for the design",2),
	new foodItem("Chicken",8,20,"Fresh chicken",20)
];
//playItem(name,spriteIndex,cost,useCost,desc,happinessRestore)
playArray =[
	new playItem("Pencil",5,100,0,"Draw some of stuff",11),
	new playItem("Dumbbell",6,500,0,"Get big quick",20),
	new playItem("Computer",7,1000,0,"Wow so cool",15),
	new playItem("Plant",8,400,0,"Talk to the plant or something",4),
	new playItem("S8B04RD",9,800,0,"R4D D00D3",33),
	new playItem("Drums",10,400,0,"Very loud",13),
	new playItem("Fishing Rod",11,1000,0,"*Doesn't actually catch things",40),
]