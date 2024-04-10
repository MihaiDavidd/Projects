import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull} from '../support/sharedVariables/api_variables'
import { Reveal_User } from '/support/classes/User.js'

let User = {};
let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let api_account_key_id
let superAdmin
let platform
let shop_unique

describe('Account API Key', function() {
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            new Reveal_User({ shopId, api_url, api_username, api_key_password, api_account_key_id })
            api_url = "https://api.argos.stage.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_account_key_id = 1104
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            new Reveal_User({ shopId, api_url, api_username, api_key_password , api_account_key_id})
            api_url = "https://api.reveal.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_account_key_id = 6862
        } else {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demo01"
                User = new Reveal_User(dataCredentials[shopId])
                const shopCredentials = credentials[shopId]
                api_username = shopCredentials.api_username
                api_key_password = shopCredentials.api_key_password
                api_url = shopCredentials.api_url
                api_account_key_id = shopCredentials.api_account_key_id
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

    it('Show Account API with valid Key', function() {
        if (Cypress.env('IS_CI_Prod') || Cypress.env('IS_CI_Stage')) {
            superAdmin  = true
        } else {
            superAdmin = User.hasSuperAdmin()
        }
        if (superAdmin === true) {
            cy.request ({
                method:'GET',
                url: `${api_url}u/api-keys/${api_account_key_id}`,
                failOnStatusCode: false,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
            }).then(response => {
                var api_key = response.body.api_key
                expect(response.body).to.have.property('api_key').to.satisfy(expectObjectOrNull)
                expect(api_key).to.have.property('id').that.satisfies(expectNumberOrNull)
                expect(api_key).to.have.property('name').that.satisfies(expectStringOrNull)
                expect(api_key).to.have.property('value').that.satisfies(expectStringOrNull)
                expect(api_key).to.have.property('user_id').that.satisfies(expectNumberOrNull)
                expect(api_key).to.have.property('user_email').that.satisfies(expectStringOrNull)
                expect(api_key).to.have.property('shop_id').that.satisfies(expectNumberOrNull)
                expect(api_key).to.have.property('shop_unique').that.satisfies(expectStringOrNull)
                expect(api_key).to.have.property('created_at').that.satisfies(expectStringOrNull)
            })
        }
    })

    it('Show Account API with invalid Key', function() {
        cy.request ({
            method:'GET',
            url: `${api_url}u/api-keys/99999`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            if (Cypress.env('IS_CI_Prod') || Cypress.env('IS_CI_Stage')) {
                superAdmin  = true
            } else {
                superAdmin = User.hasSuperAdmin()
            }
            if (superAdmin === true) {
                expect(response.status).to.eq(404)
                if (Cypress.env('shopId') === "demo01" || shopId === 'demo01') {
                    expect(response.body).to.deep.eq({
                        "message": "Resource could not be found"
                    })
                } else {
                    expect(response.body).to.deep.eq({
                        "error": "record not found",
                        "message": "Resource could not be found"
                    })
                }
            } else if (superAdmin === false) {
                expect(response.status).to.eq(403)
                expect(response.body).to.deep.eq({
                    "code": 403,
                    "message": "[AC] you don't have permission to access this resource"
                })
            }
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_account_api_key_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}u/api-keys/${api_account_key_id}`,
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