import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull,expectArrayOrNull,expectBooleanOrNull} from '../support/sharedVariables/api_variables'
import { Reveal_Shop } from '/support/classes/Shop'

let Shop = {}
let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let api_user_id
let platform
let shop_unique

describe('User', function() {
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            Shop = new Reveal_Shop({ shopId, api_url, api_username, api_key_password })
            api_url = "https://api.argos.stage.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_user_id = 1
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            Shop = new Reveal_Shop({ shopId, api_url, api_username, api_key_password })
            api_url = "https://api.reveal.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_user_id = 10
        } else {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demo01"
                Shop = new Reveal_Shop(credentials[shopId])
                const shopCredentials = credentials[shopId]
                api_username = shopCredentials.api_username
                api_key_password = shopCredentials.api_key_password
                api_url = shopCredentials.api_url
                api_user_id = shopCredentials.api_user_id
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
    
    it('Show User with valid data', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}users/${api_user_id}`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            if(Shop.isAPIAdmin() === true) {
                var user = response.body.user
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('user').to.satisfy(expectObjectOrNull)
                if (user) {
                    expect(user).to.have.property('id').that.satisfies(expectNumberOrNull)
                    expect(user).to.have.property('name').that.satisfies(expectStringOrNull)
                    expect(user).to.have.property('email').that.satisfies(expectStringOrNull)
                    expect(user).to.have.property('roles').that.satisfies(expectArrayOrNull)
                    expect(user).to.have.property('enabled').that.satisfies(expectBooleanOrNull)
                    expect(user).to.have.property('platform').that.satisfies(expectStringOrNull)
                    expect(user).to.have.property('created_at').that.satisfies(expectStringOrNull)
                    expect(user).to.have.property('updated_at').that.satisfies(expectStringOrNull)
                    expect(user).to.have.property('deleted_at').that.satisfies(expectStringOrNull)
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

    it('Show User with invalid data', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}users/99990`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
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
            cy.readFile(`API_Responses/Responses/response_user_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}users/${api_user_id}`,
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