import { Reveal_User } from '/support/classes/User'
import { Reveal_Calendar } from '/support/classes/Calendar'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Calendar = {}
let Shop = {}

describe('Product Performance', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Shop = new Reveal_Shop(data[shopId])
			Calendar = new Reveal_Calendar()
		})
	})

	it('Brand Performance', function() {
		User.Goto('Brand Performance')
		cy.viewport(1300,2000)
		Calendar.open()
		if(Cypress.env('automation') === true) {
			Calendar.selectAllTime()
			cy.wait(5000)
		} else {
			Calendar.selectLastYear()
		}
	// Click see all 
		cy.get('.btn-medium-secondary').click()
	})

	it('Brand List', function() {
	// Check title
		cy.get('.page-title')
			.should('be.visible').should('contain','Brands List')
	// Show entries and select 10
		cy.get('#responsive-datatable_length > label')
			.should('be.visible').should('contain','Show')
		cy.get('label > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner').click()
        cy.get("ul.dropdown-menu.inner.show")
            .contains("span.text", "10")
            .click()
	// Check Export button
		if(Cypress.env("shopId") !== 'auchan'){
		cy.get('.dt-toolbar-top-r > .btn')
			.should('be.visible').should('contain','Export')
		}
	})

	it('Check table', function() {
		cy.viewport(1300,1800) 
	// check table headers 
		cy.get('#name').should('be.visible').should('contain','Name')
		cy.get('#orders').should('be.visible').should('contain','Orders')
		cy.get('#customers').should('be.visible').should('contain','Customers')
		if(Cypress.env('automation')) {
			cy.get('#revenue').should('be.visible').should('contain','Revenue').should('contain', Shop.getFormattedCurrency())
		} else 
			cy.get('#revenue > .head-data')
				.should('be.visible').should('contain','Revenue').should('contain', Shop.getFormattedCurrency())
		cy.get('#margin').should('be.visible').should('contain','Margin').should('contain', Shop.getFormattedCurrency())
	// check table content appears	
		if(Cypress.env('automation')) {
			cy.get('#row_1').should('be.visible').should('contain','Burberry')
			cy.get('#row_1 > :nth-child(2)').should('be.visible').should('contain','17')
			cy.get('#row_1 > :nth-child(3)').should('be.visible').should('contain','17')
			cy.get('#row_1 > :nth-child(4)').should('be.visible').should('contain','262,175.08')
			cy.get('#row_1 > :nth-child(5)').should('be.visible').should('contain','243,420.29')
		// test filters and sorting
			cy.get(':nth-child(1) > .input-group > .form-control').type('bu*{enter}')
			cy.get('#row_1')
				.should('be.visible').should('contain','Burberry')
		// click ASC/DESC -> Desc
			cy.get('#name').click()
			cy.wait(1000)
			cy.get('#row_1')
				.should('be.visible').should('contain','Bulgari')
			cy.get('#row_2')
				.should('be.visible').should('contain','Burberry')
		// click ASC/DESC -> Asc
			cy.get('#name').click()
			cy.wait(1000)
			cy.get('#row_1')
				.should('be.visible').should('contain','Burberry')
			cy.get('#row_2')
				.should('be.visible').should('contain','Bulgari')	
		}
	// check pages text
		cy.get('#responsive-datatable_previous').should('be.visible').should('contain','Previous')
		cy.get('.active > .page-link').should('be.visible').should('contain','1')
		cy.get('#responsive-datatable_next > .page-link').should('be.visible').should('contain','Next')
	})
})