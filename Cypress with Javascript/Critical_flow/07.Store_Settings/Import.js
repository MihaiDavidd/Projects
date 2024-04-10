import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Store Settings', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

    it('Import', function() {
        User.Goto('Import')
    // Check title 
        cy.get('.page-title')
            .should('be.visible').contains('Import')
    // Import Actions
        if(Cypress.env('shopId') === 'auchan') {
            cy.get(':nth-child(2) > :nth-child(1) > .card > .m-t-0')
                .should('be.visible').should('contain','Import Actions')
            cy.get(':nth-child(2) > :nth-child(1) > .card > .text-muted')
                .should('be.visible').should('contain','Start a new import process by clicking on a specific button.')
        } else {
            cy.get(':nth-child(1) > :nth-child(1) > .card > .m-t-0')
                .should('be.visible').should('contain','Import Actions')
            cy.get(':nth-child(1) > :nth-child(1) > .card > .text-muted')
                .should('be.visible').should('contain','Start a new import process by clicking on a specific button.')
        }
    // Check buttons
        cy.get(':nth-child(1) > form > .btn')
            .should('be.visible').should('contain','Import Customers')
        cy.get(':nth-child(2) > form > .btn')
            .should('be.visible').should('contain','Import Categories')
        cy.get(':nth-child(3) > form > .btn')
            .should('be.visible').should('contain','Import Products')
        cy.get(':nth-child(4) > form > .btn')
            .should('be.visible').should('contain','Import Orders')
        if(Cypress.env('automation')) {
            cy.get(':nth-child(5) > form > .btn')
                .should('be.visible').should('contain','Import Vendors')
        }
    // Import Log
        if(Cypress.env('shopId') === 'auchan') {
            cy.get(':nth-child(3) > .col-12 > .card > .m-t-0')
                .should('be.visible').should('contain','Import Log')
            cy.get(':nth-child(3) > .col-12 > .card > .text-muted')
                .should('be.visible').should('contain','All the processes are listed below. Click on the zoom icon to see the whole import report.')
        } else {
            cy.get(':nth-child(2) > .col-12 > .card > .m-t-0')
                .should('be.visible').should('contain','Import Log')
            cy.get(':nth-child(2) > .col-12 > .card > .text-muted')
                .should('be.visible').should('contain','All the processes are listed below. Click on the zoom icon to see the whole import report.')
        }
    // Table Headers
        cy.get(':nth-child(1) > .nav-link')
            .should('be.visible').should('contain','Manual')
        cy.get(':nth-child(2) > .nav-link')
            .should('be.visible').should('contain','Automatic')
        cy.get('#manual > .table > thead > tr > :nth-child(2)')
            .should('be.visible').should('contain','ID')
        cy.get('#manual > .table > thead > tr > :nth-child(3)')
            .should('be.visible').should('contain','Job Type')
        cy.get('#manual > .table > thead > tr > :nth-child(4)')
            .should('be.visible').should('contain','Status')
        cy.get('#manual > .table > thead > tr > :nth-child(5)')
            .should('be.visible').should('contain','Report')
        cy.get('#manual > .table > thead > tr > :nth-child(6)')
            .should('be.visible').should('contain','Created at')
        cy.get('#manual > .table > thead > tr > :nth-child(7)')
            .should('be.visible').should('contain','Started at')
        cy.get('#manual > .table > thead > tr > :nth-child(8)')
            .should('be.visible').should('contain','Finished at')
    })
})