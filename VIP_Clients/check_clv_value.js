import { Reveal_User } from '/support/classes/User.js'
import { Reveal_Calendar } from '/support/classes/Calendar.js'
import { checkCLVValue } from '/support/sharedTests/check_clv_value.js'

let User = {}
let Calendar = {}

describe('Check CLV Value', function()	{
	before(function() {
		cy.fixture('credentials_vip').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Calendar = new Reveal_Calendar()
		})
	})

	it('Compare CLV between Main and Customer Lifetime Value', function() {
		checkCLVValue(User, Calendar)
	})
})