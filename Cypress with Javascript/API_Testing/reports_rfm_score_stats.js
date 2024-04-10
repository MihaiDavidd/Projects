import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull,expectArrayOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let shop_unique
let platform

describe('Reports', function() {
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
    
    it('Reports RFM Score Stats', function() {   
        cy.request ({
            method: 'GET',
            url: `${api_url}s/${shop_unique}/reports/rfm/scores`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            var rfm_scores = response.body
            expect(response.status).to.eq(200)
            for (var key in rfm_scores) {
                var score = rfm_scores[key]
                expect(score).to.satisfy(expectObjectOrNull)
                expect(score).to.have.property('id').to.satisfy(expectNumberOrNull)
                expect(score).to.have.property('name').to.satisfy(expectStringOrNull)
                expect(score).to.have.property('rank').to.satisfy(expectNumberOrNull)
                expect(score).to.have.property('scores').to.satisfy(expectArrayOrNull)
                if(score.scores) {
                    for (var j = 0; j < score.scores.length; j++) {
                        var scoreDetails = score.scores[j];
                        expect(scoreDetails).to.have.property('slug').to.satisfy(expectStringOrNull);
                        expect(scoreDetails).to.have.property('customers').to.satisfy(expectNumberOrNull);
                        expect(scoreDetails).to.have.property('orders').to.satisfy(expectNumberOrNull);
                        expect(scoreDetails).to.have.property('revenue').to.satisfy(expectNumberOrNull);
                        expect(scoreDetails).to.have.property('profit').to.satisfy(expectNumberOrNull);
                        expect(scoreDetails).to.have.property('avg_customer_value').to.satisfy(expectNumberOrNull);
                        expect(scoreDetails).to.have.property('avg_order_value').to.satisfy(expectNumberOrNull);
                        expect(scoreDetails).to.have.property('avg_customer_profit').to.satisfy(expectNumberOrNull);
                        expect(scoreDetails).to.have.property('avg_order_profit').to.satisfy(expectNumberOrNull);
                    }
                }
            }
        })  
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_reports_rfm_score_stats_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/reports/rfm/scores`,
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