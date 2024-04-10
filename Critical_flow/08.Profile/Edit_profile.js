import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Store Settings', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
            let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
            if (Cypress.env ('shopId')==='demo01Stage') {
                this.skip()
            }
            cy.clearAllCookies()
		})
	})

    it('Edit Profile', function() {
        User.login_with_url()
        User.selectStore()
    // Go to Edit profile
        cy.get('#dropdownProfileToggle')
            .should('be.visible').click()
        cy.get('.dropdown-menu > ul > :nth-child(1) > .dropdown-item')
            .should('be.visible').click()
    // Check title
        cy.get('.page-title')
            .should('be.visible').should('contain','Edit Profile')
    // Personal Info
        cy.get(':nth-child(1) > .nav-link')
            .should('be.visible').should('contain','Personal Info')
        cy.get(':nth-child(1) > .required')
            .should('be.visible').should('contain','Email')
        cy.get('#profile_info_email')
            .should('be.visible')
        cy.get(':nth-child(2) > .required')
            .should('be.visible').should('contain','Name')
        cy.get('#profile_info_name')
            .should('be.visible')
        cy.get(':nth-child(3) > .required')
            .should('be.visible').should('contain','Language')
        cy.get('#profile_info_locale')
            .should('be.visible')
    // Save button
        cy.get('#settings')
            .should('be.visible').should('contain','Save')
    // Password
        cy.get(':nth-child(2) > .nav-link')
            .should('be.visible').should('contain','Password').click()
        cy.get(':nth-child(1) > .required')
            .should('be.visible').should('contain','Current password')
        cy.get('#profile_password_current_password')
            .should('be.visible')
        cy.get(':nth-child(2) > .required')
            .should('be.visible').should('contain','New password')
        cy.get('#profile_password_plainPassword_first')
            .should('be.visible')
        cy.get(':nth-child(3) > .required')
            .should('be.visible').should('contain','Repeat new password')
        cy.get('#profile_password_plainPassword_second')
            .should('be.visible')
    // Save button
        cy.get('#settings')
            .should('be.visible').should('contain','Save')
    })
})