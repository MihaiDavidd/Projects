import { Reveal_User } from '/support/classes/User'
import { Reveal_Calendar } from '/support/classes/Calendar'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Shop = {}
let Calendar = {}

describe('Dashboard', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Shop = new Reveal_Shop(data[shopId])
            Calendar = new Reveal_Calendar()
		})
	})

    it('Login', function() {
        User.Goto('Main')
        Calendar.open()
        Calendar.selectLastYear()
    })

    it('Metrics Appear ', function() {
        cy.viewport(1300, 3000)
    // check Revenue + currency and the metrics appear
        cy.get('#chart-revenue-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .panel-title')
            .should('be.visible').should('contain','Revenue').should('contain', Shop.getFormattedCurrency())
        cy.get('#chart-revenue-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value').as('revenue')
        cy.get('@revenue')
            .should('be.visible').should('not.have.text','N/A')
            if(Cypress.env('automation')) {
                cy.get('@revenue')
                    .should('contain','137.64K')
            }
    // check Margin + currency and the metrics appear under it
        cy.get('#chart-margin-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .panel-title')
            .should('be.visible').should('contain','Margin').should('contain', Shop.getFormattedCurrency())
        cy.get('#chart-margin-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value').as('margin')       
        cy.get('@margin')
            .should('be.visible').should('not.have.text','N/A')
            if(Cypress.env('automation')) {
                cy.get('@margin')
                    .should('contain','104.00K')
            }
    // Customers
        cy.get('#chart-customer_count-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .panel-title')
            .should('be.visible').should('contain','Customers')
        cy.get('#chart-customer_count-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value').as('customers')
        cy.get('@customers')
            .should('be.visible').should('not.have.text','N/A')
            if(Cypress.env('automation')) {
                cy.get('@customers')
                    .should('contain','30')
            }
    // Orders
        cy.get('#chart-order_count-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .panel-title')
            .should('be.visible').should('contain','Orders')
        cy.get('#chart-order_count-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value').as('orders')
        cy.get('@orders')
            .should('be.visible').should('not.have.text','N/A')
            if(Cypress.env('automation')) {
                cy.get('@orders')
                    .should('contain','30')
            }
    // Purchase Frequency
        cy.get('#chart-orders_per_customer-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .panel-title')
            .should('be.visible').should('contain','Purchase Frequency')
        cy.get('#chart-orders_per_customer-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value').as('purchasef')
        cy.get('@purchasef')
            .should('be.visible').should('not.have.text','N/A')
            if(Cypress.env('automation')) {
                cy.get('@purchasef')
                    .should('contain','1.00')
            }
    // AOV + currency
        cy.get('#chart-average_order_value-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .panel-title')
            .should('be.visible').should('contain','AOV').should('contain', Shop.getFormattedCurrency())
        cy.get('#chart-average_order_value-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value').as('aov')
        cy.get('@aov')
            .should('be.visible').should('not.have.text','N/A')
            if(Cypress.env('automation')) {
                cy.get('@aov')
                    .should('contain','4.59K')
            }
    // ADBT
        cy.get('#chart-average_days_between_orders-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .panel-title')
            .should('be.visible').should('contain','ADBT')
        cy.get('#chart-average_days_between_orders-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value').as('adbt')
        cy.get('@adbt')
            .should('be.visible').should('not.have.text','N/A')
            if(Cypress.env('automation')) {
                cy.get('@adbt')
                    .should('contain','N/A')
            }
    // (Predictive) CLV + currency
        if(Cypress.env('automation')) {
            cy.get('#chart-customer_lifetime_value_predictive-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .panel-title')
                .should('be.visible').should('contain','Predictive CLV')
        }
        else         
            cy.get('#chart-customer_lifetime_value_predictive-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .panel-title')
                .should('be.visible').should('contain','CLV').should('contain', Shop.getFormattedCurrency())
        cy.get('#chart-customer_lifetime_value_predictive-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value').as('predictive')
        cy.get('@predictive')
            .should('be.visible').should('not.have.text','N/A')
            if(Cypress.env('automation')) {
                cy.get('@predictive')
                    .should('contain','3.50K')
            }
    // NPS
        cy.get('#chart-nps_score_panel-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .panel-title')
            .should('be.visible').should('contain','NPS')
        cy.get('#chart-nps_score_panel-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value').as('nps')
        cy.get('@nps')
            .should('be.visible').should('not.have.text','N/A')
            if(Cypress.env('automation')) {
                cy.get('@nps')
                    .should('contain','100.00')
            }
    })

    it('Metrics Tooltip', function() {
        cy.viewport(1300, 3000)
    // Customers
        cy.get('#chart-customer_count-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .rv-btn-info').click()
        cy.get('.tooltip-inner')
            .should('be.visible').should('contain','Number of active customers in the selected period.')
    // Purchase Frequency
        cy.get('#chart-orders_per_customer-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .rv-btn-info').click()
        cy.get('.tooltip-inner')
            .should('be.visible').should('contain',"Purchase Frequency - it's the ratio between the number of orders and the number of customers.")      
    // AOV[RON]
        cy.get('#chart-average_order_value-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .rv-btn-info').click()
        cy.get('.tooltip-inner')
            .should('be.visible').should('contain','AOV means Average Order Value - Total Revenue / Total number of orders.')
    // ADBT
        cy.get('#chart-average_days_between_orders-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .rv-btn-info').click()
        cy.get('.tooltip-inner')
            .should('be.visible').should('contain','ADBT means Average Days Between Transactions. It shows how many days it took for the returning customers to place their next order after the previous.')
    // Predictive CLV
        cy.get('#chart-customer_lifetime_value_predictive-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .rv-btn-info').click()
        cy.get('.tooltip-inner')
            .should('be.visible').should('contain','The CLV is the predicted sum total of all future margins that a particular customer will generate for your business. It is calculated based on your last 12Mo average margin per order, purchase frequency, and customer retention. It helps you adjust your customer acquisition budget accordingly to stay profitable.')
    // NPS
        cy.get('#chart-nps_score_panel-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-title > .rv-btn-info').click()        
        cy.get('.tooltip-inner')
            .should('be.visible').should('contain','NPS is calculated as the report between the Promoters and the Detractors. It needs to be integrated with Omniconvert Explore.')
        cy.wait(1000)
    })
})