import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Store Settings', function() {
    before(function(){
        cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
    })

    it('General Settings', function() {
        User.Goto('General')
    // Go to General Settings
        cy.get('#general_edit_button > .rv-edit').click()
    // Check title appears
        cy.get('.page-title').contains('General Settings').should('be.visible')
    // Check description appears
        cy.get('p').should('be.visible').contains("The timezone of your shop relative to UTC. The format is hh:mm. Adding seconds is not supported. For UTC only + or - is accepted, while ± is not accepted. E.g.: for Bucharest, it would be +02:00.")
    // Check timezone
        cy.get('.required').should('be.visible').contains('Timezone offset')
    // Check a wrong timezone entered 
        cy.get('#general_settings_timezone_offset').type('{cmd+a}{del}02:00') 
        cy.get('.actions-custom-group > #settings').click()
    // Warning message
        cy.get('.form-error-message').should('be.visible')
    })
})