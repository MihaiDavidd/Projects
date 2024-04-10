import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull,expectArrayOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let api_pre_nps_response_id
let shop_unique
let platform

describe('NPS Pre Response', function() {
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            shop_unique = "demo01"
            api_url = "https://api.argos.stage.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_pre_nps_response_id = 8
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            shop_unique = "demo01"
            api_url = "https://api.reveal.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_pre_nps_response_id = null
        } else {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demo01"
                const shopCredentials = credentials[shopId]
                api_username = shopCredentials.api_username
                api_key_password = shopCredentials.api_key_password
                api_url = shopCredentials.api_url
                api_pre_nps_response_id = shopCredentials.api_pre_nps_response_id
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
    
        it('Show NPS Pre Responses', function() {
            if (api_pre_nps_response_id) {
                cy.request ({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/nps-pre-responses/${api_pre_nps_response_id}`,
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }).then(response => {
                    var nps_pre_response = response.body.nps_pre_response
                    expect(response.body).to.have.property('nps_pre_response').to.satisfy(expectObjectOrNull)
                    expect(nps_pre_response).to.have.property('id').that.satisfies(expectNumberOrNull)
                    expect(nps_pre_response).to.have.property('survey_id').that.satisfies(expectNumberOrNull)
                    expect(nps_pre_response).to.have.property('nps_score').that.satisfies(expectNumberOrNull)
                    expect(nps_pre_response).to.have.property('responded_at').that.satisfies(expectStringOrNull)
                    expect(nps_pre_response).to.have.property('employees').that.satisfies(expectStringOrNull)
                    expect(nps_pre_response).to.have.property('questions').that.satisfies(expectArrayOrNull)
                    const questions = nps_pre_response.questions
                    for (let i = 0; i < questions.length; i++) {
                        const question = questions[i]
                        expect(question).to.have.property('survey_id').that.satisfies(expectNumberOrNull)
                        expect(question).to.have.property('question_id').that.satisfies(expectNumberOrNull)
                        expect(question).to.have.property('question_type').that.satisfies(expectStringOrNull)
                        expect(question).to.have.property('question_text').that.satisfies(expectStringOrNull)
                        expect(question).to.have.property('question_order').that.satisfies(expectNumberOrNull)
                        expect(question).to.have.property('answers').that.satisfies(expectArrayOrNull)
                        const answers = question.answers
                        for (let j = 0; j < answers.length; j++) {
                            const answer = answers[j]
                            expect(answer).to.have.property('answer_id').that.satisfies(expectNumberOrNull)
                            expect(answer).to.have.property('answer_text').that.satisfies(expectStringOrNull)
                            expect(answer).to.have.property('answer_order').that.satisfies(expectNumberOrNull)
                        }
                    }
                    expect(nps_pre_response).to.have.property('customer_eid').that.satisfies(expectStringOrNull)
                    expect(nps_pre_response).to.have.property('customer_email').that.satisfies(expectStringOrNull)
                    expect(nps_pre_response).to.have.property('order_eid').that.satisfies(expectStringOrNull)
                })  
            }
        })
    
    it('Show NPS Pre Responses with invalid data', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}s/${shop_unique}/nps-pre-responses/a`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            const statusCode = response.status
            const responseBody = response.body
            expect(statusCode).to.eq(404)
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
            cy.readFile(`API_Responses/Responses/response_nps_pre_response_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/nps-pre-responses/${api_pre_nps_response_id}`,
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