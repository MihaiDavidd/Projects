import { Reveal_User } from '/support/classes/User'
import { Reveal_Calendar } from '/support/classes/Calendar'

let User = {}
let Calendar = {}

describe('Customer Experience', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
            Calendar = new Reveal_Calendar()
		})
	})

    it('Calendar', function() {
        User.Goto('Customer Experience')
        if(Cypress.env('automation') === true) {
            Calendar.open()
            Calendar.selectAllTime()
            cy.wait(5000)
        }
    })

    it('All Discover Buttons', function() {
        cy.viewport(1300, 3000)
    // NPS per RFM Group
        cy.get('#chart-nps_score_per_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-nps_score_per_rfm-aggregated-bar > .modal-dialog > .modal-content')
            .should('be.visible')
        cy.closeDiscovery()
    // NPS per RFM Group
        cy.get('#chart-nps_score_per_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-nps_score_per_rfm-timeline-line > .modal-dialog > .modal-content')
            .should('be.visible')
        cy.closeDiscovery()
    // NPS per Order Attribute
        cy.get('#chart-nps_score_per_order_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-nps_score_per_order_custom_attribute-aggregated-bar > .modal-dialog > .modal-content')
            .should('be.visible')
        cy.closeDiscovery()
    // NPS per Order Attribute
        cy.get('#chart-nps_score_per_order_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-nps_score_per_order_custom_attribute-timeline-line > .modal-dialog > .modal-content')
            .should('be.visible')
        cy.closeDiscovery()
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-nps_score_per_customer_custom_attribute-aggregated-bar > .modal-dialog > .modal-content')
            .should('be.visible')
        cy.closeDiscovery()
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-nps_score_per_customer_custom_attribute-timeline-line > .modal-dialog > .modal-content')
            .should('be.visible')
        cy.closeDiscovery()
    // NPS per Category
        cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-nps_score_per_category-aggregated-bar > .modal-dialog > .modal-content')
            .should('be.visible')
        cy.closeDiscovery()
    // NPS per Category
        cy.get('#chart-nps_score_per_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-nps_score_per_category-timeline-line > .modal-dialog > .modal-content')
            .should('be.visible')
        cy.closeDiscovery()
    // NPS per Brand
        cy.get('#chart-nps_score_per_brand-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-nps_score_per_brand-aggregated-bar > .modal-dialog > .modal-content')
            .should('be.visible')
        cy.closeDiscovery()
    // NPS per Brand
        cy.get('#chart-nps_score_per_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click({force:true})
        cy.get('.video-tutorial-chart-nps_score_per_brand-timeline-line > .modal-dialog > .modal-content')
            .should('be.visible')
        cy.closeDiscovery()
        cy.wait(2000)
    })

    it('All Option Buttons', function() {
        cy.viewport(1300, 3000)
    // NPS per RFM Group
        cy.get('#chart-nps_score_per_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations').click({force:true})
        cy.get('#chart-nps_score_per_rfm-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
            .should('be.visible').should('contain','Set your NPS')
        cy.get('#chart-nps_score_per_rfm-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss').click({force:true})
        cy.wait(500)
    // NPS per Order Attribute
        cy.get('#chart-nps_score_per_order_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations').click({force:true})
        cy.get('#chart-nps_score_per_order_custom_attribute-aggregated-bar > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
            .should('be.visible').should('contain','Set your NPS')
        cy.get('#chart-nps_score_per_order_custom_attribute-aggregated-bar > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss').click({force:true})   
        cy.wait(500)
    // NPS per Order Attribute
        cy.get('#chart-nps_score_per_order_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations').click({force:true})
        cy.get('#chart-nps_score_per_order_custom_attribute-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
            .should('be.visible').should('contain','Set your NPS')
        cy.get('#chart-nps_score_per_order_custom_attribute-aggregated-bar > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss').click({force:true})   
        cy.wait(500)
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_order_custom_attribute-aggregated-bar > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss').click({force:true})
        cy.get('#chart-nps_score_per_order_custom_attribute-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
            .should('be.visible').should('contain','Set your NPS')
        cy.get('#chart-nps_score_per_order_custom_attribute-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss').click({force:true})
        cy.wait(500)
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations').click({force:true})
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
            .should('be.visible').should('contain','Set your NPS')
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss').click({force:true})
        cy.wait(500)
    // NPS per Category
        cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations').click({force:true})
        cy.get('#chart-nps_score_per_category-aggregated-bar > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
            .should('be.visible').should('contain','Set your NPS')
        cy.get('#chart-nps_score_per_category-aggregated-bar > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss').click({force:true})
        cy.wait(500)
    // NPS per Category
        cy.get('#chart-nps_score_per_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations').click({force:true})
        cy.get('#chart-nps_score_per_category-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
            .should('be.visible').should('contain','Set your NPS')
        cy.get('#chart-nps_score_per_category-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss').click({force:true})
        cy.wait(500)
    // NPS per Brand
        cy.get('#chart-nps_score_per_brand-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations').click({force:true})
        cy.get('#chart-nps_score_per_brand-aggregated-bar > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
            .should('be.visible').should('contain','Set your NPS')
        cy.get('#chart-nps_score_per_brand-aggregated-bar > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss').click({force:true})
        cy.wait(500)
    // NPS per Brand
        cy.get('#chart-nps_score_per_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations').click({force:true})
        cy.get('#chart-nps_score_per_brand-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
            .should('be.visible').should('contain','Set your NPS')
        cy.get('#chart-nps_score_per_brand-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss').click({force:true})
        cy.wait(500)    
    })

    it('All Zoom Buttons', function() {
        cy.viewport(1300, 3000)
        cy.wait(2000)
    // NPS per RFM Group
        cy.get('#chart-nps_score_per_rfm-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force:true})
        cy.get('#chart-nps_score_per_rfm-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
        cy.closeZoom()
    // NPS per RFM Group
        cy.get('#chart-nps_score_per_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force:true})
        cy.get('#chart-nps_score_per_rfm-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
        cy.closeZoom()
    // NPS per Order Attribute
        cy.get('#chart-nps_score_per_order_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force:true})
        cy.get('#chart-nps_score_per_order_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
        cy.closeZoom()
    // NPS per Order Attribute
        cy.get('#chart-nps_score_per_order_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force:true})
        cy.get('#chart-nps_score_per_order_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
        cy.closeZoom()
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force:true})
        cy.get('#chart-nps_score_per_customer_custom_attribute-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
        cy.closeZoom()
    // NPS per Customer Attribute
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force:true})
        cy.get('#chart-nps_score_per_customer_custom_attribute-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
        cy.closeZoom()
        // NPS per Category
        cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force:true})
        cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
        cy.closeZoom()
        // NPS per Category
        cy.get('#chart-nps_score_per_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force:true})
        cy.get('#chart-nps_score_per_category-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
        cy.closeZoom()
        cy.wait(1000)
        // NPS per Brand
        cy.get('#chart-nps_score_per_brand-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force:true})
        cy.get('#chart-nps_score_per_brand-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
        cy.closeZoom()
        cy.wait(1000)
        // NPS per Brand
        cy.get('#chart-nps_score_per_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click({force:true})
        cy.get('#chart-nps_score_per_brand-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
            .should('be.visible')
        cy.closeZoom()
        cy.wait(2000)
    })
})