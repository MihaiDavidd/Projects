import { Reveal_User } from '/support/classes/User'
import { Reveal_Calendar } from '/support/classes/Calendar'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Calendar = {}
let Shop = {}

describe('CRM', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Shop = new Reveal_Shop(data[shopId])
			Calendar = new Reveal_Calendar()
		})
	})

    it('See All', function() {
        User.Goto('CRM')
    // Click See All 
        cy.get('.btn-medium-secondary').click()
    })

    it('Customer List', function() {
        cy.viewport(1300,2600)
        Calendar.open()
        Calendar.selectLastYear()
    // Check title
        cy.get('.page-title').should('contain','Customers List').should('be.visible')
    // Check show entries
        cy.get('#responsive-datatable_length > label').should('contain','Show').should('be.visible')
    // Select entries - 25
        cy.get('label > .dropdown > .btn').click()
        cy.get("ul.dropdown-menu.inner.show")
            .contains("span.text", "25")
            .click() 
        cy.get('label > .dropdown > .btn')
            .should('be.visible').should('contain','25')
        cy.get('#responsive-datatable_info')
            .should('be.visible').should('contain','Showing 1 to 25')
    // Select entries - 10
        cy.get('label > .dropdown > .btn').click()
        cy.get("ul.dropdown-menu.inner.show")
            .contains("span.text", "10")
            .click()
        cy.get('label > .dropdown > .btn')
                .should('be.visible').should('contain','10')
        cy.get('#responsive-datatable_info')
            .should('be.visible').should('contain','Showing 1 to 10') 
    })

    it('Table', function() {
        cy.viewport(2000,1600)
    // check table headers
        cy.get('#email').should('be.visible').should('contain','Email')
        cy.get('#name').should('be.visible').should('contain','Name')
        cy.get('#rfm_score').should('be.visible').should('contain','RFM Score')
        cy.get('#rfm_group_name').should('be.visible').should('contain','RFM Group Name')
        cy.get('#orders').should('be.visible').should('contain','Orders')
        if(Cypress.env('automation')) {
            cy.get('#revenue').should('be.visible').should('contain','Revenue')
        } else { 
            cy.get('#revenue > .head-data > .head-name')
                .should('be.visible').should('contain','Revenue')
            cy.get('#revenue > .head-data > .units').should('contain', Shop.getFormattedCurrency())
        }
        cy.get('#margin').should('be.visible').should('contain','Margin').should('contain', Shop.getFormattedCurrency())
    // check table content appears
        if(Cypress.env('automation')) {
            cy.get('#row_1').should('be.visible').should('contain','0dbf71842b4ece60aba2a06ff23d234c@example.org')
            cy.get('#row_1 > :nth-child(2)').should('be.visible').should('contain','Guest Guest')
            cy.get('#row_1 > :nth-child(3)').should('be.visible').should('contain','215')
            cy.get('#row_1 > :nth-child(4)').should('be.visible').should('contain','About to dump you')
            cy.get('#row_1 > :nth-child(5)').should('be.visible').should('contain','1')
            cy.get('#row_1 > :nth-child(6)').should('be.visible').should('contain','52,802.12')
            cy.get('#row_1 > :nth-child(7)').should('be.visible').should('contain','47,915.25')
        // Check filters
            cy.get(':nth-child(1) > .input-group > .form-control').type('1*{enter}')
            cy.get('#row_1')
                .should('be.visible').should('contain','1dfea64ac74131095f41c2d71be6d6ad@mailinator.com')
        // click ASC/DESC -> Desc
            cy.get('thead > :nth-child(1) > .all').click()
            cy.wait(1000)
            cy.get('#row_1')
                .should('be.visible').should('contain','18cfce84963b9da6b03607c7d9084dbf@mailinator.com')
            cy.get('#row_3')
                .should('be.visible').should('contain','1dfea64ac74131095f41c2d71be6d6ad@mailinator.com')
        // click ASC/DESC -> Asc
            cy.get('thead > :nth-child(1) > .all').click()
            cy.wait(1000)
            cy.get('#row_1')
                .should('be.visible').should('contain','1dfea64ac74131095f41c2d71be6d6ad@mailinator.com')
            cy.get('#row_3')
                .should('be.visible').should('contain','18cfce84963b9da6b03607c7d9084dbf@mailinator.com')
        }
    // check previos and next page 
        cy.get('#responsive-datatable_previous').should('be.visible').should('contain','Previous')
        cy.get('.active > .page-link').should('be.visible').should('contain','1')
        cy.get('#responsive-datatable_next > .page-link').should('be.visible').should('contain','Next')
    })
})