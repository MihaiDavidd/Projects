import { Reveal_User } from '/support/classes/User'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Shop = {}

describe('Reveal', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Shop = new Reveal_Shop(data[shopId])
		})
	})

    it('Check all menu pages', function() {
        User.login_with_url()
        User.selectStore()
    // Dashboard Main
        cy.get('.page-title').should('contain','Main')
        cy.title('Main')
        cy.location().then((loc) => {
            expect(loc.pathname).to.contain('dashboard')
        })
    //Trends Overview 
        User.visit('Trends Overview')
        cy.title('Trends Overview ')
        cy.get('.page-title').should('contain','Trends Overview')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('overview')
        })
        if(Shop.isMarketplace()) {
    // Vendor Overview 
            User.visit('Vendor Overview')
            cy.title('Vendor Overview')
            cy.get('.page-title').should('contain','Vendor Overview')
            cy.location().should((loc) => {
                expect(loc.pathname).to.contain('vendor-overview')
            })
        }
    // Customer Analytics
    // Segmentation
        User.visit('Segmentation')
        cy.get(':nth-child(2) > .main-link > a').click()
        cy.get('.page-title').should('contain','Segmentation')
        cy.title('Segmentation')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('segmentation')
        })
    // Customer Lifetime Value
        User.visit('CLV')
        cy.get(':nth-child(2) > .main-link > a').click()
        cy.get('.page-title').should('contain','Customer Lifetime Value')
        cy.title('Customer Lifetime Value')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('customer-lifetime-value')
        })
    // Retention
        User.visit('Retention')
        cy.get(':nth-child(2) > .main-link > a').click()
        cy.get('.page-title').should('contain','Retention')
        cy.title('Retention')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('retention')
        })
    // CRM
        User.visit('CRM')
        cy.get(':nth-child(2) > .main-link > a').click()
        cy.get('.page-title').should('contain','CRM')
        cy.title('CRM')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('crm')
        })
    // Cohort Analysis
        User.visit('Cohort Analysis')
        cy.get(':nth-child(2) > .main-link > a').click()
        cy.get('.page-title').should('contain','Cohort Analysis')
        cy.title('Cohort Analysis')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('cohort-analysis')
        })
        if(Shop.isMarketplace()) {
    // CRM Marketplace 
            User.visit('CRM Marketplace')
            cy.get(':nth-child(2) > .main-link > a').click()
            cy.get('.page-title').should('contain','Customers List')
            cy.title('CRM Marketplace')
            cy.location().should((loc) => {
                expect(loc.pathname).to.contain('crm-marketplace')
            })
        }
    // Product Performance
    // Catalog Performance
        User.visit('Catalog Performance')
        cy.get(':nth-child(3) > .main-link > a').click()
        cy.get('.page-title').should('contain','Catalog Performance')
        cy.title('Catalog Performance')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('catalog-performance')
        })
    // Brand Performance
        User.visit('Brand Performance')
        cy.get(':nth-child(3) > .main-link > a').click()
        cy.get('.page-title').should('contain','Brand Performance')
        cy.title('Brand Performance')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('brand-performance')
        })
    // Category Performance
        User.visit('Category Performance')
        cy.get(':nth-child(3) > .main-link > a').click()
        cy.get('.page-title').should('contain','Category Performance')
        cy.title('Category Performance')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('category-performance')
        })
    // Buying Habits
        User.visit('Buying Habits')
        cy.get(':nth-child(3) > .main-link > a').click()
        cy.get('.page-title').should('contain','Buying Habits')
        cy.title('Buying Habits')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('buying-habits')
        })
    // Customer Experience
        User.visit('Customer Experience')
        cy.get('.page-title').should('contain','Customer Experience')
        cy.title('Customer Experience')
        cy.location().should((loc) => {
        expect(loc.pathname).to.contain('customer-experience')
        })
    // Audience Builder
        if (!Shop.isStage()) {
            User.visit('Audience Builder')
        } else {
            cy.get(':nth-child(6) > .main-link > .filter-persistent > span').click()
        }
        cy.get('.page-title').should('contain','Audience Builder')
        cy.title('Audience Builder')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('audience-builder')
        })
        cy.wait(1000)
    // NPS Alert
        if (!Shop.isStage()) {
            User.visit('NPS Alert')
        } else {
            cy.get(':nth-child(7) > .main-link > .filter-persistent > span').click()
        }       
        cy.get('.page-title').should('contain','NPS Alert')
        cy.title('NPS Alert')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('nps-alerts')
        })
    // Store Settings
    // General
        User.visit('General')
        cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
        cy.get('.page-title').should('contain','Shop Settings')
        cy.title('Shop Settings')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('settings')
        })
    // Billing
        User.visit('Billing')
        cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
        cy.get('.page-title').should('contain','Billing')
        cy.title('Billing')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('billing')
        })
    // Integrations
        User.visit('Integrations')
        cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
        cy.get('.page-title').should('contain','Integrations')
        cy.title('Integrations')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('integrations')
        })
    // Import
        User.visit('Import')
        cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
        cy.get('.page-title').should('contain','Import')
        cy.title('Import')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('import')
        })
    // Costs
        User.visit('Costs')
        cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
        cy.get('.page-title').should('contain','Costs')
        cy.title('Costs')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('costs')
        })
    // User management
        User.visit('User Management')
        cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
        cy.get('.page-title').should('contain','User management')
        cy.title('User management')
        cy.location().should((loc) => {
            expect(loc.pathname).to.contain('settings/users-roles')
        })
    })
})