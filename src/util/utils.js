export function checkUpperRange (units, curUnits, upperRange) {
	if (getTotalStrength(units) <= (parseInt(upperRange) - curUnits.countStrength())){
		return true;
	}
	else {
		throw new RangeError ("Too much strength for addition");
	}
}

export function checkRange (units, range) {
	if (getTotalStrength(units) >= parseInt(range[0]) && getTotalStrength(units) <= parseInt(range[1])) {
		return true;
	}
	else {
		throw new RangeError ("Illegal strength for Company");
	}
}

export function getTotalStrength (units) {
	let totalStrength = units.reduce(function(sum, current) {
		return sum + current.countStrength();
	}, 0);
	return totalStrength;
}
