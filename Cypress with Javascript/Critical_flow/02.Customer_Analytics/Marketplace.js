import { Reveal_User } from '/support/classes/User'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Shop = {}

describe('Customer Analytics', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Shop = new Reveal_Shop(data[shopId])
		})
	})

    it('CRM Marketplace', function() {
        if(Shop.isMarketplace()) {
            User.Goto('CRM Marketplace')
            cy.viewport(1800,3000)
        // Check title
            cy.get('.page-title')
                .should('be.visible').should('contain','Customers List')
        // Check category
        if(Cypress.env('shopId') === 'auchan') {
            cy.get('.dropdown.vendor-filter > .btn')
                .should('be.visible').should('contain','Vendors')
        } else {
            cy.get('.dropdown.department-filter > .btn')
                .should('be.visible').should('contain','Departments')
            cy.get('.dropdown.channel-filter > .btn')
                .should('be.visible').should('contain','Channels')
        }
        // Check Apply button
            cy.get('.card > :nth-child(2) > div > .btn')
                .should('be.visible').should('contain','Apply')
        if (Cypress.env('shopId') !== 'auchan'){
        // Check Export button
            cy.get('.dt-toolbar-top-r > .btn')
                .should('be.visible').should('contain','Export')
        }
        // Check entries and select 10 
            cy.get('#responsive-datatable_length > label')
                .should('be.visible').should('contain','Show')
            cy.get('label > .dropdown > .btn').click()
            if(Cypress.env('shopId') === 'auchan') {
                cy.get('#bs-select-3-0').click()
            } else     
                cy.get('#bs-select-7-0').click()
            cy.get('#responsive-datatable_info')
                .should('be.visible').should('contain','Showing 1 to 10')
        }        
    })

    it('Table', function(){
        if(Shop.isMarketplace()) {
            cy.viewport(1500,1500)
        // Check table headers
            cy.get('#email').should('be.visible').should('contain','Email')
            cy.get('#name').should('be.visible').should('contain','Name')
            cy.get('#customer_eid').should('be.visible').should('contain','Customer External Id')
            cy.get('#rfm_score').should('be.visible').should('contain','Current RFM Score')
            cy.get('#rfm_group').should('be.visible').should('contain','Current RFM Group')
            cy.get('#date_registered').should('be.visible').should('contain','Registration date')
        // check table content appears  
            if(Cypress.env('automation')) {
                cy.get('#row_1').should('be.visible').should('contain','ionut.anghel_11@omniconvert.com')
                cy.get('#row_1 > :nth-child(2)').should('be.visible').should('contain','Sarah Connor')
                cy.get('#row_1 > :nth-child(3)').should('be.visible').should('contain','5585039294529')
                cy.get('#row_1 > :nth-child(4)').should('be.visible').should('contain','314')
                cy.get('#row_1 > :nth-child(5)').should('be.visible').should('contain','Platonic friend')
                cy.get('#row_1 > :nth-child(6)').should('be.visible').should('contain','2022-03-28')
            // test filters and sorting
                cy.get(':nth-child(1) > .input-group > .form-control').type('ionut*{enter}')
                cy.get('#row_1 > :nth-child(2)').should('be.visible').should('contain','Mona Doe')
            // click ASC/DESC -> Desc
                cy.get('#name').click()
                cy.get('#row_1 > :nth-child(2)').should('be.visible').should('contain','John Connor')
                cy.get('#row_5 > :nth-child(2)').should('be.visible').should('contain','T 1000')
            // click ASC/DESC -> Asc
                cy.get('#name').click()
                cy.get('#row_1 > :nth-child(2)').should('be.visible').should('contain','T 1000')
                cy.get('#row_5 > :nth-child(2)').should('be.visible').should('contain','John Connor')
            }
        }
    })
})