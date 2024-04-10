import {expectStringOrNull,expectArrayOrNull,expectObjectOrNull} from '../support/sharedVariables/api_variables'

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
            api_order_eid = 187826
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

    it('Show Order Employees for valid order_eid ', function() { 
        cy.request ({ 
            method:'GET',
            url: `${api_url}s/${shop_unique}/orders/${api_order_eid}/employees`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            const employee = response.body.employees
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('employees').to.satisfy(expectObjectOrNull)
            if (employee) {
                expect(employee).to.have.property('employees').that.satisfies(expectArrayOrNull)
                if(shopId === "61d018"){
                    const employees = employee.employees
                    for (let i = 0; i < employees.length; i++) {
                        const orderEmployee = employees[i]
                        expect(orderEmployee).to.have.property('employee_eid').that.satisfies(expectStringOrNull)
                        expect(orderEmployee).to.have.property('name').that.satisfies(expectStringOrNull)
                        expect(orderEmployee).to.have.property('role').that.satisfies(expectStringOrNull)
                        expect(orderEmployee).to.have.property('team').that.satisfies(expectStringOrNull)
                    }
                }
            }
        })
    })

    it('Show Order Employees for invalid order_eid ', function() {
        cy.request ({ 
            method:'GET',
            url: `${api_url}s/${shop_unique}/orders/999999/employees`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            const employee = response.body.employees
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('employees').to.satisfy(expectObjectOrNull)
            if (employee) {
                expect(employee).to.have.property('employees').that.satisfies(expectStringOrNull)
            }
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_order_employees_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/orders/${api_order_eid}/employees`,
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