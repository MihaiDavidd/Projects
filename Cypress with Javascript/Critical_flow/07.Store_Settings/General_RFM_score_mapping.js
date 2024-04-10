import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Store Settings', function() {
    before(function(){
        cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01";
			User = new Reveal_User(data[shopId])
		})
    })

    it('RFM Score Mapping', function() {
        User.Goto('General')
        cy.viewport(1300,1800)
    // Go to RFM Score Mapping
        cy.get('#rfmSMapping_edit_button > .rv-edit').should('be.visible').click()
    // check title
        cy.get('.page-title').should('be.visible').should('contain','RFM Score Mapping')
    // check button Update RFM Reports 
        if(Cypress.env('automation')) {
            cy.get('form > .btn').should('be.visible')
                .should('contain', 'Update RFM Reports')
        }
    // Check table header appears
        cy.get('.headings > :nth-child(1)')
            .should('be.visible').should('contain','Group Stats')
        cy.get('.headings > .d-none')
            .should('be.visible').should('contain','RFM Scores')
    // check chart appears
        cy.get(':nth-child(1) > .rfm-score-total')
            .should('be.visible')
        cy.get(':nth-child(1) > .rfm-score-card-container > #assigned-list')
            .should('be.visible')
    })
})