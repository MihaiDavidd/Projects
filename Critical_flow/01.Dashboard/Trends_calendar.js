import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Trends Overview', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])   
		})
	})

    it('Calendar', function() {
        User.Goto('Trends Overview')
    // Select interval 01.01.2022 - 18.08.2022
        cy.get(':nth-child(1) > .filter-item-container > .calendar-selection-box-filters > .input-daterange-datepicker').click()
        cy.get('.arrowTop > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .flatpickr-monthDropdown-months')
            .select('January')
        cy.get('.open > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .numInputWrapper > .numInput')
            .type('2022')
        cy.get('[aria-label="January 1, 2022"]').click()
        cy.get('.open > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .numInputWrapper > .numInput')
            .type('2022')
        cy.get('.arrowTop > .flatpickr-months > .flatpickr-month > .flatpickr-current-month > .flatpickr-monthDropdown-months')
            .select('August')
        cy.get("[aria-label='August 18, 2022']").click()
    // Compare period
        cy.get(':nth-child(2) > .dropdown > .btn').click()
        cy.wait(500)
        cy.get('#bs-select-1-1').click({force: true})
        cy.wait(500)
    // check new date appears and compare
        cy.get('#prev-date-information').should('be.visible')
        cy.get(':nth-child(5) > .btn').click() 
    })
})