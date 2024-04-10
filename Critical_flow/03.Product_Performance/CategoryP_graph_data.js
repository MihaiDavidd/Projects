import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Product Performance', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

	it('Category Performance', function() {
		User.Goto('Category Performance')
		cy.viewport(1300,2000)
	})

	it('Check graph name ', function() {
		cy.viewport(1300,2000)
	// Top Categories
		cy.get('#chart-top_categories-aggregated-table > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Top Categories')
	// NPS per Category aggregated
		cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','NPS per Category')
	// NPS per Category timeline
		cy.get('#chart-nps_score_per_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','NPS per Category')
	// Order Return Rate by Category aggregated
		cy.get('#chart-return_rate_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Rate by Category')
	// Order Return Count by Category
		cy.get('#chart-return_count_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Count by Category')
	// Order Return Split by Category timeline
		cy.get('#chart-return_split_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Split by Category')
	})

	it('Check graph appears', function() {
		cy.viewport(1300,2000)
	// Top Categories
		cy.get('#chart-top_categories-aggregated-table > .card > :nth-child(1) > .chart-container')
			.should('be.visible')
	// NPS per Category aggregated
		cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
	// NPS per Category timeline
		cy.get('#chart-nps_score_per_category-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
	// Order Return Rate by Category timeline 
		cy.get('#chart-return_rate_by_category-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
	// Order Return Count by Category timeline
		cy.get('#chart-return_count_by_category-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
	// Order Return Split by Category timeline
		cy.get('#chart-return_split_by_category-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
	})
})