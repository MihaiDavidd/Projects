import {expectStringOrNull,expectNumberOrNull,expectArrayOrNull,expectObjectOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let shop_unique
let platform

describe('Job', function() {
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

    it('Show Jobs List', function() {   
        cy.request ({ 
            method:'GET',
            url: `${api_url}s/${shop_unique}/jobs`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            var jobs = response.body.jobs
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('jobs').that.satisfies(expectObjectOrNull)
            expect(jobs).to.have.property('page').that.satisfies(expectNumberOrNull)
            expect(jobs).to.have.property('page_size').that.satisfies(expectNumberOrNull)
            expect(jobs).to.have.property('table').that.satisfies(expectArrayOrNull)
            const jobsTable = jobs.table
            for (let i = 0; i < jobsTable.length; i++) {
                const jobTable = jobsTable[i]
                if (jobTable) {
                    expect(jobTable).to.have.property('id').that.satisfies(expectNumberOrNull)
                    expect(jobTable).to.have.property('owner').that.satisfies(expectStringOrNull)
                    expect(jobTable).to.have.property('sequence_id').that.satisfies(expectNumberOrNull)
                    expect(jobTable).to.have.property('sequence_order').that.satisfies(expectNumberOrNull)
                    expect(jobTable).to.have.property('slug').that.satisfies(expectStringOrNull)
                    expect(jobTable).to.have.property('input_path').that.satisfies(expectStringOrNull)
                    expect(jobTable).to.have.property('output_path').that.satisfies(expectStringOrNull)
                    expect(jobTable).to.have.property('status').that.satisfies(expectStringOrNull)
                    expect(jobTable).to.have.property('email').that.satisfies(expectStringOrNull)
                    expect(jobTable).to.have.property('report').that.satisfies(expectStringOrNull)
                    expect(jobTable).to.have.property('created_at').that.satisfies(expectStringOrNull)
                    expect(jobTable).to.have.property('started_at').that.satisfies(expectStringOrNull)
                    expect(jobTable).to.have.property('finished_at').that.satisfies(expectStringOrNull)
                    expect(jobTable).to.have.property('canceled_at').that.satisfies(expectStringOrNull)
                }
            }
            expect(jobs).to.have.property('total_items').that.satisfies(expectNumberOrNull)
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_job_jobs_list_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/jobs?page_size=10`,
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