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

	it('Catalog Performance', function() {
		User.Goto('Catalog Performance')
		Calendar.open()
		Calendar.selectLastYear()
		cy.viewport(1800,1800)
	// Check tooltips 
		// Purchase Frequency
		if(Cypress.env('automation')) {
			cy.get('#purchase_frequency > .rv-btn-info').click()
		} else
			cy.get('div > table > thead > tr > th:nth-child(9) > .rv-btn-info').click()
		cy.get('.tooltip-inner')
			.should('be.visible').should('contain','This column displays the percentage of orders including each product out of the total number of orders, in the selected time frame.')
			.should('be.visible').should('contain','This column displays the percentage of orders including each product out of the total number of orders, in the selected time frame.')
		// Share Of Revenue 
		cy.get('div > table > thead > tr > th:nth-child(10) > .rv-btn-info').click()
		cy.get('.tooltip-inner')
			.should('be.visible').should('contain','This column displays the percentage of revenue generated by each product out of the total revenue, in the selected time frame.')
			.should('be.visible').should('contain','This column displays the percentage of revenue generated by each product out of the total revenue, in the selected time frame.')
	})

	it('Check table', function(){
		cy.viewport(1800,1800)
	// Check Table Headers
		cy.get('#product_eid').should('be.visible').should('contain','Product Eid')
		cy.get('#sku').should('be.visible').should('contain','Sku')
		cy.get('#name').should('be.visible').should('contain','Name')
		cy.get('#brand_name').should('be.visible').should('contain','Brand Name')
		cy.get('#orders').should('be.visible').should('contain','Orders')
		cy.get('#customers').should('be.visible').should('contain','Customers')
		if(Cypress.env('automation')) {
			cy.get('#revenue').should('be.visible').should('contain','Revenue').should('contain', Shop.getFormattedCurrency())
		}
		else {
			cy.get('#revenue > .head-data')
				.should('be.visible').should('contain','Revenue').should('contain', Shop.getFormattedCurrency())
		}
		cy.get('#margin').should('be.visible').should('contain','Margin').should('contain', Shop.getFormattedCurrency())
		cy.get('#purchase_frequency').should('be.visible').should('contain','Purchase Frequency')
		cy.get('#share_of_revenue').should('be.visible').should('contain','Share Of Revenue')
	// check table content appears  
		if(Cypress.env('automation')) {
			cy.get('#row_1').should('be.visible').should('contain','6773889368129')
			cy.get('#row_1 > :nth-child(2)').should('be.visible')
			cy.get('#row_1 > :nth-child(3)').should('be.visible').should('contain','Bicicleta eliptica')
			cy.get('#row_1 > :nth-child(4)').should('be.visible').should('contain','automation_omni')
			cy.get('#row_1 > :nth-child(5)').should('be.visible').should('contain','4')
			cy.get('#row_1 > :nth-child(6)').should('be.visible').should('contain','4')
			cy.get('#row_1 > :nth-child(7)').should('be.visible').should('contain','9,793')
			cy.get('#row_1 > :nth-child(8)').should('be.visible').should('contain','0.00')
			cy.get('#row_1 > :nth-child(9)').should('be.visible').should('contain','13.333%')
			cy.get('#row_1 > :nth-child(10)').should('be.visible').should('contain','7.115%')
		}		
	})
})