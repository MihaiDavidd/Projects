import { Reveal_User } from '/support/classes/User'

let User = {}

describe('Retention', function()
{
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})

	it('Calendar', function() {
		User.Goto('Retention')
	})

	it('Check Discover Button', function() {
		cy.viewport(1300,3000)
	// Average Retention Rate
		cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click()
		cy.get('.video-tutorial-chart-average_retention_rate-timeline-line > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('have.text', 'Average Retention Rate')
		cy.get('.video-tutorial-chart-average_retention_rate-timeline-line > .modal-dialog > .modal-content > div')
			.should('be.visible').should('contain','The retention rate measures what percentage of your customers are retained during a given period of time. This card calculates the percentage of customers with more than 1 order out of your total customer base based on your selected timeline.')
		cy.closeDiscovery() 
	// Retention Curve
		cy.get('#chart-retention_curve-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click()
		cy.get('.video-tutorial-chart-retention_curve-aggregated-line > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('have.text', 'Retention Curve')
		cy.get('.video-tutorial-chart-retention_curve-aggregated-line > .modal-dialog > .modal-content > div')
			.should('be.visible').should('contain','This card shows you how many of your customers from your customer base have placed their second order. It will show you how many of them placed a third order as well.')
		cy.closeDiscovery() 
	// Chances to Place Next Order
		cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click()
		cy.get('.video-tutorial-chart-chances_to_place_next_order-aggregated-line > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('have.text', 'Chances to Place Next Order')
		cy.get('.video-tutorial-chart-chances_to_place_next_order-aggregated-line > .modal-dialog > .modal-content > div')
			.should('be.visible').should('contain','This card shows the potential for a customer to place another order according to your historical data.')
		cy.closeDiscovery() 
	// Customer Distribution
		cy.get('#chart-customer_distribution-aggregated-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .active > .rv-discover').click()
		cy.get('.video-tutorial-chart-customer_distribution-aggregated-line > .modal-dialog > .modal-content > .mb-3')
			.should('be.visible').should('have.text', 'Customer Distribution')
		cy.get('.video-tutorial-chart-customer_distribution-aggregated-line > .modal-dialog > .modal-content > div')
			.should('be.visible').should('contain',"This card shows you how many of your customers placed a certain number of orders.For example: 5,000 customers placed one order, other 100 placed 2 orders, other 500 placed 3 orders etc.")
		cy.closeDiscovery() 
	})

	it('Check Tips Button', function() {
		// Average Retention Rate
			cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click()
			cy.get('#chart-average_retention_rate-timeline-line > .card > .tuts-steps > .m-t-0 > b')
				.should('be.visible').should('contain','See what to do next')
			cy.get('#chart-average_retention_rate-timeline-line > .card > .tuts-steps')
				.should('be.visible').should('contain','Run surveys on the customers from the abandoning RFM groups to understand why they are not returning')
			cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click()
		// Retention Curve
			cy.get('#chart-retention_curve-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click()
			cy.get('#chart-retention_curve-aggregated-line > .card > .tuts-steps > .m-t-0 > b')
				.should('be.visible').should('contain','See what to do next')
			cy.get('#chart-retention_curve-aggregated-line > .card > .tuts-steps')
				.should('be.visible').should('contain','It looks like the main drop is from 1 to 2 orders. Survey the first time customers and find out the main reasons why they drop')
			cy.get('#chart-retention_curve-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click()
		// Chances to Place Next Order
			cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click()
			cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .tuts-steps > .m-t-0 > b')
				.should('be.visible').should('contain','See what to do next')
			cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .tuts-steps')
				.should('be.visible').should('contain','It looks like the main drop is from 1 to 2 orders. Survey the first time customers and find out the main reasons why they drop')
			cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .show-todo > .rv-tips').click()
		})

	it('Check Zoom Button', function() {
	// Average Retention Rate
		cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click()
		cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('contain','Average Retention Rate')
		cy.get('#chart-average_retention_rate-timeline-line > .card > .overlay-tuts-steps > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom({force:true})
		cy.wait(500)
	// Retention Curve
		cy.get('#chart-retention_curve-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click()
		cy.get('#chart-retention_curve-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('have.text', 'Retention Curve')
		cy.get('#chart-retention_curve-aggregated-line > .card > .overlay-tuts-steps > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
	// Chances to Place Next Order
		cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click()
		cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .overlay-tuts-steps > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('have.text', 'Chances to Place Next Order ')
		cy.get('#chart-chances_to_place_next_order-aggregated-line > .card > .overlay-tuts-steps > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
	// Customer Distribution
		cy.get('#chart-customer_distribution-aggregated-line > .card > :nth-child(1) > .chart-bar-top > .card-actions > .fake-dropdown > .dropdown-menu > .full-screen > .rv-zoom').click()
		cy.get('#chart-customer_distribution-aggregated-line > .card > :nth-child(1) > .chart-bar-top > .card-title > .card-title-chart')
			.should('be.visible').should('have.text', 'Customer Distribution ')
		cy.get('#chart-customer_distribution-aggregated-line > .card > :nth-child(1) > .chart-container > .main-view')
			.should('be.visible')
		cy.closeZoom()
	})
})