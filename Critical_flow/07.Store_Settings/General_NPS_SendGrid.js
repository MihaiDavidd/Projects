import { Reveal_User } from '/support/classes/User'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Shop = {}

describe('Store Settings', function() {
    before(function(){
        cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Shop = new Reveal_Shop(data[shopId])
		})
    })

    it('NPS SendGrid', function() {
        User.Goto('General')
        cy.viewport(1300,1800)
    // Go to NPS SendGrid
        cy.get('#npsSendgrid_edit_button').should('be.visible').click()
    // Check title 
        cy.get('.page-title').should('be.visible').should('contain','NPS SendGrid Email Settings')
    // Design ID
        cy.get('.element-design_id > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Design ID')
        cy.get('.element-design_id > .left-info > p')
            .should('be.visible').should('contain','You can retrieve the ID of the design by accessing from SendGrid interface > Marketing > Templates.')
        cy.get('#nps_sendgrid_settings_design_id')
            .should('be.visible')
    // NPS Global List ID
        cy.get('.element-nps_global_list_id > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','NPS Global List ID')
        cy.get('.element-nps_global_list_id > .left-info > p')
            .should('be.visible').should('contain','This list will contain all the contacts who received an NPS invitation at least once.')
        cy.get('#nps_sendgrid_settings_nps_global_list_id')
            .should('be.visible')
    // Template ID
        cy.get('.element-template_id > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Template ID')
        cy.get('.element-template_id > .left-info > p')
            .should('be.visible').should('contain','This is for advanced use cases only.')
        cy.get('#nps_sendgrid_settings_template_id')
            .should('be.visible')
    // Template Version ID
        cy.get('.element-template_version_id > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Template Version ID')
        cy.get('.element-template_version_id > .left-info > p')
            .should('be.visible').should('contain','This is for advanced use cases only.')
        cy.get('#nps_sendgrid_settings_template_version_id')
            .should('be.visible')
    // Unsubscribe Group ID
        cy.get('.element-unsubscribe_group_id > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Unsubscribe Group ID')
        cy.get('.element-unsubscribe_group_id > .left-info > p')
            .should('be.visible').should('contain','We recommend using a separate group for users who unsubscribed from NPS emails instead of using a global group.')
        cy.get('#nps_sendgrid_settings_unsubscribe_group_id')
            .should('be.visible')
    // Save Button 
        cy.get('.actions-custom-group > #settings')
            .should('be.visible').should('be.enabled').should('contain','Save')
    })

    it('Test your configuration', function() {
        cy.get('h3')
            .should('be.visible').should('contain','Test your configuration')
        cy.get('.actions-custom-group > p')
            .should('be.visible').should('contain','After clicking the button, you will receive an email stating the result.')
        cy.get('.actions-custom-group > p')
            .should('be.visible').should('contain','Make sure you have set the correct API Key, Sender ID and Unsubscribe Group ID from the integration page of SendGrid, as well as the Sending Provider as SendGrid and the Sending Contact Email from NPS Settings.')
        cy.get('p > i')
            .should('be.visible').should('contain','If the button is disabled you either have a test in progress or the required data is not filled in.')
        cy.get('form > .btn')
            .should('be.visible').should('contain','Send a Test Email through SendGrid')
        if(Shop.hasSendgridIntegration()) {
            cy.get('form > .btn').should('be.enabled')
        } else {
            cy.get('form > .btn').should('not.be.enabled')
        }
    })
})