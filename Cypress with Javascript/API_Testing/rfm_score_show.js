import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let shop_unique
let api_rfm_score
let platform

describe('RFM Score', function() {
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            shop_unique = "demo01"
            api_url = "https://api.argos.stage.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_rfm_score = 122
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            shop_unique = "demo01"
            api_url = "https://api.reveal.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_rfm_score = 122
        } else {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demo01"
                const shopCredentials = credentials[shopId]
                api_username = shopCredentials.api_username
                api_key_password = shopCredentials.api_key_password
                api_url = shopCredentials.api_url
                shop_unique = shopCredentials.shop_unique
                api_rfm_score = shopCredentials.api_rfm_score
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

    it('Show RFM Score with valid data', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}s/${shop_unique}/rfm-scores/${api_rfm_score}`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            var scoreRFM = response.body.rfm_score
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('rfm_score').to.satisfy(expectObjectOrNull)
            if (scoreRFM) {
                expect(scoreRFM).to.have.property('slug').that.satisfies(expectStringOrNull)
                expect(scoreRFM).to.have.property('rfm_group').that.satisfies(expectNumberOrNull)     
            }
        })  
    })

    it('Show RFM Score with invalid data', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}s/${shop_unique}/rfm-scores/0`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            const statusCode = response.status
            expect(statusCode).to.eq(404)
            const responseBody = response.body
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
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_rfm_score_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/rfm-scores/${api_rfm_score}`,
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