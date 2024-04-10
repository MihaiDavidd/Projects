import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Store Settings', function() {
    before(function(){
        cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
    })

    it('RFM Groups', function() {
        User.Goto('General')
        cy.viewport(1300,1800)
    // Go to RFM Groups
        cy.get('#rfmGroups_edit_button').should('be.visible').click()
    // check title
        cy.get('.page-title').should('be.visible').should('contain','RFM Groups')
    // check text
        cy.get('p.text-muted').should('be.visible').should('contain','You can reorder, rename and delete current groups from the list below, or you can add a new group using the dedicated button.')
    // check button Add new group 
        if(Cypress.env('automation')) {
            cy.get('.col-sm-12 > .btn').should('be.visible')
                .should('contain', 'Add New Group')
        // Check group appears
            cy.get('[data-id="8"] > .list-item-content > .list-item-name > .form-item-name')
                .should('be.visible')
        }
    })
})