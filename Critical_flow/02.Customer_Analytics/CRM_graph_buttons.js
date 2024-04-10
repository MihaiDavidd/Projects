import { Reveal_User } from '/support/classes/User'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Shop = {}

describe('CRM', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
            Shop = new Reveal_Shop(data[shopId])
		})
	})

    it('Graph Buttons', function() {
        User.Goto('CRM')
    })

    it('Check Discover Button', function() {
        cy.viewport(1300, 2800)
    // Top Customers
        cy.get('#chart-top_customers-aggregated-table > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click()
        cy.get('.video-tutorial-chart-top_customers-aggregated-table > .modal-dialog > .modal-content > div').should('be.visible')
            .should('contain','This card shows you who are your top customers based on the revenue, margin and the number of orders they have placed')
        cy.closeDiscovery()
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click()
        cy.get('.video-tutorial-chart-nps_score_per_customer_custom_attribute-aggregated-bar > .modal-dialog > .modal-content > div')
            .should('be.visible').should('contain','This card shows you the NPS score of the customer attribute that you have chosen and defined previously in your database')
        cy.closeDiscovery()
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click()
        cy.get('.video-tutorial-chart-nps_score_per_customer_custom_attribute-timeline-line > .modal-dialog > .modal-content > div')
            .should('be.visible').should('contain','This card shows you the NPS score of the customer attribute that you have chosen and defined previously in your database, based on your timeline selection')
        cy.closeDiscovery()
    // Retention Curve
        cy.get('.overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click()
        cy.get('.video-tutorial-chart-retention_curve-aggregated-line > .modal-dialog > .modal-content > div')
            .should('be.visible').should('contain','This card shows you how many of your customers from your customer base have placed their second order. It will show you how many of them placed a third order as well')
        cy.closeDiscovery()
    // Order Return Split by Customer Type
        cy.get('#chart-return_split_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click()
        if (Shop.isStage()) {
            cy.get('.video-tutorial-chart-return_split_by_customer_type-timeline-bar > .modal-dialog > .modal-content > div')
                .should('be.visible').should('contain','This card shows the distribution of orders containing returned items, between first time customers and repeat customers, in the time interval you selected.')
        } else {
            cy.get('.video-tutorial-chart-return_split_by_customer_type-timeline-bar > .modal-dialog > .modal-content > div')
                .should('be.visible').should('contain','This card shows the distribution of orders placed in the selected time interval, containing returned items, between first time customers and repeat customers, in the same time interval.')
        }
        cy.closeDiscovery()
    // Revenue vs. Margin by Customer Type
        cy.get('#chart-revenue_margin_by_customer_type-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click()
        cy.get('.video-tutorial-chart-revenue_margin_by_customer_type-aggregated-bar > .modal-dialog > .modal-content > div')
            .should('be.visible').should('contain','This card shows the calculation of the revenue and margins distributed between your first time customers versus your frequently buying customers. This can help you realize which type of customer is more valuable to your business.')
        cy.closeDiscovery()
        cy.wait(1000)
        cy.get('#chart-top_customers-aggregated-table > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').click()
    })

    it('Check Options Button', function() {
        cy.viewport(1300, 3000)
    // Top Customers
        cy.get('#chart-top_customers-aggregated-table > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations').click({force:true})
        cy.get('#chart-top_customers-aggregated-table > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
            .should('be.visible')
        cy.get('#chart-top_customers-aggregated-table > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .btn').click({force:true})
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations').click({force:true})
        cy.get('#chart-nps_score_per_customer_custom_attribute-aggregated-bar > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
            .should('be.visible')
        cy.get('#chart-nps_score_per_customer_custom_attribute-aggregated-bar > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .btn').click({force:true})  
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations').click({force:true})
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
            .should('be.visible')
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .btn').click({force:true})
    })

    it('Check Tips Button', function() {
        cy.viewport(1300, 3000)
    // Retention Curve
        cy.get('.rv-tips').click({force:true})
        cy.get('#chart-retention_curve-aggregated-line > .card > .tuts-steps > .m-t-0 > b')
            .should('be.visible').should('contain','See what to do next')
        cy.get('#chart-retention_curve-aggregated-line > .card > .tuts-steps > ul')
            .should('contain','It looks like the main drop is from 1 to 2 orders. Survey the first time customers and find out the main reasons why they drop')
        cy.get('.rv-tips').click({force:true})
    })

    it('Check Tooltips', function() {
        cy.viewport(1300, 3000)
    // Top Customers
        cy.get('#chart-top_customers-aggregated-table > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('aggregated')
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('aggregated')
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('timeline')
    // Retention Curve
        cy.get('.overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('aggregated')
    // Order Return Split by Customer Type
        cy.get('#chart-return_split_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('timeline')
    // Revenue vs. Margin by Customer Type
        cy.get('#chart-revenue_margin_by_customer_type-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('aggregated')
        cy.wait(1000)
    })

    it('Check Zoom Button', function() {
        cy.viewport(1300, 3000)
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force: true})
        cy.get('#chart-nps_score_per_customer_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible')
        cy.closeZoom()
        cy.wait(1000)
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force: true})
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible')
        cy.closeZoom()
        cy.wait(1000)
    // Retention Curve
        cy.get('.overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force: true})
        cy.get('.overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart').should('be.visible')
        cy.closeZoom()
        cy.wait(1000)
    // Order Return Split by Customer Type
        cy.get('#chart-return_split_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force: true})
        cy.get('#chart-return_split_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible')
        cy.closeZoom()
        cy.wait(1000)
    // Revenue vs. Margin by Customer Type
        cy.wait(1000)
        cy.get('#chart-revenue_margin_by_customer_type-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force: true})
        cy.get('#chart-revenue_margin_by_customer_type-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible')
        cy.closeZoom()
        cy.wait(1000)
    })
})