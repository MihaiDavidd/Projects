import { Reveal_User } from '/support/classes/User.js'
import { Reveal_Calendar } from '/support/classes/Calendar.js'
import { checkCustomerCountApprentice, checkCustomerCountLover, checkCustomerCountMainTrends } from '/support/sharedTests/check_customer_count_rfm.js'

let User = {}
let Calendar = {}

describe('Check Customer Count RFM', function()	{
	before(function() {
		cy.fixture('credentials_vip').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Calendar = new Reveal_Calendar()
		})
	})

    it('Compare customer count between Main and Trends Overview', function() {
		checkCustomerCountMainTrends(User, Calendar)
	})
    it('Compare customer count for Lover Group', function() {
		checkCustomerCountLover(User, Calendar)
	})
	it('Compare customer count for Apprentice Group', function() {
		checkCustomerCountApprentice(User, Calendar)
	})
})