import { Reveal_User } from '/support/classes/User'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Shop = {}

describe('Product Performance', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Shop = new Reveal_Shop(data[shopId])
		})
	})

    it('Buying Habits', function() {
        User.Goto('Buying Habits')
    // Click on See all Trends by Purchased products 
        cy.get('#chart-buying_trends_by_purchases-aggregated-table_omines > .card > :nth-child(1) > .chart-bar-top > .card-actions > .btn-medium-secondary').click()
    }) 

    it('Buying Trends', function() {
    // title appears 
        cy.get('.page-title').should('contain','Buying trends by purchased product').should('be.visible')
    // Show the customer metrics [2021]
        cy.get(':nth-child(1) > .col-lg-12 > .row > .col-md-4 > label').should('be.visible')
        cy.get('#buying_habits_trends_time_interval').click({force:true})
        cy.get('.open > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .flatpickr-monthDropdown-months')
            .select('0')
        cy.get('.arrowTop > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .numInputWrapper > .numInput')
            .type('2022')
        cy.get('[aria-label="January 1, 2022"]').click({force:true})
        cy.get('.open > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .flatpickr-monthDropdown-months')
            .select('11')
        cy.get('.open > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > [aria-label="December 31, 2022"]').click({force:true})
    // For customers who had a specific
        cy.get('#buying_habits_trends_specific_type').select('Category')
        cy.get('#buying_habits_trends_purchase_type').select('Any purchase')
        cy.get('#buying_habits_trends_submit').click({force:true})
    // Export csv file
        cy.get('.dt-buttons > .btn')
            .should('be.visible').should('contain','Export CSV')
    // In the following time interval 
        cy.get('.col-lg-auto.col-md-4 > .required') 
            .should('be.visible').should('contain', 'in the following time interval')
        cy.get('#buying_habits_trends_purchase_time').click()
        cy.get('.open > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .numInputWrapper > .arrowDown').click()
        cy.get('.open > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .flatpickr-monthDropdown-months').select('0')
        cy.get('[aria-label="January 3, 2022"]').click({force:true})
        cy.get('[aria-label="January 4, 2022"]').click({force:true})
    // Check Apply button
        cy.get('#buying_habits_trends_submit')
            .should('be.visible').should('contain','Apply')
    // Show entries
        cy.get('#buying_habits_trends_length > label')
            .should('be.visible').should('contain','Show')
        cy.get('.custom-select').select('10')
        if(Cypress.env('automation') === true) {
            cy.get('#buying_habits_trends_info')
                .should('be.visible').should('contain','Showing 1 to 1 of 1 entries')
        }
    })

    it('Check table', function(){
        cy.viewport(2000,1800)
    // check table headers 
        cy.get('#buying_habits_trends-dt_eid').should('be.visible').should('contain','Eid')
        cy.get('#buying_habits_trends-dt_name').should('be.visible').should('contain','Name')
        cy.get('#buying_habits_trends-dt_customers_count').should('be.visible').should('contain','Customers')
        cy.get('#buying_habits_trends-dt_clv').should('be.visible').should('contain','CLV')
        cy.get('#buying_habits_trends-dt_orders_count').should('be.visible').should('contain','Orders')
        cy.get('#buying_habits_trends-dt_revenue').should('be.visible').should('contain','Revenue').should('contain', Shop.getFormattedCurrency())
        cy.get('#buying_habits_trends-dt_margin').should('be.visible').should('contain','Margin').should('contain', Shop.getFormattedCurrency())
        cy.get('#buying_habits_trends-dt_aov').should('be.visible').should('contain','AOV')
        cy.get('#buying_habits_trends-dt_chances_to_place_second_order').should('be.visible').should('contain','Chance to place 2nd order')
    // check table content appears  
        if(Cypress.env('automation')) {
            cy.get('#buying_habits_trends-dt_row_1 > :nth-child(1)').should('be.visible').should('contain','66')
            cy.get('#buying_habits_trends-dt_row_1 > :nth-child(2)').should('be.visible').should('contain','Brown Suits')
            cy.get('#buying_habits_trends-dt_row_1 > :nth-child(3)').should('be.visible').should('contain','1.00')
            cy.get('#buying_habits_trends-dt_row_1 > :nth-child(4)').should('be.visible').should('contain','13.81')
            cy.get('#buying_habits_trends-dt_row_1 > :nth-child(5)').should('be.visible').should('contain','1.00')
            cy.get('#buying_habits_trends-dt_row_1 > :nth-child(6)').should('be.visible').should('contain','37.35')
            cy.get('#buying_habits_trends-dt_row_1 > :nth-child(7)').should('be.visible').should('contain','13.69')
            cy.get('#buying_habits_trends-dt_row_1 > :nth-child(8)').should('be.visible').should('contain','37.35')
            cy.get('#buying_habits_trends-dt_row_1 > :nth-child(9)').should('be.visible').should('contain','N/A')
        }
    // check pages text
        cy.get('#buying_habits_trends_previous').should('be.visible').should('contain','Previous')
        cy.get('#buying_habits_trends_next > .page-link').should('be.visible').should('contain','Next')
        if(Cypress.env('shopId') === 'auchan') {
            cy.get('.active > .page-link').should('be.visible').should('contain','1')
        }
    })
})