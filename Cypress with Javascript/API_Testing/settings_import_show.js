import {expectStringOrNull,expectObjectOrNull,expectBooleanOrNull,expectNumberOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let shop_unique
let platform

describe('Settings' , function() {
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            shop_unique = "demo01"
            api_url = "https://api.argos.stage.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            shop_unique = "demo01"
            api_url = "https://api.reveal.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
        } else {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demo01"
                const shopCredentials = credentials[shopId]
                api_username = shopCredentials.api_username
                api_key_password = shopCredentials.api_key_password
                api_url = shopCredentials.api_url
                shop_unique = shopCredentials.shop_unique
                platform = shopCredentials.platform
            })
        }
    })

    it('Log In', function() {
        let requestBody
        requestBody = {
            "username": api_username,
            "key": api_key_password 
        }
        cy.request({
            method: 'POST',
            url: api_url + "login",
            body : requestBody
        }).then(response => {
            accessToken = response.body.token
        })
    })

    it('Show Import Settings', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}s/${shop_unique}/settings/import`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            var importSettings = response.body.import_settings
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('import_settings').to.satisfy(expectObjectOrNull)
            if (importSettings) {
                expect(importSettings).to.have.property('api_server_ip').that.satisfies(expectStringOrNull)
                expect(importSettings).to.have.property('basic_auth_pass').that.satisfies(expectStringOrNull)
                expect(importSettings).to.have.property('basic_auth_user').that.satisfies(expectStringOrNull)
                expect(importSettings).to.have.property('contact_email').that.satisfies(expectStringOrNull)
                expect(importSettings).to.have.property('daily_enabled').that.satisfies(expectBooleanOrNull)
                expect(importSettings).to.have.property('daily_import_at').that.satisfies(expectStringOrNull)
                expect(importSettings).to.have.property('order_total_threshold').that.satisfies(expectNumberOrNull)    
                expect(importSettings).to.have.property('retry_feed_category').that.satisfies(expectNumberOrNull)
                expect(importSettings).to.have.property('retry_feed_customer').that.satisfies(expectNumberOrNull)    
                expect(importSettings).to.have.property('retry_feed_order').that.satisfies(expectNumberOrNull)    
                expect(importSettings).to.have.property('retry_feed_product').that.satisfies(expectNumberOrNull)    
                expect(importSettings).to.have.property('retry_feed_vendor').that.satisfies(expectNumberOrNull)    
                expect(importSettings).to.have.property('timeout_feed_category').that.satisfies(expectNumberOrNull)
                expect(importSettings).to.have.property('timeout_feed_customer').that.satisfies(expectNumberOrNull)    
                expect(importSettings).to.have.property('timeout_feed_order').that.satisfies(expectNumberOrNull)    
                expect(importSettings).to.have.property('timeout_feed_product').that.satisfies(expectNumberOrNull)
                expect(importSettings).to.have.property('timeout_feed_vendor').that.satisfies(expectNumberOrNull)
                expect(importSettings).to.have.property('type_feed_combined').that.satisfies(expectStringOrNull)
                expect(importSettings).to.have.property('url_feed_categories').that.satisfies(expectStringOrNull)
                expect(importSettings).to.have.property('url_feed_combined').that.satisfies(expectStringOrNull)
                expect(importSettings).to.have.property('url_feed_customers').that.satisfies(expectStringOrNull)
                expect(importSettings).to.have.property('url_feed_orders').that.satisfies(expectStringOrNull)
                expect(importSettings).to.have.property('url_feed_products').that.satisfies(expectStringOrNull)
                expect(importSettings).to.have.property('url_feed_vendors').that.satisfies(expectStringOrNull)
            }
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_settings_import_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/settings/import`,
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }).then(response => {
                    const responseBody = response.body
                    expect(responseBody).to.deep.equal(originalResponses)
                })
            })
        })
    }
})