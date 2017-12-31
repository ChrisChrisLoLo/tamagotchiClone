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
		drawGameUI(foodArray,"foodSheet");
	},
	update: function(){
		displaySlide(foodArray);
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


foodArray = [
	new foodItem("Burger",0,10,"Fast food\nCosts $10",8),
	new foodItem("Steak",1,20,"Cow flesh.\nCosts $20",18),
	new foodItem("Creamsicle",2,5,"I hate creamsicles\nCosts $5",3),
	new foodItem("Fish",3,20,"85% Mercury free!\nCosts $20",20),
	new foodItem("Egg",4,20,"Egg flesh\nCosts $20",20),
	new foodItem("Coffee",5,20,"Bitter drink\nCosts $20",20),
	new foodItem("Drumstick",6,20,"Bird flesh\nCosts $20",20),
	new foodItem("Shoe",7,150,"You pay for the design\nCosts $150",2),
	new foodItem("Chicken",8,20,"Fresh chicken\nCosts $20",20)
];