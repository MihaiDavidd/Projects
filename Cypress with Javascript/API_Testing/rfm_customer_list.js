import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull} from '../support/sharedVariables/api_variables'
import { Reveal_Shop } from '/support/classes/Shop'

let Shop = {}
let shop_unique
let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let apiCustomers
let platform

describe('RFM Customer', function() {
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            shop_unique = 'demo01'
            Shop = new Reveal_Shop({ shopId, api_url, api_username, api_key_password })
            api_url = "https://api.argos.stage.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            shop_unique = 'demo01'
            Shop = new Reveal_Shop({ shopId, api_url, api_username, api_key_password })
            api_url = "https://api.reveal.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
        } else {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demo01"
                Shop = new Reveal_Shop(credentials[shopId])
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

    it('Show RFM Customer list', function() {
        const newUrl = `${api_url}s/${shop_unique}/rfm/customers`
        cy.request ({ 
            method:'GET',
            url: newUrl,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            } 
        }).then(response => {
            if (Cypress.env('IS_CI_Prod') || Cypress.env('IS_CI_Stage')) {
                apiCustomers  = true
            } else {
                apiCustomers = Shop.hasApiCustomers
            }
            if (apiCustomers  === true) {
                var customerRFM = response.body.rfm_customers
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('rfm_customers').to.satisfy(expectObjectOrNull)
                expect(customerRFM).to.have.property('page').that.satisfies(expectNumberOrNull)
                expect(customerRFM).to.have.property('page_size').that.satisfies(expectNumberOrNull)
                const customerTable = customerRFM.table
                for (let i = 0; i < customerTable.length; i++) {
                    const tableCustomer = customerTable[i]
                    if (tableCustomer) {
                        expect(tableCustomer).to.have.property('customer_eid').that.satisfies(expectStringOrNull)
                        expect(tableCustomer).to.have.property('customer_email').that.satisfies(expectStringOrNull)
                        expect(tableCustomer).to.have.property('customer_first_name').that.satisfies(expectStringOrNull)
                        expect(tableCustomer).to.have.property('customer_last_name').that.satisfies(expectStringOrNull)
                        expect(tableCustomer).to.have.property('revenue').that.satisfies(expectNumberOrNull)
                        expect(tableCustomer).to.have.property('profit').that.satisfies(expectNumberOrNull)
                        expect(tableCustomer).to.have.property('rfm_score').that.satisfies(expectStringOrNull)
                        expect(tableCustomer).to.have.property('rfm_group_id').that.satisfies(expectNumberOrNull)
                        expect(tableCustomer).to.have.property('rfm_group_name').that.satisfies(expectStringOrNull)
                        expect(tableCustomer).to.have.property('custom_attributes').that.satisfies(expectObjectOrNull)
                        const attributesCustomer = tableCustomer.custom_attributes;
                        if (attributesCustomer && attributesCustomer.discount_group !== undefined) {
                            expect(attributesCustomer).to.have.property('discount_group').that.satisfies(expectStringOrNull)
                        }
                    }
                }
                expect(customerRFM).to.have.property('total_items').that.satisfies(expectNumberOrNull)
            } else {
                expect(response.body).to.deep.eq({
                    "message": "Resource could not be found"
                })
            }
        })  
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_rfm_customer_list_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/rfm/customers`,
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