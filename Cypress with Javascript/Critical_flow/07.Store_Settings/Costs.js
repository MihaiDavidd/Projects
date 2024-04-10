import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Store Settings', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

    it('Costs', function() {
        User.Goto('Costs')
    // Check title 
        cy.get('.content-top-bar')
            .should('be.visible').contains('Costs')
    // Check Add new cost button
        if(Cypress.env('automation') === true || Cypress.env('shopId') === 'auchan') { 
            cy.get('.no-shops > .btn').should('be.visible').should('contain','Add new cost')
            cy.get('h4').should('be.visible').should('contain','You have not entered any costs for your shop')
        } else {
            cy.get('.col-12 > .btn').should('be.visible').should('contain','Add new cost')
        // check show entries
            cy.get('#responsive-datatable_length > label').should('be.visible').should('contain','Show')
            cy.get('#responsive-datatable_info').should('be.visible').should('contain','Showing 1 to')
        // Check table headers 
            cy.get('#responsive-datatable > thead > tr > th:nth-child(1)').should('be.visible').should('contain','#')
            cy.get('#responsive-datatable > thead > tr > th:nth-child(2)').should('be.visible').should('contain','Name')
            cy.get('#responsive-datatable > thead > tr > th:nth-child(3)').should('be.visible').should('contain','From')
            cy.get('#responsive-datatable > thead > tr > th:nth-child(4)').should('be.visible').should('contain','To')
            cy.get('#responsive-datatable > thead > tr > th:nth-child(5)').should('be.visible').should('contain','Acquisition')
            cy.get('#responsive-datatable > thead > tr > th:nth-child(6)').should('be.visible').should('contain','Retention')
        // Check edit and delete button appears in table
            cy.get(':nth-child(2) > .col-sm-12').should(($input) => {
                expect($input).to.not.have.class('rv-delete rv-icon edit-icon')
                expect($input).to.not.have.class('_modalFormHandler rv-edit rv-icon edit-icon')
            })
        }
    })
})