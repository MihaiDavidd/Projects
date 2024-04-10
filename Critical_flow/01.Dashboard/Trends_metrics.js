import { Reveal_User } from '/support/classes/User'

let User = {}
let shopId 

describe('Trends Overview', function(){
	before(function() {
		cy.fixture('credentials').then(function(data) {
			shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

    it('Metrics', function() {
        User.Goto('Trends Overview')
    // Select interval [01.01.2022 - 31.12.2022]
        cy.get(':nth-child(1) > .filter-item-container > .calendar-selection-box-filters > .input-daterange-datepicker').click()
        cy.get('.arrowTop > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .flatpickr-monthDropdown-months')
            .select('January')
        cy.get('.open > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .numInputWrapper > .numInput')
            .type('2022')
        cy.get('[aria-label="January 1, 2022"]').click()
        cy.get('.open > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .numInputWrapper > .numInput')
            .type('2022')
        cy.get('.arrowTop > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .flatpickr-monthDropdown-months')
            .select('December')
        cy.get('.arrowTop > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > [aria-label="December 31, 2022"]').click()
    // Compare period
        cy.get(':nth-child(2) > .dropdown > .btn').click()
        if(Cypress.env('automation')) {
            cy.get('#bs-select-4-1 > .text').click()
        }
        else 
            cy.get('#bs-select-1-1 > .text').click({force: true})
            cy.get(':nth-child(5) > .btn').click()
    })

    it('Performance Metrics', function() {
        cy.wait(500)
    // Check title appears 
        cy.get(':nth-child(2) > :nth-child(1) > .card > .mb-4 > .mt-1')
            .should('contain','Performance Metrics').should('be.visible')  
    // Revenue
        cy.get(':nth-child(2) > :nth-child(1) > .card > .row > :nth-child(1) > .metric-name')
            .should('be.visible').should('contain','Revenue')
        cy.get('#top_revenue')
            .should('be.visible').should('not.have.text','N/A')
        if(Cypress.env('automation')) {
            cy.get('#top_revenue')
                .should('contain','137.64')
        }
    // Margin
        cy.get(':nth-child(2) > :nth-child(1) > .card > .row > :nth-child(2) > .metric-name')
            .should('contain','Margin').should('be.visible')
        cy.get('#top_margin')
            .should('be.visible').should('not.have.text','N/A')
        if(Cypress.env('automation')) {
            cy.get('#top_margin')
                .should('contain','104')
        }
    // Orders
        cy.get(':nth-child(2) > :nth-child(1) > .card > .row > :nth-child(3) > .metric-name')
            .should('contain','Orders').should('be.visible')
        cy.get('#top_orders')
            .should('be.visible').should('not.have.text','N/A')
        if(Cypress.env('automation')) {
            cy.get('#top_orders')
                .should('contain','30')
        }
    // Customers
        cy.get(':nth-child(2) > :nth-child(1) > .card > .row > :nth-child(4) > .metric-name')
            .should('contain','Customers').should('be.visible')
        cy.get('#top_customers')
            .should('be.visible').should('not.have.text','N/A')
        if(Cypress.env('automation')) {
            cy.get('#top_customers')
                .should('contain','30')
        }
    })

    it('Order Metrics', function() {
    // Check title appears 
        cy.get(':nth-child(2) > :nth-child(2) > .card > .mb-4 > .mt-1')
            .contains('Order Metrics').should('be.visible')
    // AOV
        cy.get(':nth-child(2) > :nth-child(2) > .card > .row > :nth-child(1) > .metric-name')
            .should('contain','AOV').should('be.visible')
        cy.get('#order_aov')
            .should('be.visible').should('not.have.text','N/A')
        if(Cypress.env('automation')) {
            cy.get('#order_aov').should('contain','4.59')
        }
    // Avg.margin per order
        cy.get(':nth-child(2) > :nth-child(2) > .card > .row > :nth-child(2) > .metric-name')
            .should('contain','Avg. margin per order').should('be.visible')
        cy.get('#order_margin')
            .should('be.visible').should('not.have.text','N/A')
        if(Cypress.env('automation')) {
            cy.get('#order_margin')
                .should('contain','3.47')
        }
    // Avg. number of products per order
        cy.get(':nth-child(2) > :nth-child(2) > .card > .row > :nth-child(3) > .metric-name')
            .should('contain','Avg. number of products per order').should('be.visible')
        cy.get('#order_avg_ol_per_order')
            .should('be.visible').should('not.have.text','N/A')
        if(Cypress.env('automation')) {
            cy.get('#order_avg_ol_per_order')
                .should('contain','18.57')
        }
    // Avg. days between orders
        cy.get(':nth-child(2) > :nth-child(2) > .card > .row > :nth-child(4) > .metric-name')
            .should('contain','Avg. days between orders').should('be.visible')
        cy.get('#order_adbt')
            .should('be.visible').should('not.have.text','N/A')
        if(Cypress.env('automation')) {
            cy.get('#order_adbt')
                .should('contain','0.00')
        }
    })

    it('Customer Metrics', function() {
    // Check title appears 
        cy.get(':nth-child(3) > :nth-child(1) > .card > .mb-4 > .mt-1')
            .should('contain','Customer Metrics').should('be.visible')
    // New customers
        cy.get(':nth-child(3) > :nth-child(1) > .card > :nth-child(2) > :nth-child(1) > .metric-name')
            .should('contain','New customers').should('be.visible')
        cy.get('#customer_new')
            .should('be.visible').should('not.have.text','N/A')
        if(Cypress.env('automation')) {
            cy.get('#customer_new')
                .should('contain','29')
        }
    // Returning customers
        cy.get(':nth-child(3) > :nth-child(1) > .card > :nth-child(2) > :nth-child(2) > .metric-name')
            .should('contain','Returning customers').should('be.visible')
        cy.get('#customer_returning')
            .should('be.visible').should('not.have.text','N/A')
        if(Cypress.env('automation')) {
            cy.get('#customer_returning')
                .should('contain','1')
        }
    // Revenue per customer
        cy.get(':nth-child(3) > :nth-child(1) > .card > :nth-child(2) > :nth-child(3) > .metric-name')
            .should('contain','Revenue per Customer').should('be.visible')
        cy.get('#customer_historical_clv')
            .should('be.visible').should('not.have.text','N/A')
        if(Cypress.env('automation')) {
            cy.get('#customer_historical_clv')
                .should('contain','7.63')
        }
    // CLV
        cy.get(':nth-child(3) > :nth-child(1) > .card > :nth-child(2) > :nth-child(4) > .metric-name')
            .should('contain','CLV').should('be.visible')
        cy.get('#customer_clv')
            .should('be.visible').should('not.have.text','N/A')
        if(Cypress.env('automation')) {
            cy.get('#customer_clv')
                .should('contain','3.50')
        }
    // NPS pre  
        cy.get(':nth-child(3) > :nth-child(3) > .metric-name')
            .should('contain','Net promoter score Pre').should('be.visible')
        if(shopId !== 'auchan'){
            cy.get('#customer_net_promoter_score_pre')
                .should('be.visible').should('not.have.text','N/A')
        }
        if(Cypress.env('automation')) {
            cy.get('#customer_net_promoter_score_pre')
                .should('contain','100')
        }
    // NPS post
        cy.get(':nth-child(3) > :nth-child(4) > .metric-name')
            .should('be.visible').should('contain','Net promoter score Post')
        if(shopId !== 'auchan'){
            cy.get('#customer_net_promoter_score_post')
                .should('be.visible').should('not.have.text','N/A')
        }
        if(Cypress.env('automation')) {
            cy.get('#customer_net_promoter_score_post')
                .should('contain','100')
        }
    })

    it('Product Insights', function() {
    // Check title appears
        cy.get(':nth-child(3) > :nth-child(2) > .card > .mb-4 > .mt-1')
            .should('contain','Product Insights').should('be.visible')
    })
})