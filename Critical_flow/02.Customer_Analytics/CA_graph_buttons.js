import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Cohort Analysis', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

	it('Calendar', function() {
		User.Goto('Cohort Analysis')
	})

	it('Table dropdown selector', function() {
		cy.viewport(1500,3100)
	// Cohorts by First Purchase Moment Table
	// Check Revenue appears
		cy.get('.col-xl-4 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner')
			.should('be.visible').should('have.text', 'Revenue')
	// Select Margin
		cy.get('.col-xl-4 > .dropdown > .btn').click()
		cy.get('.dropdown-item').find('.text').eq(1).click()
		cy.get('.col-xl-4 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner')
			.should('be.visible').should('have.text', 'Margin')
	// Select Order Count
		cy.get('.col-xl-4 > .dropdown > .btn').click()
		cy.get('.dropdown-item').find('.text').eq(2).click()
		cy.get('.col-xl-4 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner')
			.should('be.visible').should('have.text', 'Order Count')
	// Select Customer Count
		cy.get('.col-xl-4 > .dropdown > .btn').click()
		cy.get('.dropdown-item').find('.text').eq(3).click()
		cy.get('.col-xl-4 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner')
			.should('be.visible').should('have.text', 'Customer Count')
	// Cohorts by First Purchase Moment Graph
	// Check Revenue appears
		cy.get('.col-xl-3 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner')
			.should('be.visible').should('contain','Revenue')
	// Select Margin
		cy.get('.card').find('.dropdown').eq(2).click()
		cy.get('.dropdown-item').find('.text').eq(5).click()
		cy.get('.col-xl-3 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner')
			.should('be.visible').should('contain','Margin')
	// Select Order Count
		cy.get('.card').find('.dropdown').eq(2).click()
		cy.get('.dropdown-item').find('.text').eq(6).click()
		cy.get('.col-xl-3 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner')
			.should('be.visible').should('contain','Order Count')
	// Select Customer Count
		cy.get('.card').find('.dropdown').eq(2).click()	
		cy.get('.dropdown-item').find('.text').eq(7).click()
		cy.get('.col-xl-3 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner')
			.should('be.visible').should('contain','Customer Count')
	//2nd Month Cohort Stickiness Rate
	// Select Margin
		cy.get('.card').find('.dropdown').eq(3).click()
		cy.get('.dropdown-item').find('.text').eq(9).click()
		cy.get('.col-xl-3 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner')
			.should('be.visible').should('contain','Margin')
	// Select Order Count
		cy.get('.card').find('.dropdown').eq(3).click()
		cy.get('.dropdown-item').find('.text').eq(10).click()
		cy.get('.col-xl-3 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner')
			.should('be.visible').should('contain','Order Count')
	// Select Customer Count
		cy.get('.card').find('.dropdown').eq(3).click()	
		cy.get('.dropdown-item').find('.text').eq(11).click()
		cy.get('.col-xl-3 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner')
			.should('be.visible').should('contain','Customer Count')
	})

	it('Table buttons', function() {
		cy.viewport(1400,3100)
	// Graphic Evolution 
		cy.get('.my-auto').should('be.visible').should('contain','Graphic Evolution')
		cy.get('.switchery').click()
		cy.wait(1000)
		cy.get('.switchery').click()
	// Select Percent 
		cy.get('.btn-group > .btn-light').should('be.visible').click()
		if(Cypress.env('automation')) {
			cy.get(':nth-child(3) > .orders-revenue-data.percent').should('contain','0.00')
		}
	// Select Amount 
		cy.get('.btn-group > .btn-light').should('be.visible').click()
		if(Cypress.env('automation')) {
			cy.get(':nth-child(3) > .orders-revenue-data.amount').should('contain','0')
		}
	})	

	it('Tooltip button', function() {
		cy.viewport(1300,3000)
	// 2nd Month Cohort Stickiness Rate
		cy.get('.rv-btn-info').click()
		cy.get('.tooltip-inner').should('be.visible')
			.should('contain','Stickiness rate is a metric that measures the effectiveness of your acquisition campaigns. The percentage indicates how many people that you acquired in the previous month have purchased again in the next month.')
	})
})