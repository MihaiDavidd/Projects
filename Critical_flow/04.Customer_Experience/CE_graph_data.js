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
        User.Goto('Customer Experience')
    })

    it('Correct Graph Name', function() {
        cy.viewport(1300, 3000)
    // NPS per RFM Group
        cy.get('#chart-nps_score_per_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').should('contain','NPS per RFM Group')
    // NPS per RFM Group
        cy.get('#chart-nps_score_per_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').should('contain','NPS per RFM Group')
    // NPS per Order Attribute
        cy.get('#chart-nps_score_per_order_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').should('contain','NPS per Order Attribute')
    // NPS per Order Attribute
        cy.get('#chart-nps_score_per_order_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').should('contain','NPS per Order Attribute')
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').should('contain','NPS per Customer Attribute')
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').should('contain','NPS per Customer Attribute')
    // NPS per Category
        cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').should('contain','NPS per Category')
    // NPS per Category
        cy.get('#chart-nps_score_per_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').should('contain','NPS per Category')
    // NPS per Brand
        cy.get('#chart-nps_score_per_brand-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').should('contain','NPS per Brand')
    // NPS per Brand
        cy.get('#chart-nps_score_per_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').should('contain','NPS per Brand')
    })

    it('Check Graph Appears', function() {
        cy.viewport(1300, 3000)
    // NPS per RFM Group
        cy.get('#chart-nps_score_per_rfm-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // NPS per RFM Group
        cy.get('#chart-nps_score_per_rfm-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // NPS per Order Attribute
        cy.get('#chart-nps_score_per_order_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // NPS per Order Attribute
        cy.get('#chart-nps_score_per_order_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // NPS per Category
    cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
        .should('be.visible')
    // NPS per Category
        cy.get('#chart-nps_score_per_category-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // NPS per Brand
        cy.get('#chart-nps_score_per_brand-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // NPS per Brand
        cy.get('#chart-nps_score_per_brand-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    })

    it('Check Graph Tooltip', function() {
        cy.viewport(1300, 3000)
    // NPS per RFM Group
        cy.get('#chart-nps_score_per_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('aggregated')
    // NPS per RFM Group
        cy.get('#chart-nps_score_per_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('timeline')
    // NPS per Order Attribute
        cy.get('#chart-nps_score_per_order_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('aggregated')
    // NPS per Order Attribute
        cy.get('#chart-nps_score_per_order_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('timeline')
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('aggregated')
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('timeline')
    // NPS per Category
        cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('aggregated')
    // NPS per Category
        cy.get('#chart-nps_score_per_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('timeline')
    // NPS per Brand
        cy.get('#chart-nps_score_per_brand-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('aggregated')
    // NPS per Brand
        cy.get('#chart-nps_score_per_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.tooltip('timeline')
    })
})