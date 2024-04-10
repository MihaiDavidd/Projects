import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Store Settings', function() {
    before(function(){
        cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
    })

    it('General', function() {
        User.Goto('General')
        cy.viewport(1300,1800)
    // Check title appears
        cy.get('.page-title').should('be.visible').contains('Shop Settings')
    // Check main categories name appear 
    if(Cypress.env('shopId') === 'auchan') {
        cy.get(':nth-child(2) > :nth-child(1) > h4.text-muted')
            .should('be.visible').contains('General')
        cy.get(':nth-child(2) > :nth-child(2) > h4.text-muted')
            .should('be.visible').contains('RFM')
        cy.get(':nth-child(3) > :nth-child(1) > h4.text-muted')
            .should('be.visible').contains('Export')
        cy.get(':nth-child(3) > :nth-child(2) > h4.text-muted')
            .should('be.visible').contains('NPS')
    } else {
        cy.get(':nth-child(1) > :nth-child(1) > h4.text-muted')
            .should('be.visible').contains('General')
        cy.get(':nth-child(1) > :nth-child(2) > h4.text-muted')
            .should('be.visible').contains('RFM')
        cy.get(':nth-child(2) > :nth-child(1) > h4.text-muted')
            .should('be.visible').contains('Export')
        cy.get(':nth-child(2) > :nth-child(2) > h4.text-muted')
            .should('be.visible').contains('NPS')
    }
    cy.get('.mb-4 > .col-lg-12 > h4.text-muted')
        .should('be.visible').contains('Access Control')
    })

    it('General Settings', function() {
        if(Cypress.env('shopId') === 'auchan') {
            // General Settings 
            cy.get(':nth-child(2) > :nth-child(1) > .row > :nth-child(1) > .card > .card-actions-right > .card-content > .card-title')
                .should('be.visible').contains('General Settings')
            cy.get(':nth-child(2) > :nth-child(1) > .row > :nth-child(1) > .card > .card-actions-right > .card-content > .card-text')
                .should('be.visible').contains('General application settings')
            cy.get('#general_edit_button').should('be.visible')
            // Reports
            cy.get(':nth-child(2) > :nth-child(1) > .row > :nth-child(2) > .card > .card-actions-right > .card-content > .card-title')
                .should('be.visible').contains('Reports')
            cy.get(':nth-child(2) > :nth-child(1) > .row > :nth-child(2) > .card > .card-actions-right > .card-content > .card-text')
                .should('be.visible').contains('Base currency, shop average margin and whether or not to consolidate guest accounts.')
            cy.get('#reports_edit_button').should('be.visible')
            // Imports
            cy.get(':nth-child(2) > :nth-child(1) > .row > :nth-child(3) > .card > .card-actions-right > .card-content > .card-title')
                .should('be.visible').contains('Imports')
            cy.get(':nth-child(2) > :nth-child(1) > .row > :nth-child(3) > .card > .card-actions-right > .card-content > .card-text')
                .should('be.visible').contains('Configuration needed to import the data: where to get data from and when to import it.')
            cy.get('#imports_edit_button').should('be.visible')
        } else {
        // General Settings 
            cy.get(':nth-child(1) > :nth-child(1) > .row > :nth-child(1) > .card > .card-actions-right > .card-content > .card-title')
                .should('be.visible').contains('General Settings')
            cy.get(':nth-child(1) > :nth-child(1) > .row > :nth-child(1) > .card > .card-actions-right > .card-content > .card-text')
                .should('be.visible').contains('General application settings')
            cy.get('#general_edit_button').should('be.visible')
        // Reports
            cy.get(':nth-child(1) > :nth-child(1) > .row > :nth-child(2) > .card > .card-actions-right > .card-content > .card-title')
                .should('be.visible').contains('Reports')
            cy.get(':nth-child(1) > :nth-child(1) > .row > :nth-child(2) > .card > .card-actions-right > .card-content > .card-text')
                .should('be.visible').contains('Base currency, shop average margin and whether or not to consolidate guest accounts.')
            cy.get('#reports_edit_button').should('be.visible')
        // Imports
            cy.get(':nth-child(1) > :nth-child(1) > .row > :nth-child(3) > .card > .card-actions-right > .card-content > .card-title')
                .should('be.visible').contains('Imports')
            cy.get(':nth-child(1) > :nth-child(1) > .row > :nth-child(3) > .card > .card-actions-right > .card-content > .card-text')
                .should('be.visible').contains('Configuration needed to import the data: where to get data from and when to import it.')
            cy.get('#imports_edit_button').should('be.visible')
        }
        // Order Status Mapping
            cy.get(':nth-child(4) > .card > .card-actions-right > .card-content > .card-title')
                .should('be.visible').contains('Order Status Mapping')
            cy.get(':nth-child(4) > .card > .card-actions-right > .card-content > .card-text')
                .should('be.visible').contains('Let us know what your order statuses mean to you.')
            cy.get('#orderStatus_edit_button').should('be.visible')
    })

    it('RFM', function() {
        if(Cypress.env('shopId') === 'auchan') {
        // RFM Points
            cy.get(':nth-child(2) > :nth-child(2) > .row > :nth-child(1) > .card > .card-actions-right > .card-content > .card-title')
                .should('be.visible').contains('RFM Points')
            cy.get(':nth-child(2) > :nth-child(2) > .row > :nth-child(1) > .card > .card-actions-right > .card-content > .card-text')
                .should('be.visible').contains('Visualize and define what each point means. What does a "2" mean in terms of Recency? Or Frequency? Or Monetary?')
            cy.get('#rfmPoints_edit_button').should('be.visible')
            // RFM Groups
            cy.get(':nth-child(2) > :nth-child(2) > .row > :nth-child(2) > .card > .card-actions-right > .card-content > .card-title')
                .should('be.visible').contains('RFM Groups')
            cy.get(':nth-child(2) > :nth-child(2) > .row > :nth-child(2) > .card > .card-actions-right > .card-content > .card-text')
                .should('be.visible').contains('RFM Group management: create, edit and delete RFM Groups.')
            cy.get('#rfmGroups_edit_button').should('be.visible')
            // RFM Score Mapping
            cy.get(':nth-child(2) > :nth-child(2) > .row > :nth-child(3) > .card > .card-actions-right > .card-content > .card-title')
                .should('be.visible').contains('RFM Score Mapping')
            cy.get(':nth-child(2) > :nth-child(2) > .row > :nth-child(3) > .card > .card-actions-right > .card-content > .card-text')
                .should('be.visible').contains('Associate RFM Scores to RFM Groups: define the group to which a "543" customer should belong to.')
        } else {
        // RFM Points
            cy.get(':nth-child(1) > :nth-child(2) > .row > :nth-child(1) > .card > .card-actions-right > .card-content > .card-title')
                .should('be.visible').contains('RFM Points')
            cy.get(':nth-child(1) > :nth-child(2) > .row > :nth-child(1) > .card > .card-actions-right > .card-content > .card-text')
                .should('be.visible').contains('Visualize and define what each point means. What does a "2" mean in terms of Recency? Or Frequency? Or Monetary?')
            cy.get('#rfmPoints_edit_button').should('be.visible')
        // RFM Groups
            cy.get(':nth-child(1) > :nth-child(2) > .row > :nth-child(2) > .card > .card-actions-right > .card-content > .card-title')
                .should('be.visible').contains('RFM Groups')
            cy.get(':nth-child(1) > :nth-child(2) > .row > :nth-child(2) > .card > .card-actions-right > .card-content > .card-text')
                .should('be.visible').contains('RFM Group management: create, edit and delete RFM Groups.')
            cy.get('#rfmGroups_edit_button').should('be.visible')
        // RFM Score Mapping
            cy.get(':nth-child(1) > :nth-child(2) > .row > :nth-child(3) > .card > .card-actions-right > .card-content > .card-title')
                .should('be.visible').contains('RFM Score Mapping')
            cy.get(':nth-child(1) > :nth-child(2) > .row > :nth-child(3) > .card > .card-actions-right > .card-content > .card-text')
                .should('be.visible').contains('Associate RFM Scores to RFM Groups: define the group to which a "543" customer should belong to.')
        }
        cy.get('#rfmSMapping_edit_button').should('be.visible')
    })

    it('Export', function() {
        if(Cypress.env('shopId') === 'auchan') {
    // Export General Settings
        cy.get(':nth-child(3) > :nth-child(1) > .row > :nth-child(1) > .card > .card-actions-right > .card-content > .card-title')
            .should('be.visible').contains('Export General Settings')
        cy.get(':nth-child(3) > :nth-child(1) > .row > :nth-child(1) > .card > .card-actions-right > .card-content > .card-text')
                .should('be.visible').contains('Configuration needed to export the data: format and other settings related to customer profile export.')
        cy.get('#exportGeneral_edit_button').should('be.visible')
    // Settings for Klaviyo Customer Profile
        cy.get(':nth-child(3) > :nth-child(1) > .row > :nth-child(2) > .card > .card-actions-right > .card-content > .card-title')
            .should('be.visible').contains('Settings for Klaviyo Customer Profile')
        cy.get(':nth-child(3) > :nth-child(1) > .row > :nth-child(2) > .card > .card-actions-right > .card-content > .card-text')
            .should('be.visible').contains('Configure the Klaviyo Export Settings for Customer Profile.')
        cy.get('#klaviyoCustomerProfile_edit_button').should('be.visible')
    // Customer Events
        cy.get(':nth-child(3) > :nth-child(1) > .row > :nth-child(3) > .card > .card-actions-right > .card-content > .card-title')
            .should('be.visible').contains('Customer Events')
        cy.get(':nth-child(3) > :nth-child(1) > .row > :nth-child(3) > .card > .card-actions-right > .card-content > .card-text')
            .should('be.visible').contains('Configure the CustomerEvents pushing in 3rd party apps')
        } else {
    // Export General Settings
            cy.get(':nth-child(2) > :nth-child(1) > .row > :nth-child(1) > .card > .card-actions-right > .card-content > .card-title')
                .should('be.visible').contains('Export General Settings')
            cy.get(':nth-child(2) > :nth-child(1) > .row > :nth-child(1) > .card > .card-actions-right > .card-content > .card-text')
                    .should('be.visible').contains('Configuration needed to export the data: format and other settings related to customer profile export.')
            cy.get('#exportGeneral_edit_button').should('be.visible')
    // Settings for Klaviyo Customer Profile
            cy.get(':nth-child(2) > :nth-child(1) > .row > :nth-child(2) > .card > .card-actions-right > .card-content > .card-title')
                .should('be.visible').contains('Settings for Klaviyo Customer Profile')
            cy.get(':nth-child(2) > :nth-child(1) > .row > :nth-child(2) > .card > .card-actions-right > .card-content > .card-text')
                .should('be.visible').contains('Configure the Klaviyo Export Settings for Customer Profile.')
            cy.get('#klaviyoCustomerProfile_edit_button').should('be.visible')
    // Customer Events
            cy.get(':nth-child(2) > :nth-child(1) > .row > :nth-child(3) > .card > .card-actions-right > .card-content > .card-title')
                .should('be.visible').contains('Customer Events')
            cy.get(':nth-child(2) > :nth-child(1) > .row > :nth-child(3) > .card > .card-actions-right > .card-content > .card-text')
                .should('be.visible').contains('Configure the CustomerEvents pushing in 3rd party apps')
        }
        cy.get('#customerEvents_edit_button').should('be.visible')
    })

    it('NPS', function() {
        if(Cypress.env('shopId') === 'auchan') {
    // NPS
        cy.get(':nth-child(3) > :nth-child(2) > .row > :nth-child(1) > .card > .card-actions-right > .card-content > .card-title')
            .should('be.visible').contains('NPS')
        cy.get(':nth-child(3) > :nth-child(2) > .row > :nth-child(1) > .card > .card-actions-right > .card-content > .card-text')
            .should('be.visible').contains('When to send invitations for NPS via email, how long invitations are valid and define rules to avoid spamming your customers.')
        cy.get('#npsSettings_edit_button').should('be.visible')
    // NPS SendGrid Email Settings
        cy.get(':nth-child(3) > :nth-child(2) > .row > :nth-child(2) > .card > .card-actions-right > .card-content > .card-title')
            .should('be.visible').contains('NPS SendGrid Email Settings')
        cy.get(':nth-child(3) > :nth-child(2) > .row > :nth-child(2) > .card > .card-actions-right > .card-content > .card-text')
            .should('be.visible').contains('Configure the SendGrid NPS email service settings.')
        cy.get('#npsSendgrid_edit_button').should('be.visible')
    // NPS Klaviyo Email Settings
        cy.get(':nth-child(3) > :nth-child(2) > .row > :nth-child(3) > .card > .card-actions-right > .card-content > .card-title')
            .should('be.visible').contains('NPS Klaviyo Email Settings')
        cy.get(':nth-child(3) > :nth-child(2) > .row > :nth-child(3) > .card > .card-actions-right > .card-content > .card-text')
            .should('be.visible').contains('Configure the Klaviyo NPS email service settings.')
        } else {
    // NPS
        cy.get(':nth-child(2) > :nth-child(2) > .row > :nth-child(1) > .card > .card-actions-right > .card-content > .card-title')
            .should('be.visible').contains('NPS')
        cy.get(':nth-child(2) > :nth-child(2) > .row > :nth-child(1) > .card > .card-actions-right > .card-content > .card-text')
            .should('be.visible').contains('When to send invitations for NPS via email, how long invitations are valid and define rules to avoid spamming your customers.')
        cy.get('#npsSettings_edit_button').should('be.visible')
    // NPS SendGrid Email Settings
        cy.get(':nth-child(2) > :nth-child(2) > .row > :nth-child(2) > .card > .card-actions-right > .card-content > .card-title')
            .should('be.visible').contains('NPS SendGrid Email Settings')
        cy.get(':nth-child(2) > :nth-child(2) > .row > :nth-child(2) > .card > .card-actions-right > .card-content > .card-text')
            .should('be.visible').contains('Configure the SendGrid NPS email service settings.')
        cy.get('#npsSendgrid_edit_button').should('be.visible')
    // NPS Klaviyo Email Settings
        cy.get(':nth-child(2) > :nth-child(2) > .row > :nth-child(3) > .card > .card-actions-right > .card-content > .card-title')
            .should('be.visible').contains('NPS Klaviyo Email Settings')
        cy.get(':nth-child(2) > :nth-child(2) > .row > :nth-child(3) > .card > .card-actions-right > .card-content > .card-text')
            .should('be.visible').contains('Configure the Klaviyo NPS email service settings.')
        }
        cy.get('#npsKlaviyo_edit_button').should('be.visible')
    })

    it('Access Control', function() {
    // API Keys
        cy.get('.mb-4 > .col-lg-12 > .row > .col-12 > .card > .card-actions-right > .card-content > .card-title')
            .should('be.visible').contains('API Keys')
        cy.get('.mb-4 > .col-lg-12 > .row > .col-12 > .card > .card-actions-right > .card-content > .card-text')
            .should('be.visible').contains('Grant access to your shop through API Keys. Manage your existing key or create new ones.')
        cy.get('#apiKeys_edit_button')
            .should('be.visible')
    })
})