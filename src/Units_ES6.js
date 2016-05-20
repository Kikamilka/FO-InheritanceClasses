class Unit {
	constructor (strength) {
    this.strength  = strength; // strength - количество боевых единиц
  }
  logStrength () {
  	console.log("Strength: " + this.strength);
  }
  add (unit) {
  	this.strength  += parseInt(unit);
  }
  countStrength() {
  	return this.strength;
  }
}

// взвод - из боевых единиц
export class Platoon extends Unit {
	constructor (units) {
		if (units >= 10 && units <= 15) {
			super(units);
		}
		else {
			throw new RangeError ("Illegal strength for Platoon");
		}
	}
	add (units) {
		let strengthNewUnits = units.reduce(function(sum, current) {
			return sum + parseInt(current);
		}, 0);
		if (isArray(units) && strengthNewUnits <= (15 - this.countStrength())) {			
			super.add(strengthNewUnits);
		}
		else {
			throw new RangeError ("Too much strength for addition");
		}
	}
}

// рота - из взводов
export class Company extends Unit {
	constructor (units) {
		if (isArray(units)) {
			if (units.every(function(item){return item instanceof Platoon;})) {
				if (checkRange(units, [50, 100])) {
					super(getTotalStrength(units));
				}
			}
			else {				
				throw new TypeError ("Illegal type of Array (should be array of Platoon)");
			}
		}
	}	
	add (units) {
		if (isArray(units)) {
			if (units.every(function(item){return item instanceof Platoon;})) {
				if (checkUpperRange(units, this, 100)){
					super.add(getTotalStrength(units));
				}
			}
			else {
				throw new TypeError ("Illegal type of Array (should be array of Platoon)");
			}
		}
	}
}

// батальон - из рот и/или взводов
export class Battalion extends Unit {
	constructor (units) {
		if (isArray(units)) {
			if (units.every(function(item){return (item instanceof Platoon || item instanceof Company);})) {
				if (checkRange(units,[400, 800])) {
					super(getTotalStrength(units));
				}
			}
			else {
				throw new TypeError ("Illegal type of Array (should be array of Company or Platoon)");
			}
		}
	}	
	add (units) {
		if (isArray(units)) {
			if (units.every(function(item){return (item instanceof Platoon || item instanceof Company);})) {
				if (checkUpperRange(units, this, 800)){
					super.add(getTotalStrength(units));
				}
			}
			else {
				throw new TypeError ("Illegal type of Array (should be array of Company or Platoon)");
			}
		}
	}
}

function isArray (units) {
	if (units instanceof Array) {
		return true;
	}
	else {
		throw new TypeError ("Illegal type objects (should be Array)");
	}
}

function checkUpperRange (units, curUnits, upperRange) {
	if (getTotalStrength(units) <= (parseInt(upperRange) - curUnits.countStrength())){
		return true;
	}
	else {
		throw new RangeError ("Too much strength for addition");
	}
}

function checkRange (units, range) {
	if (getTotalStrength(units) >= parseInt(range[0]) && getTotalStrength(units) <= parseInt(range[1])) {
		return true;
	}
	else {
		throw new RangeError ("Illegal strength for Company");
	}
}

function getTotalStrength (units) {
	let totalStrength = units.reduce(function(sum, current) {
		return sum + current.countStrength();
	}, 0);
	return totalStrength;
}
