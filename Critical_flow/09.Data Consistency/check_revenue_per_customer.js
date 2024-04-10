import { Reveal_User } from '/support/classes/User.js'
import { Reveal_Calendar } from '/support/classes/Calendar.js'
import { checkRevenuePerCustomer } from '../../support/sharedTests/check_revenue_per_customer';

let User = {};
let Calendar = {};

describe('Check Revenue Per Customer', function() {
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

	it('Compare Revenue per Customers between Trends Overview and CLV', function() {
		checkRevenuePerCustomer(User, Calendar)
	})

})