import { Reveal_User } from '/support/classes/User.js'
import { Reveal_Calendar } from '/support/classes/Calendar.js'
import { checkOrdersCount } from '/support/sharedTests/check_orders_count'

let User = {}
let Calendar = {}

describe('Check Orders Count', function() {
	before(function() {
		cy.fixture('credentials_vip').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Calendar = new Reveal_Calendar()
		})
	})

	it('Compare orders count between Main and Trends Overview', function() {
		checkOrdersCount(User, Calendar)
	})
})