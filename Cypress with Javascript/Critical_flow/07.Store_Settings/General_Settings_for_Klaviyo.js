import { Reveal_User } from '/support/classes/User'

let User = {}

describe('General', function() {
    before(function(){
        cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
    })

    it('Settings for Klaviyo Customer Profile', function() {
        User.Goto('General')
        cy.viewport(1300,1800)
    // Go to Settings for Klaviyo Customer Profile
        cy.get('#klaviyoCustomerProfile_edit_button').should('be.visible').click()
    // Check title 
        cy.get('.page-title').should('be.visible').should('contain','Settings for Klaviyo Customer Profile')
    // Customers List ID
        cy.get('.label-info-right > label')
            .should('be.visible').should('contain','Customers List ID')
        cy.get('#customer_profile_klaviyo_export_settings_list_id')
            .should('be.visible')
        cy.get('.bg-warning')
            .should('be.visible').should('contain',"Changes to your list will be reflected in your account in maximum 24 hours.")
        cy.get('.actions-custom-group > #settings')
            .should('be.visible').should('be.enabled').should('contain','Save')
    // Test your configuration
        cy.get('h3')
            .should('be.visible').should('contain','Test your configuration')
        cy.get('.card > .actions-custom-group > p')
            .should('be.visible').should('contain','After clicking the button, a test customer profile will be exported.')
        cy.get('p > i')
            .should('be.visible').should('contain','If the button is disabled you either have a test in progress or the required data is not filled in.')
        cy.get('form > .btn').should('be.visible').should('contain','Export a Test Customer Profile to Klaviyo')
        if(Cypress.env('automation')) {
            cy.get('form > .btn').should('be.disabled')
        }
    })
})