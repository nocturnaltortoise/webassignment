function RockList(size){
	this.size = size;
	this.rocks = new Array(size);
}

RockList.prototype.getSize = function(){
	return this.size;
}

RockList.prototype.setSize = function(size){
	this.size = size;
}

RockList.prototype.addRock = function(rock){
	this.rocks[this.size] = rock;
	this.size++;
}

RockList.prototype.getRock = function(index){
	return this.rocks[index];
}