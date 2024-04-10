import { Reveal_User } from '/support/classes/User'
import { Reveal_Calendar } from '/support/classes/Calendar'

let User = {}
let Calendar = {}

describe('Segmentation', function()
{
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Calendar = new Reveal_Calendar()
		})
	})

	it('Calendar', function() {
		User.Goto('Segmentation')
		Calendar.open()
		Calendar.selectLastYear()
	// check calendar date 
		cy.get('.parent-drp > #daterange-predef-range > .detrange-controls > #formateddate')
			.should('have.text','1 Jan 2023 - 31 Dec 2023' )
	})
})