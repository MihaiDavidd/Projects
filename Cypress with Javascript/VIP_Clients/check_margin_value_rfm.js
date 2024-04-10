import { Reveal_User } from '/support/classes/User.js'
import { Reveal_Calendar } from '/support/classes/Calendar.js'
import { checkMarginValueApprentice, checkMarginValueLover, checkMarginValueMainTrends } from '/support/sharedTests/check_margin_value.js'
	
let User = {}
let Calendar = {}
	
describe('Check Margin Value', function()	{
	before(function() {
		cy.fixture('credentials_vip').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Calendar = new Reveal_Calendar()
		})
	})
	
	it('Compare Margin Value between Main and Trends Overview', function() {
		checkMarginValueMainTrends(User, Calendar)
	})

	it('Compare Margin Value for Lover Group', function() {
		checkMarginValueLover(User, Calendar)
	})

	it('Compare Margin Value for Apprentice Group', function() {
		checkMarginValueApprentice(User, Calendar)
	})
})