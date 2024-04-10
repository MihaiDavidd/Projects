import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let api_customer_id
let shop_unique
let platform

describe('Customer', function() {
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            shop_unique = "demo01"
            api_url = "https://api.argos.stage.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_customer_id = 6
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            shop_unique = "demo01"
            api_url = "https://api.reveal.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_customer_id = 43341
        } else {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demo01"
                const shopCredentials = credentials[shopId]
                api_username = shopCredentials.api_username
                api_key_password = shopCredentials.api_key_password
                api_url = shopCredentials.api_url
                api_customer_id = shopCredentials.api_customer_id
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

    it('Show Customer call with valid data', function() {
        if(Cypress.env("shopId") === 'demo01' || shopId === 'demo01') {
            return
        } else {
            cy.request ({ 
                method:'GET',
                url: `${api_url}s/${shop_unique}/customers/${api_customer_id}`,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }).then(response => {
                const ShowCustomers = response.body.customers;
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('customer').to.satisfy(expectObjectOrNull)
                if (ShowCustomers) {
                    expect(ShowCustomers).to.have.property('customer_eid').that.satisfies(expectStringOrNull)
                    expect(ShowCustomers).to.have.property('email').that.satisfies(expectStringOrNull)
                    expect(ShowCustomers).to.have.property('first_name').that.satisfies(expectStringOrNull) 
                    expect(ShowCustomers).to.have.property('last_name').that.satisfies(expectStringOrNull)
                    expect(ShowCustomers).to.have.property('date_registered').that.satisfies(expectStringOrNull)
                    expect(ShowCustomers).to.have.property('country').that.satisfies(expectStringOrNull)
                    expect(ShowCustomers).to.have.property('region').that.satisfies(expectStringOrNull)
                    expect(ShowCustomers).to.have.property('city').that.satisfies(expectStringOrNull)
                    expect(ShowCustomers).to.have.property('gender').that.satisfies(expectStringOrNull)
                    expect(ShowCustomers).to.have.property('yob').that.satisfies(expectStringOrNull)
                    expect(ShowCustomers).to.have.property('accepts_marketing').that.satisfies(expectStringOrNull)
                    expect(ShowCustomers).to.have.property('is_guest').that.satisfies(expectNumberOrNull)
                    expect(ShowCustomers).to.have.property('was_guest').that.satisfies(expectStringOrNull)
                    expect(ShowCustomers).to.have.property('anonymized_at').that.satisfies(expectStringOrNull)
                    expect(ShowCustomers).to.have.property('last_order_phone').that.satisfies(expectStringOrNull)
                    expect(ShowCustomers).to.have.property('last_order_eid').that.satisfies(expectStringOrNull)
                    expect(ShowCustomers).to.have.nested.property('custom_attributes.discount_group').that.satisfies(expectStringOrNull)     
                }
            })
        }
    })

    it('Show Customer call with invalid data', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}s/${shop_unique}/customers/1`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            const statusCode = response.status
            expect(statusCode).to.eq(404)
            if (Cypress.env('shopId') === "demo01" || shopId === 'demo01') {
                expect(response.body).to.contain({
                    "message": "Resource could not be found"
                })
            } else {
                expect(response.body).to.contain({
                    "error": "record not found",
                    "message": "Resource could not be found"
                })
            }
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_customer_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/customers/${api_customer_id}`,
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