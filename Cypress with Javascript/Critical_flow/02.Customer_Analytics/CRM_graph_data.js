import { Reveal_User } from '/support/classes/User'

let User = {}

describe('CRM', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

    it('Graph Data', function() {
        User.Goto('CRM')
    })

    it('Check Graph Name', function() {
    // Top Customers
        cy.viewport(1300, 1900)
        cy.get('#chart-top_customers-aggregated-table > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').contains('Top Customers')
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').contains('NPS per Customer Attribute')
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').contains('NPS per Customer Attribute')
    // Retention Curve
        cy.get('.overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').contains('Retention Curve')
    // Order Return Split by Customer Type
        cy.get('#chart-return_split_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').contains('Order Return Split by Customer Type')
    // Revenue vs. Margin by Customer Type
        cy.get('#chart-revenue_margin_by_customer_type-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').contains('Revenue vs. Margin by Customer Type')
        cy.wait(500)
    })

    it('Check Graph Appears', function() {
        cy.viewport(1300, 1900)
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // Retention Curve
        cy.get('.overlay-tuts-steps > .chart-container > .main-view')
            .should('be.visible')
    // Order Return Split by Customer Type
        cy.get('#chart-return_split_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // Revenue vs. Margin by Customer Type
        cy.get('#chart-revenue_margin_by_customer_type-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
        cy.wait(500)
    })
})