import {Unit} from "../src/Units_ES5";
import {Platoon} from "../src/Units_ES5";
import {Company} from "../src/Units_ES5";
import {Battalion} from "../src/Units_ES5";

chai.config.includeStack = true;

var expect = chai.expect;
describe("Units function (ES5)", function () {
	describe("Class Platoon", function () {
		var plat_A = new Platoon(10);	
		it("Get count objects in Platoon", function () {
			expect(plat_A.countStrength()).to.be.equal(10);
		});	
		it("Create too much objects in Platoon", function () {
			expect(function() {var plat_A = new Platoon(20);}).to.throw(RangeError);
		});
		it("Add objects in Platoon object", function () {	
			plat_A.add([1, 2]);	
			expect(plat_A.countStrength()).to.be.equal(13);
		});
		it("Add too much objects in Platoon object", function () {
			expect(function() {plat_A.add([10]);}).to.throw(RangeError);
		});
	});

	describe("Class Company", function () {
		var plat = new Platoon(15);	
		var plat2 = new Platoon(13);
		var plat3 = new Platoon(15);	
		var company = new Company([plat, plat, plat2, plat3]);	
		it("Get count objects in Company", function () {
			expect(company.countStrength()).to.be.equal(58);
		});	
		it("Create not enough objects in Company", function () {
			expect(function() {var company = new Company([plat, plat2, plat3]);}).to.throw(RangeError);
		});
		it("Add objects in Company object", function () {	
			company.add([plat, plat3]);	
			expect(company.countStrength()).to.be.equal(88);
		});
		it("Add illegal type objects in Company object", function () {
			expect(function() {company.add([10]);}).to.throw(TypeError);
		});
	});

	describe("Class Battalion", function () {
		var plat = new Platoon(15);		
		var company = new Company([plat, plat, plat, plat, plat, plat]); //90units
		var bat = new Battalion([company, company, plat, company, company, plat, plat]); //405units
		it("Get count objects in Battalion", function () {
			expect(bat.countStrength()).to.be.equal(405);
		});	
		it("Create not enough objects in Battalion", function () {
			expect(function() {var bat = new Battalion([plat, company]);}).to.throw(RangeError);
		});
		it("Add objects in Battalion object", function () {	
			bat.add([company]);	
			expect(bat.countStrength()).to.be.equal(495);
		});
		it("Add illegal type objects in Battalion object", function () {
			expect(function() {bat.add([10]);}).to.throw(TypeError);
		});
	});
});