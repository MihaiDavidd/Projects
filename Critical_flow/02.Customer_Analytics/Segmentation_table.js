import { Reveal_User } from '/support/classes/User'
import { Reveal_Calendar } from '/support/classes/Calendar'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Calendar = {}
let Shop = {}

describe('Customer Analytics', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Shop = new Reveal_Shop(data[shopId])
			Calendar = new Reveal_Calendar()
		})
	})

    it('Segmentation', function() {
        User.Goto('Segmentation')
    })

    it('RFM Segmentation', function() {
        cy.viewport(1600,3500)
        Calendar.open()
        Calendar.selectLastYear()
    // Check title 
        cy.get('#chart-revenue_margin_by_rfm-aggregated-table')
            .should('be.visible').should('contain','RFM Segmentation')
    // check table header
        cy.get('#group').should('be.visible').should('contain','Group')
        cy.get('#customers').should('be.visible').should('contain','Customers')
        cy.get('#margin').should('be.visible').should('contain','Margin').should('contain', Shop.getFormattedCurrency())
        if(Cypress.env('automation')) {
            cy.get('#revenue').should('be.visible').should('contain','Revenue').should('contain', Shop.getFormattedCurrency())
        } 
        else {
            cy.get('#revenue > .head-data > .head-name').should('contain','Revenue')
            cy.get('#revenue > .head-data > .units').should('contain', Shop.getFormattedCurrency())
        }
    // check table data 
        if(Cypress.env('automation')) {
            cy.get('#row_6').should('be.visible').should('contain','About to dump you')
            cy.get('#row_6 > :nth-child(2)').should('be.visible').should('contain','25')
            cy.get('#row_6 > :nth-child(3)').should('be.visible').should('contain','99,440.30')
        }
    })
})