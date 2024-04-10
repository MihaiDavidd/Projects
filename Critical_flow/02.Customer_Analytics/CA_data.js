import { Reveal_User } from '/support/classes/User'
import { Reveal_Calendar } from '/support/classes/Calendar'

let User = {}
let Calendar = {}

describe('Cohort Analysis', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Calendar = new Reveal_Calendar()
		})
	})

	it('Calendar', function() {
		User.Goto('Cohort Analysis')
		Calendar.open()
		Calendar.selectLastYear()
	})

	it('Check title name', function() {
		cy.viewport(1300,3000)
	// Cohorts by First Purchase Moment table
		cy.get(':nth-child(3) > :nth-child(1) > .card > .header-title')
			.should('be.visible').should('contain', 'Cohorts by First Purchase Moment')
	// Cohorts by First Purchase Moment graph 
		cy.get(':nth-child(3) > :nth-child(1) > .card > .header-title')
			.should('be.visible').should('contain', 'Cohorts by First Purchase Moment')
		cy.get(':nth-child(3) > :nth-child(1) > .card > .header-title')
	// 2nd Period Cohort Stickiness Rate
		cy.get(':nth-child(4) > :nth-child(1) > .card > .header-title')
			.should('be.visible').should('contain','2nd Period Cohort Stickiness Rate')
	})

	it('Check graph appears', function() {
		cy.viewport(1300,3000)
	// Cohorts by First Purchase Moment table
		cy.get(':nth-child(2) > :nth-child(1) > .card').should('be.visible')
	// Cohorts by First Purchase Moment graph 
		cy.get(':nth-child(3) > :nth-child(1) > .card').should('be.visible')
	// 2nd Month Cohort Stickiness Rate
		cy.get(':nth-child(4) > :nth-child(1) > .card > .orders-revenue-data > .cohort-chart').should('be.visible')
	})
})