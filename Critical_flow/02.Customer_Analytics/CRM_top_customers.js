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

    it('CRM', function() {
        User.Goto('CRM')
    })

    it('Top Customers', function() {
        cy.viewport(1600,3000)
        Calendar.open()
        Calendar.selectLastYear() 
    // check table headers
        cy.get('#email').should('be.visible').should('contain','Email') 
        cy.get('#name').should('be.visible').should('contain','Name')
        cy.get('#rfm_score').should('be.visible').should('contain','RFM Score')
        cy.get('#rfm_group_name').should('be.visible').should('contain','RFM Group Name')
        cy.get('#orders').should('be.visible').should('contain','Orders')
        if(Cypress.env('automation')) {
            cy.get('#revenue').should('be.visible').should('contain','Revenue').should('contain', Shop.getFormattedCurrency())
        } else {
            cy.get('#revenue > .head-data > .head-name').should('be.visible').should('contain','Revenue')
            cy.get('#revenue > .head-data > .units').should('contain', Shop.getFormattedCurrency())
        }        
        cy.get('#margin').should('be.visible').should('contain','Margin').should('contain', Shop.getFormattedCurrency())
    // check table content appears
        if(Cypress.env('automation')) {
            cy.get('#row_1').should('be.visible').should('contain','841a8c688f0b3081c9ed63f1dc348294@example.org')
            cy.get('#row_1 > :nth-child(2)').should('be.visible').should('contain','Bernadette Berge')
            cy.get('#row_1 > :nth-child(3)').should('be.visible').should('contain','214')
            cy.get('#row_1 > :nth-child(4)').should('be.visible').should('contain','About to dump you')
            cy.get('#row_1 > :nth-child(5)').should('be.visible').should('contain','1')
            cy.get('#row_1 > :nth-child(6)').should('be.visible').should('contain','163.97')
            cy.get('#row_1 > :nth-child(7)').should('be.visible').should('contain','94.63')
        }  
    })
})