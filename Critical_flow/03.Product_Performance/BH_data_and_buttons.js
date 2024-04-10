import { Reveal_User } from '/support/classes/User'
import { Reveal_Calendar } from '/support/classes/Calendar'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Calendar = {}
let Shop = {}

describe('Product Performance', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Shop = new Reveal_Shop(data[shopId])
			Calendar = new Reveal_Calendar()
		})
	})

    it('Buying Habits', function() {
        User.Goto('Buying Habits') 
    // Discover 
        cy.get('#discover').click()
        cy.get('.collapse-text-title').should('contain','What can reveal do for your business?')
            .should('be.visible')
        cy.get('#btn-expand-less').click()
    // Check Title
        cy.get('.page-title').should('be.visible').should('contain','Buying Habits')
    })

    it('Top Products', function() {
        cy.viewport(1300,1600)
        Calendar.open()
        Calendar.selectLastYear()
    // Check text
        cy.get('#chart-top_products_by_rfm-aggregated-table_omines')
            .should('be.visible').should('contain','Top Products by RFM Groups')
        cy.get('#chart-buying_trends_by_purchases-aggregated-table_omines > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('contain','Buying trends by purchased product').should('be.visible')
    // RFM Group
        cy.get('form > .row > .col-lg-2 > .required')
            .should('be.visible').should('contain','RFM Group')
        if(Cypress.env('shopId') === 'auchan') {
            cy.get('#buying_habits_products_rfm_group_id').select('Lovers')
            cy.get('#buying_habits_products_rfm_group_id').should('be.visible').should('contain','Lovers') 
        } else {
            cy.get('#buying_habits_products_rfm_group_id').select('Don Juan')
            cy.get('#buying_habits_products_rfm_group_id').should('be.visible').should('contain','Don Juan') 
        }
    // Apply button
        cy.get('#buying_habits_products_submit')
            .should('be.visible').should('contain','Apply').click()
    // Check table headers 
        cy.get('#buying_habits_products_dt_product_eid').should('be.visible').should('contain','Product Eid')
        cy.get('#buying_habits_products_dt_sku').should('be.visible').should('contain','Sku')
        cy.get('#buying_habits_products_dt_name').should('be.visible').should('contain','Name')
        cy.get('#buying_habits_products_dt_brand_name').should('be.visible').should('contain','Brand Name')
        cy.get('#buying_habits_products_dt_orders_count').should('be.visible').should('contain','Orders')
        cy.get('#buying_habits_products_dt_customers_count').should('be.visible').should('contain','Customers')
        cy.get('#buying_habits_products_dt_margin').should('be.visible').should('contain','Margin').should('contain', Shop.getFormattedCurrency())
        cy.get('#buying_habits_products_dt_revenue').should('contain','Revenue').should('contain', Shop.getFormattedCurrency())
        cy.get('#buying_habits_products_dt_pcs').should('be.visible').should('contain','Pcs')
    // check table content appears
        if(Cypress.env('automation')) {
            cy.get('#buying_habits_products_dt_row_1').should('be.visible').should('contain','50195')
            cy.get('#buying_habits_products_dt_row_1 > :nth-child(2)').should('be.visible').should('contain','SKU_50195')
            cy.get('#buying_habits_products_dt_row_1 > :nth-child(3)').should('be.visible').should('contain','Intelligent Rubber Chair')
            cy.get('#buying_habits_products_dt_row_1 > :nth-child(4)').should('be.visible').should('contain','Louis Vuitton')
            cy.get('#buying_habits_products_dt_row_1 > :nth-child(5)').should('be.visible').should('contain','1.00')
            cy.get('#buying_habits_products_dt_row_1 > :nth-child(6)').should('be.visible').should('contain','1.00')
            cy.get('#buying_habits_products_dt_row_1 > :nth-child(7)').should('be.visible').should('contain','2.0K')
            cy.get('#buying_habits_products_dt_row_1 > :nth-child(8)').should('be.visible').should('contain','1.7K')
            cy.get('#buying_habits_products_dt_row_1 > :nth-child(9)').should('be.visible').should('contain','4.00') 
        } 
    })

    it('Buying Trends ', function() { 
        cy.viewport(2000,2000)
    // Check title and tooltip
        cy.get('#chart-buying_trends_by_purchases-aggregated-table_omines > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').should('contain','Buying trends by purchased product')
        cy.get('#chart-top_products_by_rfm-aggregated-table_omines > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click()
        cy.tooltip('aggregated')
    // Show customer metrics - interval 1 Jan - 1 Dec 2022
        cy.get(':nth-child(1) > .col-lg-12 > .row > .col-md-4 > label')
            .should('be.visible').should('contain','Show the customers metrics in')
        cy.get('#buying_habits_trends_time_interval').click()
        cy.get('.open > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .flatpickr-monthDropdown-months')
            .select('0')
        cy.get('.open > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .numInputWrapper > .numInput')
            .type('2022')
        cy.get('[aria-label="January 1, 2022"]').click({force:true})
        cy.get('.open > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .flatpickr-monthDropdown-months')
            .select('11')
        cy.get('.open > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > [aria-label="December 1, 2022"]').click({force:true})
    // For customers who had a specific
        cy.get('.col-lg-2.col-md-4 > .required')
            .should('be.visible').should('contain','for customers who had a specific')
        cy.get('#buying_habits_trends_specific_type').select('Category')
        cy.get('#buying_habits_trends_purchase_type').select('Any purchase')
    // In the following time interval 1 Feb - 1 June 2023
        cy.get('.col-lg-auto.col-md-4 > .required')
            .should('be.visible').should('contain','in the following time interval')
        cy.get('#buying_habits_trends_purchase_time').click()
        cy.get('.open > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .flatpickr-monthDropdown-months')
            .select('1')
        cy.get('.open > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > [aria-label="February 1, 2023"]').click()
        cy.get('.open > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .flatpickr-monthDropdown-months')
            .select('5')
        cy.get('.open > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > [aria-label="June 1, 2023"]').click()
    // Apply button
        cy.get('#buying_habits_trends_submit').should('be.visible').should('contain','Apply').click()
    // Table headers appear 
        cy.get('#buying_habits_trends_dt_eid').should('be.visible').should('contain','Eid')
        cy.get('#buying_habits_trends_dt_name').should('be.visible').should('contain','Name')
        cy.get('#buying_habits_trends_dt_customers_count').should('be.visible').should('contain','Customers')
        cy.get('#buying_habits_trends_dt_clv').should('be.visible').should('contain','CLV')
        cy.get('#buying_habits_trends_dt_orders_count').should('be.visible').should('contain','Orders')
        cy.get('#buying_habits_products_dt_margin').should('be.visible').should('contain','Margin').should('contain', Shop.getFormattedCurrency())
        cy.get('#buying_habits_products_dt_revenue').should('contain','Revenue').should('contain', Shop.getFormattedCurrency())
        cy.get('#buying_habits_trends_dt_aov').should('be.visible').should('contain','AOV')
    //Check table content appears
        if(Cypress.env('automation')) {
            cy.get('#buying_habits_trends_dt_row_1 > :nth-child(1)').should('be.visible').should('contain','6')  
            cy.get('#buying_habits_trends_dt_row_1 > :nth-child(2)').should('be.visible').should('contain','Party Tshirts')   
            cy.get('#buying_habits_trends_dt_row_1 > :nth-child(3)').should('be.visible').should('contain','9.00')
            cy.get('#buying_habits_trends_dt_row_1 > :nth-child(4)').should('be.vsible').should('contain','5.7K')
            cy.get('#buying_habits_trends_dt_row_1 > :nth-child(5)').should('be.visible').should('contain','9.00')
            cy.get('#buying_habits_trends_dt_row_1 > :nth-child(6)').should('be.visible').should('contain','56.0K')
            cy.get('#buying_habits_trends_dt_row_1 > :nth-child(7)').should('be.visible').should('contain','49.7K')
            cy.get('#buying_habits_trends_dt_row_1 > :nth-child(8)').should('ibe.visible').should('contain','5.1K')
            cy.get('#buying_habits_trends_dt_row_1 > :nth-child(9)').should('be.visible').should('contain','N/A')
        }
    })
})