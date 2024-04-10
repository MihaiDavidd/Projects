import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Product Performance', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

	it('Brand Performance', function() {
		User.Goto('Brand Performance')
		cy.viewport(1300,2000)
	})

	it('Check graph name ', function() {
		cy.viewport(1300,2000)
		cy.wait(1000)
	// Top Brands
		cy.get('#chart-top_brands-aggregated-table > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Top Brands')
	// NPS per Brand aggregated
		cy.get('#chart-nps_score_per_brand-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','NPS per Brand')
	// NPS per Brand timeline
		cy.get('#chart-nps_score_per_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','NPS per Brand')
	// Order Return Rate by Brand aggregated
		cy.get('#chart-return_rate_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Rate by Brand')
	// Order Return Count by Brand
		cy.get('#chart-return_count_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Count by Brand')
	// Order Return Split by Brand timeline
		cy.get('#chart-return_split_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Split by Brand')
	})

	it('Check graph appears', function() {
		cy.viewport(1300,2000)
		cy.wait(1000)
	// Top Brands
		cy.get(':nth-child(2) > .col-sm-12')
			.should('be.visible')
	// NPS per Brand aggregated
		cy.get('#chart-nps_score_per_brand-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
	// NPS per Brand timeline
		cy.get('#chart-nps_score_per_brand-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
	// Order Return Rate by Brand 
		cy.get('#chart-return_rate_by_brand-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
	// Order Return Count by Brand
		cy.get('#chart-return_count_by_brand-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
	// Order Return Split by Brand timeline
		cy.get('#chart-return_split_by_brand-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
	})
})