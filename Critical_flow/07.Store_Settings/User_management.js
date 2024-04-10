import { Reveal_User } from '/support/classes/User'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Shop = {}

describe('Store Settings', function() {
    before(function(){
        cy.fixture('credentials').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
            Shop = new Reveal_Shop(data[shopId])
		})
    })

    it('User Management', function() {
        User.Goto('User Management')
        cy.viewport(1300,3000)
    // check title
        cy.get('.page-title')
            .should('be.visible').should('contain','User management')
    // Check Users
        cy.get(':nth-child(1) > .nav-link')
            .should('be.visible').should('contain','Users')
    // Button invite new user
        if(Shop.isDemo01() || Shop.isStage()) {
            cy.get('#users > .rvl-datatable-wrapper > .rvl-datatable-table > .mb-3 > ._modalFormHandler')
                .should('be.visible').should('contain','Invite new user')
        }
    // Check table headers
        cy.get('#users_dt > thead > tr > [aria-label="Name: activate to sort column ascending"]')
            .should('be.visible').should('contain','Name')
        cy.get('[aria-label="Email: activate to sort column ascending"]')
            .should('be.visible').should('contain','Email')
        cy.get('[aria-label="Roles"]')
            .should('be.visible').should('contain','Roles')
        cy.get('[aria-label="Login allowed: activate to sort column ascending"]')
            .should('be.visible').should('contain','Login allowed')
        cy.get('#users_dt > thead > tr > .buttons')
            .should('be.visible').should('contain','Actions')
    // Check entries and search bar
        cy.get('#users_dt_length > label')
            .should('be.visible')
        cy.get('#users_dt_info')
            .should('be.visible')
        cy.get('#users_dt_filter > label > .form-control')
            .should('be.visible')
    // Check table buttons
        if(Shop.isDemo01() || Shop.isStage()) {
            cy.get('.buttons > ._modalFormHandler')
                .should('be.visible')
            cy.get('.buttons > .delete-dt-row > .rv-delete')
                .should('be.visible')
        }
    })

    it('Roles', function() {
        cy.viewport(1300,2000)
    // select roles
        cy.get(':nth-child(2) > .nav-link').should('be.visible').should('contain','Roles').click()
    // Check add new role button
        if(Shop.isDemo01() || Shop.isStage()) {
            cy.get('#roles > .rvl-datatable-wrapper > .rvl-datatable-table > .mb-3 > ._modalFormHandler')
                .should('be.visible').should('contain','Add new role')
        }
    // Check entries and search bar
        cy.get('#roles_dt_length > label')
            .should('be.visible')
        cy.get('#roles_dt_filter > label')
            .should('be.visible')
        if(Cypress.env('automation')) {
            cy.get('#roles_dt_info').should('be.visible')
        }
        else
            cy.get('#roles_dt_filter > label > .form-control').should('be.visible')
    // Check table headers
        cy.get('#roles_dt > thead > tr > .sorting')
            .should('be.visible').should('contain','Name')
        cy.get('[aria-label="Permissions"]')
            .should('be.visible').should('contain','Permissions')
        cy.get('#roles_dt > thead > tr > .buttons')
            .should('be.visible').should('contain','Actions')
    // Check Actions buttons
        if(Shop.isDemo01() || Shop.isStage()) {
            cy.get('.buttons > ._modalFormHandler')
                .should('be.visible')
            cy.get('.buttons > .delete-dt-row > .rv-delete')
                .should('be.visible')
        }
    // check Member appears [permissions need update from time to time]
        if (!Shop.isStage()) {
            cy.get('#roles-dt-container').find('td').contains('Member').then(memberCell => {
                const memberRow = memberCell.closest('tr');
                cy.wrap(memberRow).find('td:nth-child(2)').should('contain','Customer Analytics, Segmentation, Customer Lifetime Value, Retention, CRM, Product Performance, Catalog Performance, Brand Performance, Category Performance, Customer Experience, Edit Shop, List API Keys, Create API Key, Edit API Key, Delete API Key, Audience Builder, List Audiences, Create Audience, Audience Details, Audience Export, Sync Audience Provider, Delete Audience, List Costs, Create Cost, Edit Cost, Delete Cost, Customer Details, Cohort Analysis, Export NPS, Import Page, List Employees, Export Employees, List CRM Marketplace, Export CRM Marketplace, List Customers, Export Customers, List Products, Export Products, List Buying Habits, Export Buying Habits, List NPS Pre Responses, Export NPS Pre Responses, List NPS Responses, Export NPS Responses, List Brands, Export Brands, List Categories, Export Categories, Metric Explorer, NPS Alerts, Create NPS Alert, Update NPS Alert, Delete NPS Alert, Overview, Generate PDF Overview, RFM Score Mapping, RFM Groups, RFM Points, Gorgias Settings, Klaviyo Settings, General, Integrations, Import Settings, NPS Settings, Explore Settings, Sendgrid Settings, Facebook Settings, NPS Sendgrid Settings, NPS Klaviyo Settings, Reports Settings, General Settings, Order Status Mapping, Export General Settings, Customer Profile Klaviyo Settings, Customer Events, Webhooks, Create Webhook, Edit Webhook, Enable/Disable Webhook, Ping Webhook, Delete Webhook, Dashboard, Dashboards, Vendor Overview, Set Vendor Report, Google Ads Settings, Buying Habits, Buying Trends By Purchased Product List')
                    .should('not.contain', 'Extend Trial, Show Billing Page, Billing Contact Custom Quote, Download Billing Invoice, Cancel Current Subscription, User Management, Remove Users, Add/edit Shop Roles, Delete Roles, Edit User, Invite User')
                // check no edit button or delete for Member
                cy.wrap(memberRow).find('td:nth-child(3)').should(($input) => {
                    expect($input).to.not.have.class('rv-delete rv-icon edit-icon')
                    expect($input).to.not.have.class('_modalFormHandler rv-edit rv-icon edit-icon')
                })
            })
        }
    })
})