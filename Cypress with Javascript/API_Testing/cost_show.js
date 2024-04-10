import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull} from '../support/sharedVariables/api_variables'
import { Reveal_Shop } from '/support/classes/Shop'

let Shop = {}
let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let shop_unique
let costs_id
let hasCosts
let platform 

describe('Cost', function() {
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            shop_unique = "demo01"
            Shop = new Reveal_Shop({ shopId, api_url, api_username, api_key_password, shop_unique, costs_id, hasCosts })
            api_url = "https://api.argos.stage.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            costs_id = Cypress.env('costs_id')
            hasCosts = Cypress.env('hasCosts')
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            shop_unique = "demo01"
            Shop = new Reveal_Shop({ shopId, api_url, api_username, api_key_password, shop_unique, costs_id, hasCosts })
            api_url = "https://api.reveal.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            costs_id = Cypress.env('costs_id')
            hasCosts = Cypress.env('hasCosts')
        } else {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demo01"
                Shop = new Reveal_Shop(dataCredentials[shopId])
                const shopCredentials = credentials[shopId]
                api_username = shopCredentials.api_username
                api_key_password = shopCredentials.api_key_password
                api_url = shopCredentials.api_url
                shop_unique = shopCredentials.shop_unique
                costs_id = shopCredentials.costs_id
                hasCosts = shopCredentials.hasCosts
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

    if(Shop.hasCosts === true){
        it('Show Costs with valid data', function() {   
            cy.request ({
                method:'GET',
                url: `${api_url}s/${shop_unique}/costs/${costs_id}`,
                failOnStatusCode: false,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }).then(response => {
                if(Shop.hasCosts === true){
                    var Costs = response.body.cost
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('cost').to.satisfy(expectObjectOrNull)
                    if (Costs) {
                        expect(Costs).to.have.property('id').that.satisfies(expectNumberOrNull)
                        expect(Costs).to.have.property('name').that.satisfies(expectStringOrNull)
                        expect(Costs).to.have.property('from').that.satisfies(expectStringOrNull)
                        expect(Costs).to.have.property('to').that.satisfies(expectStringOrNull)
                        expect(Costs).to.have.property('aq_cost').that.satisfies(expectNumberOrNull)      
                        expect(Costs).to.have.property('ret_cost').that.satisfies(expectNumberOrNull)
                        expect(Costs).to.have.property('aq_orders').that.satisfies(expectNumberOrNull)    
                        expect(Costs).to.have.property('ret_orders').that.satisfies(expectNumberOrNull)
                    }
                }
            })
        })
    }

    it('Show Costs with invalid data', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}s/${shop_unique}/costs/999`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            const statusCode = response.status
            expect(statusCode).to.eq(404)
            const responseBody = response.body
            if(shopId === "demo01" || shopId === "demomk"){
                expect(responseBody).to.deep.eq({
                    "message": "Resource could not be found"
                })
            } else {
                expect(responseBody).to.deep.eq({
                    "error": "record not found",
                    "message": "Resource could not be found"
                })
            }
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_cost_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/costs/${costs_id}`,
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