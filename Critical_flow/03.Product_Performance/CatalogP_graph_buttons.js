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

	it('Catalog Performance', function() {
		User.Goto('Catalog Performance')
	})

	it('Discovery Button', function() {
		cy.viewport(1300,3500)
	// Order Return Count by Customer Type
		cy.get('#chart-return_count_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click()
		cy.get('.video-tutorial-chart-return_count_by_customer_type-timeline-bar > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Order Return Count by Customer Type')
		if (!Shop.isStage()) {
			cy.get('.video-tutorial-chart-return_count_by_customer_type-timeline-bar > .modal-dialog > .modal-content > div')
				.should('be.visible').should('contain','This card shows you the number of orders placed in the selected time interval, which contain returned items, returned by first time customers and repeat customers, in the same time interval.')
		}
		cy.closeDiscovery()
	// Order Return Rate by Customer Type
		cy.get('#chart-return_rate_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click()
		cy.get('.video-tutorial-chart-return_rate_by_customer_type-timeline-bar > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Order Return Rate by Customer Type')
		if (!Shop.isStage()) {
			cy.get('.video-tutorial-chart-return_rate_by_customer_type-timeline-bar > .modal-dialog > .modal-content > div')
				.should('be.visible').should('contain','This card shows you the percentage of orders placed in the selected time interval, which contain returned items out of the total number of orders, returned by first time customers and repeat customers, in the same time interval.')
		}
		cy.closeDiscovery()
	// Order Return Split by Customer Type
		cy.get('#chart-return_split_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click()
		cy.get('.video-tutorial-chart-return_split_by_customer_type-timeline-bar > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Order Return Split by Customer Type')
		if (!Shop.isStage()) {
			cy.get('.video-tutorial-chart-return_split_by_customer_type-timeline-bar > .modal-dialog > .modal-content > div')
				.should('be.visible').should('contain','This card shows the distribution of orders placed in the selected time interval, containing returned items, between first time customers and repeat customers, in the same time interval.')
		}
		cy.closeDiscovery()
	// Order Return Rate by RFM Group
		cy.get('#chart-return_rate_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click()
		cy.get('.video-tutorial-chart-return_rate_by_rfm-timeline-line > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Order Return Rate by RFM Group')
		if (!Shop.isStage()) {
			cy.get('.video-tutorial-chart-return_rate_by_rfm-timeline-line > .modal-dialog > .modal-content > div')
				.should('be.visible').should('contain','This card shows you the percentage of orders placed in the selected time interval, which contain returned items out of the total number of orders, returned by customers within each of your RFM segments, in the same time interval.')
		}
		cy.closeDiscovery()
	// Order Return Count by RFM Group
		cy.get('#chart-return_count_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click()
		cy.get('.video-tutorial-chart-return_count_by_rfm-timeline-line > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Order Return Count by RFM Group')
		if (!Shop.isStage()) {
			cy.get('.video-tutorial-chart-return_count_by_rfm-timeline-line > .modal-dialog > .modal-content > div')
				.should('be.visible').should('contain','This card shows you the number of orders placed in the selected time interval, which contain returned items, returned by customers within each of your RFM segments, in the same time interval.')
		}
		cy.closeDiscovery()
	// Order Return Split by RFM Group
		cy.get('#chart-return_split_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click()
		cy.get('.video-tutorial-chart-return_split_by_rfm-timeline-line > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Order Return Split by RFM Group')
		if (!Shop.isStage()) {
			cy.get('.video-tutorial-chart-return_split_by_rfm-timeline-line > .modal-dialog > .modal-content > div')
				.should('be.visible').should('contain','This card shows the distribution of orders placed in the selected time interval, containing returned items, between customers within each of your RFM segments, in the same time interval.')
		}
		cy.closeDiscovery()
	})

	it('Options Button', function() {
		cy.viewport(1300,2500)
	// Order Return Rate by RFM Group
		cy.get('#chart-return_rate_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations')
			.should('be.visible').click()
		cy.get('#chart-return_rate_by_rfm-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Set your Order Return Rate by RFM Group view')
		cy.get('#chart-return_rate_by_rfm-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss')
			.should('be.visible').click()
	// Order Return Count by RFM Group 
		cy.get('#chart-return_count_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations')
			.should('be.visible').click()
		cy.get('#chart-return_count_by_rfm-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Set your Order Return Count by RFM Group view')
		cy.get('#chart-return_count_by_rfm-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss')
			.should('be.visible').click()
	// Order Return Split by RFM Group 
		cy.get('#chart-return_split_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations')
			.should('be.visible').click()
		cy.get('#chart-return_split_by_rfm-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Set your Order Return Split by RFM Group view')
		cy.get('#chart-return_split_by_rfm-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss')
			.should('be.visible').click()
	})

	it('Zoom Button', function() {
		cy.viewport(1300,2500)
	// Order Return Count by Customer Type
		cy.get('#chart-return_count_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').should('be.visible')
			.click()
		cy.get('#chart-return_count_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Count by Customer Type')
		cy.get('#chart-return_count_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
	// Order Return Rate by Customer Type
		cy.get('#chart-return_rate_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').should('be.visible')
			.click({force:true})
		cy.get('#chart-return_rate_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Rate by Customer Type')
		cy.get('#chart-return_rate_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
		cy.get('#closeFullScreen').click({force:true})
	// Order Return Split by Customer Type
		cy.get('#chart-return_split_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').should('be.visible')
			.click({force:true})
		cy.get('#chart-return_split_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Split by Customer Type')
		cy.get('#chart-return_split_by_customer_type-timeline-bar > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
	// Order Return Rate by RFM Group
		cy.get('#chart-return_rate_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').should('be.visible')
			.click({force:true})
		cy.get('#chart-return_rate_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Rate by RFM Group')
		cy.get('#chart-return_rate_by_rfm-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
	// Order Return Count by RFM Group
		cy.get('#chart-return_count_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').should('be.visible')
			.click({force:true})
		cy.get('#chart-return_count_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Count by RFM Group')
		cy.get('#chart-return_count_by_rfm-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
	// Order Return Split by RFM Group
		cy.get('#chart-return_split_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').should('be.visible')
			.click({force:true})
		cy.get('#chart-return_split_by_rfm-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Split by RFM Group')
		cy.get('#chart-return_split_by_rfm-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
	})
})