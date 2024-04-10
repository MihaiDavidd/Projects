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
    // Product Performance
    // Catalog Performance
        User.visit('Catalog Performance')
        cy.wait(5000)
        cy.percySnapshot('Catalog Performance')
        cy.wait(1000)
        cy.get(':nth-child(3) > .main-link > a').click()
    // Brand Performance
        User.visit('Brand Performance')
        cy.wait(5000)
        cy.percySnapshot('Brand Performance')
        cy.wait(1000)
        cy.get(':nth-child(3) > .main-link > a').click()
    // Category Performance
        User.visit('Category Performance')
        cy.wait(5000)
        cy.percySnapshot('Category Performance')
        cy.wait(1000)
        cy.get(':nth-child(3) > .main-link > a').click()
    // Buying Habits
        User.visit('Buying Habits')
        cy.wait(10000)
        cy.percySnapshot('Buying Habits')
        cy.wait(1000)
    })
})