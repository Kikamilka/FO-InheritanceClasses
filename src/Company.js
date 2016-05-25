import Unit from './Unit.js';
import Platoon from './Platoon.js';
import { checkUpperRange, checkRange, getTotalStrength } from "./util/utils.js";
// рота - из взводов
export default class Company extends Unit {
	constructor (units) {
		if (Array.isArray(units)) {
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
		if (Array.isArray(units)) {
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