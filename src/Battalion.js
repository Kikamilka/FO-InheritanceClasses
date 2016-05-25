import Unit from './Unit.js';
import Platoon from './Platoon.js';
import Company from './Company.js';
import { checkUpperRange, checkRange, getTotalStrength } from "./util/utils.js";
// батальон - из рот и/или взводов
export default class Battalion extends Unit {
	constructor (units) {
		if (Array.isArray(units)) {
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
		if (Array.isArray(units)) {
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