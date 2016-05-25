export default class Unit {
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