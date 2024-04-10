import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Audience Builder', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

    it('Calendar', function() {
        User.Goto('Audience Builder')
        cy.viewport(1300,1800)
    // select 90 days
        cy.get('.row > .col-lg-12 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner').click()
        cy.get('.dropdown-menu.inner.show').contains('.text', 'Last 90 days').click()
        cy.get('.row > .col-lg-12 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner')
            .should('be.visible').should('contain','Last 90 days')
        cy.wait(1000)
    // select 30 days 
        cy.get('.row > .col-lg-12 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner').click()
        cy.get('.dropdown-menu.inner.show').contains('.text', 'Last 30 days').click()
        cy.get('.row > .col-lg-12 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner')
            .should('be.visible').should('contain','Last 30 days')
        if(Cypress.env('automation')) 
        {
            cy.get('#audience_stats_customers')
                .should('be.visible').should('contain','0')
        }
    // select custom date 
        cy.get('.row > .col-lg-12 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner').click()
        cy.get('.dropdown-menu.inner.show').contains('.text', 'Custom date').click()
        // custom period
        cy.get('.date-picker-child > .ab-filter-title')
            .should('be.visible').should('contain','Custom Period')
        // 01.01.2021 - 01.12.2022
        cy.get('.input-daterange-datepicker').click()
        cy.get('.numInput').type('2021')
        cy.get('.flatpickr-monthDropdown-months').select('0')
        cy.get('[aria-label="January 1, 2021"]').click()
        cy.get('.numInput').type('2022')
        cy.get('.flatpickr-monthDropdown-months').select('11')
        cy.get('[aria-label="December 1, 2022"]').click()
        if(Cypress.env('automation')) 
        { 
            cy.get('#audience_stats_customers')
                .should('contain','118').should('be.visible')
        }        
    })
})