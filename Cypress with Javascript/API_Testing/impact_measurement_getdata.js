import {expectNumberOrNull,expectObjectOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let platform
let shop_unique

describe('Impact Measurement', function() {
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            api_url = "https://api.argos.stage.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
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
                platform = shopCredentials.platform
                shop_unique = shopCredentials.shop_unique
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

    it('Impact Measurement Get Impact Data', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}s/${shopId}/impact-measure-rru`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            failOnStatusCode: false
        }).then(response => {
            const statusCode = response.status
            if (statusCode === 200) {
                var impact = response.body.impact
                expect(response.body).to.have.property('impact').to.satisfy(expectObjectOrNull)
                for (var i = 0; i < impact.length; i++) {
                    var data = impact[i]
                    expect(data).to.have.property('uplift').that.satisfies(expectNumberOrNull)
                    expect(data).to.have.property('estimated_revenue').that.satisfies(expectNumberOrNull)
                    expect(data).to.have.property('estimated_orders_count').that.satisfies(expectNumberOrNull)
                    expect(data).to.have.property('estimated_aov_returning_customer').that.satisfies(expectNumberOrNull)
                    expect(data).to.have.property('estimated_lost_revenue_per_week').that.satisfies(expectNumberOrNull)
                    expect(data).to.have.property('retention_rate_last_year').that.satisfies(expectNumberOrNull)
                }
            } else if (statusCode === 404) {
                const responseBody = response.body
                expect(responseBody).to.deep.eq({
                    "error": "Resource not found",
                    "message": "Not enough data for shop stats"
                })
            }
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_impact_measurement_getdata_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shopId}/impact-measure-rru`,
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