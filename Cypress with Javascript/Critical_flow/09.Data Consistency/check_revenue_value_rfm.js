import { Reveal_User } from '/support/classes/User.js'
import { Reveal_Calendar } from '/support/classes/Calendar.js'
import { checkRevenueValueApprentice, checkRevenueValueLover, checkRevenueValueMainTrends } from '/support/sharedTests/check_revenue_value.js'

let User = {};
let Calendar = {};

describe('Check Revenue Value', function()	{
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

    it('Compare Revenue Value between Main and Trends Overview', function() {
		checkRevenueValueMainTrends(User, Calendar)
	})
    it('Compare Revenue Value for Lover Group', function() {
		checkRevenueValueLover(User, Calendar)
	})
	it('Compare Revenue Value for Apprentice Group', function() {
		checkRevenueValueApprentice(User, Calendar)
	})
})