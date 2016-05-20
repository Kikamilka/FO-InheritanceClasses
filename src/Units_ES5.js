function Unit (strength) {
	this.strength  = strength;
}

Unit.prototype.add = function (unit) {
	this.strength  += parseInt(unit);
}

Unit.prototype.countStrength = function () {
	return this.strength;
}

// взвод - из боевых единиц
export function Platoon (units) {
	if (units >= 10 && units <= 15) {
		Unit.call(this, units);
	}
	else {
		throw new RangeError ("Illegal strength for Platoon");
	}
}
Platoon.prototype = Object.create(Unit.prototype);
Platoon.prototype.constructor = Platoon;
Platoon.prototype.add = function (units) {
	var strengthNewUnits = units.reduce(function(sum, current) {
		return sum + parseInt(current);
	}, 0);
	if (isArray(units) && strengthNewUnits <= (15 - this.countStrength())) {			
		Unit.prototype.add.call(this, strengthNewUnits);
	}
	else {
		throw new RangeError ("Too much strength for addition");
	}
}

// рота - из взводов
export function Company (units) {
	if (isArray(units)) {
		if (units.every(function(item){return item instanceof Platoon;})) {
			if (checkRange(units, [50, 100])) {
				Unit.call(this, getTotalStrength(units));
			}
		}
		else {				
			throw new TypeError ("Illegal type of Array (should be array of Platoon)");
		}
	}
}	
Company.prototype = Object.create(Unit.prototype);
Company.prototype.constructor = Company;
Company.prototype.add = function (units) {
	if (isArray(units)) {
		if (units.every(function(item){return item instanceof Platoon;})) {
			if (checkUpperRange(units, this, 100)){
				Unit.prototype.add.call(this, getTotalStrength(units));
			}
		}
		else {
			throw new TypeError ("Illegal type of Array (should be array of Platoon)");
		}
	}
}

// батальон - из рот и/или взводов
export function Battalion (units) {
	if (isArray(units)) {
		if (units.every(function(item){return (item instanceof Platoon || item instanceof Company);})) {
			if (checkRange(units,[400, 800])) {
				Unit.call(this, getTotalStrength(units));
			}
		}
		else {
			throw new TypeError ("Illegal type of Array (should be array of Company or Platoon)");
		}
	}
}	
Battalion.prototype = Object.create(Unit.prototype);
Battalion.prototype.constructor = Battalion;
Battalion.prototype.add = function (units) {
	if (isArray(units)) {
		if (units.every(function(item){return (item instanceof Platoon || item instanceof Company);})) {
			if (checkUpperRange(units, this, 800)){
				Unit.prototype.add.call(this, getTotalStrength(units));
			}
		}
		else {
			throw new TypeError ("Illegal type of Array (should be array of Company or Platoon)");
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
	var totalStrength = units.reduce(function(sum, current) {
		return sum + current.countStrength();
	}, 0);
	return totalStrength;
}
