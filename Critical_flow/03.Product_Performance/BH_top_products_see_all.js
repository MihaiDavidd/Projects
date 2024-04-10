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
        cy.viewport(1600,3200) 
        Calendar.open()
        Calendar.selectLastYear()
    // Click on See all 
        cy.get('#chart-top_products_by_rfm-aggregated-table_omines > .card > :nth-child(1) > .chart-bar-top > .card-actions > .btn-medium-secondary').click()
    })

    it('Products by RFM Group', function() {   
    // Check title 
        cy.get('.page-title')
            .should('be.visible').should('contain','Products by RFM Group')
    // Show entries 10
        cy.get('#responsive-datatable_length > label')
            .should('be.visible').should('contain','Show')
        cy.get('label > .dropdown > .btn').click()
        cy.get("ul.dropdown-menu.inner.show")
            .contains("span.text", "10")
            .click()
    // column visibility
        cy.get('.dt-buttons > .btn').click()
        cy.get('[data-cv-idx="0"]').click()
        cy.get('[data-cv-idx="0"]').click()
        cy.get('.dt-button-background').click()
    // export button 
        if (Cypress.env("shopId") !== 'auchan') {
            cy.get('.dt-toolbar-top-r > .btn')
                .should('be.visible').should('contain','Export')
        }
    })

    it('Check table', function(){
        cy.viewport(2000,3000)
    // check table headers 
        cy.get('#product_eid').should('be.visible').should('contain','Product Eid')
        cy.get('#sku').should('be.visible').should('contain','Sku')
        cy.get('#name').should('be.visible').should('contain','Name')
        cy.get('#brand_name').should('be.visible').should('contain','Brand Name')
        cy.get('#rfm_group_name').should('be.visible').should('contain','Rfm Group Name')
        cy.get('#orders').should('be.visible').should('contain','Orders')
        cy.get('#customers').should('be.visible').should('contain','Customers')
        if (Cypress.env('automation') === true) {
            cy.get('#revenue').should('be.visible').should('contain','Revenue')
        } else 
            cy.get('#revenue > .head-data')
                .should('be.visible').should('contain','Revenue').should('contain', Shop.getFormattedCurrency())
        cy.get('#margin').should('be.visible').should('contain','Margin').should('contain', Shop.getFormattedCurrency())
        cy.get('#pcs').should('be.visible').should('contain','Pcs')
    // check table content appears  
        if (Cypress.env('automation') === true) {
            cy.get('#row_1').should('be.visible').should('contain','871')
            cy.get('#row_1 > :nth-child(2)').should('be.visible').should('contain','SKU_871')
            cy.get('#row_1 > :nth-child(3)').should('be.visible').should('contain','Gorgeous Steel Table')
            cy.get('#row_1 > :nth-child(4)').should('be.visible').should('contain','Burberry')
            cy.get('#row_1 > :nth-child(5)').should('be.visible').should('contain','About to dump you')
            cy.get('#row_1 > :nth-child(6)').should('be.visible').should('contain','2')
            cy.get('#row_1 > :nth-child(7)').should('be.visible').should('contain','2')
            cy.get('#row_1 > :nth-child(8)').should('be.visible').should('contain','46,545.68')
            cy.get('#row_1 > :nth-child(9)').should('be.visible').should('contain','43,276.13')
            cy.get('#row_1 > :nth-child(10)').should('be.visible').should('contain','120')    
        // test filters and sorting
            cy.get(':nth-child(1) > .input-group > .form-control').type('1*{enter}')
            cy.get('#row_1').should('be.visible').should('contain','153')
        // click ASC/DESC -> Desc
            cy.get('#product_eid').click()
            cy.get('#row_1').should('be.visible').should('contain','1065')
            cy.get('#row_2').should('be.visible').should('contain','153')
        // click ASC/DESC -> Asc
            cy.get('#product_eid').click()
            cy.get('#row_1').should('be.visible').should('contain','153')
            cy.get('#row_2').should('be.visible').should('contain','1065')
        }
    // check pages text
        cy.get('#responsive-datatable_previous').should('be.visible').should('contain','Previous')
        cy.get('.active > .page-link').should('be.visible').should('contain','1')
        cy.get('#responsive-datatable_next > .page-link').should('be.visible').should('contain','Next')
    })
})