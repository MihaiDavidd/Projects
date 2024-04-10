import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull} from '../support/sharedVariables/api_variables'
import { Reveal_Shop } from '/support/classes/Shop'

let Shop = {}
let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let api_shop_id 
let platform
let shop_unique

describe('Shop', function() {
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            Shop = new Reveal_Shop({ shopId, api_url, api_username, api_key_password })
            api_url = "https://api.argos.stage.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_shop_id = 7
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            Shop = new Reveal_Shop({ shopId, api_url, api_username, api_key_password })
            api_url = "https://api.reveal.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_shop_id = 1
        } else {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demo01"
                Shop = new Reveal_Shop(credentials[shopId])
                const shopCredentials = credentials[shopId]
                api_username = shopCredentials.api_username
                api_key_password = shopCredentials.api_key_password
                api_url = shopCredentials.api_url
                api_shop_id = shopCredentials.api_shop_id
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

    it('Show Shop with valid data', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}shops/${api_shop_id}`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            if(Shop.isAPIAdmin() === true) {
                var shop = response.body.shop
                var shop_details = response.body.shop_details
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
                expect(response.body).to.have.property('shop_details').to.satisfy(expectObjectOrNull)
                if (shop_details) {
                    expect(shop_details).to.have.property('id').that.satisfies(expectNumberOrNull)
                    expect(shop_details).to.have.property('live_tour_made_at').that.satisfies(expectStringOrNull)
                    expect(shop_details).to.have.property('demo_made_at').that.satisfies(expectStringOrNull)
                    expect(shop_details).to.have.property('platform').that.satisfies(expectStringOrNull)
                    expect(shop_details).to.have.property('customer_type').that.satisfies(expectStringOrNull)
                    expect(shop_details).to.have.property('country').that.satisfies(expectStringOrNull)
                    expect(shop_details).to.have.property('vertical').that.satisfies(expectStringOrNull)
                    expect(shop_details).to.have.property('is_marketplace').that.satisfies(expectNumberOrNull)
                    expect(shop_details).to.have.property('reason').that.satisfies(expectStringOrNull)
                    expect(shop_details).to.have.property('klaviyo_use_email_identifier').that.satisfies(expectNumberOrNull)
                    expect(shop_details).to.have.property('created_at').that.satisfies(expectStringOrNull)
                    expect(shop_details).to.have.property('updated_at').that.satisfies(expectStringOrNull)
                }
            } else if(Shop.isAPIAdmin() === false) {
                const statusCode = response.status
                expect(statusCode).to.eq(403)
                const responseBody = response.body
                expect(responseBody).to.deep.eq({
                    "code": 403,
                    "message": "[AC] you don't have permission to access this resource"
                })
            }
        })  
    })

    it('Show Shop with invalid data', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}shops/99990`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            const statusCode = response.status
            const responseBody = response.body
            if(shopId === 'demomk'){
                expect(responseBody).to.deep.eq({
                    "code": 403,
                    "message": "[AC] you don't have permission to access this resource"
                })
            } else {
                expect(statusCode).to.eq(404)
                if (Cypress.env('shopId') === "demo01" || shopId === 'demo01') {
                    expect(responseBody).to.deep.eq({
                        "message": "Resource could not be found"
                    })
                } else {
                    expect(responseBody).to.deep.eq({
                        "error": "record not found",
                        "message": "Resource could not be found"
                    })
                }
            }
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_shop_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}shops/${api_shop_id}`,
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