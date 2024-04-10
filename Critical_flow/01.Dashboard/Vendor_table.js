import { Reveal_User } from '/support/classes/User'
import { Reveal_Calendar } from '/support/classes/Calendar'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Calendar = {}
let Shop = {}

describe('Dashboard', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Shop = new Reveal_Shop(data[shopId])
			Calendar = new Reveal_Calendar()
		})
	})

    it('Vendor Overview', function() {
        if(Shop.isMarketplace()) {
            User.Goto('Vendor Overview')
        // Check title 
            cy.get('.page-title')
                .should('be.visible').should('contain','Vendor Overview')
        // Check Search bar
            cy.get('#vendor_overview_dt_filter > label')
                .should('be.visible').should('contain','Search')
        // Check entries
            cy.get('#vendor_overview_dt_length > label')
                .should('be.visible').should('contain','Show')
            cy.get('#vendor_overview_dt_info')
                .should('be.visible').should('contain','Showing 1 to 10')
        }
    })

    it('Vendor Table', function() {
        if(Shop.isMarketplace()) {
            cy.viewport(1600,1300)
            Calendar.open()
            Calendar.selectLastYear() 
        // Check table headers
            cy.get('#vendor_overview_dt-dt_name').should('be.visible').should('contain','Name')
            cy.get('#vendor_overview_dt-dt_avg_nps_pre').should('be.visible').should('contain','NPS Pre')
            cy.get('#vendor_overview_dt-dt_avg_nps_post').should('be.visible').should('contain','NPS Post')
            cy.get('#vendor_overview_dt-dt_orders_count').should('be.visible').should('contain','Orders')
            cy.get('#vendor_overview_dt-dt_customers_count').should('be.visible').should('contain','Customers')
            cy.get('#vendor_overview_dt-dt_revenue').should('be.visible').should('contain','Revenue')
            cy.get('#vendor_overview_dt-dt_margin').should('be.visible').should('contain','Margin')
            cy.get('#vendor_overview_dt-dt_clv').should('be.visible').should('contain','CLV')
        // check table content appears  
            cy.get('#vendor_overview_dt-dt_row_1 > :nth-child(1)').should('be.visible').should('contain','All')
            if(Cypress.env('automation')) {
                cy.get('#vendor_overview_dt-dt_row_1 > :nth-child(2)').should('be.visible').should('contain','100.00')
                cy.get('#vendor_overview_dt-dt_row_1 > :nth-child(3)').should('be.visible').should('contain','100.00')
                cy.get('#vendor_overview_dt-dt_row_1 > :nth-child(4)').should('be.visible').should('contain','30.00')
                cy.get('#vendor_overview_dt-dt_row_1 > :nth-child(5)').should('be.visible').should('contain','30.00')
                cy.get('#vendor_overview_dt-dt_row_1 > :nth-child(6)').should('be.visible').should('contain','137.6K')
                cy.get('#vendor_overview_dt-dt_row_1 > :nth-child(7)').should('be.visible').should('contain','104.0K')
                cy.get('#vendor_overview_dt-dt_row_1 > :nth-child(8)').should('be.visible').should('contain','3.5K')
            }
        // check pages text
            cy.get('#vendor_overview_dt_previous').should('be.visible').should('contain','Previous')
            cy.get('.active > .page-link').should('be.visible').should('contain','1')
            cy.get('#vendor_overview_dt_next > .page-link').should('be.visible').should('contain','Next')
        }
    })
})