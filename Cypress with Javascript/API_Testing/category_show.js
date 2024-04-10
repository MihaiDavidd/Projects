import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let api_category_eid
let shop_unique
let platform

describe('Category', function() {    
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            shop_unique = "demo01"
            api_url = "https://api.argos.stage.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_category_eid = 6
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            shop_unique = "demo01"
            api_url = "https://api.reveal.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_category_eid = 130
        } else {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demo01"
                const shopCredentials = credentials[shopId]
                api_username = shopCredentials.api_username
                api_key_password = shopCredentials.api_key_password
                api_url = shopCredentials.api_url
                api_category_eid = shopCredentials.api_category_eid
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

    it('Show Category with valid data', function() {
        const newUrl = `${api_url}s/${shop_unique}/categories/${api_category_eid}`
        cy.request ({ 
            method:'GET',
            url: newUrl,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            var ShowCategories = response.body.category
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('category').to.satisfy(expectObjectOrNull)
            if (ShowCategories) {
                expect(ShowCategories).to.have.property('category_eid').that.satisfies(expectStringOrNull)
                expect(ShowCategories).to.have.property('parent_category_eid').that.satisfies(expectStringOrNull)       
                expect(ShowCategories).to.have.property('level').that.satisfies(expectNumberOrNull)
                expect(ShowCategories).to.have.property('name').that.satisfies(expectStringOrNull)
                expect(ShowCategories).to.have.property('margin').that.satisfies(expectNumberOrNull)
                expect(ShowCategories).to.have.property('url').that.satisfies(expectStringOrNull)
            }
        })  
    })

    it('Show Category with invalid data', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}s/${shop_unique}/categories/9999`,
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
            cy.readFile(`API_Responses/Responses/response_category_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/categories/${api_category_eid}`,
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }).then(response => {
                    const responseBody = response.body
                    expect(JSON.stringify(responseBody['categories'])).to.equal(JSON.stringify(originalResponses['categories']))
                })
            })
        })
    }
})