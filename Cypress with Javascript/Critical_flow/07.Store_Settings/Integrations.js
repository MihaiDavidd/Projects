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

    it('Integrations', function() {
        User.Goto('Integrations')
        cy.viewport(1300,1800)
    // Check title 
        cy.get('.page-title').should('be.visible').should('contain','Integrations')
    })

    it('SendGrid', function() {
    // Sendgrid Settings
        if(Cypress.env('shopId') === 'auchan') {
            cy.get(':nth-child(2) > :nth-child(1) > .card > .card-actions-right > .card-content > .card-content-text > .card-title')
                .should('be.visible').should('contain','SendGrid Settings')
            cy.get(':nth-child(2) > :nth-child(1) > .card > .card-actions-right > .card-content > .card-content-text > .card-text')
                .should('be.visible').should('contain','Configure the SendGrid general email service settings.')
            cy.get(':nth-child(2) > :nth-child(1) > .card > .card-actions-right > .card-content > .card-content-left > .logo')
                .should('be.visible')
        } else {
            cy.get(':nth-child(1) > :nth-child(1) > .card > .card-actions-right > .card-content > .card-content-text > .card-title')
                .should('be.visible').should('contain','SendGrid Settings')
            cy.get(':nth-child(1) > :nth-child(1) > .card > .card-actions-right > .card-content > .card-content-text > .card-text')
                .should('be.visible').should('contain','Configure the SendGrid general email service settings.')
            cy.get(':nth-child(1) > :nth-child(1) > .card > .card-actions-right > .card-content > .card-content-left > .logo')
                .should('be.visible')
        }
        cy.get(':nth-child(1) > .card > .card-actions-right > .card-actions > .btn > .rv-edit')
            .should('be.visible').click()
    // API Key
        cy.get('.page-title')
            .should('be.visible').should('contain','SendGrid Settings')
        cy.get('.element-api_key > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','API Key')
        cy.get('.element-api_key > .left-info > p')
            .should('be.visible').should('contain','The API Key must be generated with Full Access permissions. You can generate an API Key from SendGrid interface > Settings > API Keys.')
        cy.get('#sendgrid_settings_api_key')
            .should('be.visible')
    // Sender ID
        cy.get('.element-sender_id > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','Sender ID')
        cy.get('.element-sender_id > .left-info > p')
            .should('be.visible').should('contain','We recommend you to setup a separate Sender for the NPS emails sent through Reveal. You can create one from SendGrid interface > Marketing > Senders.')
        cy.get('#sendgrid_settings_sender_id')
            .should('be.visible')
    // Save Button
        cy.get('.actions-custom-group > #settings')
            .should('be.visible').should('contain','Save')
    // Return to Integration page
        cy.go('back')
    })

    it('Omniconvert Explore', function() {
    // Omniconvert Explore
        if(Cypress.env('shopId') === 'auchan') {
            cy.get(':nth-child(2) > :nth-child(3) > .card > .card-actions-right > .card-content > .card-content-text > .card-title')
                .should('be.visible').should('contain','Omniconvert Explore Settings')
            cy.get(':nth-child(2) > :nth-child(3) > .card > .card-actions-right > .card-content > .card-content-text > .card-text')
                .should('be.visible').should('contain','Configure the Omniconvert Explore integration.')
            cy.get(':nth-child(2) > :nth-child(3) > .card > .card-actions-right > .card-content > .card-content-left > .logo')
                .should('be.visible')
            cy.get(':nth-child(3) > .card > .card-actions-right > .card-actions > .btn > .rv-edit')
                .should('be.visible').click()
        // Check top message 
            cy.get('.top-info > p').should('be.visible')
                .should('contain', 'You can retrieve the Connection String from Omniconvert Explore from the Integrations section. Just copy the Connection String and paste it into the input below.')
        // Check Coneection String
            cy.get('.label-info-right > label').should('be.visible').should('contain','Connection String')
            cy.get('#integration_explore_connection_string').should('be.visible')
        // Connect Button 
            cy.get('.actions-custom-group > #settings').should('be.visible').should('contain','Connect')
        } else {
            cy.get(':nth-child(1) > :nth-child(3) > .card > .card-actions-right > .card-content > .card-content-text > .card-title')
                .should('be.visible').should('contain','Omniconvert Explore Settings')
            cy.get(':nth-child(1) > :nth-child(3) > .card > .card-actions-right > .card-content > .card-content-text > .card-text')
                .should('be.visible').should('contain','Configure the Omniconvert Explore integration.')
            cy.get(':nth-child(1) > :nth-child(3) > .card > .card-actions-right > .card-content > .card-content-left > .logo')
                .should('be.visible')
            cy.get(':nth-child(3) > .card > .card-actions-right > .card-actions > .btn > .rv-edit')
                .should('be.visible').click()
        // Check integration confirmation message   
            cy.get('.row')
                .should('be.visible').should('contain','The integration with Omniconvert Explore is up and running, everything is set.')
        }
    // Return to Integration page
        cy.go('back')  
    })

    it('Gorgias Settings', function() {
        cy.get(':nth-child(5) > .card > .card-actions-right > .card-content > .card-content-text > .card-title')
            .should('be.visible').should('contain','Gorgias Settings')
        cy.get(':nth-child(5) > .card > .card-actions-right > .card-content > .card-content-text > .card-text')
            .should('be.visible').should('contain','Configure the Gorgias integration.')
        cy.get(':nth-child(5) > .card > .card-actions-right > .card-content > .card-content-left > .logo')
            .should('be.visible')
        if(Cypress.env('shopId') === 'auchan') {
            cy.get(':nth-child(5) > .card > .card-actions-right > .card-actions').should('be.visible')
        } else {
            cy.get(':nth-child(5) > .card > .card-actions-right > .card-actions > ._modalFormHandler')
                .should('be.visible').click()
            cy.wait(1000)
            cy.get('.btn-secondary').click()
        // Base API URL
            cy.get('#dynamicFormModalTitle')
                .should('be.visible').should('contain','Gorgias Settings')
            cy.get('.element-base_api_url > .right-inputs > .label-info-right > .required')
                .should('be.visible').should('contain','Base API URL')
            cy.get('#gorgias_settings_base_api_url')
                .should('be.visible')
        // Username
            cy.get('.element-user_name_email > .right-inputs > .label-info-right > .required')
                .should('be.visible').should('contain','Username (your email address)')
            cy.get('#gorgias_settings_user_name_email')
                .should('be.visible')
        // API Key
            cy.get('.element-api_key > .right-inputs > .label-info-right > .required')
                .should('be.visible').should('contain','API Key')
            cy.get('#gorgias_settings_api_key')
                .should('be.visible')
        // Cancel and Save button
            cy.get('.btn-secondary')
                .should('be.visible').should('contain','Cancel')
            cy.get('._processModalForm')
                .should('be.visible').should('contain','Save')
        }
    })

    it('Google Ads Settings', function() {
    // Google Ads Settings
        cy.get(':nth-child(7) > .card > .card-actions-right > .card-content > .card-content-text > .card-title')
            .should('be.visible').should('contain','Google Ads Settings')
        cy.get(':nth-child(7) > .card > .card-actions-right > .card-content > .card-content-text > .card-text')
            .should('be.visible').should('contain','Configure the Google Ads integration settings.')
        cy.get(':nth-child(7) > .card > .card-actions-right > .card-content > .card-content-left > .logo')
            .should('be.visible')
        cy.get(':nth-child(7) > .card > .card-actions-right > .card-actions > .btn')
            .should('be.visible').click()
    // Check page text
        cy.get('.page-title')
            .should('be.visible').should('contain','Google Ads Settings')
        cy.get('h4')
            .should('be.visible').should('contain','Integration Details')
        cy.get('.mt-4 > :nth-child(1) > b')
            .should('be.visible').should('contain','Ads account id:')
        cy.get(':nth-child(2) > b')
            .should('be.visible').should('contain','Ads account name:')
    // Check logo and sign in button 
        cy.get('.py-2')
            .should('be.visible')
        if(Cypress.env('automation')) {
            cy.get('.c-item-label > :nth-child(2) > .btn')
                .should('be.visible')
        }
    // Return to Integration page
        cy.go('back')
    })

    it('Klaviyo Settings', function() {
    // Klaviyo Settings 
        if(Cypress.env('shopId') === 'auchan') {
            cy.get(':nth-child(2) > :nth-child(2) > .card > .card-actions-right > .card-content > .card-content-text > .card-title')
                .should('be.visible').should('contain','Klaviyo Settings')
            cy.get(':nth-child(2) > :nth-child(2) > .card > .card-actions-right > .card-content > .card-content-text > .card-text')
                .should('be.visible').should('contain','Configure the Klaviyo general email service settings.')
            cy.get(':nth-child(2) > :nth-child(2) > .card > .card-actions-right > .card-content > .card-content-left > .logo')
                .should('be.visible')
        } else {
            cy.get(':nth-child(1) > :nth-child(2) > .card > .card-actions-right > .card-content > .card-content-text > .card-title')
                .should('be.visible').should('contain','Klaviyo Settings')
            cy.get(':nth-child(1) > :nth-child(2) > .card > .card-actions-right > .card-content > .card-content-text > .card-text')
                .should('be.visible').should('contain','Configure the Klaviyo general email service settings.')
            cy.get(':nth-child(1) > :nth-child(2) > .card > .card-actions-right > .card-content > .card-content-left > .logo')
                .should('be.visible')
        }
        cy.get(':nth-child(2) > .card > .card-actions-right > .card-actions > ._modalFormHandler')
            .should('be.visible').click()
    // Check title
        cy.get('#dynamicFormModalTitle')
            .should('be.visible').should('contain','Klaviyo Settings')
    // API Key
        cy.get('.element-api_key > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','API Key')
        cy.get('.element-api_key > .right-inputs > .label-info-right > .rv-btn-info').click()
        cy.get('.tooltip-inner')   
            .should('be.visible').should('contain','You can generate an API Key from Klaviyo interface > Account > Settings > API Keys.')
        cy.get('#klaviyo_settings_api_key')
            .should('be.visible')
    // From Email
        cy.get('.element-from_email > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','From Email')
        cy.get('.element-from_email > .right-inputs > .label-info-right > .rv-btn-info').click()
        cy.get('.tooltip-inner') 
            .should('be.visible').should('contain','The email address your email will be sent from and will be used in the reply-to header.')
        cy.get('#klaviyo_settings_from_email')
            .should('be.visible')
    // From Name
        cy.get('.element-from_name > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','From Name')
        cy.get('.element-from_name > .right-inputs > .label-info-right > .rv-btn-info').click()
        cy.get('.tooltip-inner') 
            .should('be.visible').should('contain',"The name or label associated with the email address you're sending from.")
        cy.get('#klaviyo_settings_from_name')
            .should('be.visible')
    // Save button
        cy.get('._processModalForm')
            .should('be.visible').should('contain','Save')
    // Cancel button
        cy.get('.btn-secondary')
            .should('be.visible').should('contain','Cancel').click()
    })

    it('Facebook/Instagram Settings', function() {
    // Facebook Instagram Settings
        cy.get(':nth-child(4) > .card > .card-actions-right > .card-content > .card-content-text > .card-title')
            .should('be.visible').should('contain','Facebook/Instagram Settings')
        cy.get(':nth-child(4) > .card > .card-actions-right > .card-content > .card-content-text > .card-text')
            .should('be.visible').should('contain','Configure the Facebook integration settings.')
        cy.get(':nth-child(4) > .card > .card-actions-right > .card-content > .card-content-left > .logo')
            .should('be.visible')
        cy.get(':nth-child(4) > .card > .card-actions-right > .card-actions > .btn')
            .should('be.visible').click()
    // Check page text 
        cy.get('.page-title')
            .should('be.visible').should('contain','Facebook/Instagram Settings')
        cy.get('.c-item-label > .d-flex > span')
            .should('be.visible').should('contain','Facebooks Marketing API')
        cy.get('.mt-1')
            .should('be.visible').should('contain','Connect your Facebooks Marketing API account')
        cy.get('.icon-lg')
            .should('be.visible')
    // Check Connect/Disconnect button 
        if(Shop.hasFacebookIntegration()) {
            cy.get('.text-success')
                .should('be.visible').should('contain','Connected')
            cy.get('.mt-3 > .btn')
                .should('be.visible').should('contain','Disconnect')
        } else {
            cy.get('.c-item-label > :nth-child(2) > .btn')
                .should('be.visible').should('contain','Connect')
        }
    // Return to Integration page
        cy.go('back')
    })

    it('Webhook Settings', function() {
    // Webhook Settings
        cy.get(':nth-child(6) > .card > .card-actions-right > .card-content > .card-content-text > .card-title')
            .should('be.visible').should('contain','Webhook Settings')
        cy.get(':nth-child(6) > .card > .card-actions-right > .card-content > .card-content-text > .card-text')
            .should('be.visible').should('contain','Configure the Webhooks to call your custom integration.')
        cy.get(':nth-child(6) > .card > .card-actions-right > .card-actions > .btn')
            .should('be.visible').click()
    // Webhooks 
        cy.get('.page-title')
            .should('be.visible').should('contain','Webhooks')
        cy.get('.card').eq(0).find('.m-t-0')
            .should('be.visible').should('contain','Webhooks')
        cy.get('.card').eq(0).find('.text-muted')
            .should('be.visible').should('contain','Manage the webhooks to call your custom integration')
        cy.get('.col-12 > h4')
            .should('be.visible').should('contain','You have no webhooks configured')
    // Check Add Webhook button
        cy.get('.col-12 > .btn')
            .should('be.visible').should('contain','Add Webhook')
    // Webhook Call Logs
        cy.get('.card').eq(1).find('.m-t-0')
            .should('be.visible').should('contain','Webhook Call Logs')
        cy.get('.card').eq(1).find('.text-muted')
            .should('be.visible').should('contain','The calls Reveal made to your custom integration, based on the configured webhooks')
    // Check table Failed
        cy.get('.nav-link').eq(0)
            .should('be.visible').should('contain','Failed')
        cy.get('.nav-link').eq(1)
            .should('be.visible').should('contain','Successful')
        cy.get('.nav-link').eq(2)
            .should('be.visible').should('contain','All')
        cy.get('#fail > .table > thead > tr > :nth-child(2)')
            .should('be.visible').should('contain','Url')
        cy.get('#fail > .table > thead > tr > :nth-child(3)')
            .should('be.visible').should('contain','Event')
        cy.get('#fail > .table > thead > tr > :nth-child(4)')
            .should('be.visible').should('contain','Report')
        cy.get('#fail > .table > thead > tr > :nth-child(5)')
            .should('be.visible').should('contain','Duration')
        cy.get('#fail > .table > thead > tr > :nth-child(6)')
            .should('be.visible').should('contain','Called At')
    // Check table Succesfull
        cy.get('.nav-link').eq(1).click()
        cy.get('#success > .table > thead > tr > :nth-child(2)')
            .should('be.visible').should('contain','Url')
        cy.get('#success > .table > thead > tr > :nth-child(3)')
            .should('be.visible').should('contain','Event')
        cy.get('#success > .table > thead > tr > :nth-child(4)')
            .should('be.visible').should('contain','Report')
        cy.get('#success > .table > thead > tr > :nth-child(5)')
            .should('be.visible').should('contain','Duration')
        cy.get('#success > .table > thead > tr > :nth-child(6)')
            .should('be.visible').should('contain','Called At')
    // Check table All
        cy.get('.nav-link').eq(2).click()
        cy.get('#all > .table > thead > tr > :nth-child(2)')
            .should('be.visible').should('contain','Url')
        cy.get('#all > .table > thead > tr > :nth-child(3)')
            .should('be.visible').should('contain','Event')
        cy.get('#all > .table > thead > tr > :nth-child(4)')
            .should('be.visible').should('contain','Report')
        cy.get('#all > .table > thead > tr > :nth-child(5)')
            .should('be.visible').should('contain','Duration')
        cy.get('#all > .table > thead > tr > :nth-child(6)')
            .should('be.visible').should('contain','Called At')
    })
})