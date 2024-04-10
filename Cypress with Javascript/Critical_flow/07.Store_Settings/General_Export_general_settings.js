import { Reveal_User } from '/support/classes/User'

let User = {}

describe('General', function() {
    before(function(){
        cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
    })

    it('Export', function() {
        User.Goto('General')
        cy.viewport(1300,1800)
    // Go to Export General Settings
        cy.get('#exportGeneral_edit_button').should('be.visible').click()
    // Check title 
        cy.get('.page-title').should('be.visible').should('contain','Export Settings')
    // NPS Invitation Format
        cy.get('.element-nps_invitation_format > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','NPS Invitation Format')
        cy.get('.element-nps_invitation_format > .left-info > p')
            .should('be.visible').should('contain','The format(s) in which to export the NPS Invitations to be sent.')
    // RFM Customer Difference Window
        cy.get('.element-rfm_customer_diff_window > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','RFM Customer Difference Window')
        cy.get('.element-rfm_customer_diff_window > .left-info > p')
            .should('be.visible').should('contain','Customers who switched RFM scores in the last N days will be included in the RFM Customers Difference available to download via the API.')
    // RFM Customer Difference Format
        cy.get('.element-rfm_customer_diff_format > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','RFM Customer Difference Format')
        cy.get('.element-rfm_customer_diff_format > .left-info > p')
            .should('be.visible').should('contain','The format(s) in which to export the customers who switched RFM scores.')
    // RFM Customer Format
        cy.get('.element-rfm_customer_format > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','RFM Customer Format')
        cy.get('.element-rfm_customer_format > .left-info > p')
            .should('be.visible').should('contain','The format(s) in which to export the RFM Customers.')
    // Customer Profile Contact Email
        cy.get('.element-customer_profile_contact_email > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Customer Profile Contact Email')
        cy.get('.element-customer_profile_contact_email > .left-info > p')
            .should('be.visible').should('contain','The email address that will receive any errors related to Customer Profile Export.')
    // Customer Profile Klaviyo Export
        cy.get('.element-customer_profile_klaviyo_enabled > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Customer Profile Klaviyo Export')
        cy.get('.element-customer_profile_klaviyo_enabled > .left-info > p')
            .should('be.visible').should('contain','Choose whether or not the system will export customers to Klaviyo.')
        cy.get('.slider')
            .should('be.visible')
    })
})