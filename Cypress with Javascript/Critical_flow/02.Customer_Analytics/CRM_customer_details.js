import { Reveal_User } from '/support/classes/User'

let User = {}
let shopId
let url

describe('CRM ', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
            url = data[shopId].url
		})
	})

    it('Check Customer Details', function() {
        User.Goto('CRM')
        cy.get('#row_1 > .all > a').invoke('attr', 'href').then((href) => {
            const adjustHref = href.replace(/^\//, '')
            cy.visit(url + adjustHref)
            cy.viewport(1300,4000)
            cy.wait(5000)
        })
        cy.get('.content-top-bar-title > .page-title').should('be.visible').should('contain','Customer Details')
        // Check Customer Details
        cy.get('.profile-container > .card > .table-responsive > .table > tbody > :nth-child(1) > th').should('be.visible').should('contain','Email')
        if(Cypress.env('shopId') === "auchan"){
            cy.get('.profile-container > .card > .table-responsive > .table > tbody > :nth-child(2) > th').should('be.visible').should('contain','Last order billing address')
            cy.get('.profile-container > .card > .table-responsive > .table > tbody > :nth-child(3) > th').should('be.visible').should('contain','Last order billing phone number')
            cy.get('.profile-container > .card > .table-responsive > .table > tbody > :nth-child(4) > th').should('be.visible').should('contain','Last order shipping address')
            cy.get('.profile-container > .card > .table-responsive > .table > tbody > :nth-child(5) > th').should('be.visible').should('contain','Last order shipping phone number')
            cy.get('.profile-container > .card > .table-responsive > .table > tbody > :nth-child(6) > th').should('be.visible').should('contain','Registration Date')
            cy.get('.profile-container > .card > .table-responsive > .table > tbody > :nth-child(7) > th').should('be.visible').should('contain','Last NPS Pre score')
            cy.get('.profile-container > .card > .table-responsive > .table > tbody > :nth-child(8) > th').should('be.visible').should('contain','Last NPS Post score')
        }
    // Transaction stats
        cy.get('.stats-container > .card > .table-responsive > :nth-child(1)').should('be.visible').should('contain','Transactions stats')
        // Payment by type   .should('be.visible').should('contain','')
        cy.get('.table-responsive > :nth-child(3)').should('be.visible').should('contain','Payments by type')
        // Shipping by type
        cy.get('.table-responsive > :nth-child(5)').should('be.visible').should('contain','Shipping by type')
        // Orders by status
        cy.get('.table-responsive > :nth-child(7)').should('be.visible').should('contain','Orders by status')
        // Timeline
        cy.get('.col-12 > .page-title').should('be.visible').should('contain','Timeline')
        // Order
        cy.wait(3000)
        cy.get(':nth-child(2) > .timeline-desk > .timeline-box > .mt-0').should('be.visible').should('contain','Order')
        cy.get(':nth-child(2) > .timeline-desk > .timeline-box > :nth-child(6)').should('be.visible').should('contain','Summary')
        if (shopId === 'auchan') {
            cy.get(':nth-child(2) > .timeline-desk > .timeline-box > :nth-child(7) > .table > tbody > :nth-child(1) > th').should('be.visible').should('contain','Order Status')
            cy.get(':nth-child(2) > .timeline-desk > .timeline-box > :nth-child(7) > .table > tbody > :nth-child(2) > th').should('be.visible').should('contain','Grand Total [RON]')
            cy.get(':nth-child(2) > .timeline-desk > .timeline-box > :nth-child(7) > .table > tbody > :nth-child(3) > th').should('be.visible').should('contain','Payment type')
            cy.get(':nth-child(2) > .timeline-desk > .timeline-box > :nth-child(7) > .table > tbody > :nth-child(4) > th').should('be.visible').should('contain','Shipping provider')
            // Email
            cy.get('.profile-container > .card > .table-responsive > .table > tbody > :nth-child(1) > td').should('be.visible')
            // Order 
            cy.get(':nth-child(2) > tbody > :nth-child(1) > .text-right').should('be.visible')
            // Plata Online
            cy.get(':nth-child(4) > tbody > :nth-child(1) > :nth-child(2)').should('be.visible')
            // Livrare
            cy.get(':nth-child(6) > tbody > :nth-child(1) > th').should('be.visible')
            // Status Invoiced
            cy.get(':nth-child(8) > tbody > :nth-child(1) > th').should('be.visible')
        }
    })
})