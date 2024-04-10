import {expectObjectOrNull,expectNumberOrNull,expectArrayOrNull,expectStringOrNull,expectBooleanOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let api_webhook_id
let shop_unique
let platform

describe('Webhook', function() {
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            shop_unique = "demo01"
            api_url = "https://api.argos.stage.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_webhook_id = 0 // no id available
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            shop_unique = "demo01"
            api_url = "https://api.reveal.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_webhook_id = 1
        } else {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demo01"
                const shopCredentials = credentials[shopId]
                api_username = shopCredentials.api_username
                api_key_password = shopCredentials.api_key_password
                api_url = shopCredentials.api_url
                api_webhook_id = shopCredentials.api_webhook_id
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

    it('Show Webhook', function() {
        const newUrl = `${api_url}s/${shop_unique}/webhooks/${api_webhook_id}`
        cy.request ({ 
            method:'GET',
            url: newUrl,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            const statusCode = response.status
            if (statusCode === 200) {
                var webhook = response.body.webhook
                expect(response.body).to.have.property('webhook').to.satisfy(expectObjectOrNull)
                expect(webhook).to.have.property('id').that.satisfies(expectNumberOrNull)
                expect(webhook).to.have.property('url').that.satisfies(expectStringOrNull)
                expect(webhook).to.have.property('events').that.satisfies(expectArrayOrNull)
                expect(webhook).to.have.property('description').that.satisfies(expectStringOrNull)
                expect(webhook).to.have.property('secret').that.satisfies(expectStringOrNull)
                expect(webhook).to.have.property('alert_email').that.satisfies(expectStringOrNull)
                expect(webhook).to.have.property('enabled').that.satisfies(expectBooleanOrNull)
                expect(webhook).to.have.property('status_details').that.satisfies(expectStringOrNull)
                expect(webhook).to.have.property('failed_since').that.satisfies(expectStringOrNull)
                expect(webhook).to.have.property('last_alert_at').that.satisfies(expectStringOrNull)
            } else if (statusCode === 404) {
                const responseBody = response.body
                if(shopId === 'demo01Stage') {
                    expect(responseBody).to.deep.eq({
                        "error": "record not found",
                        "message": "Resource could not be found"
                    })
                } else 
                    expect(responseBody).to.deep.eq({
                        "message": "Resource could not be found"
                    })
            }
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_webhook_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/webhooks/${api_webhook_id}`,
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