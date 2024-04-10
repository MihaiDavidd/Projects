import { Reveal_User } from '/support/classes/User'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Shop = {}

describe('Store Settings', function() {
    before(function(){
        cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Shop = new Reveal_Shop(data[shopId])
		})
    })

    it('API Keys', function() {
        User.Goto('General')
        cy.viewport(1300,1800)
    // Go to Api Keys
        cy.get('#settings > :nth-child(1) > a').click()
    // API Keys
        cy.get('#apiKeys_edit_button').should('be.visible').click()
    // Check title 
        cy.get('.page-title').should('be.visible').should('contain','API Keys')
    // Add new API Key
        if (Shop.isStage()) {
            cy.get('.col-12 > .btn')
                .should('be.visible').should('contain','Add new API Key')
        } else 
            cy.get('.no-shops > div > .btn')
                .should('be.visible').should('contain','Add new API Key')
        if(!Shop.hasApiKeys()) {   
                cy.get('.no-shops > div > h5').should('contain','No API Keys are associated with your shop at the moment')
        } else {
        // Check entries
                cy.get('#DataTables_Table_0_length > label').should('be.visible').should('contain','Show')
                cy.get('#DataTables_Table_0_info').should('be.visible')
        // Check Table headers
                cy.get('.sorting_asc').should('be.visible').should('contain','API Key Name')
                cy.get('.sorting_disabled').should('be.visible').should('contain','API Key')
                cy.get('.sorting_disabled').should('be.visible').should('contain','Connection Token')
                cy.get('.sorting').should('be.visible').should('contain','Created at')
        // Check button 
                cy.get('.rv-edit-fill').should('be.visible')
                cy.get('.rv-delete-fill').should('be.visible')
                cy.get('.rv-copy-fill').should('be.visible')
        }
    })     
})