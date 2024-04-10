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

    it('Reports', function() {
        User.Goto('General')
        cy.viewport(1300,1800)
    // Go to  Reports
        cy.get('#reports_edit_button').should('be.visible').click()
    // Check title 
        cy.get('.page-title').should('be.visible').should('contain','Reports Settings')
    // Base Currency
        cy.get('.element-base_currency > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Base Currency')
        cy.get('#reports_settings_base_currency').should('be.visible').should('have.value', Shop.getCurrency())
        cy.get('.element-base_currency > .left-info > p')
            .should('be.visible').should('contain','This is the main currency of your business. Usually, you have all the financial reports in this currency, and you convert all monetary values to it. All amounts that you send us will (also) be expressed in this currency.')
    // Merge Customers with Guests
        cy.get('.element-customer_merge_guest > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Merge Customers with Guests')
        cy.get('.element-customer_merge_guest > .left-info')
            .should('be.visible').should('contain','Choose whether you wish to consolidate customer accounts with guest accounts if they used the same email address.')
        cy.get('.element-customer_merge_guest > .right-inputs > .form-check-toggle > .switch > .slider')
            .should('be.visible')
    // Shop Average Margin
        cy.get('.element-shop_avg_margin > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Shop Average Margin')
        cy.get('.element-shop_avg_margin > .left-info > p')
            .should('be.visible').should('contain',"If your orders feed does not include the profit for order items, we will calculate the profit based on the difference between the selling price and acquisition price. This value for margin will be used for products which do not have acquisition prices specified in the products feed and when the product's category margin is also unspecified in the categories feed.")
    // Prices TTL
        cy.get('.element-prices_ttl > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Prices TTL [days]')
        cy.get('.element-prices_ttl > .left-info > p')
            .should('be.visible').should('contain','This is the number of days for which prices will be considered up-to-date when looking back into history for product acquisition prices.')
    // Inherit Acquisition
        cy.get('.element-inherit_missing_aqprice > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Inherit Acquisition Price when Creating Product Variant')
        cy.get('.element-inherit_missing_aqprice > .left-info > p')
            .should('be.visible').should('contain',"When importing orders, if a product which does not exist in the products feed is found, it is created. Then, the acquisition price is copied from the parent's acquisition price")
        cy.get('.element-inherit_missing_aqprice > .right-inputs > .form-check-toggle > .switch > .slider')
            .should('be.visible')
    // Test included 
        cy.get('.element-product_prices_taxes_included > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain',"Taxes included in products' prices from product feed")
        cy.get('.element-product_prices_taxes_included > .left-info > p')
            .should('be.visible').should('contain',"Specify if the taxes are included in the products' prices")
        cy.get('.element-product_prices_taxes_included > .right-inputs > .form-check-toggle > .switch > .slider')
            .should('be.visible')
    // Rate of Discount
        cy.get('.element-rate_of_discount > .right-inputs > .label-info-right > label')
            .should('be.visible').should('contain','Rate of Discount')
        cy.get('.element-rate_of_discount > .left-info > p')
            .should('be.visible').should('contain','The "rate of discount" is the interest rate used in discounted cash flow analysis to determine the present value of future cash flows. Usually this number falls between 8% and 15%.')
    })
})