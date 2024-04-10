import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Dashboard', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
            let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

    it('Calendar', function() {
        User.Goto('Main')
    // check main Discover button
        cy.viewport(1300, 3500)
        cy.get('#discover').click()
        cy.get('.collapse-text-title').contains('What can reveal do for your business?').should('be.visible')
        cy.get('#btn-expand-less').click()
    // check options button on graph
        cy.get('.chart-settings-button > .rv-integrations').click({force:true})
        cy.get('#chart-revenue_margin_by_rfm-aggregated-bar > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
            .should('contain','Set your Revenue vs. Margin by RFM Group view').should('be.visible')
        cy.get('#chart-revenue_margin_by_rfm-aggregated-bar > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .btn').click({force:true})
    })

    it('All Discover Buttons', function() {
        cy.viewport(1300, 3500)
    // Revenue vs Margin by Customer Type
        cy.get('#chart-revenue_margin_by_customer_type-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-revenue_margin_by_customer_type-aggregated-bar > .modal-dialog > .modal-content > div')
            .should('contain','This card shows the calculation of the revenue and margins distributed between your first time customers versus your frequently buying customers. This can help you realize which type of customer is more valuable to your business.').should('be.visible')
        // this command will press ESC on keyboard
        cy.closeDiscovery()
    // Average retention Rate 
        cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-average_retention_rate-timeline-line > .modal-dialog > .modal-content > div')
            .should('contain','The retention rate measures what percentage of your customers are retained during a given period of time. This card calculates the percentage of customers with more than 1 order out of your total customer base based on your selected timeline.').should('be.visible')
        cy.closeDiscovery()
    // Chances to Place Next Order
        cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-chances_to_place_next_order-aggregated-line > .modal-dialog > .modal-content > div')
            .should('contain','This card shows the potential for a customer to place another order according to your historical data.').should('be.visible')
        cy.closeDiscovery()
    // NPS Score
        cy.get('#chart-nps_score-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-nps_score-timeline-line > .modal-dialog > .modal-content > div')
            .should('contain','The Net Promoter Score (NPS), measures customer experience and predicts business growth. This metric provides the core measurement for customer experience management.This card shows you how likely it is that your customers would recommend you to a friend or colleague based on your selected timeline.').should('be.visible')
        cy.closeDiscovery()
    // Retention Curve 
        cy.get('#chart-retention_curve-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-retention_curve-aggregated-line > .modal-dialog > .modal-content > div')
            .should('contain','This card shows you how many of your customers from your customer base have placed their second order. It will show you how many of them placed a third order as well.').should('be.visible')
        cy.closeDiscovery()
    // Revenue vs. Margin by RFM Group
        cy.get('#chart-revenue_margin_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-revenue_margin_by_rfm-aggregated-bar > .modal-dialog > .modal-content > div')
            .should('contain','This card shows you how the revenue and margin are distributed between customer segments. This calculation will show you which customer segments are more valuable to your business.').should('be.visible')
        cy.closeDiscovery()
    // RFM Segmentation
        cy.get('#chart-revenue_margin_by_rfm-aggregated-table > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .btn > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-revenue_margin_by_rfm-aggregated-table > .modal-dialog > .modal-content > div')
            .should('contain','RFM Segmentation stands for recency, frequency, monetary value. It is used to create customer segments based on buying behaviors.').should('be.visible')
        cy.closeDiscovery()
    })

    it('All Zoom Buttons', function() {
        cy.viewport(1300, 4000)
    // Average retention Rate 
        cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force:true})
        cy.wait(500)
        cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Average Retention Rate').should('be.visible')
        cy.closeZoom()
        cy.wait(500)
    // Chances to Place Next Order
        cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force:true})
        cy.wait(500)
        cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Chances to Place Next Order').should('be.visible')
        cy.closeZoom()
        cy.wait(500)
    // NPS Score
        cy.get('#chart-nps_score-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force:true})
        cy.wait(500)
        cy.get('#chart-nps_score-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','NPS Score').should('be.visible')
        cy.closeZoom()
        cy.wait(500)
    // Retention Curve 
        cy.get('#chart-retention_curve-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force:true})
        cy.wait(500)
        cy.get('#chart-retention_curve-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Retention Curve').should('be.visible')
        cy.closeZoom()
        cy.wait(500)
    // Revenue vs. Margin by RFM Group
        cy.get('#chart-revenue_margin_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force:true})
        cy.wait(500)
        cy.get('#chart-revenue_margin_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Revenue vs. Margin by RFM Group').should('be.visible')
        cy.closeZoom()
    })

    it('All Tips Buttons', function() {
        cy.viewport(1300, 3500)
    // Average Retention Rate
        cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click({force:true})
        cy.get('#chart-average_retention_rate-timeline-line > .card > .tuts-steps > .m-t-0 > b')
            .should('contain','See what to do next').should('be.visible')
        cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click({force:true})    
        cy.wait(500)
    // Chances to Place Next Order
        cy.get("div[class='card-box overlay-tuts-steps'] i[class='rv-tips rv-icon']").click()
        cy.wait(500)
        cy.get('#chart-average_retention_rate-timeline-line > .card > .tuts-steps > ul')
            .should('be.visible').should('contain','Run surveys on the customers from the abandoning RFM groups to understand why they are not returning')
        cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click()
        cy.wait(500)
    // NPS Score
        cy.get('#chart-nps_score-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click()
        cy.get('#chart-nps_score-timeline-line > .card > .tuts-steps')
            .should('contain','Come up with a strategy to get amplified by promoters through personalized experiences').should('be.visible')
        cy.get('#chart-nps_score-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click()
        cy.wait(500)
    // Retention Curve 
        cy.get('#chart-retention_curve-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click()
        cy.get('#chart-retention_curve-aggregated-line > .card > .tuts-steps')
            .should('contain','It looks like the main drop is from 1 to 2 orders. Survey the first time customers and find out the main reasons why they drop').should('be.visible')
        cy.get('#chart-retention_curve-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click()
    })
})