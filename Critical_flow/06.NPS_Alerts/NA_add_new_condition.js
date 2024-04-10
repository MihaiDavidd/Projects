import { Reveal_User } from '/support/classes/User'

let User = {}

describe('NPS Alert', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

    it('NPS Alert page', function() {
        User.Goto('NPS Alert')
        cy.viewport(1300,3000)
    // Check title 
        cy.get('.page-title')
            .should('be.visible').should('contain','NPS Alert')
    // Check button Add New Condition
        cy.get('#add-new-conditions')
            .should('be.visible').should('contain','Add New Condition')
    })

    it('Add new condition', function() {
        if(Cypress.env('automation')) {
            cy.get('#add-new-conditions > span').click()
        // Add a ticket name
            cy.get('.gtc-item > :nth-child(1) > :nth-child(1) > .card > .justify-content-between > .d-flex > .card-title')
                .should('be.visible')
            cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > .card > .justify-content-between > .d-flex > .rv-edit')
                .should('be.visible').type('test')
            cy.get('.page-title').click()
        // Check info text
            cy.get('.gtc-item > :nth-child(1) > :nth-child(1) > .card > :nth-child(2)')
                .should('be.visible').should('contain','Choose when Reveal should create a ticket.')
            cy.get('.gtc-item > :nth-child(1) > :nth-child(1) > .card > :nth-child(3)')
                .should('be.visible').should('contain','The combination of conditions uses the "AND" rule. Tickets will be created only for customers that match all set conditions, simultaneously.')
        // Check text of options
            cy.get('.fb-filter-title')  
                .should('be.visible').should('contain','RFM Groups')
            cy.get('.fb-filter-title')
                .should('be.visible').should('contain','NPS Pre scores')
            cy.get('.fb-filter-title')
                .should('be.visible').should('contain','NPS Post scores')
            cy.get('.gtc-item > :nth-child(1) > :nth-child(1) > .card > .align-items-end > :nth-child(4) > .d-flex > .fb-filter-title')
                .should('be.visible').should('contain','Start sending tickets from:')
            cy.get('.gtc-item > :nth-child(1) > :nth-child(1) > .card > .align-items-end > .col-xl-1.col-lg-6 > .fb-filter-title')
                    .should('be.visible').should('contain','Provider')
        // Check tooltip
            cy.get('.gtc-item > :nth-child(1) > :nth-child(1) > .card > .align-items-end > :nth-child(4) > .d-flex > .mr-1 > .fa').eq(0).click()
            cy.get('.tooltip-inner')
                .should('be.visible').should('contain','How would you like to create support tickets about NPS scores related to past orders?')
            cy.get('.page-title').click()
        // Check on/off switch buttons
            // Include RFM Groups tag
            cy.get('.gtc-item > :nth-child(1) > :nth-child(1) > .card > :nth-child(5) > :nth-child(1) > .col-lg-12 > div > label')
                .should('be.visible').should('contain','Include RFM Groups tag')
            cy.get(':nth-child(1) > .col-lg-12 > div > .switchery').eq(0).click()
            // Include NPS Groups tag
            cy.get('.gtc-item > :nth-child(1) > :nth-child(1) > .card > :nth-child(5) > :nth-child(2) > .col-lg-12 > div > label')
                .should('be.visible').should('contain','Include NPS Groups tag')
            cy.get(':nth-child(2) > .col-lg-12 > div > .switchery').eq(0).click()
            // Include Order Attributes tag
            cy.get('.gtc-item > :nth-child(1) > :nth-child(1) > .card > :nth-child(5) > :nth-child(3) > .col-lg-12 > div > label')
                .should('be.visible').should('contain','Include Order Attributes tag')
            cy.get(':nth-child(3) > .col-lg-12 > div > .switchery').eq(0).click()
        // Check Filters
            // RFM Groups
            cy.get('.selection-box-filters').eq(0).click()
            cy.get('.mb-3')
                .should('be.visible').should('contain','Set your view')
            cy.get('div.card-box.multiSeries-selection.pl-1.pt-1.pb-1.mb-0 > div:nth-child(1) > label')
                .should('be.visible').should('contain','Lover')
            cy.get('[data-rank="1"]').eq(0).click()
            cy.get('.d-flex > .btn').eq(0).click()
            // NPS Pre scores
            cy.get('.selection-box-filters').eq(1).click()
            cy.get('.col-12 > span').should('be.visible').should('contain','NPS Pre')
            cy.get('.card-box > :nth-child(11)').contains('10').click()
            cy.get('.d-flex > .btn').eq(1).click()
            // NPS Post scores
            cy.get('.selection-box-filters').eq(2).click()
            cy.get('.col-12 > span')
                .should('be.visible').should('contain','NPS Post')
            cy.get('.card-box > :nth-child(11)')
                .should('be.visible').should('contain','10')
            cy.get('[data-id="10"]').eq(3).click()
            cy.get('.d-flex > .btn').eq(2).click()
            // Select interval 90 days
            cy.get(':nth-child(4) > .dropdown > .btn').eq(0).click()
            if(Cypress.env('automation') === true) {
                cy.get('#bs-select-9-6 > .text').click()
            } else  { 
                cy.get('#bs-select-7-6 > .text').click({force:true})
            }
            // Provider Gorgias 
            cy.get('.col-xl-1.col-lg-6 > .dropdown > .btn').eq(0).click()
            if(Cypress.env('automation')) {
                cy.get('#bs-select-10-0 > .text').click()
            } else { 
                cy.get('#bs-select-8-0 > .text').click()
            }
            cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > .card > :nth-child(6) > .gor-provider > .bg-warning')
                .should('be.visible').should('contain','Gorgias is not yet integrated')
            cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > .card > :nth-child(6) > .gor-provider > .bg-warning > .col-lg-3 > .btn')
                .should('be.visible').should('contain','Integrate now')
            // Provider Klaviyo
            cy.get('.col-xl-1.col-lg-6 > .dropdown > .btn').eq(0).click()
            if(Cypress.env('automation')) {
            cy.get('#bs-select-10-1 > .text').click()
            } else {
                cy.get('#bs-select-4-1 > .text').click()
            }
            cy.get('.gtc-item > :nth-child(1) > :nth-child(1) > .card > .align-items-end > :nth-child(6) > .email_input').eq(0)
                .type('test@test.com')
            cy.get('.gtc-item > :nth-child(1) > :nth-child(1) > .card > .align-items-end > :nth-child(6) > .d-flex > .fb-filter-title')
                .should('be.visible').should('contain','Emails who want to receive alerts')
            cy.get('.gtc-item > :nth-child(1) > :nth-child(1) > .card > .align-items-end > :nth-child(6) > .d-flex > .mr-1 > .fa').eq(0).click()
            cy.get('.tooltip-inner')
                .should('be.visible').should('contain','Where do you want to send the alerts triggered by this condition? Add one or more emails separated by semicolon. Example: contact@omniconvert.com;alerts@gmail.com')
            cy.get('.page-title').click()
            cy.wait(500)
            // Save button 
            cy.get('.gtc-item > :nth-child(1) > :nth-child(1) > .card > .align-items-end > .col-md-2 > .btn')
                .eq(0).should('be.visible').should('be.enabled').click()
            //delete condition
            cy.get('.gtc-item > :nth-child(1) > :nth-child(1) > .card > .justify-content-between > .rv-delete')
                .should('be.visible')
            cy.get('.gtc-item > :nth-child(1) > :nth-child(1) > .card > .justify-content-between > .rv-delete').eq(0).click()
            cy.get('.modal-title')
                .should('be.visible').should('contain','Delete confirmation')
            cy.get('.modal-body > .text-center')
                .should('be.visible').should('contain','Are you sure you want to delete this ticket?')
            cy.get('#delete-button')
                .should('be.visible').click({force:true})
        }
    })
})