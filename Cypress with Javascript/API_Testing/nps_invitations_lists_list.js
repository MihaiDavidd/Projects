import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull,expectArrayOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let shop_unique
let platform

describe('NPS Invitations', function() {
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
            url: `${api_url}s/${shop_unique}/nps-invitations-lists`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            var nps_invitations = response.body.nps_invitations_lists
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('nps_invitations_lists').to.satisfy(expectObjectOrNull)
            expect(nps_invitations).to.have.property('page').that.satisfies(expectNumberOrNull)
            expect(nps_invitations).to.have.property('page_size').that.satisfies(expectNumberOrNull)
            expect(nps_invitations).to.have.property('table').that.satisfies(expectArrayOrNull)
            expect(nps_invitations).to.have.property('total_items').that.satisfies(expectNumberOrNull)
            const invitationsTable = nps_invitations.table
            for (let i = 0; i < invitationsTable.length; i++) {
                const invitations = invitationsTable[i]
                if (invitations) {
                    expect(invitations).to.have.property('id').that.satisfies(expectNumberOrNull)
                    expect(invitations).to.have.property('send_until').that.satisfies(expectStringOrNull)
                    expect(invitations).to.have.property('sent_at').that.satisfies(expectStringOrNull)
                    expect(invitations).to.have.property('remaining_to_send').that.satisfies(expectNumberOrNull)
                    expect(invitations).to.have.property('status').that.satisfies(expectStringOrNull)
                    expect(invitations).to.have.property('type').that.satisfies(expectStringOrNull)
                }
            }
        })  
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_nps_invitations_lists_list_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/nps-invitations-lists`,
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