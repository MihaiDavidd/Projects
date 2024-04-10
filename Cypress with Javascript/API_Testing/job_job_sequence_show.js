import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull} from '../support/sharedVariables/api_variables'
import { Reveal_Shop } from '/support/classes/Shop'

let Shop = {}
let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let api_job_sequence_id
let shop_unique
let platform

describe('Job', function() {
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            shop_unique = "demo01"
            Shop = new Reveal_Shop({ shopId, api_url, api_username, api_key_password })
            api_url= "https://api.argos.stage.omniconvert.com/v1/"
            api_username= Cypress.env('api_username')
            api_key_password= Cypress.env('api_key_password')
            api_job_sequence_id = 191975249546
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            shop_unique = "demo01"
            Shop = new Reveal_Shop({ shopId, api_url, api_username, api_key_password })
            api_url = "https://api.reveal.omniconvert.com/v1/"
            api_username= Cypress.env('api_username')
            api_key_password= Cypress.env('api_key_password')
            api_job_sequence_id = 230814495027
        } else {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demo01"
                Shop = new Reveal_Shop(credentials[shopId])
                const shopCredentials = credentials[shopId]
                api_username = shopCredentials.api_username
                api_key_password = shopCredentials.api_key_password
                api_url = shopCredentials.api_url
                api_job_sequence_id = shopCredentials.api_job_sequence_id
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


    it('Show Job Sequence with valid data', function() {
        const newUrl = `${api_url}s/${shop_unique}/job-sequences/${api_job_sequence_id}`
        cy.request ({ 
            method:'GET',
            url: newUrl,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            if(Shop.hasJobSequences === true){
                var jobSequence = response.body.job_sequence
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('job_sequence').that.satisfies(expectObjectOrNull)
                if (jobSequence) {
                    expect(jobSequence).to.have.property('id').that.satisfies(expectNumberOrNull)
                    expect(jobSequence).to.have.property('slug').that.satisfies(expectStringOrNull)
                    expect(jobSequence).to.have.property('jobs').that.satisfies(expectStringOrNull)
                    expect(jobSequence).to.have.property('status').that.satisfies(expectStringOrNull)
                    expect(jobSequence).to.have.property('report').that.satisfies(expectStringOrNull)
                    expect(jobSequence).to.have.property('progress').that.satisfies(expectStringOrNull)
                }
            } else if(Shop.hasJobSequences === false) {
                expect(response.status).to.eq(404)
                const responseBody = response.body
                expect(responseBody).to.deep.eq({
                    "message": "Resource could not be found"
                })
            }
        })
    }) 

    it('Show Job Sequence with invalid data', function() {   
        cy.request({
            method: 'GET',
            url: `${api_url}s/${shop_unique}/job-sequences/99999`,
            failOnStatusCode: false,
            headers: {
              'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            expect(response.status).to.eq(404)
            const responseBody = response.body
            if(shopId === "demo01" || shopId === "demomk") {
                expect(responseBody).to.deep.eq({
                    "message": "resource not found"
                })
            } else {
                expect(responseBody).to.deep.eq({
                    "error": "resource not found",
                    "message": "resource not found"
                })
            }
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_job_job_sequence_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/job-sequences/${api_job_sequence_id}`,
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