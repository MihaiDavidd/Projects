import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Audience Builder', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

    it('Data', function() {
        User.Goto('Audience Builder')
        cy.viewport(1300,1800)
        cy.wait(500)
    // check titles and info appears
        cy.get('.page-title')
            .should('be.visible').should('contain','Audience Builder')
        cy.get('.page-title-box > p')
            .should('be.visible').should('contain',"It's time to address your customers differently")
    // Tooltip info
        cy.get('p > .mr-1 > .fa').click()
        cy.tooltip("To run Facebook ads for a custom audience, Facebook recommends a minimum of 1000 people in that audience.")
        cy.tooltip("To create a lookalike audience in your Facebook Ads Manager, a minimum source audience size of 100 people is needed, but Facebook recommends setting it higher. The more people in your source audience, the more people Facebook can find who look like them.")
        cy.tooltip("Please keep in mind that not all your existing customers would be linked to a Facebook profile, based on their recorded email address, so having 100 or 1000 customers in your Reveal audience does not necessarily mean you’re having a 100 or 1000 Facebook users audience.")
        cy.get('.page-title').click()
    })

    it('Build a new Audience', function() { 
        cy.viewport(1600,4000) 
        cy.get('.pt-0').should('be.visible').should('contain','Build a new Audience')
        cy.get('.mb-3.pl-3').should('be.visible').should('contain','Use the filters below to create your custom audience')
        cy.get('.d-flex > .mr-1 > .fa').click()
        cy.tooltip('"Custom date" allows a specific time frame selection. All the other options are dynamic and refer to past 24 hours, or past 24 X 3 / 7 / 14 / 30 / 90 hours. The audiences will be updated daily, based on the new orders that are being mapped as delivered.')
        cy.get('.page-title').click()
    // Table data 
        cy.get('.row > .col-lg-12 > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner')
            .should('be.visible').should('contain','Please select a time period')
        cy.get('.col-lg-12 > .ab-filter-title')
            .should('be.visible').should('contain','Filter by')
        cy.get('#rfm_groups > .col-lg-12 > .d-flex > .ab-filter-title')
            .should('be.visible').should('contain','RFM Groups')
        cy.get('#nps_scores_pre > .col-lg-12 > .d-flex > .ab-filter-title')
            .should('be.visible').should('contain','NPS Pre scores')
        cy.get('#nps_scores_post > .col-lg-12 > .d-flex > .ab-filter-title')
            .should('be.visible').should('contain','NPS Post scores')
        cy.get('#categories > .col-lg-12 > .d-flex > .ab-filter-title')
            .should('be.visible').should('contain','Categories')
        cy.get('#brands > .col-lg-12 > .d-flex > .ab-filter-title')
            .should('be.visible').should('contain','Brands')
        cy.get('#products > .col-lg-12 > .d-flex')
            .should('be.visible').should('contain','Products')
        cy.get('#billing_countries > .col-lg-12 > .d-flex > .ab-filter-title')
            .should('be.visible').should('contain','Billing country')
        cy.get('#billing_cities > .col-lg-12 > .d-flex > .ab-filter-title')
            .should('be.visible').should('contain','Billing city')
        cy.get('.col-lg-12 > .ml-1')
            .should('be.visible').should('contain','Marketing Consent')
    // check pages text
        cy.get('#DataTables_Table_0_previous').should('be.visible').should('contain','Previous')
        cy.get('.active > .page-link').should('be.visible').should('contain','1')
        cy.get('#DataTables_Table_0_next > .page-link').should('be.visible').should('contain','Next')
    })

    it('Audience Preview Based On Applied Filters', function() { 
        cy.get('.audience-preview > h5.card-title')
            .should('be.visible').should('contain','Audience Preview Based On Applied Filters')
        cy.get('#audience_stats_customers_wrapper > .audience-builder-text')
            .should('be.visible').should('contain','Customers')
        cy.get('#audience_stats_revenue_wrapper > .audience-builder-text')
            .should('be.visible').should('contain','Revenue')
        cy.get('#audience_stats_margin_wrapper > .audience-builder-text')
            .should('be.visible').should('contain','Margin')
        cy.get('#audience_stats_clv_wrapper > .audience-builder-text')
            .should('be.visible').should('contain','Revenue / Customer')
        cy.get('.col-sm-4 > .btn')
            .should('be.visible').contains('Build audience')
    })

    it('Audiences', function() { 
        if(Cypress.env('shopId') === 'auchan') {
            cy.get(':nth-child(4) > .col-12 > .effect-shadow-level1 > .card-title')
                .should('be.visible').should('contain','Audiences')
        } else 
            cy.get(':nth-child(3) > .col-12 > .effect-shadow-level1 > .card-title')
                .should('be.visible').should('contain','Audiences') 
            cy.get('#DataTables_Table_0_length > label')
                .should('be.visible').should('contain','Show')
            cy.get('thead > tr > :nth-child(2)')
                .should('be.visible').should('contain','Integrations')
            cy.get('[style="width: 45%;"]')
                .should('be.visible').should('contain','Name')
            cy.get('[style="width: 35%;"]')
                .should('be.visible').should('contain','Size')
            cy.get('[style="width: 10%;"]')
                .should('be.visible').should('contain','Actions')
    })
})