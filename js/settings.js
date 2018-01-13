function settingItem(name,spriteIndex,desc,affectingVal,nameVal){
	this.mainText = name;
	this.descText = desc;
	this.spriteIndex = spriteIndex;
	this.nameVal = nameVal;
	this.select = function(){
		affectingVal = !affectingVal;
		if (affectingVal){
			addTempText("Enabled!",0.7);
		}
		else{
			addTempText("Disabled!",0.7);
		}
		switch(this.nameVal){
			case "counterEnabled":
				globalVal.counterEnabled = affectingVal;
				break;
			case "godMode":
				globalVal.godMode = affectingVal;
				break;
			case "ezMoney":
				globalVal.ezMoney = affectingVal;
				break;
			case "noToilet":
				globalVal.noToilet = affectingVal;
				break;
			case "camoNinjas":
				globalVal.camoNinjas = affectingVal;
				break;
		}
	}
}
settingArray = [
	new settingItem("Enable/Disable Counter",0,"Enable tick counter\n& ruin fun",globalVal.counterEnabled,"counterEnabled"),
	new settingItem("Enable/Disable God Mode",0,"Pet cannot die",globalVal.godMode,"godMode"),
	new settingItem('"Invest" in Crypto',0,"Get $10 every now and then",globalVal.ezMoney,"ezMoney"),
	new settingItem("Enable/Disable\nFast Food",0,"Pet doesn't poop",globalVal.noToilet,"noToilet"),
	new settingItem("Enable/Disable\nCamo Ninjas",0,"Camoflauge Ninjas\n sometimes appear",globalVal.camoNinjas,"camoNinjas"),
];

var settings = {
	preload: function(){
		
	},
	create: function(){
		drawGameBody();
		drawGameUI(settingArray,"saveSheet");
		costText.alpha = 0;
		//button12.mode="use";
		
		if(!settingArray.length){
		button12.alpha = 0;
		button11.alpha = 0;
		button10.alpha = 0;
		sprite.alpha = 0;
		}
	
	},
	update: function(){
		
		displaySlide(settingArray);
		
		tickCheck();	
	}
}