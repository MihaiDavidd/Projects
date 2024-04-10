import { Reveal_User } from '/support/classes/User'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Shop = {}

describe('Store Settings', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Shop = new Reveal_Shop(data[shopId])
		})
	})

    it('Billing', function() {
        User.Goto('Billing')
    // Check title appears
        cy.get('.content-top-bar').should('be.visible').contains('Billing')
        if(Shop.hasBillingPlan() === "SCALE") {
        // Check current plan shows and the date
            cy.get('.card-top > .card').should('be.visible').contains('SCALE')
            if(Cypress.env('automation') === true) 
            {
                cy.get('.date-billing').should('be.visible').contains('2023-04-28')
            }
        } else {
            cy.get('.card-top > .card').should('be.visible').contains('ENTERPRISE')
        }
    })
})