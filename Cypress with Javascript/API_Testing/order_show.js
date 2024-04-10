import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull,expectArrayOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let api_order_eid
let shop_unique
let platform

describe('Order', function() {
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            shop_unique = "demo01"
            api_url = "https://api.argos.stage.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_order_eid = 172509
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            shop_unique = "demo01"
            api_url = "https://api.reveal.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_order_eid = 187826
        } else {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demo01"
                const shopCredentials = credentials[shopId]
                api_username = shopCredentials.api_username
                api_key_password = shopCredentials.api_key_password
                api_url = shopCredentials.api_url
                api_order_eid = shopCredentials.api_order_eid
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

    it('Show Order with valid data', function() {   
        cy.request ({ 
            method:'GET',
            url: `${api_url}s/${shop_unique}/orders/${api_order_eid}`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            var orders = response.body.order
            expect(response.status).to.eq(200)
            expect(orders).to.have.property('order_eid').that.satisfies(expectStringOrNull)
            expect(orders).to.have.property('customer_eid').that.satisfies(expectStringOrNull)
            expect(orders).to.have.property('customer_email').that.satisfies(expectStringOrNull)
            expect(orders).to.have.property('status').that.satisfies(expectStringOrNull)
            expect(orders).to.have.property('placed_at').that.satisfies(expectStringOrNull)
            expect(orders).to.have.property('last_modified_at').that.satisfies(expectStringOrNull)
            expect(orders).to.have.property('shipping_at').that.satisfies(expectStringOrNull)
            expect(orders).to.have.property('currency').that.satisfies(expectStringOrNull)
            expect(orders).to.have.property('grand_total').that.satisfies(expectNumberOrNull)
            expect(orders).to.have.property('shipping').that.satisfies(expectNumberOrNull)
            expect(orders).to.have.property('order_discount').that.satisfies(expectNumberOrNull)
            expect(orders).to.have.property('bc_grand_total').that.satisfies(expectNumberOrNull)
            expect(orders).to.have.property('bc_shipping').that.satisfies(expectNumberOrNull)
            expect(orders).to.have.property('bc_order_discount').that.satisfies(expectNumberOrNull)
            expect(orders).to.have.property('payment_type').that.satisfies(expectStringOrNull)
            expect(orders).to.have.property('shipping_provider').that.satisfies(expectStringOrNull)
            expect(orders).to.have.property('vendor').that.satisfies(expectObjectOrNull)
            const vendorInfo = orders.vendor
            if (vendorInfo !== null) {
                expect(vendorInfo).to.have.property('id').that.satisfies(expectNumberOrNull)
                expect(vendorInfo).to.have.property('vendor_eid').that.satisfies(expectStringOrNull)
                expect(vendorInfo).to.have.property('email').that.satisfies(expectStringOrNull)
                expect(vendorInfo).to.have.property('name').that.satisfies(expectStringOrNull)
                expect(vendorInfo).to.have.property('date_registered').that.satisfies(expectStringOrNull)
                expect(vendorInfo).to.have.property('country').that.satisfies(expectStringOrNull)
                expect(vendorInfo).to.have.property('region').that.satisfies(expectStringOrNull)
                expect(vendorInfo).to.have.property('city').that.satisfies(expectStringOrNull)
                expect(vendorInfo).to.have.property('status').that.satisfies(expectNumberOrNull)
                expect(vendorInfo).to.have.property('created_at').that.satisfies(expectStringOrNull)
                expect(vendorInfo).to.have.property('updated_at').that.satisfies(expectStringOrNull)
                expect(vendorInfo).to.have.property('custom_attributes').that.satisfies(expectStringOrNull) //untested with real payload
                expect(vendorInfo).to.have.property('departments').that.satisfies(expectStringOrNull) // untested with real payload
            }
            expect(orders).to.have.property('products').that.satisfies(expectArrayOrNull)
            const orderProduct = orders.products
            for (let i = 0; i < orderProduct.length; i++) {
                const orderProducts = orderProduct[i]
                if (orderProducts) {
                    expect(orderProducts).to.have.property('product_eid').that.satisfies(expectStringOrNull)
                    expect(orderProducts).to.have.property('parent_product_eid').that.satisfies(expectStringOrNull)
                    expect(orderProducts).to.have.property('status').that.satisfies(expectStringOrNull)
                    expect(orderProducts).to.have.property('placed_at').that.satisfies(expectStringOrNull)
                    expect(orderProducts).to.have.property('last_modified_at').that.satisfies(expectStringOrNull)
                    expect(orderProducts).to.have.property('qty').that.satisfies(expectNumberOrNull)
                    expect(orderProducts).to.have.property('product_price').that.satisfies(expectNumberOrNull)
                    expect(orderProducts).to.have.property('total').that.satisfies(expectNumberOrNull)
                    expect(orderProducts).to.have.property('tax').that.satisfies(expectNumberOrNull)
                    expect(orderProducts).to.have.property('discount').that.satisfies(expectNumberOrNull)
                    expect(orderProducts).to.have.property('bc_product_price').that.satisfies(expectNumberOrNull)
                    expect(orderProducts).to.have.property('bc_total').that.satisfies(expectNumberOrNull)
                    expect(orderProducts).to.have.property('bc_tax').that.satisfies(expectNumberOrNull)
                    expect(orderProducts).to.have.property('bc_discount').that.satisfies(expectNumberOrNull)
                    expect(orderProducts).to.have.property('bc_unit_aq_price').that.satisfies(expectNumberOrNull)
                    expect(orderProducts).to.have.property('bc_profit').that.satisfies(expectStringOrNull)
                    expect(orderProducts).to.have.property('vendor').that.satisfies(expectArrayOrNull)
                    expect(orderProducts).to.have.property('channel').that.satisfies(expectStringOrNull)
                }
            }
            expect(orders).to.have.property('products_history').that.satisfies(expectArrayOrNull)
            expect(orders).to.have.property('custom_attributes').that.satisfies(expectObjectOrNull)
            if(shopId === "demo01" || shopId === 'demo01Stage') {
                expect(orders.custom_attributes).to.have.property('entity').that.satisfies(expectStringOrNull)
            } else {
                expect(orders).to.have.property('custom_attributes').that.satisfies(expectStringOrNull)
            }
            expect(orders).to.have.property('employees').that.satisfies(expectArrayOrNull)
        })
    })
    
    it('Show Order with invalid data', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}s/${shop_unique}/customers/99999999`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            const statusCode = response.status
            expect(statusCode).to.eq(404)
            const responseBody = response.body
            expect(responseBody).to.contain({
                "message": "Resource could not be found"
            })
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_order_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/orders/${api_order_eid}`,
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