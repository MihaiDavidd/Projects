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
let platform
let shop_unique

describe('Account Shop', function() {    
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            new Reveal_User({ shopId, api_url, api_username, api_key_password })
            api_url = "https://api.argos.stage.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            new Reveal_User({ shopId, api_url, api_username, api_key_password })
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

    it('Show Account Shop', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}u/shops`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            failOnStatusCode: false
        }).then(response => {
            if(Cypress.env('IS_CI_Prod') || Cypress.env('IS_CI_Stage')) {
                superAdmin  = true
            } else {
                superAdmin = User.hasSuperAdmin()
            }
            if(superAdmin === true) {
                var shops = response.body.shops
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('shops').to.satisfy(expectObjectOrNull)
                for (let i = 0; i < shops.length; i++) {
                    const shop = shops[i]
                    if (shop) {
                        expect(shop).to.have.property('id').that.satisfies(expectNumberOrNull)
                        expect(shop).to.have.property('unique').that.satisfies(expectStringOrNull)
                        expect(shop).to.have.property('domain').that.satisfies(expectStringOrNull)
                        expect(shop).to.have.property('label').that.satisfies(expectStringOrNull)
                        expect(shop).to.have.property('owner').that.satisfies(expectNumberOrNull)
                        expect(shop).to.have.property('client_type').that.satisfies(expectStringOrNull)
                        expect(shop).to.have.property('created_at').that.satisfies(expectStringOrNull)
                        expect(shop).to.have.property('updated_at').that.satisfies(expectStringOrNull)
                        expect(shop).to.have.property('deleted_at').that.satisfies(expectStringOrNull)
                    }
                }
            } else {
                expect(response.body).to.deep.eq({
                    "code": 403,
                    "message": "[AC] you don't have permission to access this resource"
                })
            }
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_account_shops_list_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}u/shops`,
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