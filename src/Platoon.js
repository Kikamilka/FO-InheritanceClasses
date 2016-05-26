import Unit from './Unit.js';
import { checkUpperRange, checkRange, getTotalStrength } from "./util/utils.js";
// взвод - из боевых единиц
export default class Platoon extends Unit {
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
		if (Array.isArray(units) && strengthNewUnits <= (15 - this.countStrength())) {			
			super.add(strengthNewUnits);
		}
		else {
			throw new RangeError ("Too much strength for addition");
		}
	}
}