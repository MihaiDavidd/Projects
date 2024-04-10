import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull} from '../support/sharedVariables/api_variables'
import { Reveal_User } from '/support/classes/User.js'

let User = {}
let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let superAdmin
let shop_unique
let platform

describe('Account API Key', function() {
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            shop_unique = "demo01"
            new Reveal_User({ shopId, shop_unique, api_url, api_username, api_key_password })
            api_url = "https://api.argos.stage.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            shop_unique = "demo01"
            new Reveal_User({ shopId, shop_unique, api_url, api_username, api_key_password })
            api_url = "https://api.reveal.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
        } else {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demo01"
                User = new Reveal_User(dataCredentials[shopId])
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

    it('Show Account API Key List', function() {
        if (Cypress.env('IS_CI_Prod') || Cypress.env('IS_CI_Stage')) {
            superAdmin  = true
        } else {
            superAdmin = User.hasSuperAdmin()
        }
        if (superAdmin === true) {
            cy.request ({
                method:'GET',
                url: `${api_url}u/api-keys`,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                failOnStatusCode: false
            }).then(response => {
                const statusCode = response.status
                expect(statusCode).to.equal(200)
                const api_keys = response.body.api_keys
                expect(api_keys).to.satisfy(expectObjectOrNull)
                expect(api_keys).to.have.property('page').that.satisfies(expectNumberOrNull)
                expect(api_keys).to.have.property('page_size').that.satisfies(expectNumberOrNull)
                expect(api_keys).to.have.property('total_items').that.satisfies(expectNumberOrNull)
                expect(api_keys).to.have.property('table').to.satisfy(expectObjectOrNull)
                const table = api_keys.table
                if (table) {
                    for (const item of table) {
                        expect(item).to.have.property('id').that.satisfies(expectNumberOrNull)
                        expect(item).to.have.property('name').that.satisfies(expectStringOrNull)
                        expect(item).to.have.property('value').that.satisfies(expectStringOrNull)
                        expect(item).to.have.property('user_id').that.satisfies(expectNumberOrNull)
                        expect(item).to.have.property('user_email').that.satisfies(expectStringOrNull)
                        expect(item).to.have.property('shop_id').that.satisfies(expectNumberOrNull)
                        expect(item).to.have.property('shop_unique').that.satisfies(expectStringOrNull)
                        expect(item).to.have.property('created_at').that.satisfies(expectStringOrNull)
                    }
                }
            })
        }
    })

    it('Check restriction if user does not have Super Admin', function() {
        if (Cypress.env('IS_CI_Prod') || Cypress.env('IS_CI_Stage')) {
            superAdmin  = true
        } else {
            superAdmin = User.hasSuperAdmin()
        }
        if (superAdmin === false) {
            cy.request ({
                method:'GET',
                url: `${api_url}u/api-keys`,
                failOnStatusCode: false,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }).then(response => {
                const statusCode = response.status
                expect(statusCode).to.eq(403)
                const responseBody = response.body
                expect(responseBody).to.deep.eq({
                    "code": 403,
                    "message": "[AC] you don't have permission to access this resource"
                })
            })
        }
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_account_api_key_list_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}u/api-keys?page_size=10`,
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }).then(response => {
                    const responseBody = response.body
                    expect(JSON.stringify(responseBody['api_keys'])).to.equal(JSON.stringify(originalResponses['api_keys']))
                })
            })
        })
    }
})