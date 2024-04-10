import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull} from '../support/sharedVariables/api_variables'
import { Reveal_User } from '/support/classes/User.js'

let User
let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let shop_unique
let platform
let api_shop_unique

describe('Account Shop', function() {
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            shop_unique = "demo01"
            new Reveal_User({ shopId, api_url, api_username, api_key_password, shop_unique })
            api_url = "https://api.argos.stage.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            shop_unique = "demo01"
            new Reveal_User({ shopId, api_url, api_username, api_key_password, shop_unique })
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
                api_shop_unique = shopCredentials.api_shop_unique
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

    it('Show Account Shop Show', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}u/shops/${shop_unique}`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            failOnStatusCode: false
        }).then(response => {
            let superAdmin
            if (Cypress.env('IS_CI_Prod') || Cypress.env('IS_CI_Stage')) {
                superAdmin  = true
            } else {
                superAdmin = User.hasSuperAdmin()
            }
            if(superAdmin === false) {
                const responseBody = response.body
                expect(responseBody).to.deep.eq({
                    "code": 403,
                    "message": "[AC] you don't have permission to access this resource"
                })
            } else if(superAdmin === true) {
                if(shopId === 'demo01') {
                    expect(response.body).to.deep.eq({
                        "message": "Resource could not be found"
                    })
                } else {
                    var shop = response.body.shop
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('shop').to.satisfy(expectObjectOrNull)
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
            }
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_account_shop_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}u/shops/${api_shop_unique}`,
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }).then(response => {
                    const responseBody = response.body
                    expect(responseBody.shops).to.equal(originalResponses['account_shop_show'])
                })
            })
        })
    }
})