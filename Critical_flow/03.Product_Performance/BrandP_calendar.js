import { Reveal_User } from '/support/classes/User'
import { Reveal_Calendar } from '/support/classes/Calendar'

let User = {}
let Calendar = {}

describe('Product Performance', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Calendar = new Reveal_Calendar()
		})
	})

	it('Brand Performance', function() {
		User.Goto('Brand Performance')
		cy.wait(500)
		cy.viewport(1300,2100)
		Calendar.open()
		cy.wait(500)
		Calendar.selectLastYear()
	// Select 1-11 January
		cy.get('.parent-drp > #daterange-predef-range > .detrange-controls > #formateddate').click()
		cy.get('tbody > :nth-child(2) > .active').click()
		cy.get('.left > .calendar-table > .table-condensed > tbody > :nth-child(3) > [data-title="r2c3"]').click()
		cy.get('.applyBtn').eq(0).click()
		cy.get('.parent-drp > #daterange-predef-range')
			.should('contain','11 Jan').should('be.visible')
	})
})