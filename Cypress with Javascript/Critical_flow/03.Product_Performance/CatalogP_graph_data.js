import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Product Performance', function()	{
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

	it('Catalog Performance', function() {
		User.Goto('Catalog Performance')
		cy.viewport(1300,2000)
	// Check graph name 
	// Top Products
		cy.get('#chart-top_products-aggregated-table > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Top Products')
	// Order Return Count by Customer Type
		cy.get('#chart-return_count_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Count by Customer Type')
	// Order Return Rate by Customer Type
		cy.get('#chart-return_rate_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Rate by Customer Type')
	// Order Return Split by Customer Type
		cy.get('#chart-return_split_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Split by Customer Type')
	// Order Return Rate by RFM Group
		cy.get('#chart-return_rate_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Rate by RFM Group')
	// Order Return Count by RFM Group
		cy.get('#chart-return_count_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Count by RFM Group')
	// Order Return Split by RFM Group
		cy.get('#chart-return_split_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Split by RFM Group')
	//Check graph appear
	// Top Products
		cy.get('#chart-top_products-aggregated-table > .card')
			.should('be.visible')
	// Order Return Count by Customer Type
		cy.get('#chart-return_count_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
	// Order Return Rate by Customer Type
		cy.get('#chart-return_rate_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-container > .main-view')	
			.should('be.visible')
		// Order Return Split by Customer Type
		cy.get('#chart-return_split_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
	// Order Return Rate by RFM Group
		cy.get('#chart-return_rate_by_rfm-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
	// Order Return Count by RFM Group
		cy.get('#chart-return_count_by_rfm-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
	// Order Return Split by RFM Group
		cy.get('#chart-return_split_by_rfm-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
	})
})