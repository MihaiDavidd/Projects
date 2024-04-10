import {expectStringOrNull,expectObjectOrNull,expectBooleanOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let shop_unique
let platform

describe('Settings' , function() {
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

    it('Show Order Status Map Settings', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}s/${shop_unique}/order-status-map`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            var OrderStatusMap = response.body.order_status_map
            var PropagationReport = response.body.propagation_report
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('order_status_map').to.satisfy(expectObjectOrNull)
            if(shopId === "61d018") {
                if (OrderStatusMap) {
                    expect(OrderStatusMap).to.have.property('Delivered').that.satisfies(expectStringOrNull)
                    expect(OrderStatusMap).to.have.property('client canceled').that.satisfies(expectStringOrNull)
                    expect(OrderStatusMap).to.have.property('delivered courier').that.satisfies(expectStringOrNull)
                    expect(OrderStatusMap).to.have.property('delivered pickup-box').that.satisfies(expectStringOrNull)
                    expect(OrderStatusMap).to.have.property('returned').that.satisfies(expectStringOrNull)
                }
                expect(response.body).to.have.property('propagation_report').to.satisfy(expectObjectOrNull)
                if (PropagationReport) {
                    expect(PropagationReport).to.have.property('Delivered').that.satisfies(expectBooleanOrNull)
                    expect(PropagationReport).to.have.property('client canceled').that.satisfies(expectBooleanOrNull)
                    expect(PropagationReport).to.have.property('delivered courier').that.satisfies(expectBooleanOrNull)
                    expect(PropagationReport).to.have.property('delivered pickup-box').that.satisfies(expectBooleanOrNull)
                    expect(PropagationReport).to.have.property('returned').that.satisfies(expectBooleanOrNull)
                }
            } else {
                if (OrderStatusMap) {
                    if (shopId === "demomk") {
                    expect(OrderStatusMap).to.have.property('Cancelled').that.satisfies(expectStringOrNull)
                    expect(OrderStatusMap).to.have.property('Delivered').that.satisfies(expectStringOrNull)
                    expect(OrderStatusMap).to.have.property('Pending Delivery').that.satisfies(expectStringOrNull)
                    expect(OrderStatusMap).to.have.property('Returned').that.satisfies(expectStringOrNull)
                    } else {
                        expect(OrderStatusMap).to.have.property('client canceled').that.satisfies(expectStringOrNull)
                        expect(OrderStatusMap).to.have.property('delivered courier').that.satisfies(expectStringOrNull)
                        expect(OrderStatusMap).to.have.property('delivered pickup-box').that.satisfies(expectStringOrNull)
                        expect(OrderStatusMap).to.have.property('error').that.satisfies(expectStringOrNull)
                        expect(OrderStatusMap).to.have.property('open').that.satisfies(expectStringOrNull)
                        expect(OrderStatusMap).to.have.property('payment processing').that.satisfies(expectStringOrNull)
                        expect(OrderStatusMap).to.have.property('ready').that.satisfies(expectStringOrNull)
                        expect(OrderStatusMap).to.have.property('refused').that.satisfies(expectStringOrNull)
                        expect(OrderStatusMap).to.have.property('returned').that.satisfies(expectStringOrNull)
                        expect(OrderStatusMap).to.have.property('waiting courier').that.satisfies(expectStringOrNull)
                        expect(OrderStatusMap).to.have.property('waiting supplier').that.satisfies(expectStringOrNull)
                    }
                }
                expect(response.body).to.have.property('propagation_report').to.satisfy(expectObjectOrNull)
                if (PropagationReport) {
                    if (shopId === "demomk") {
                        expect(OrderStatusMap).to.have.property('Cancelled').that.satisfies(expectStringOrNull)
                        expect(OrderStatusMap).to.have.property('Delivered').that.satisfies(expectStringOrNull)
                        expect(OrderStatusMap).to.have.property('Pending Delivery').that.satisfies(expectStringOrNull)
                        expect(OrderStatusMap).to.have.property('Returned').that.satisfies(expectStringOrNull)
                    } else {
                        expect(PropagationReport).to.have.property('canceled').that.satisfies(expectBooleanOrNull)
                        expect(PropagationReport).to.have.property('client canceled').that.satisfies(expectBooleanOrNull)
                        expect(PropagationReport).to.have.property('delivered courier').that.satisfies(expectBooleanOrNull)
                        expect(PropagationReport).to.have.property('delivered pickup-box').that.satisfies(expectBooleanOrNull)
                        expect(PropagationReport).to.have.property('error').that.satisfies(expectBooleanOrNull)
                        expect(PropagationReport).to.have.property('open').that.satisfies(expectBooleanOrNull)
                        expect(PropagationReport).to.have.property('payment processing').that.satisfies(expectBooleanOrNull)
                        expect(PropagationReport).to.have.property('ready').that.satisfies(expectBooleanOrNull)
                        expect(PropagationReport).to.have.property('refused').that.satisfies(expectBooleanOrNull)
                        expect(PropagationReport).to.have.property('returned').that.satisfies(expectBooleanOrNull)
                        expect(PropagationReport).to.have.property('waiting courier').that.satisfies(expectBooleanOrNull)
                        expect(PropagationReport).to.have.property('waiting supplier').that.satisfies(expectBooleanOrNull)
                    }
                }
            }
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_settings_order_status_map_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/order-status-map`,
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