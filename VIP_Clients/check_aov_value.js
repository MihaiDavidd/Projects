import { Reveal_User } from '/support/classes/User.js'
import { Reveal_Calendar } from '/support/classes/Calendar.js'
import { checkAOVValue } from '/support/sharedTests/check_aov_value.js'

let User = {}
let Calendar = {}

describe('Check AOV Value', function()	{
	before(function() {
		cy.fixture('credentials_vip').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Calendar = new Reveal_Calendar()
		});
	})

	it('Compare AOV Value between Main and Trends Overview', function() {
		checkAOVValue(User, Calendar)
	})
})