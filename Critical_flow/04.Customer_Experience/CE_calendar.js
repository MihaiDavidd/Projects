import { Reveal_User } from '/support/classes/User'
import { Reveal_Calendar } from '/support/classes/Calendar'

let User = {}
let Calendar = {}

describe('Customer Experience', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Calendar = new Reveal_Calendar()
		})
	})

	it('Calendar', function() {
		User.Goto('Customer Experience')
		cy.viewport(1300,3000)
		Calendar.open()
		Calendar.selectLastYear()
	// Select 1-8 Jan
		cy.get('.parent-drp > #daterange-predef-range > .detrange-controls > #formateddate').click()
		cy.get('tbody > :nth-child(2) > .active').click()
		cy.get('.left > .calendar-table > .table-condensed > tbody > :nth-child(3) > [data-title="r2c0"]').click()
		cy.get('.applyBtn').eq(0).click()
		cy.get('.parent-drp > #daterange-predef-range')
			.should('contain','8 Jan').should('be.visible')
	})
})