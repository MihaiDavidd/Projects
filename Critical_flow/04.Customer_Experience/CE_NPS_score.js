import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Customer Experience', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

    it('NPS Score', function() {
        User.Goto('Customer Experience')
        cy.viewport(1300,3000)
        cy.wait(2000)
    // header appear
        cy.get('#chart-nps_score-aggregated-custom_knob > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').should('contain','NPS Score')    
    // tooltip
        cy.get('#chart-nps_score-aggregated-custom_knob > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.get('.tooltip-inner').should('be.visible').should('contain','aggregated')
    // Discovery
        cy.get('#chart-nps_score-aggregated-custom_knob > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-nps_score-aggregated-custom_knob > .modal-dialog > .modal-content > div')
            .should('be.visible').should('contain','The Net Promoter Score (NPS), measures customer experience and predicts business growth')
        cy.closeDiscovery()
    // Tips
        cy.get('#chart-nps_score-aggregated-custom_knob > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click({force:true})
        cy.get('#chart-nps_score-aggregated-custom_knob > .card > .tuts-steps > ul > :nth-child(1) > .form-check > .form-check-label')
            .should('be.visible').should('contain','Come up with a strategy to get amplified by promoters through personalized experiences')
        cy.get('#chart-nps_score-aggregated-custom_knob > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click({force:true})
    // NPS Score
    // header appear
        cy.get('#chart-nps_score-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart')
            .should('be.visible').should('contain','NPS Score')    
    // tooltip
        cy.get('#chart-nps_score-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info').click({force:true})
        cy.get('.tooltip-inner').should('be.visible').should('contain','timeline')
    // Tips
        cy.get('#chart-nps_score-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click({force:true})
        cy.get('#chart-nps_score-timeline-line > .card > .tuts-steps > ul > :nth-child(1) > .form-check > .form-check-label')
            .should('be.visible').should('contain','Come up with a strategy to get amplified by promoters through personalized experiences')
        cy.get('#chart-nps_score-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click({force:true})
    // Zoom
        cy.get('.overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force:true})
        cy.get('#chart-nps_score-timeline-line > .card > .overlay-tuts-steps > .chart-container > .main-view')
            .should('be.visible')
        cy.wait(500)
        cy.closeZoom()
        cy.wait(1000) 
    })
})