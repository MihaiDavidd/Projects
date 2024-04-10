import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Dashboard', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

    it('Graph Data', function() {
        User.Goto('Main')
    // check correct graph name
        cy.get('#chart-revenue_margin_by_customer_type-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .contains('Revenue vs. Margin by Customer Type')
    // check graph appears 
        cy.get('#chart-revenue_margin_by_customer_type-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // check graph tooltip 
        cy.get('#chart-revenue_margin_by_customer_type-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click()
        cy.get('.tooltip-inner').contains('aggregated')
    })

    it('Correct Graph Name', function() {
        cy.viewport(1300, 2200)
    // Average retention Rate 
        cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart')
            .contains('Average Retention Rate').should('be.visible')
    // Chances to Place Next Order
        cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Chances to Place Next Order').should('be.visible')
    // NPS Score
        cy.get('#chart-nps_score-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','NPS Score').should('be.visible')
    // Retention Curve 
        cy.get('#chart-retention_curve-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Retention Curve').should('be.visible')  
    // Revenue vs. Margin by RFM Group
        cy.get('#chart-revenue_margin_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Revenue vs. Margin by RFM Group').should('be.visible')  
    // RFM Segmentation
        cy.get('#chart-revenue_margin_by_rfm-aggregated-table > .effect-shadow-level1 > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','RFM Segmentation').should('be.visible')      
    })

    it('Check Graph Appears', function() {
        cy.viewport(1300, 2200)
    // Average retention Rate 
        cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-container > .main-view').should('be.visible')
    // Chances to Place Next Order
        cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .overlay-tuts-steps > .chart-container > .main-view')
            .should('be.visible')
    // NPS Score
        cy.get('#chart-nps_score-timeline-line > .card > .overlay-tuts-steps > .chart-container > .main-view')
            .should('be.visible')
    // Retention Curve 
        cy.get('#chart-retention_curve-aggregated-line > .card > .overlay-tuts-steps > .chart-container > .main-view')
            .should('be.visible')
    // Revenue vs. Margin by RFM Group
        cy.get('#chart-revenue_margin_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')  
    })

    it('Check Graph Tooltip', function() {
        cy.viewport(1300, 2200)
    // Average retention Rate 
        cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click()
        cy.tooltip('timeline')    
    // Chances to Place Next Order
        cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click()
        cy.tooltip('aggregated')
    // NPS Score
        cy.get('#chart-nps_score-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click()
        cy.tooltip('timeline')
    // Retention Curve 
        cy.get('#chart-retention_curve-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click()
        cy.tooltip('aggregated')
    // Revenue vs. Margin by RFM Group
        cy.get('#chart-revenue_margin_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click()
        cy.tooltip('aggregated')
    // RFM Segmentation
        cy.get('#chart-revenue_margin_by_rfm-aggregated-table > .effect-shadow-level1 > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click()
        cy.tooltip('aggregated')
        cy.wait(1000)    
    })
})