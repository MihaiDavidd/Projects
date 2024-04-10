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

    it('Order Status Mapping', function() {
        User.Goto('General')
        cy.viewport(1300,1800)
    // Click edit Order Status Mapping 
        cy.get('#orderStatus_edit_button').click()
    // Check title 
        cy.get('.page-title').should('be.visible').should('contain','Order Status Mapping')
    // Check headers
        cy.get('.label-th').should('be.visible').should('contain',"Your System's Status")
        cy.get('.input-th').should('be.visible').should('contain',"Reveal's Status")
    // Check dropdown elements 
        cy.get('.element-0 > .right-inputs > .input-labe-same-line > .dropdown > .btn').click()
        cy.get('#bs-select-1-0').should('be.visible').should('contain',"pending")
        cy.get('#bs-select-1-1').should('be.visible').should('contain',"delivered")
        cy.get('#bs-select-1-2').should('be.visible').should('contain',"shop_canceled")
        cy.get('#bs-select-1-3').should('be.visible').should('contain',"customer_canceled")
        cy.get('#bs-select-1-4').should('be.visible').should('contain',"returned")
        cy.get('#bs-select-1-5').should('be.visible').should('contain',"ignored")
        cy.get('.page-title').click()
    // Button Recalculate Reports 
        cy.get('form > .btn').should('be.visible').should('contain','Recalculate Reports').should('not.be.enabled')
        if(Cypress.env('automation') === true) {
        // Save button 
            cy.get('.actions-custom-group > #settings').should('be.visible').should('contain','Save')
        // Modify a dropdown and see if button enabled
            cy.get('.element-0 > .right-inputs > .input-labe-same-line > .dropdown > .btn').click() 
            cy.get('#bs-select-1-5').click()
            cy.get('.actions-custom-group > #settings').click()
            cy.wait(1000)
            cy.get('form > .btn').should('be.visible').should('be.enabled')
            cy.get('.element-0 > .right-inputs > .input-labe-same-line > .dropdown > .btn').click() 
            cy.get('#bs-select-1-1').click()
            cy.wait(1000)
            cy.get('.actions-custom-group > #settings').click()
            cy.get('form > .btn').should('be.visible').should('not.be.enabled')
        }
    //Check span text for other elements
        cy.get('#order_status_map_settings_os_map').children('.custom-group')
            .each(element => {
                cy.get(element).find('.dropdown')
                    .should('contain',"pending")
                    .should('contain',"delivered")
                    .should('contain',"shop_canceled")
                    .should('contain',"customer_canceled")
                    .should('contain',"returned")
                    .should('contain',"ignored")
            })
    })

    it('System Status', function() {
        if(Cypress.env('automation')) {
            // Delivered
                cy.get('.element-0 > .right-inputs > .label-info-right > label')
                    .should('be.visible').should('contain','Delivered')
            // Client canceled
                cy.get('.element-1 > .right-inputs > .label-info-right')
                    .should('be.visible').should('contain','client canceled')
            // Delivered courier
                cy.get('.element-2 > .right-inputs > .label-info-right')
                    .should('be.visible').should('contain','delivered courier') 
            // Delivered pickup-box
                cy.get('.element-3 > .right-inputs > .label-info-right')
                    .should('be.visible').should('contain','delivered pickup-box')
            // Returned
                cy.get('.element-4 > .right-inputs > .label-info-right')
                    .should('be.visible').should('contain','returned')
        } else if (Shop.isDemo01()) {
        // Canceled 
            cy.get('.element-0 > .right-inputs > .label-info-right')
                .should('be.visible').should('contain','canceled')
        // Client canceled
            cy.get('.element-1 > .right-inputs > .label-info-right')
                .should('be.visible').should('contain','client canceled')
        // Delivered courier
            cy.get('.element-2 > .right-inputs > .label-info-right')
                .should('be.visible').should('contain','delivered courier')
        // Delivered pickup-box
            cy.get('.element-3 > .right-inputs > .label-info-right')
                .should('be.visible').should('contain','delivered pickup-box')
        // Error 
            cy.get('.element-4 > .right-inputs > .label-info-right')
                .should('be.visible').should('contain','error')
        // Open
            cy.get('.element-5 > .right-inputs > .label-info-right')
                .should('be.visible').should('contain','open')
        // Payment processing
            cy.get('.element-6 > .right-inputs > .label-info-right')
                .should('be.visible').should('contain','payment processing')
        // Ready 
            cy.get('.element-7 > .right-inputs > .label-info-right')
                .should('be.visible').should('contain','ready')
        // Refused
            cy.get('.element-8 > .right-inputs > .label-info-right')
                .should('be.visible').should('contain','refused')
        // Returned
            cy.get('.element-9 > .right-inputs > .label-info-right')
                .should('be.visible').should('contain','returned')
        // Waiting courier
            cy.get('.element-10 > .right-inputs > .label-info-right')
                .should('be.visible').should('contain','waiting courier')
        // Waiting supplier
            cy.get('.element-11 > .right-inputs > .label-info-right')
                .should('be.visible').should('contain','waiting supplier')
        // Check Save button
            cy.get('.actions-custom-group > #settings')
                .should('be.visible').should('contain','Save')
        }
    })
})