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
    // Customer Experience
        User.visit('Customer Experience')
        cy.wait(10000)
        cy.percySnapshot('Customer Experience')
        cy.wait(1000)
    // Audience Builder
        User.visit('Audience Builder')
        cy.wait(10000)
        cy.percySnapshot('Audience Builder')
        cy.wait(1000)
    // NPS Alert
        User.visit('NPS Alert')
        cy.wait(10000)
        cy.percySnapshot('NPS Alert')
        cy.wait(1000)
    })
})