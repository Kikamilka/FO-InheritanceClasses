import Unit from "../src/Unit";
import Platoon from "../src/Platoon";
import Company from "../src/Company";
import Battalion from "../src/Battalion";

chai.config.includeStack = true;

let expect = chai.expect;
describe("Units function (ES6)", function () {
	describe("Class Platoon", function () {
		let plat_A = new Platoon(10);	
		it("Get count objects in Platoon", function () {
			expect(plat_A.countStrength()).to.be.equal(10);
		});	
		it("Create too much objects in Platoon", function () {
			expect(function() {let plat_A = new Platoon(20);}).to.throw(RangeError);
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
		let plat = new Platoon(15);	
		let plat2 = new Platoon(13);
		let plat3 = new Platoon(15);	
		let company = new Company([plat, plat, plat2, plat3]);	
		it("Get count objects in Company", function () {
			expect(company.countStrength()).to.be.equal(58);
		});	
		it("Create not enough objects in Company", function () {
			expect(function() {let company = new Company([plat, plat2, plat3]);}).to.throw(RangeError);
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
		let plat = new Platoon(15);		
		let company = new Company([plat, plat, plat, plat, plat, plat]); //90units
		let bat = new Battalion([company, company, plat, company, company, plat, plat]); //405units
		it("Get count objects in Battalion", function () {
			expect(bat.countStrength()).to.be.equal(405);
		});	
		it("Create not enough objects in Battalion", function () {
			expect(function() {let bat = new Battalion([plat, company]);}).to.throw(RangeError);
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