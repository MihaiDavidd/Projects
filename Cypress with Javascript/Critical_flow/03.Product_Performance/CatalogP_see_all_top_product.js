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

    it('Catalog Performance', function() {
        User.Goto('Catalog Performance')
        cy.viewport(1300,3500)
        Calendar.open()
        if(Cypress.env('automation')) {
            Calendar.selectAllTime()
            cy.wait(5000)
        } else {
            Calendar.selectLastYear()
        }
    // Click see all 
        cy.get('.card-actions > .btn-medium-secondary').click()
    })

    it('Products List', function() {
    // Check title 
        cy.get('.page-title')
            .should('be.visible').should('contain','Products List')
    // Show entries and select 10
        cy.get('#responsive-datatable_length > label')
            .should('be.visible').should('contain','Show')
        cy.get('label > .dropdown > .btn').click()
        cy.get("ul.dropdown-menu.inner.show")
            .contains("span.text", "10")
            .click()
    // Check export button
        if(Cypress.env("shopId") !== 'auchan'){
        cy.get('.dt-toolbar-top-r > .btn')
            .should('be.visible').should('contain','Export')
        }
    })

    it('Check table', function(){
        cy.viewport(2200,1800) 
    // check table headers 
        cy.get('#product_eid').should('be.visible').should('contain','Product Eid')
        cy.get('#sku').should('be.visible').should('contain','Sku')
        cy.get('#name').should('be.visible').should('contain','Name')
        cy.get('#brand_name').should('be.visible').should('contain','Brand Name')
        cy.get('#orders').should('be.visible').should('contain','Orders')
        cy.get('#customers').should('be.visible').should('contain','Customers')
        if(Cypress.env('automation')) {
            cy.get('#revenue').should('be.visible').should('contain','Revenue').should('contain', Shop.getFormattedCurrency())
        }
        else {
            cy.get('#revenue > .head-data')
                .should('be.visible').should('contain','Revenue').should('contain', Shop.getFormattedCurrency())
        }
        cy.get('#margin').should('be.visible').should('contain','Margin').should('contain', Shop.getFormattedCurrency())
        cy.get('#purchase_frequency').should('be.visible').should('contain','Purchase Frequency')
        cy.get('#share_of_revenue').should('be.visible').should('contain','Share')
    // check table content appears   
        if(Cypress.env('automation')) {
            cy.get('#row_5').should('be.visible').should('contain','871')
            cy.get('#row_5 > :nth-child(2)').should('be.visible').should('contain','SKU_871')
            cy.get('#row_5 > :nth-child(3)').should('be.visible').should('contain','Gorgeous Steel Table')
            cy.get('#row_5 > :nth-child(4)').should('be.visible').should('contain','Burberry')
            cy.get('#row_5 > :nth-child(5)').should('be.visible').should('contain','4')
            cy.get('#row_5 > :nth-child(6)').should('be.visible').should('contain','4')
            cy.get('#row_5 > :nth-child(7)').should('be.visible').should('contain','46,633.88')
            cy.get('#row_5 > :nth-child(8)').should('be.visible').should('contain','43,332.42')
            cy.get('#row_5 > :nth-child(9)').should('be.visible').should('contain','2.649%')    
            cy.get('#row_5 > :nth-child(10)').should('be.visible').should('contain','4.131%')  
        // test filters and sorting
            cy.get(':nth-child(1) > .input-group > .form-control').type('8*{enter}')
            cy.get('#row_1').should('be.visible').should('contain','871')
        // click ASC/DESC -> Desc
            cy.get('#product_eid').click()
            cy.wait(1000)
            cy.get('#row_1').should('be.visible').should('contain','813')
            cy.get('#row_2').should('be.visible').should('contain','847')
        // click ASC/DESC -> Asc
            cy.get('#product_eid').click()
            cy.wait(1000)
            cy.get('#row_1').should('be.visible').should('contain','884')
            cy.get('#row_2').should('be.visible').should('contain','874')
        }
    // check pages text
        cy.get('#responsive-datatable_previous').should('be.visible').should('contain','Previous')
        cy.get('.active > .page-link').should('be.visible').should('contain','1')
        cy.get('#responsive-datatable_next > .page-link').should('be.visible').should('contain','Next')
    })
})