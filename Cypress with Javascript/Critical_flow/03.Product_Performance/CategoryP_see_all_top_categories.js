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

    it('Category Performance', function() {
        User.Goto('Category Performance')
        cy.viewport(1300,3500)
        if(Cypress.env('automation') === true) {
            Calendar.open()
            Calendar.selectAllTime()
            cy.wait(5000)
        }
    // See all 
        cy.get('.btn-medium-secondary').click()
    })

    it('Categories List', function() {   
    // Check title 
        cy.get('.page-title')
            .should('be.visible').should('contain','Categories List')
    // Show entries
        cy.get('#responsive-datatable_length > label')
            .should('be.visible').should('contain','Show')
        cy.get('label > .dropdown > .btn').click()
        cy.get("ul.dropdown-menu.inner.show")
            .contains("span.text", "10")
            .click()
        if(Cypress.env("shopId") !== 'auchan'){
    // export button 
        cy.get('.dt-toolbar-top-r > .btn')
            .should('be.visible').should('contain','Export')
        }
    })

    it('Check table', function(){
        cy.viewport(2000,1800)
    // check table headers 
        cy.get('#category_eid').should('be.visible').should('contain','Category Eid')
        cy.get('#name').should('be.visible').should('contain','Name')
        cy.get('#level').should('be.visible').should('contain','Level')
        cy.get('#orders').should('be.visible').should('contain','Orders')
        cy.get('#customers').should('be.visible').should('contain','Customers')
        if(Cypress.env('automation')) {
            cy.get('#revenue').should('be.visible').should('contain','Revenue').should('contain', Shop.getFormattedCurrency())
        } else {
            cy.get('#revenue > .head-data')
                .should('be.visible').should('contain','Revenue').should('contain', Shop.getFormattedCurrency())
        }
        cy.get('#margin').should('be.visible').should('contain','Margin').should('contain', Shop.getFormattedCurrency())
    // check table content appears
        if(Cypress.env('automation')) {
        // check table content appears
            cy.get('#row_1').should('be.visible').should('contain','6')
            cy.get('#row_1 > :nth-child(2)').should('be.visible').should('contain','Party Tshirts')
            cy.get('#row_1 > :nth-child(3)').should('be.visible').should('contain','0')
            cy.get('#row_1 > :nth-child(4)').should('be.visible').should('contain','65')
            cy.get('#row_1 > :nth-child(5)').should('be.visible').should('contain','65')
            cy.get('#row_1 > :nth-child(6)').should('be.visible').should('contain','502,896.68')
            cy.get('#row_1 > :nth-child(7)').should('be.visible').should('contain','409,836.16')
        // test filters and sorting
            cy.get(':nth-child(1) > .input-group > .form-control').type('20*{enter}')
            cy.get('#row_1').should('be.visible').should('contain','205')
        // click ASC/DESC -> Desc
            cy.get('#category_eid').click()
            cy.wait(1000)
            cy.get('#row_1').should('be.visible').should('contain','20')
            cy.get('#row_2').should('be.visible').should('contain','200')
        // click ASC/DESC -> Asc
            cy.get('#category_eid').click()
            cy.wait(1000)
            cy.get('#row_1').should('be.visible').should('contain','208')
            cy.get('#row_2').should('be.visible').should('contain','207')
        }
    // check pages text
        cy.get('#responsive-datatable_previous').should('be.visible').should('contain','Previous')
        cy.get('.active > .page-link').should('be.visible').should('contain','1')
        cy.get('#responsive-datatable_next > .page-link').should('be.visible').should('contain','Next')
    })
})