let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
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
    
    it('Show Customer Attributes', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}s/${shop_unique}/customers-attrs`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            const CustomerAttributes = response.body.attributes
            expect(response.status).to.eq(200)
            if (CustomerAttributes) {
                expect(CustomerAttributes).to.have.property('discount_group').that.is.an('array')
                if(Cypress.env('shopId') === "demo01" || shopId === 'demo01') {
                    expect(CustomerAttributes.discount_group).to.deep.equal(["15%", "5%", "10%", "no_discount"])
                } else if(Cypress.env("shopId") === 'demo01Stage' || shopId === 'demo01Stage') {
                    expect(CustomerAttributes.discount_group).to.deep.equal(["15%","5%","10%","no_discount","company","individual"])
                } else {
                    expect(CustomerAttributes.discount_group).to.deep.equal(["5%", "15%", "10%", "no_discount"])
                }
            }
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_customer_attributes_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/customers-attrs`,
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