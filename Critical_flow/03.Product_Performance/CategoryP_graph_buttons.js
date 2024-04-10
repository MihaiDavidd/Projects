import { Reveal_User } from '/support/classes/User'
import { Reveal_Calendar } from '/support/classes/Calendar'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Calendar = {}
let Shop = {}

describe('Product Performance', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Calendar = new Reveal_Calendar()
			Shop = new Reveal_Shop(data[shopId])
		})
	})
	beforeEach(() => {
		cy.viewport(1600,4000)
	})

	it('Category Performance', function() {
		User.Goto('Category Performance')
		Calendar.open()
		if(Cypress.env('automation')) {
			Calendar.selectAllTime()
			cy.wait(5000)
		} else 
			Calendar.selectLastYear()
	})

	it('Discovery Button', function() {
	// Top Categories
		cy.get('#chart-top_categories-aggregated-table > .effect-shadow-level1 > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover')
			.should('be.visible').click()
		cy.get('.video-tutorial-chart-top_categories-aggregated-table > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Top Categories')
		cy.get('.video-tutorial-chart-top_categories-aggregated-table > .modal-dialog > .modal-content > div')
			.should('be.visible').should('contain','This card shows you which are your top performing product categories based on revenue, margin, orders and the number of customers who have purchased them.')
		cy.closeDiscovery()
	// NPS per Category aggregated
		cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover')
			.should('be.visible').click()
		cy.get('.video-tutorial-chart-nps_score_per_category-aggregated-bar > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','NPS per Category')
		cy.get('.video-tutorial-chart-nps_score_per_category-aggregated-bar > .modal-dialog > .modal-content > div')
			.should('be.visible').should('contain','This card shows you the NPS score given by your customers that bought products from your categories.')
		cy.closeDiscovery()
	// NPS per Category timeline
		cy.get('#chart-nps_score_per_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover')
			.should('be.visible').click()
		cy.get('.video-tutorial-chart-nps_score_per_category-timeline-line > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','NPS per Category')
		cy.get('.video-tutorial-chart-nps_score_per_category-timeline-line > .modal-dialog > .modal-content > div')
			.should('be.visible').should('contain','This card shows you the NPS score given by your customers that bought products from your categories based on your timeline selection.')
		cy.closeDiscovery()
	// Order Return Rate by Category
		cy.get('#chart-return_rate_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover')
			.should('be.visible').click()
		cy.get('.video-tutorial-chart-return_rate_by_category-timeline-line > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Order Return Rate by Category')
		if (!Shop.isStage()) {
			cy.get('.video-tutorial-chart-return_rate_by_category-timeline-line > .modal-dialog > .modal-content > div')
				.should('be.visible').should('contain','This card shows you the percentage of orders placed in the selected time interval, which contain returned items out of the total number of orders, in the same time interval.')
		}
		cy.closeDiscovery()
	// Order Return Count by Category
		cy.get('#chart-return_count_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover')
			.should('be.visible').click()
		cy.get('.video-tutorial-chart-return_count_by_category-timeline-line > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Order Return Count by Category')
		if (!Shop.isStage()) {
			cy.get('.video-tutorial-chart-return_count_by_category-timeline-line > .modal-dialog > .modal-content > div')
				.should('be.visible').should('contain','This card shows you the number of orders placed in the selected time interval, which contain returned items belonging to the displayed category, in the same time interval.')
		}
		cy.closeDiscovery()
	// Order Return Split by Category timeline
		cy.get('#chart-return_split_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover')
			.should('be.visible').click()
		cy.get('.video-tutorial-chart-return_split_by_category-timeline-line > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Order Return Split by Category')
		if (!Shop.isStage()) {
			cy.get('.video-tutorial-chart-return_split_by_category-timeline-line > .modal-dialog > .modal-content > div')
				.should('be.visible').should('contain','This card shows the distribution of orders placed in the selected time interval, containing returned items between categories, in the same time interval.')
		}
		cy.closeDiscovery()
	})

	it('Options Button', function() {
	// Top Categories
		cy.get('#chart-top_categories-aggregated-table > .effect-shadow-level1 > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations')
			.should('be.visible').click({force:true})
		cy.get('#chart-top_categories-aggregated-table > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Set your Top Categories view')
		cy.get('#chart-top_categories-aggregated-table > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss')
			.should('be.visible').click({force:true})
		cy.wait(1000)
	// NPS per Category aggregated
		cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations')
			.should('be.visible').click({force:true})
		cy.get('#chart-nps_score_per_category-aggregated-bar > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Set your NPS per Category view')
		cy.get('#chart-nps_score_per_category-aggregated-bar > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss')
			.should('be.visible').click({force:true})
		cy.wait(1000)
	// NPS per Category timeline
		cy.get('#chart-nps_score_per_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations')
			.should('be.visible').click({force:true})
		cy.get('#chart-nps_score_per_category-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Set your NPS per Category view')
		cy.get('#chart-nps_score_per_category-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss')
			.should('be.visible').click({force:true})
		cy.wait(1000)
	// Order Return Rate by Category
		cy.get('#chart-return_rate_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations')
			.should('be.visible').click({force:true})
		cy.get('#chart-return_rate_by_category-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Set your Order Return Rate by Category view')
		cy.get('#chart-return_rate_by_category-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss')
			.should('be.visible').click({force:true})
		cy.wait(1000)
	// Order Return Count by Category
		cy.get('#chart-return_count_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations')
			.should('be.visible').click({force:true})
		cy.get('#chart-return_count_by_category-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Set your Order Return Count by Category view')
		cy.get('#chart-return_count_by_category-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss')
			.should('be.visible').click({force:true})
		cy.wait(1000)
	// Order Return Split by Category timeline
		cy.get('#chart-return_split_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .chart-settings-button > .rv-integrations')
			.should('be.visible').click({force:true})
		cy.get('#chart-return_split_by_category-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('contain','Set your Order Return Split by Category view')
		cy.get('#chart-return_split_by_category-timeline-line > .modal.card-settings > .modal-dialog > .modal-content > .card-settings > .d-flex > .modal-dismiss')
			.should('be.visible').click({force:true})
		cy.wait(1000)
	})

	it('Toooltip Button', function() {
	// Top Categories
		cy.get('#chart-top_categories-aggregated-table > .effect-shadow-level1 > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info')
			.should('be.visible').click({force:true})
		cy.tooltip('aggregated')
	// NPS per Category aggregated
		cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info')
			.should('be.visible').click({force:true})
			cy.tooltip('aggregated')
	// NPS per Category timeline
		cy.get('#chart-nps_score_per_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info')
			.should('be.visible').click({force:true})
		cy.tooltip('timeline')
	// Order Return Rate by Category
		cy.get('#chart-return_rate_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info')
			.should('be.visible').click({force:true})
		cy.tooltip('timeline')
	// Order Return Count by Category
		cy.get('#chart-return_count_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info')
			.should('be.visible').click({force:true})
		cy.tooltip('timeline')
	// Order Return Split by Category timeline
		cy.get('#chart-return_split_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart > .rv-btn-info')
			.should('be.visible').click({force:true})
		cy.tooltip('timeline')
	})

	it('Zoom Button', function() {
		cy.viewport(1500,3000)
	// NPS per Category aggregated
		cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom')
			.should('be.visible')
			cy.wait(1000)
		cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom')
			.click({force:true})
		cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','NPS per Category')
		cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
		cy.wait(1000)
	// NPS per Category timeline
		cy.get('#chart-nps_score_per_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom')
			.should('be.visible').click({force:true})
		cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','NPS per Category')
		cy.get('#chart-nps_score_per_category-aggregated-bar > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
		cy.wait(1000)
	// Order Return Rate by Category
		cy.get('#chart-return_rate_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom')
			.should('be.visible').click()
		cy.get('#chart-return_rate_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Rate by Category')
		cy.get('#chart-return_rate_by_category-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
		cy.wait(1000)
	// Order Return Count by Category
		cy.get('#chart-return_count_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom')
			.should('be.visible').click({force:true})
		cy.get('#chart-return_count_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Count by Category')
		cy.get('#chart-return_count_by_category-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
		cy.wait(1000)
	// Order Return Split by Category timeline
		cy.get('#chart-return_split_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom')
			.should('be.visible').click()
		cy.get('#chart-return_split_by_category-timeline-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Order Return Split by Category')
		cy.get('#chart-return_split_by_category-timeline-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
		cy.wait(1000)
	})
})