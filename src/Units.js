"use strict"
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
class Platoon extends Unit {
	constructor (units) {
		if (units >= 10 && units <= 15) {
			super(units);
		}
		else {
			throw new Error ("Illegal strength for Platoon");
		}
	}
	add (units) {
		let strengthNewUnits = units.reduce(function(sum, current) {
			return sum + parseInt(current);
		}, 0);
		if (units instanceof Array && strengthNewUnits <= (15 - this.countStrength())) {			
			super.add(strengthNewUnits);
		}
		else {
			throw new Error ("Too much strength for addition");
		}
	}
}

// рота - из взводов
class Company extends Unit {
	constructor (units) {
		if (units instanceof Array) {
			if (units.every(function(item){return item instanceof Platoon;})) {
				var totalStrength = Company.getTotalStrength(units);
				if (totalStrength >= 50 && totalStrength <= 100) {
					super(totalStrength);
				}
				else {
					console.log(Company.getTotalStrength(units));
					throw new Error ("Illegal strength for Company");
				}
			}
			else {				
				throw new Error ("Illegal type of Array (should be array of Platoon)");
			}
		}
		else {
			throw new Error ("Illegal type objects (should be Array)");			
		}
	}	
	add (units) {
		if (units instanceof Array) {
			if (units.every(function(item){return item instanceof Platoon;})) {
				if (Company.getTotalStrength(units) <= (100 - this.countStrength())){
					super.add(Company.getTotalStrength(units));
				}
				else {
					throw new Error ("Too much strength for addition");
				}
			}
			else {
				throw new Error ("Illegal type of Array (should be array of Platoon)");
			}
		}
		else {
			throw new Error ("Illegal type objects (should be Array or number units)");
		}
	}
	static getTotalStrength (platoons) {
		let totalStrength = platoons.reduce(function(sum, current) {
			return sum + current.countStrength();
		}, 0);
		return totalStrength;
	}
}

// батальон - из рот и/или взводов
class Battalion extends Unit {
	constructor (units) {
		if (units instanceof Array) {
			if (units.every(function(item){return (item instanceof Platoon || item instanceof Company);})) {
				let totalStrength = Battalion.getTotalStrength(units);
				if (totalStrength >= 400 && totalStrength <= 800) {
					super(totalStrength);
				}
				else {
					console.log(Battalion.getTotalStrength(units));
					throw new Error ("Illegal strength for Company");
				}
			}
			else {
				throw new Error ("Illegal type of Array (should be array of Company or Platoon)");
			}
		}
		else {
			throw new Error ("Illegal type objects (should be Array or number units)");			
		}
	}	
	add (units) {
		if (units instanceof Array) {
			if (units.every(function(item){return (item instanceof Platoon || item instanceof Company);})) {
				if (Battalion.getTotalStrength(units) <= (800- this.countStrength())){
					super.add(Battalion.getTotalStrength(units));
				}
				else {
					throw new Error ("Too much strength for addition");
				}
			}
			else {
				throw new Error ("Illegal type of Array (should be array of Company or Platoon)");
			}
		}
		else {
			throw new Error ("Illegal type objects (should be Array)");
		}
	}
	static getTotalStrength (units) {
		let totalStrength = units.reduce(function(sum, current) {
			return sum + current.countStrength();
		}, 0);
		return totalStrength;
	}
}

/*var vz1 = new Platoon(10);
console.log(vz1.countStrength());
var vz2 = new Platoon(13);
var vz3 = new Platoon(15);
var vz4 = new Platoon(15);
var vzs = new Array(vz1, vz2, vz3, vz4);
//console.log (vzs.forEach(function(unit) { return unit instanceof Platoon; }));
// для каждого элемента массива запустить функцию,
// промежуточный результат передавать первым аргументом далее
//console.log(vzs.every(function(item){return item instanceof Platoon;}));
let r1 = new Company(vzs);
let r2 = new Company([vz1, vz2, vz3, vz4, vz1, vz2]);
let r3 = new Company([vz1, vz2, vz3, vz4, vz1, vz2, vz3]);
let r4 = new Company([vz1, vz2, vz3, vz4, vz1, vz2, vz3]);
let r5 = new Company([vz1, vz2, vz3, vz4, vz1, vz2, vz3]);
vz1.add([3, 1, 1]);
console.log(vz1.countStrength());
console.log(r1.countStrength());
console.log(r2.countStrength());
console.log(r3.countStrength());
r1.add([vz1]);console.log(r1.countStrength());
let bat = new Battalion([r1, r2, r3, r4, r5]);
bat.logStrength();
bat.add([vz3]);
bat.logStrength(); */
