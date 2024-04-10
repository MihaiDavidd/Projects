import { Reveal_User } from '/support/classes/User'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Shop = {}

describe('Product Performance', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Shop = new Reveal_Shop(data[shopId])
		})
	})

	it('Brand Performance', function() {
		User.Goto('Brand Performance')
	})

	it('Discovery Button', function() {
		cy.viewport(1300,4000)
	// Top Brands
		cy.get('#chart-top_brands-aggregated-table > .effect-shadow-level1 > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover')
			.should('be.visible').click({force:true})
		cy.get('.video-tutorial-chart-top_brands-aggregated-table > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Top Brands')
		cy.get('.video-tutorial-chart-top_brands-aggregated-table > .modal-dialog > .modal-content > div')
			.should('be.visible').should('contain','This card shows you which are your top performing brands based on revenue, margin, orders and the number of customers who have purchased them.')
		cy.closeDiscovery()
	// NPS per Brand aggregated
		cy.get('#chart-nps_score_per_brand-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover')
			.should('be.visible').click({force:true})
		cy.get('.video-tutorial-chart-nps_score_per_brand-aggregated-bar > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','NPS per Brand')
		cy.get('.video-tutorial-chart-nps_score_per_brand-aggregated-bar > .modal-dialog > .modal-content > div')
			.should('be.visible').should('contain','This card shows you the NPS scores that were given by your customers to the brands they have purchased.')
		cy.closeDiscovery()
	// NPS per Brand timeline
		cy.get('#chart-nps_score_per_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover')
			.should('be.visible').click({force:true})
		cy.get('.video-tutorial-chart-nps_score_per_brand-timeline-line > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','NPS per Brand')
		cy.get('.video-tutorial-chart-nps_score_per_brand-timeline-line > .modal-dialog > .modal-content > div')
			.should('be.visible').should('contain','This card shows you the NPS scores that were given by your customers to the brands they have purchased based on your timeline selection.')
		cy.closeDiscovery()
	// Order Return Rate by Brand
		cy.get('#chart-return_rate_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover')
			.should('be.visible').click({force:true})
		cy.get('.video-tutorial-chart-return_rate_by_brand-timeline-line > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Order Return Rate by Brand')
		if (!Shop.isStage()) {
			cy.get('.video-tutorial-chart-return_rate_by_brand-timeline-line > .modal-dialog > .modal-content > div')
				.should('contain','This card shows you the percentage of orders placed in the selected time interval')
		}
		cy.closeDiscovery()
	// Order Return Count by Brand
		cy.get('#chart-return_count_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover')
			.should('be.visible').click({force:true})
		cy.get('.video-tutorial-chart-return_count_by_brand-timeline-line > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Order Return Count by Brand')
		if (!Shop.isStage()) {
			cy.get('.video-tutorial-chart-return_count_by_brand-timeline-line > .modal-dialog > .modal-content > div')
				.should('be.visible').should('contain','This card shows you the number of orders placed in the selected time interval, which contain returned items belonging to the displayed brand, in the same time interval.')
		}
		cy.closeDiscovery()
	// Order Return Split by Brand timeline
		cy.get('#chart-return_split_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover')
			.should('be.visible').click({force:true})
		cy.get('.video-tutorial-chart-return_split_by_brand-timeline-line > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Order Return Split by Brand')
		if (!Shop.isStage()) {
			cy.get('.video-tutorial-chart-return_split_by_brand-timeline-line > .modal-dialog > .modal-content > div')
				.should('be.visible').should('contain','This card shows the distribution of orders placed in the selected time interval, containing returned items between brands, in the same time interval.')
		}
		cy.closeDiscovery()
	})

	it('Options Button', function() {
		cy.viewport(1300,3500)
	// Top Brands
		cy.get('#chart-top_brands-aggregated-table > .effect-shadow-level1 > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations')
			.should('be.visible').click({force:true})
		cy.get('#chart-top_brands-aggregated-table > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Set your Top Brands view')
		cy.get('#chart-top_brands-aggregated-table > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss')
			.should('be.visible').click({force:true})
		cy.wait(1000)
	// NPS per Brand aggregated
		cy.get('#chart-nps_score_per_brand-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations')
			.should('be.visible').click({force:true})
		cy.get('#chart-nps_score_per_brand-aggregated-bar > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Set your NPS per Brand view')
		cy.get('#chart-nps_score_per_brand-aggregated-bar > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss')
			.should('be.visible').click({force:true})
		cy.wait(1000)
	// NPS per Brand timeline
		cy.get('#chart-nps_score_per_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations')
			.should('be.visible').click({force:true})
		cy.get('#chart-nps_score_per_brand-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Set your NPS per Brand view')
		cy.get('#chart-nps_score_per_brand-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss')
			.should('be.visible').click({force:true})
		cy.wait(1000)
	// Order Return Rate by Brand
		cy.get('#chart-return_rate_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations')
			.should('be.visible').click({force:true})
		cy.get('#chart-return_rate_by_brand-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Set your Order Return Rate by Brand view')
		cy.get('#chart-return_rate_by_brand-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss')
			.should('be.visible').click({force:true})
		cy.wait(1000)
	// Order Return Count by Brand
		cy.get('#chart-return_count_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations')
			.should('be.visible').click({force:true})
		cy.get('#chart-return_count_by_brand-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Set your Order Return Count by Brand view')
		cy.get('#chart-return_count_by_brand-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss')
			.should('be.visible').click({force:true})
		cy.wait(1000)
	// Order Return Split by Brand timeline
		cy.get('#chart-return_split_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations')
			.should('be.visible').click({force:true})
		cy.get('#chart-return_split_by_brand-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Set your Order Return Split by Brand view')
		cy.get('#chart-return_split_by_brand-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss')
			.should('be.visible').click({force:true})
		cy.wait(1000)
	})

	it('Toooltip Button', function() {
		cy.viewport(1300,3200)
	// Top Brands
		cy.get('#chart-top_brands-aggregated-table > .effect-shadow-level1 > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info')
			.should('be.visible').click({force:true})
		cy.tooltip('aggregated')
	// NPS per Brand aggregated
		cy.get('#chart-nps_score_per_brand-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info')
			.should('be.visible').click({force:true})
			cy.tooltip('aggregated')
	// NPS per Brand timeline
		cy.get('#chart-nps_score_per_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info')
			.should('be.visible').click({force:true})
		cy.tooltip('timeline')
	// Order Return Rate by Brand
		cy.get('#chart-return_rate_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info')
			.should('be.visible').click({force:true})
		cy.tooltip('timeline')
	// Order Return Count by Brand
		cy.get('#chart-return_count_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info')
			.should('be.visible').click({force:true})
		cy.tooltip('timeline')
	// Order Return Split by Brand timeline
		cy.get('#chart-return_split_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info')
			.should('be.visible').click({force:true})
		cy.tooltip('timeline')
	})

	it('Zoom Button', function() {
		cy.viewport(1300,3200)
	// NPS per Brand aggregated
		cy.get('#chart-nps_score_per_brand-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom')
			.should('be.visible').click({force:true})
		cy.get('#chart-nps_score_per_brand-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','NPS per Brand')
		cy.get('#chart-nps_score_per_brand-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
		cy.wait(1000)
	// NPS per Brand timeline
		cy.get('#chart-nps_score_per_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom')
			.should('be.visible').click({force:true})
		cy.get('#chart-nps_score_per_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','NPS per Brand')
		cy.get('#chart-nps_score_per_brand-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
		cy.wait(1000)
	// Order Return Rate by Brand
		cy.get('#chart-return_rate_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom')
			.should('be.visible').click({force:true})
		cy.get('#chart-return_rate_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Rate by Brand')
		cy.get('#chart-return_rate_by_brand-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
	// Order Return Count by Brand
		cy.get('#chart-return_count_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom')
			.should('be.visible').click({force:true})
		cy.get('#chart-return_count_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Count by Brand')
		cy.get('#chart-return_count_by_brand-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
	// Order Return Split by Brand timeline
		cy.get('#chart-return_split_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom')
			.should('be.visible').click({force:true})
		cy.get('#chart-return_split_by_brand-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Split by Brand')
		cy.get('#chart-return_split_by_brand-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
	})
})