import { Reveal_User } from '/support/classes/User'

let User = {}
let new_audience = ""

describe('Audience Builder', function()
{
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

    it('Create and delete', function() {
        User.Goto('Audience Builder')
        cy.viewport(1300,1800)
    // select custom date 
        cy.get('.row > .col-lg-12 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner').click()
        cy.wait(1000)
        cy.get('#bs-select-2-7 > .text').click()
        // 01.01.2021 - 01.12.2022
        cy.get('.input-daterange-datepicker').click()
        cy.get('.numInput').type('2021')
        cy.get('.flatpickr-monthDropdown-months').select('0')
        cy.get('[aria-label="January 1, 2021"]').click()
        cy.get('.numInput').type('2022')
        cy.get('.flatpickr-monthDropdown-months').select('11')
        cy.get('[aria-label="December 1, 2022"]').click()
    // Build audience
        cy.get('.col-sm-4 > .btn').click()
        cy.get('form > :nth-child(1) > .w-100')
            .should('be.visible').should('contain','Now, name this audience')
        new_audience = "test" + random_char() 
        cy.get('#audience_builder_name').type(new_audience)
        function random_char() {
            var text = ""
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
            for (var i = 0; i < 7; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length))
            return text
        }
        cy.get('#audience_builder_save').click()
    // check audience was created
        cy.get('#build-audience-form-modal > .modal-dialog > .modal-content > .modal-header > .modal-title')
            .should('be.visible').should('contain','Great Job')
        cy.get('#build-audience-form-modal > .modal-dialog > .modal-content > .modal-header > .close').click()
        cy.get('table.audience-list').should('contain',new_audience)
    // delete audience
        cy.get(':nth-child(1) > :nth-child(5) > .delete-audience > .rv-delete').click()
        cy.get('#audience_delete_save').click()
        cy.wait(1000)
    })
})