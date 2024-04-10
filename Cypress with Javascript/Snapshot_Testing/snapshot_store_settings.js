import { Reveal_User } from '/support/classes/User'
import { Reveal_Calendar } from '/support/classes/Calendar.js'

let User = {}
let Calendar = {}

describe('Reveal', function()
{
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
            Calendar = new Reveal_Calendar()
		})
	})

    it('Check all menu pages', function() {
        User.login_with_url()
        User.selectStore()
        Calendar.open()
        Calendar.selectAllTime()
    // Store Settings
    // General
        User.visit('General')
        cy.wait(5000)
        cy.percySnapshot('General')
        cy.wait(1000)
        cy.get('#npsSettings_edit_button').click()
        cy.wait(1000)
        cy.percySnapshot('General-NPS')
        cy.wait(500)
    // Billing
        User.visit('Billing')
        cy.wait(5000)
        cy.percySnapshot('Billing')
        cy.wait(1000)
        cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
    // Integrations
        User.visit('Integrations')
        cy.wait(5000)
        cy.percySnapshot('Integrations')
        cy.wait(1000)
        cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
    // Import
        User.visit('Import')
        cy.wait(5000)
        cy.percySnapshot('Import')
        cy.wait(1000)
        cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
    // Costs
        User.visit('Costs')
        cy.wait(5000)
        cy.percySnapshot('Costs')
        cy.wait(1000)
        cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
    // User management
        User.visit('User Management')
        cy.wait(5000)
        cy.percySnapshot('User Management')
        cy.wait(1000)
        cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
    })
})