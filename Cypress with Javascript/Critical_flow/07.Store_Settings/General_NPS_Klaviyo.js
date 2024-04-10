import { Reveal_User } from '/support/classes/User'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Shop = {}

describe('General', function() {
    before(function(){
        cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Shop = new Reveal_Shop(data[shopId])
		})
    })

    it('NPS Klaviyo', function() {
        User.Goto('General')
        cy.viewport(1300,3000)
    // Go to NPS Klaviyo
        cy.get('#npsKlaviyo_edit_button').should('be.visible').click()
    // Check title 
        cy.get('.page-title').should('be.visible').should('contain','NPS Klaviyo Email Settings')
    // Sending Via
        cy.get('.required')
            .should('be.visible').should('contain','Sending Via')
        cy.get('.element-sending_via > .left-info > p')
            .should('be.visible').should('contain','Required.')
            .should('contain', 'Choose how to receive information into Klaviyo')
        cy.get('.dropdown > .btn')
            .should('be.visible')
        cy.get('.filter-option-inner-inner').invoke('text').then((text) => {
            if (text.includes('Campaigns')) {
            // List ID
                cy.get('.element-list_id > .right-inputs > .label-info-right > label')
                    .should('be.visible').should('contain','List ID')
                cy.get('.element-list_id > .left-info > p')
                    .should('be.visible').should('contain','This list will contain all the contacts who will receive the NPS invitation.')
                cy.get('#nps_klaviyo_settings_list_id')
                    .should('be.visible')
            // Template ID
                cy.get('.element-template_id > .left-info > p')
                    .should('be.visible').should('contain','Optional. If left blank, a template will be generated for you. This is for advanced use cases only.')
            // Email Subject
                cy.get('.element-email_subject > .right-inputs > .label-info-right > label')
                    .should('be.visible').should('contain','Email Subject')
                cy.get('.element-email_subject > .left-info > p')
                    .should('be.visible').should('contain','Optional. If you want to override the default subject of the NPS email.')
                cy.get('#nps_klaviyo_settings_email_subject')
                    .should('be.visible')
            } else if (text.includes('Events')) {
                cy.get('.element-template_id > .left-info > p')
                    .should('be.visible').should('contain','This field is not editable. It is meant to generate a basic template for you in Klaviyo. It will not affect your created flows')
            }
        })
        // Template ID
        cy.get('.element-template_id > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Template ID')
        cy.get('#nps_klaviyo_settings_template_id')
            .should('be.visible')
    //  Save Button
        cy.get('.actions-custom-group > #settings')
            .should('be.visible').should('be.enabled').should('contain','Save')
    })

    it('Configurations', function() {
        cy.get('h4')
            .should('be.visible').should('contain','Before testing your configuration')
        cy.get('.card > p')
            .should('be.visible').should('contain','please make sure you have set:')
        cy.get('.card > ul > :nth-child(1)')
            .should('be.visible').should('contain','the correct API Key on the Klaviyo integration page')
        cy.get('.card > ul > :nth-child(2)')
            .should('be.visible').should('contain','the Sending Provider as Klaviyo')
        cy.get('.card > ul > :nth-child(3)')
            .should('be.visible').should('contain','the Sending Contact Email field on NPS Settings')
        cy.get('.card > ul > :nth-child(4)')
            .should('be.visible').should('contain','the Sending Via field is saved in the above form')
        cy.get('.alert')
            .should('be.visible').should('contain','The test button is disabled when you have a test in progress or the required data is not filled in.')
            cy.get('form > .btn').should('be.visible').should('contain','Send a Test Email through Klaviyo')
        if(Shop.hasKlaviyoIntegration()) {
            cy.get('form > .btn').should('be.enabled')
        } else {
            cy.get('form > .btn').should('not.be.enabled')
        }
    })
})