import { Reveal_User } from '/support/classes/User'

let User = {}

describe('General', function() {
    before(function(){
        cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
    })

    it('Customer Events', function() {
        User.Goto('General')
        cy.viewport(1300,1800)
    // Go to Customer Events
        cy.get('#customerEvents_edit_button').should('be.visible').click()
    // Check title 
        cy.get('.page-title').should('be.visible').should('contain','Customer Events')
    // Push CustomerEvents to Klaviyo
        cy.get('.element-push_to_klaviyo_enabled > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Push CustomerEvents to Klaviyo')
        cy.get('.element-push_to_klaviyo_enabled > .left-info > p')
            .should('be.visible').should('contain','Push the CustomerEvents to Klaviyo.')
        cy.get('.element-push_to_klaviyo_enabled > .right-inputs > .form-check-toggle > .switch > .slider')
            .should('be.visible')
    // Push CustomerEvents to Webhooks
        cy.get('.element-push_to_webhook_enabled > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Push CustomerEvents to Webhooks')
        cy.get('.element-push_to_webhook_enabled > .left-info > p')
            .should('be.visible').should('contain','Push the CustomerEvents to your custom integration with the help of Webhooks. Check the Webhooks in the Settings > Integrations.')
        cy.get('.element-push_to_webhook_enabled > .right-inputs > .form-check-toggle > .switch > .slider')
            .should('be.visible')
    // Save Button
        cy.get('.actions-custom-group > #settings')
            .should('be.visible').should('be.enabled').should('contain','Save')
    })
})