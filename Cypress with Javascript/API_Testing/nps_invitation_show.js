import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let api_invitation_id
let shop_unique
let platform

describe('NPS Invitation', function() {
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            shop_unique = "demo01"
            api_url = "https://api.argos.stage.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_invitation_id = Cypress.env('api_invitation_id')
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            shop_unique = "demo01"
            api_url = "https://api.reveal.omniconvert.com/v1/"
            api_username = Cypress.env('api_username')
            api_key_password = Cypress.env('api_key_password')
            api_invitation_id = Cypress.env('api_invitation_id')
        } else {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demo01"
                const shopCredentials = credentials[shopId]
                api_username = shopCredentials.api_username
                api_key_password = shopCredentials.api_key_password
                api_url = shopCredentials.api_url
                api_invitation_id = shopCredentials.api_invitation_id
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
    
    it('Show NPS Invitation with valid data', function() {
        const newUrl = `${api_url}s/${shop_unique}/nps-invitations/${api_invitation_id}`
        cy.request ({ 
            method:'GET',
            url: newUrl,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            var nps_invitation = response.body.nps_invitation_rfm
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('nps_invitation_rfm').to.satisfy(expectObjectOrNull)
            if (nps_invitation) {
                expect(nps_invitation).to.have.property('unique').that.satisfies(expectStringOrNull)
                expect(nps_invitation).to.have.property('link').that.satisfies(expectStringOrNull)
                expect(nps_invitation).to.have.property('nps_list_id').that.satisfies(expectNumberOrNull)
                expect(nps_invitation).to.have.property('order_eid').that.satisfies(expectStringOrNull)
                expect(nps_invitation).to.have.property('customer_eid').that.satisfies(expectStringOrNull)
                expect(nps_invitation).to.have.property('customer_email').that.satisfies(expectStringOrNull)
                expect(nps_invitation).to.have.property('customer_phone').that.satisfies(expectStringOrNull)
                expect(nps_invitation).to.have.property('send_until').that.satisfies(expectStringOrNull)
                expect(nps_invitation).to.have.property('sent_at').that.satisfies(expectObjectOrNull)
                expect(nps_invitation).to.have.property('consume_until').that.satisfies(expectStringOrNull)
                expect(nps_invitation).to.have.property('consumed_at').that.satisfies(expectStringOrNull)
                expect(nps_invitation).to.have.property('status').that.satisfies(expectStringOrNull)
                expect(nps_invitation).to.have.property('order').that.satisfies(expectObjectOrNull)
                expect(nps_invitation).to.have.property('customer_first_name').that.satisfies(expectStringOrNull)
                expect(nps_invitation).to.have.property('customer_last_name').that.satisfies(expectStringOrNull)
                expect(nps_invitation).to.have.property('score_links').that.satisfies(expectObjectOrNull)
                expect(nps_invitation).to.have.property('open_link').that.satisfies(expectStringOrNull)
                expect(nps_invitation).to.have.property('rfm_score').that.satisfies(expectStringOrNull)
                expect(nps_invitation).to.have.property('rfm_group_id').that.satisfies(expectNumberOrNull)
                expect(nps_invitation).to.have.property('rfm_group_name').that.satisfies(expectStringOrNull)
            }
        })  
    })

    it('Show NPS Invitation with invalid data', function() {   
        cy.request ({
            method: 'GET',
            url: `${api_url}s/${shop_unique}/nps-invitations/1`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
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
            cy.readFile(`API_Responses/Responses/response_nps_invitation_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/nps-invitations/${api_invitation_id}`,
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