import { Reveal_User } from '/support/classes/User.js'
import { Reveal_Calendar } from '/support/classes/Calendar.js'

let User = {}
let Calendar = {}

describe('Dashboard', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Calendar = new Reveal_Calendar()
		})
	})

	it('Calendar', function() {
		User.Goto('Main')
		Calendar.open()
		Calendar.selectLastYear()
	// check calendar date     
		cy.location().should((loc) => {
			expect(loc.search).to.contain('?from=2023-01-01&to=2023-12-31')
		})
		cy.get('.parent-drp > #daterange-predef-range > .detrange-controls > #formateddate')
			.should('have.text','1 Jan 2023 - 31 Dec 2023')
	})
})