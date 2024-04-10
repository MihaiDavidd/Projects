import { Reveal_User } from '/support/classes/User'
import { Reveal_Calendar } from '/support/classes/Calendar'

let User = {}
let Calendar = {}

describe('Customer Experience', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Calendar = new Reveal_Calendar()
		})
	})

    it('Customer Experience See all', function() {
        User.Goto('Customer Experience')
    // click see all responses
        cy.get('[data-additional="post"] > .btn > span').click()
    })
    if(Cypress.env('shopId') === 'auchan') {
        it('NPS Responses List', function() {
        // check title 
            cy.get('.page-title').should('be.visible').should('contain','NPS Post Delivery Responses List')
        // check text 
            cy.get('.card > .text-center').should('be.visible').should('contain','No data available')
        })
    } else {
        it('NPS Responses List', function() {
        // check title 
            cy.get('.page-title')
                .should('be.visible').should('contain','NPS Post Delivery Responses List')
        // Show entries and select 10
            cy.get('#responsive-datatable_length > label')
                .should('be.visible').should('contain','Show')
            cy.get('label > .dropdown > .btn').click()
            cy.get("ul.dropdown-menu.inner.show")
                .contains("span.text", "10")
                .click()
        // Export button
            cy.get('.dt-toolbar-top-r > .btn')
                .should('be.visible')
            cy.get('.btn > span')
                .should('be.visible').should('contain','Export')
            cy.get('.rv-download-fill')
                .should('be.visible')
        })

        it('Check table', function(){
            Calendar.open()
            Calendar.selectLastYear()
            cy.viewport(2000,1800)
        // check table headers 
            cy.get('#nps_score').should('be.visible').should('contain','NPS Score')
            cy.get('#customer_email').should('be.visible').should('contain','Customer Email')
            cy.get('#rfm_score').should('be.visible').should('contain','Rfm Score')
            cy.get('#rfm_group_name').should('be.visible').should('contain','Rfm Group Name')
            cy.get('#vendor_name').should('be.visible').should('contain','Vendor Name')
            cy.get('#responded_at').should('be.visible').should('contain','Responded')
        // check table content appears
            if(Cypress.env('automation')) {
                cy.get('#row_1').should('be.visible').should('contain','10')
                cy.get('#row_1 > :nth-child(2)').should('be.visible').should('contain','ionut.anghel_15@omniconvert.com')
                cy.get('#row_1 > :nth-child(3)').should('be.visible').should('contain','514')
                cy.get('#row_1 > :nth-child(4)').should('be.visible').should('contain','New passion')
                cy.get('#row_1 > :nth-child(6)').should('be.visible').should('contain','2022-09-21 14:32:16')
            }
        // check pages text
            cy.get('#responsive-datatable_previous').should('be.visible').should('contain','Previous')
            cy.get('.active > .page-link').should('be.visible').should('contain','1')
            cy.get('#responsive-datatable_next > .page-link').should('be.visible').should('contain','Next')
        })

        it('Check Customer details', function() {
            if(Cypress.env('automation')) {
            // Click on a customer email to see more details
                cy.get('.all > a').click({force:true})
                cy.get('.content-top-bar-title > .page-title')
                    .should('be.visible').should('contain','Customer Details')
            // table with customer details appear
                cy.get('.content-top-bar-title > .page-title')
                    .should('be.visible')
            // transaction stats appear
                cy.get('.stats-container > .card > .table-responsive > :nth-child(1)')
                    .should('be.visible').should('contain','Transactions stats')
            // number of orders appear
                cy.get(':nth-child(2) > tbody > :nth-child(1) > .text-right')
                    .should('have.text' , '1')
            }
            else {
                cy.get('#row_1 > .all > a').click({force:true})
            // Check title     
                cy.get('.content-top-bar-title > .page-title')
                    .should('be.visible').should('contain','Customer Details')
            // table with customer details appear
                cy.get('.content-top-bar-title > .page-title')
                    .should('be.visible')
            // transaction stats appear
                cy.get('.stats-container > .card > .table-responsive > :nth-child(1)')
                    .should('be.visible').should('contain','Transactions stats')
            }
        })
    }
})