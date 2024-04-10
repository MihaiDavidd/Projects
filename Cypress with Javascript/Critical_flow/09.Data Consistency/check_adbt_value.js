import { Reveal_User } from '/support/classes/User.js'
import { Reveal_Calendar } from '/support/classes/Calendar.js'
import { checkADBTValue } from '/support/sharedTests/check_adbt_value.js'

let User = {};
let Calendar = {};

describe('Check ADBT Value', function()	{
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01";
			User = new Reveal_User(data[shopId]);
			Calendar = new Reveal_Calendar();
			if (Cypress.env ('shopId')==='demo01Stage') {
				this.skip()
			}
		})
	})

	it('Compare ADBT value between Main and Trends Overview', function() {
		checkADBTValue(User, Calendar)
	})
})