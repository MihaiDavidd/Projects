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

	it('Cohort Analysis', function() {
		User.Goto('Cohort Analysis')
	// Check title appears
		cy.get('.page-title').should('be.visible')
			.should('contain','Cohort Analysis')
		cy.get('thead > :nth-child(1) > .text-center').should('be.visible')
			.should('contain',"Repeated order by month")
	})

	it('Dropdown selector for year', function() {
		cy.viewport(1300,2000)
		Calendar.open()
		Calendar.selectLastYear()
		cy.wait(10000)
	// Select year 
		cy.get(':nth-child(1) > .step-picker > .dropdown > .btn').click({force: true})
		cy.get('.dropdown-menu.show a.dropdown-item:contains("Year")').click({force: true})
	// Click Apply
		cy.get('.card > :nth-child(2) > div > .btn').click({force: true})
	// Check table 
		cy.get(':nth-child(2) > .bg-light', {timeout: 20000})
			.should('be.visible').should('contain','First order placed in')
	// check 2022 metric
		if(Cypress.env('automation')) {
			cy.wait(5000)
			cy.get(':nth-child(2) > :nth-child(2) > .orders-revenue-data')
				.should('be.visible').should('contain','131.2')
		}
	})

	it('Dropdown selector for week', function() {
		cy.viewport(1300,2000)
	// Select week 
		cy.get(':nth-child(1) > .step-picker > .dropdown > .btn').click()
		cy.get('.dropdown-menu.show a.dropdown-item').last().click({force: true})
	// Click Apply
		cy.get('.card > :nth-child(2) > div > .btn').click()
		cy.wait(5000)
	// Check table 
		cy.get(':nth-child(2) > .bg-light', {timeout: 20000})
			.should('be.visible').should('contain','First order placed in')
	// check 2021 W52 metric
		if(Cypress.env('automation')) {
			cy.wait(5000)
			cy.get('.table > tbody > :nth-child(2) > :nth-child(2)')
				.should('be.visible').should('contain','302.5')
		}
	})
})