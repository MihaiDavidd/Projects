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
	})

	it('Check table', function(){
		cy.viewport(1600,3000)
		Calendar.open()
		Calendar.selectLastYear()
	// Check Table Headers
		cy.get('#name').should('be.visible').should('contain','Name')
		cy.get('#orders').should('be.visible').should('contain','Orders')
		cy.get('#customers').should('be.visible').should('contain','Customers')
		if(Cypress.env('automation')) {
			cy.get('#revenue').should('be.visible').should('contain','Revenue').should('contain', Shop.getFormattedCurrency())
		}
		else 
			cy.get('#revenue > .head-data')
				.should('be.visible').should('contain','Revenue').should('contain', Shop.getFormattedCurrency())
		cy.get('#margin').should('be.visible').should('contain','Margin').should('contain', Shop.getFormattedCurrency())
	// check table content appears  
		if(Cypress.env('automation')) {
			cy.get('#row_1').should('be.visible').should('contain','Other Producers')
			cy.get('#row_1 > :nth-child(2)').should('be.visible').should('contain','11')
			cy.get('#row_1 > :nth-child(3)').should('be.visible').should('contain','11')
			cy.get('#row_1 > :nth-child(4)').should('be.visible').should('contain','5,033.91')
			cy.get('#row_1 > :nth-child(5)').should('be.visible').should('contain','3,859.70')
		}
	})
})