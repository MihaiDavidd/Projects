import { Reveal_User } from '/support/classes/User'
import { Reveal_Calendar } from '/support/classes/Calendar'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Calendar = {}
let Shop = {}

describe('CLV', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Shop = new Reveal_Shop(data[shopId])
			Calendar = new Reveal_Calendar()
		})
	})

    it('Data', function() {
        User.Goto('Customer Lifetime Value')
        Calendar.open()
        Calendar.selectLastYear()
    // Check metrics for Predictive and Revenue 
        if(Cypress.env('automation')) {
            cy.get('#chart-customer_lifetime_value_predictive-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .panel-title')
                .should('be.visible').should('contain','Predictive CLV').should('contain', Shop.getFormattedCurrency())
            cy.get('#chart-customer_lifetime_value_predictive-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value')
                .should('be.visible').should('contain','3.50K')
            cy.get('#chart-customer_lifetime_value_historical-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .panel-title')
                .should('be.visible').should('contain','Revenue per Customer').should('contain', Shop.getFormattedCurrency())
            cy.get('#chart-customer_lifetime_value_historical-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value')
                .should('be.visible').should('contain','7.63K')
        }
        else         
            cy.get('#chart-customer_lifetime_value_predictive-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .panel-title')
                .should('be.visible').should('contain','CLV').should('contain', Shop.getFormattedCurrency())
            cy.get('#chart-customer_lifetime_value_historical-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .panel-title')
                .should('be.visible').should('contain','Revenue per Customer').should('contain', Shop.getFormattedCurrency())
    })

    it('Check Graph Name', function() {
    // Revenue Per Customer
        cy.get('#chart-customer_lifetime_value_historical-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').should('contain','Revenue per Customer')
    // Revenue per Customer by RFM Group
        cy.get('#chart-customer_lifetime_value_historical_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').should('contain','Revenue per Customer by RFM Group')
    // Revenue per Customer by RFM Group
        cy.get('#chart-customer_lifetime_value_historical_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').should('contain','Revenue per Customer by RFM Group')
    // CLV by RFM Groups
        cy.get('#chart-clv_by_rfm_groups-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').should('contain','CLV by RFM Groups')
    })

    it('Check Graph Appears', function() {
    // Revenue Per Customer
        cy.get('#chart-customer_lifetime_value_historical-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // Revenue per Customer by RFM Group    
        cy.get('#chart-customer_lifetime_value_historical_by_rfm-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // Revenue per Customer by RFM Group
        cy.get('#chart-customer_lifetime_value_historical_by_rfm-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    // CLV by RFM Groups
        cy.get('#chart-clv_by_rfm_groups-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
    })
})