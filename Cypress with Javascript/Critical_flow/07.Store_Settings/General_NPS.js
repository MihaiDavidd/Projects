import { Reveal_User } from '/support/classes/User'

let User = {}

describe('General', function() {
    before(function(){
        cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
    })

    it('NPS', function() {
        User.Goto('General')
        cy.viewport(1300,3000)
    // Go to NPS
        cy.get('#npsSettings_edit_button').should('be.visible').click()
    // Check title 
        cy.get('.page-title').should('be.visible').should('contain','NPS Settings')
    //  Invitation Timeout for Sending [days]
        cy.get('.element-invitation_timeout_send > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','Invitation Timeout for Sending [days]')
        cy.get('.element-invitation_timeout_send > .left-info > p')
            .should('be.visible').should('contain','The number of days after which an invitation will not be sent anymore if not sent yet. This is to avoid sending NPS invitations for orders fulfilled a long time ago.')
    // Invitation Timeout for Responding [days]
        cy.get('.element-invitation_timeout_respond > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','Invitation Timeout for Responding [days]')
        cy.get('.element-invitation_timeout_respond > .left-info > p')
            .should('be.visible').should('contain',"The number of days after the customer received the email invitation, in which the customer can respond. This is to prevent collecting opinions that are not fresh in the customer's mind, thus less accurate.")
    // Invitation Capping Status
        cy.get('.element-invitation_capping_enabled > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Invitation Capping Status')
        cy.get('.element-invitation_capping_enabled > .left-info > p')
            .should('be.visible').should('contain','Limit the number of emails sent to a customer in a given period, configured via "invitation capping interval".')
        cy.get('.element-invitation_capping_enabled > .right-inputs > .form-check-toggle > .switch > .slider')
            .should('be.visible')
    // Invitation Capping Interval [hours]
        cy.get('.element-invitation_capping_interval > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','Invitation Capping Interval [hours]')
        cy.get('.element-invitation_capping_interval > .left-info > p')
            .should('be.visible').should('contain','The period that is subjected to a limitation/throttling. A customer may receive only one NPS invitation during this period.')
    // Invitation Capping Winning Criteria
        cy.get('.element-invitation_capping_winner > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','Invitation Capping Winning Criteria')
        cy.get('.element-invitation_capping_winner > .left-info > p')
            .should('be.visible').should('contain','The criteria by which an invitation gets to be sent over other candidate invitations in the same day.')
        cy.get('.element-invitation_capping_winner > .right-inputs > .dropdown > .btn')
            .should('be.visible')
    // Channel
        cy.get('.element-invitation_channel > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','Channel')
        cy.get('.element-invitation_channel > .left-info > p')
            .should('be.visible').should('contain','Generate invitations only for orders that have at least one order line bought through this channel. By default is All which means that the channel is ignored.')
        cy.get('.element-invitation_channel > .right-inputs > .dropdown > .btn')
            .should('be.visible')
    // Survey Presented on Client Website
        cy.get('.element-survey_presenter_client > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Survey Presented on Client Website')
        cy.get('.element-survey_presenter_client > .left-info > p')
            .should('be.visible').should('contain','When enabled, the NPS Survey will be displayed on your website. When disabled, the NPS Survey will be displayed within a Reveal page, much like an external static survey for your website.')
        cy.get('.element-survey_presenter_client > .left-info > p')
            .should('be.visible')
    // Valid NPS - Redirect URL
        cy.get('.element-survey_path_valid > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','Valid NPS - Redirect URL')
        cy.get('.element-survey_path_valid > .left-info > p')
            .should('be.visible').should('contain','The URL the customer will be redirected to after deciding to accept an NPS invitation and fill out an NPS survey, in the eventuality the invitation is still valid.')
    // Expired NPS - Redirect URL
        cy.get('.element-survey_path_expired > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','Expired NPS - Redirect URL')
        cy.get('.element-survey_path_expired > .left-info > p')
            .should('be.visible').should('contain','The URL the customer will be redirected to after deciding to accept an NPS invitation and fill out an NPS survey, in the eventuality the invitation has expired (meaning the "invitation timeout respond" has passed).')
    // Consumed NPS - Redirect URL
        cy.get('.element-survey_path_consumed > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','Consumed NPS - Redirect URL')
        cy.get('.element-survey_path_consumed > .left-info > p')
            .should('be.visible').should('contain','The URL the customer will be redirected to after deciding to accept an NPS invitation and fill out an NPS survey, in the eventuality he/she has already responded to the survey.')
    // NPS Survey ID - Pre-delivery
        cy.get('.element-pre_survey_id > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','NPS Survey ID - Pre-delivery')
        cy.get('.element-pre_survey_id > .left-info > p')
            .should('be.visible').should('contain','The Omniconvert CRO Platform Survey ID that captures the NPS before the delivery, typically on the website, in the "Thank you" page.')
    // NPS Survey ID - Post-delivery
        cy.get('.element-survey_id > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','NPS Survey ID - Post-delivery')
        cy.get('.element-survey_id > .left-info > p')
            .should('be.visible').should('contain','The Omniconvert CRO Platform Survey ID that captures the NPS after the delivery, typically via an email invitation.')
    // Invitation Delay Interval [hours]
        cy.get('.element-invitation_delay_interval > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','Invitation Delay Interval [hours]')
        cy.get('.element-invitation_delay_interval > .left-info > p')
            .should('be.visible').should('contain','The delay with which the NPS invitations will be generated after the order fulfillment.')
    // Invitation Delay Type
        cy.get('.element-invitation_delay_type > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','Invitation Delay Type')
        cy.get('.element-invitation_delay_type > .left-info > p')
            .should('be.visible').should('contain','The delay with which the NPS invitations will be generated after the order fulfillment.')
    // Generate Invitation only if the customer accepted marketing communications
        cy.get('.element-invitation_consent_enabled > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Generate Invitation only if the customer accepted marketing communications')
        cy.get('.element-invitation_consent_enabled > .left-info > p')
            .should('be.visible').should('contain',"When Enabled, we will generate NPS Invitation only if the customer has the field accepts_marketing set and true. When Disabled we don't check any consent condition.")
        cy.get('.element-invitation_consent_enabled > .right-inputs > .form-check-toggle > .switch > .slider')
            .should('be.visible')
    // NPS Sending Enabled
        cy.get('.element-sending_enabled > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','NPS Sending Enabled') 
        cy.get('.element-sending_enabled > .left-info > p')
            .should('be.visible').should('contain','Choose whether or not the system will send the NPS invitations.')
        cy.get('.element-sending_enabled > .right-inputs > .form-check-toggle > .switch > .slider')
            .should('be.visible')
    // Sending Contact Email
        cy.get('.element-sending_contact_email > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Sending Contact Email')
        cy.get('.element-sending_contact_email > .left-info > p')
            .should('be.visible').should('contain','The email address that will receive any errors related to NPS.This address will also receive daily NPS invitations, as a means to check the email content.')
    // Sending Provider
        cy.get('.element-sending_provider > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Sending Provider')
        cy.get('.element-sending_provider > .left-info > p')
            .should('be.visible').should('contain','The service provider that is used to send the emails.')
    // Scheduled Sending Time
        cy.get('.element-sending_schedule_at > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Scheduled Sending Time')
        cy.get('.element-sending_schedule_at > .left-info > p')
            .should('be.visible').should('contain','When to send the email, in the timezone configured under General Settings.')
    // Save Button
        cy.get('.actions-custom-group > #settings')
            .should('be.visible').should('be.enabled').should('contain','Save')
    })
})