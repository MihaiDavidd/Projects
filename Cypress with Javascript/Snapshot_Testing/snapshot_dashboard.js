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
    // Dashboard Main
        cy.wait(10000)
        cy.percySnapshot('Dashboard Main')
        cy.wait(1000)
        cy.get('#chart-revenue_margin_by_customer_type-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click()
        cy.wait(5000)
        cy.percySnapshot('Dashboard Main Discover')
        cy.wait(1000)
        cy.closeDiscovery()
        cy.wait(1000)
        cy.get('#chart-revenue_margin_by_customer_type-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click()
        cy.wait(5000)
        cy.percySnapshot('Dashboard Main Zoom')
        cy.wait(1000)
        cy.closeZoom()
        cy.wait(500)
        cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click()
        cy.wait(5000)
        cy.percySnapshot('Dashboard Main Tips')
        cy.wait(1000)
    //Trends Overview 
        User.visit('Trends Overview')
        cy.wait(5000)
        cy.percySnapshot('Dashboard Trends Overview')
        cy.wait(1000)
    // Vendor Overview 
        User.visit('Vendor Overview')
        cy.wait(5000)
        cy.percySnapshot('Dashboard Vendor Overview')
        cy.wait(1000)
    })
})