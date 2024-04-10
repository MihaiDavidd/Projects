import {expectStringOrNull,expectNumberOrNull,expectArrayOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
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
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            shop_unique = "demo01"
            api_url = "https://api.reveal.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
        } else {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demo01"
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

    it('Show Order List', function() {   
        cy.request ({ 
            method:'GET',
            url: `${api_url}s/${shop_unique}/orders?page_size=5`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            var products = response.body.table
            expect(response.status).to.eq(200)
            expect(products).to.have.property('page').that.satisfies(expectNumberOrNull)
            expect(products).to.have.property('page_size').that.satisfies(expectNumberOrNull)
            expect(products).to.have.property('table').that.satisfies(expectArrayOrNull)
            const productTable = products.table
            for (let i = 0; i < productTable.length; i++) {
                const tableProduct = productTable[i]
                if (tableProduct) {
                    expect(tableProduct).to.have.property('order_eid').that.satisfies(expectStringOrNull)
                    expect(tableProduct).to.have.property('customer_eid').that.satisfies(expectStringOrNull)
                    expect(tableProduct).to.have.property('customer_email').that.satisfies(expectStringOrNull)
                    expect(tableProduct).to.have.property('status').that.satisfies(expectStringOrNull)
                    expect(tableProduct).to.have.property('placed_at').that.satisfies(expectStringOrNull)
                    expect(tableProduct).to.have.property('last_modified_at').that.satisfies(expectStringOrNull)
                    expect(tableProduct).to.have.property('shipping_at').that.satisfies(expectStringOrNull)
                    expect(tableProduct).to.have.property('currency').that.satisfies(expectStringOrNull)
                    expect(tableProduct).to.have.property('grand_total').that.satisfies(expectNumberOrNull)
                    expect(tableProduct).to.have.property('shipping').that.satisfies(expectNumberOrNull)
                    expect(tableProduct).to.have.property('order_discount').that.satisfies(expectNumberOrNull)
                    expect(tableProduct).to.have.property('bc_grand_total').that.satisfies(expectNumberOrNull)
                    expect(tableProduct).to.have.property('bc_shipping').that.satisfies(expectNumberOrNull)
                    expect(tableProduct).to.have.property('bc_order_discount').that.satisfies(expectNumberOrNull)
                    expect(tableProduct).to.have.property('payment_type').that.satisfies(expectStringOrNull)
                    expect(tableProduct).to.have.property('shipping_provider').that.satisfies(expectStringOrNull)
                    expect(tableProduct).to.have.property('vendor').that.satisfies(expectStringOrNull)
                    expect(tableProduct).to.have.property('products').that.satisfies(expectArrayOrNull)
                    const orderProducts = tableProduct.products
                    for (let j = 0; j < orderProducts.length; j++) {
                        const orderProduct = orderProducts[j]
                        expect(orderProduct).to.have.property('product_eid').that.satisfies(expectStringOrNull)
                        expect(orderProduct).to.have.property('parent_product_eid').that.satisfies(expectStringOrNull)
                        expect(orderProduct).to.have.property('status').that.satisfies(expectStringOrNull)
                        expect(orderProduct).to.have.property('placed_at').that.satisfies(expectStringOrNull)
                        expect(orderProduct).to.have.property('last_modified_at').that.satisfies(expectStringOrNull)
                        expect(orderProduct).to.have.property('qty').that.satisfies(expectNumberOrNull)
                        expect(orderProduct).to.have.property('product_price').that.satisfies(expectNumberOrNull)
                        expect(orderProduct).to.have.property('total').that.satisfies(expectNumberOrNull)
                        expect(orderProduct).to.have.property('tax').that.satisfies(expectNumberOrNull)
                        expect(orderProduct).to.have.property('discount').that.satisfies(expectNumberOrNull)
                        expect(orderProduct).to.have.property('bc_product_price').that.satisfies(expectNumberOrNull)
                        expect(orderProduct).to.have.property('bc_total').that.satisfies(expectNumberOrNull)
                        expect(orderProduct).to.have.property('bc_tax').that.satisfies(expectNumberOrNull)
                        expect(orderProduct).to.have.property('bc_discount').that.satisfies(expectNumberOrNull)
                        expect(orderProduct).to.have.property('bc_unit_aq_price').that.satisfies(expectNumberOrNull)
                        expect(orderProduct).to.have.property('bc_profit').that.satisfies(expectStringOrNull)
                        expect(tableProduct).to.have.property('vendor').that.satisfies(expectArrayOrNull)
                        const orderProductsVendor = orderProducts.vendor
                        if (Array.isArray(orderProductsVendor)) {
                            for(let k = 0; k < orderProductsVendor.length; k++) {
                                const productVendor = orderProductsVendor[k]
                                expect(productVendor).to.have.property('id').that.satisfies(expectNumberOrNull)
                                expect(productVendor).to.have.property('vendor_eid').that.satisfies(expectStringOrNull)
                                expect(productVendor).to.have.property('email').that.satisfies(expectStringOrNull)
                                expect(productVendor).to.have.property('name').that.satisfies(expectStringOrNull)
                                expect(productVendor).to.have.property('date_registered').that.satisfies(expectStringOrNull)
                                expect(productVendor).to.have.property('country').that.satisfies(expectStringOrNull)
                                expect(productVendor).to.have.property('region').that.satisfies(expectStringOrNull)
                                expect(productVendor).to.have.property('city').that.satisfies(expectStringOrNull)
                                expect(productVendor).to.have.property('status').that.satisfies(expectNumberOrNull)
                                expect(productVendor).to.have.property('custom_attributes').that.satisfies(expectStringOrNull)
                                expect(productVendor).to.have.property('departments').that.satisfies(expectStringOrNull)
                                expect(productVendor).to.have.property('created_at').that.satisfies(expectStringOrNull)
                                expect(productVendor).to.have.property('updated_at').that.satisfies(expectStringOrNull)
                            }
                        }
                        expect(orderProduct).to.have.property('channel').that.satisfies(expectStringOrNull)
                    }
                    expect(tableProduct).to.have.property('products_history').that.satisfies(expectStringOrNull)
                    expect(tableProduct).to.have.property('custom_attributes').that.satisfies(expectStringOrNull)
                    expect(tableProduct).to.have.property('employees').that.satisfies(expectStringOrNull)
                }
            }
            expect(products).to.have.property('total_items').that.satisfies(expectNumberOrNull)
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_order_list_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/orders?page_size=1`,
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }).then(response => {
                    const responseBody = response.body
                    expect(JSON.stringify(responseBody)).to.deep.equal(JSON.stringify(originalResponses))
                })
            })
        })
    }
})