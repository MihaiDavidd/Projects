import { Reveal_User } from '/support/classes/User.js'
import { Reveal_Calendar } from '/support/classes/Calendar.js'

let User = {}
let Calendar = {}

describe('Banner Alert for discrepancy', function()
{
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = "auchan"
			User = new Reveal_User(data[shopId])
            Calendar = new Reveal_Calendar()
            if(Cypress.env !='auchan'){
                this.skip()
            }
            User.Goto('Main')
		})
	}) 

    it('Check for alert banner to not appear yesterday', function() {
        cy.viewport(1600,3000)
        Calendar.open()
        Calendar.selectYesterday()
        cy.wait(10000)
        cy.get('.notice-text').should('not.be.visible')
        cy.wait(1000)
    })

    it('Check for alert banner to not appear in the last 7 days', function() {
        cy.viewport(1600,3000)
        Calendar.open()
        Calendar.selectLast7Days()
        cy.wait(10000)
        cy.get('.notice-text').should('not.be.visible')
        cy.wait(1000)
    })
})