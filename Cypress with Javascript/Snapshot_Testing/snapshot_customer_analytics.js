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
// Customer Analytics
    // Segmentation
        User.visit('Segmentation')
        cy.wait(5000)
        cy.percySnapshot('Segmentation')
        cy.wait(1000)
        cy.get(':nth-child(2) > .main-link > a').click()
    // Customer Lifetime Value
        User.visit('CLV')
        cy.wait(5000)
        cy.percySnapshot('CLV')
        cy.wait(1000)
        cy.get(':nth-child(2) > .main-link > a').click()
    // Retention
        User.visit('Retention')
        cy.wait(5000)
        cy.percySnapshot('Retention')
        cy.wait(1000)
        cy.get(':nth-child(2) > .main-link > a').click()
    // CRM
        User.visit('CRM')
        cy.wait(5000)
        cy.percySnapshot('CRM')
        cy.wait(1000)
        cy.get(':nth-child(2) > .main-link > a').click()
    // Cohort Analysis
        User.visit('Cohort Analysis')
        cy.wait(15000)
        cy.percySnapshot('Cohort Analysis')
        cy.wait(1000)
        cy.get(':nth-child(2) > .main-link > a').click()
    // CRM Marketplace 
        User.visit('CRM Marketplace')
        cy.wait(5000)
        cy.percySnapshot('CRM Marketplace')
        cy.wait(1000)
    })
})