import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Store Settings', function() {
    before(function(){
        cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
    })

    it('RFM Points', function() {
        User.Goto('General')
    // Go to RFM Points
        cy.get('#rfmPoints_edit_button').click()
    // Check title and table header appears
        cy.viewport(1500,3300)
        cy.wait(5000)
        cy.get('.page-title').should('be.visible').contains('RFM Points')
        cy.get('.card > .header-title').should('be.visible').contains('RFM Point Editing')
    // Check table 
        cy.get('.col-sm-12 > .card').should('be.visible')
        if(Cypress.env('automation')) {
        // Check Update button
            cy.get('.col-12 > .btn').click()
        // Check succesfull message appears
            cy.get('.jq-toast-single').should('be.visible').contains('RFM Points were saved successfully')
        }
    })
})