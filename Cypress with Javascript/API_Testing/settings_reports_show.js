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

    it('Show Reports Settings', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}s/${shop_unique}/settings/reports`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            var reportsSettings = response.body.reports_settings
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('reports_settings').to.satisfy(expectObjectOrNull)  
            if (reportsSettings) {
                expect(reportsSettings).to.have.property('base_currency').that.satisfies(expectStringOrNull)
                expect(reportsSettings).to.have.property('customer_merge_guest').that.satisfies(expectBooleanOrNull)
                expect(reportsSettings).to.have.property('inherit_missing_aqprice').that.satisfies(expectBooleanOrNull)
                expect(reportsSettings).to.have.property('prices_ttl').that.satisfies(expectNumberOrNull)
                expect(reportsSettings).to.have.property('product_prices_taxes_included').that.satisfies(expectBooleanOrNull)
                expect(reportsSettings).to.have.property('rate_of_discount').that.satisfies(expectNumberOrNull)
                expect(reportsSettings).to.have.property('shop_avg_margin').that.satisfies(expectNumberOrNull)
            }
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_settings_reports_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/settings/reports`,
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