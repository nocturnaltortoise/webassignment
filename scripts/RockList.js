//makes a new array of Rocks
function RockList(size){
	this.size = size;
	this.rocks = new Array(size);
}

RockList.prototype.getSize = function(){
	return this.size;
};

RockList.prototype.setSize = function(size){
	this.size = size;
};

//adds a rock to an empty rocklist - increments the size to adjust for a new rock.
RockList.prototype.addRock = function(rock){
	this.rocks[this.size] = rock;
	this.size++;
};

//gets a rock from the rocklist at a particular index.
RockList.prototype.getRock = function(index){
	return this.rocks[index];
};