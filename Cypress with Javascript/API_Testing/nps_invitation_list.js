import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull,expectArrayOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
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
    
    it('Show NPS Invitation list', function() {   
        cy.request ({
            method: 'GET',
            url: `${api_url}s/${shop_unique}/nps-invitations`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            var nps_invitation = response.body.nps_invitations_rfm
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('nps_invitations_rfm').to.satisfy(expectObjectOrNull)
            expect(nps_invitation).to.have.property('page').that.satisfies(expectNumberOrNull)
            expect(nps_invitation).to.have.property('page_size').that.satisfies(expectNumberOrNull)
            expect(nps_invitation).to.have.property('table').that.satisfies(expectArrayOrNull)
            expect(nps_invitation).to.have.property('total_items').that.satisfies(expectNumberOrNull)
            const invitationTable = nps_invitation.table
            for (let i = 0; i < invitationTable.length; i++) {
                const invitation = invitationTable[i]
                if (invitation) {
                    expect(invitation).to.have.property('unique').that.satisfies(expectStringOrNull)
                    expect(invitation).to.have.property('link').that.satisfies(expectStringOrNull)
                    expect(invitation).to.have.property('nps_list_id').that.satisfies(expectNumberOrNull)
                    expect(invitation).to.have.property('order_eid').that.satisfies(expectStringOrNull)
                    expect(invitation).to.have.property('customer_eid').that.satisfies(expectStringOrNull)
                    expect(invitation).to.have.property('customer_email').that.satisfies(expectStringOrNull)
                    expect(invitation).to.have.property('customer_phone').that.satisfies(expectStringOrNull)
                    expect(invitation).to.have.property('send_until').that.satisfies(expectStringOrNull)
                    expect(invitation).to.have.property('sent_at').that.satisfies(expectObjectOrNull)
                    expect(invitation).to.have.property('consume_until').that.satisfies(expectStringOrNull)
                    expect(invitation).to.have.property('consumed_at').that.satisfies(expectStringOrNull)
                    expect(invitation).to.have.property('status').that.satisfies(expectStringOrNull)
                    expect(invitation).to.have.property('order').that.satisfies(expectObjectOrNull)
                    expect(invitation).to.have.property('customer_first_name').that.satisfies(expectStringOrNull)
                    expect(invitation).to.have.property('customer_last_name').that.satisfies(expectStringOrNull)
                    expect(invitation).to.have.property('score_links').that.satisfies(expectObjectOrNull)
                    expect(invitation).to.have.property('open_link').that.satisfies(expectStringOrNull)
                    expect(invitation).to.have.property('rfm_score').that.satisfies(expectStringOrNull)
                    expect(invitation).to.have.property('rfm_group_id').that.satisfies(expectNumberOrNull)
                    expect(invitation).to.have.property('rfm_group_name').that.satisfies(expectStringOrNull)
                }
            }
        })  
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_nps_invitation_list_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/nps-invitations?page_size=5`,
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