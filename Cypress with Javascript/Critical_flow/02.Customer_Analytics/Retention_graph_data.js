import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Retention', function()
{
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

	it('Calendar', function() {
		User.Goto('Retention')
	})

	it('Correct Graph Name', function() {
	// Average Retention Rate
		cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart')
			.should('contain','Average Retention Rate').should('be.visible')
	// Retention Curve
		cy.get('#chart-retention_curve-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart')
			.should('contain','Retention Curve').should('be.visible')
	// Chances to Place Next Order
		cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart')
			.should('contain','Chances to Place Next Order').should('be.visible')
	// Customer Distribution
		cy.get('#chart-customer_distribution-aggregated-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('contain','Customer Distribution').should('be.visible')
	})

	it('Check Graph Appears', function() {
	// Average Retention Rate
		cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-container > .main-view')
			.should('be.visible')
	// Retention Curve
		cy.get('#chart-retention_curve-aggregated-line > .card > .overlay-tuts-steps > .chart-container > .main-view')
			.should('be.visible')
	// Chances to Place Next Order
		cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .overlay-tuts-steps > .chart-container > .main-view')
			.should('be.visible')
	// Customer Distribution
		cy.get('#chart-customer_distribution-aggregated-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
	})

	it('Check Graph Tooltip', function() {
		cy.viewport(1300, 3000)
	// Average Retention Rate
		cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click()
		cy.tooltip('timeline')
	// Retention Curve
		cy.get('#chart-retention_curve-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click()
		cy.tooltip('aggregated')
	// Chances to Place Next Order
		cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click()
		cy.tooltip('aggregated')
	// Customer Distribution
		cy.get('#chart-customer_distribution-aggregated-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click()
		cy.tooltip('aggregated')
	})
})