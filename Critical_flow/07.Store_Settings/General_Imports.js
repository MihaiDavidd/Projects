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

    it('Imports', function() {
        User.Goto('General')
        cy.viewport(1300,1800)
    // Go to Imports
        cy.get('#imports_edit_button').should('be.visible').click()
    // Check title 
        cy.get('.page-title').should('be.visible').should('contain','Import Settings')
    // API Server IP
        cy.get('.element-api_server_ip > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','API Server IP')
        cy.get('.element-api_server_ip > .left-info > p')
            .should('be.visible').should('contain','This is the IP from which we will perform the requests to fetch your feeds. Please whitelist this IP when using IP-based restrictions for your data feeds.')
    // Basic Auth-User
        cy.get('.element-basic_auth_user > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Basic Auth - User')
        cy.get('.element-basic_auth_user > .left-info > p')
            .should('be.visible').should('contain','This is the user that will be used by our system to access your data feeds if you choose to restrict them using Basic Auth.')
    // Basic Auth-Password
        cy.get('.element-basic_auth_pass > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Basic Auth - Password')
        cy.get('.element-basic_auth_pass > .left-info > p')
            .should('be.visible').should('contain','This is the password that will be used by our system to access your data feeds if you choose to restrict them using Basic Auth.')
    // Customer Feed URL
        cy.get('.element-url_feed_customers > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','Customers Feed URL')
        cy.get('.element-url_feed_customers > .left-info > p')
            .should('be.visible').should('contain','This is the URL for your data feed which contains your customers.')
    // Product Categories
        cy.get('.element-url_feed_categories > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','(Product) Categories Feed URL')
        cy.get('.element-url_feed_categories > .left-info > p')
            .should('be.visible').should('contain','This is the URL for your data feed which contains your product categories.')
    // Products Feed
        cy.get('.element-url_feed_products > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','Products Feed URL')
        cy.get('.element-url_feed_products > .left-info > p')
            .should('be.visible').should('contain','This is the URL for your data feed which contains your products.')
    // Orders Feed
        cy.get('.element-url_feed_orders > .right-inputs > .label-info-right > .required')
            .should('be.visible').should('contain','Orders Feed URL')
        cy.get('.element-url_feed_orders > .left-info > p')
            .should('be.visible').should('contain','This is the URL for your data feed which contains your orders.')
    // Vendors Feed 
        if(Shop.isMarketplace()) {
            cy.get('.element-url_feed_vendors > .right-inputs > .label-info-right > .required')
                .should('be.visible').should('contain','Vendors Feed URL')
            cy.get('.element-url_feed_vendors > .left-info > p')
                .should('be.visible').should('contain','This is the URL for your data feed which contains your vendors with departments and employees.')
        }
    // Daily enabled
        cy.get('.element-daily_enabled > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Daily enabled')
        cy.get('.element-daily_enabled > .left-info > p')
            .should('be.visible').should('contain','Having this toggle turned ON will allow us to import data. Turning it OFF will stop data imports.')
        cy.get('.slider')
            .should('be.visible')
    // Technical Contact Email
        cy.get('.element-contact_email > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Technical Contact Email')
        cy.get('.element-contact_email > .left-info > p')
            .should('be.visible').should('contain','We prefilled this field with your account email. If you wish to receive email notifications for your data imports, both automatic and manually triggered, to another email please change the email here.')
    // Save Button
        cy.get('.actions-custom-group > #settings')
            .should('be.visible').should('contain','Save')
    })
})