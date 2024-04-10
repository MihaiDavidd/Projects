import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Segmentation', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

    it('Graph Data', function() {
        User.Goto('Segmentation')
    })

    it('Correct Graph Name', function() {
        cy.viewport(1300, 3000)
    // RFM Segmentation 
        cy.get('#chart-revenue_margin_by_rfm-aggregated-table > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','RFM Segmentation').should('be.visible')
    // Revenue vs. Margin by RFM Group
        cy.get('#chart-revenue_margin_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Revenue vs. Margin by RFM Group').should('be.visible')
    // NPS per RFM Group 
        cy.get('#chart-nps_score_per_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','NPS per RFM Group').should('be.visible')
    // NPS per RFM Group
        cy.get('#chart-nps_score_per_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','NPS per RFM Group').should('be.visible')
    // Order Count by RFM Group
        cy.get('#chart-order_count_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Order Count by RFM Group').should('be.visible')
    // Order Count by RFM Group
        cy.get('#chart-order_count_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Order Count by RFM Group').should('be.visible')
    // Margin by RFM Group
        cy.get('#chart-margin_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Margin by RFM Group').should('be.visible')
    // Margin by RFM Group
        cy.get('#chart-margin_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Margin by RFM Group').should('be.visible')
    // Customer Count by RFM Group
        cy.get('#chart-customer_count_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Customer Count by RFM Group').should('be.visible')
    // Customer Count by RFM Group
        cy.get('#chart-customer_count_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Customer Count by RFM Group').should('be.visible')
    // Revenue by RFM Group
        cy.get('#chart-revenue_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Revenue by RFM Group').should('be.visible')
    // Revenue by RFM Group
        cy.get('#chart-revenue_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Revenue by RFM Group').should('be.visible')
    // Order Return Split by RFM Group
        cy.get('#chart-return_split_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Order Return Split by RFM Group').should('be.visible')
    })

    it('Check Graph Appears', function() {
        cy.viewport(1300, 3000)
    // Revenue vs. Margin by RFM Group
        cy.get('#chart-revenue_margin_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // NPS per RFM Group 
        cy.get('#chart-nps_score_per_rfm-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // NPS per RFM Group
        cy.get('#chart-nps_score_per_rfm-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // Order Count by RFM Group
        cy.get('#chart-order_count_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // Order Count by RFM Group
        cy.get('#chart-order_count_by_rfm-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')   
    // Margin by RFM Group
        cy.get('#chart-margin_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // Margin by RFM Group
        cy.get('#chart-margin_by_rfm-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // Customer Count by RFM Group
        cy.get('#chart-customer_count_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // Customer Count by RFM Group
        cy.get('#chart-customer_count_by_rfm-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // Revenue by RFM Group
        cy.get('#chart-revenue_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // Revenue by RFM Group
        cy.get('#chart-revenue_by_rfm-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // Order Return Split by RFM Group
        cy.get('#chart-return_split_by_rfm-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    })

    it('Check Graph Tooltip', function() {
        cy.viewport(1300, 3000)
    // RFM Segmentation 
        cy.get('#chart-revenue_margin_by_rfm-aggregated-table > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('aggregated')
    // Revenue vs. Margin by RFM Group
        cy.get('#chart-revenue_margin_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('aggregated')
    // NPS per RFM Group 
        cy.get('#chart-nps_score_per_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('aggregated')
    // NPS per RFM Group
        cy.get('#chart-nps_score_per_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('timeline')
    // Order Count by RFM Group
        cy.get('#chart-order_count_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('aggregated')
    // Order Count by RFM Group
        cy.get('#chart-order_count_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('timeline')
    // Margin by RFM Group
        cy.get('#chart-margin_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('aggregated')
    // Margin by RFM Group
        cy.get('#chart-margin_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('timeline')
    // Customer Count by RFM Group
        cy.get('#chart-customer_count_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('aggregated')
    // Customer Count by RFM Group
        cy.get('#chart-customer_count_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('timeline')
    // Revenue by RFM Group
        cy.get('#chart-revenue_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('aggregated')
    // Revenue by RFM Group
        cy.get('#chart-revenue_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('timeline')
    // Order Return Split by RFM Group
        cy.get('#chart-return_split_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('timeline')
        cy.wait(500) 
    })
})