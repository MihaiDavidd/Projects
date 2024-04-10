import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull} from '../support/sharedVariables/api_variables'
import { Reveal_Shop } from '/support/classes/Shop'

let Shop = {}
let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let api_serve_id
let shop_unique
let platform

describe('NPS Invitations', function() {    
    before(function() {
        if (Cypress.env('IS_CI_Stage')) {
            shopId = "demo01Stage"
            Shop = new Reveal_Shop({ shopId, api_url, api_username, api_key_password })
            api_url= "https://api.argos.stage.omniconvert.com/v1/"
            api_username= Cypress.env('api_username')
            api_key_password= Cypress.env('api_key_password')
            api_serve_id = Cypress.env('api_serve_id')
        } else if (Cypress.env('IS_CI_Prod')) {
            shopId = "demo01"
            Shop = new Reveal_Shop({ shopId, api_url, api_username, api_key_password })
            api_url = "https://api.reveal.omniconvert.com/v1/"
            api_username= Cypress.env('api_username')
            api_key_password= Cypress.env('api_key_password')
            api_serve_id = Cypress.env('api_serve_id')
        } else {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demo01"
                Shop = new Reveal_Shop(credentials[shopId])
                const shopCredentials = credentials[shopId]
                api_username = shopCredentials.api_username
                api_key_password = shopCredentials.api_key_password
                api_url = shopCredentials.api_url
                api_serve_id = shopCredentials.api_serve_id
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

    it('Show NPS Invitation Private with invalid data', function() {   
        cy.request ({
            method: 'GET',
            url: `${api_url}nps-invitations/A/serve`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            const statusCode = response.status
            const responseBody = response.body
            if(shopId === 'demomk'){
                expect(responseBody).to.deep.eq({
                    "code": 403,
                    "message": "[AC] you don't have permission to access this resource"
                })
            } else {
                expect(statusCode).to.eq(404)
                expect(responseBody).to.contain({
                    "message": "the NPS Invitation public hash is invalid"
                })
            }
        })
    })

    it('Show NPS Invitation Private with valid data', function() {
        let newUrl
        if (Cypress.env('IS_CI_Stage') || Cypress.env('IS_CI_Prod')) {
            newUrl = api_url + 'nps-invitations/' + api_serve_id + '/serve'
        } else {
            newUrl = `${api_url}nps-invitations/${api_serve_id}/serve`
        }
        cy.request ({ 
            method:'GET',
            url: newUrl,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            if(Shop.isAPIAdmin() === true) {
                var PrivateInvitation = response.body.nps_invitation_serving
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('nps_invitation_serving').to.satisfy(expectObjectOrNull)
                if (PrivateInvitation) {
                    expect(PrivateInvitation).to.have.property('shop').that.satisfies(expectStringOrNull)
                    expect(PrivateInvitation).to.have.property('unique').that.satisfies(expectStringOrNull)     
                    expect(PrivateInvitation).to.have.property('redirect_path').that.satisfies(expectStringOrNull)
                    expect(PrivateInvitation).to.have.property('redirect_query').that.satisfies(expectStringOrNull)
                    expect(PrivateInvitation).to.have.property('status').that.satisfies(expectStringOrNull)
                    expect(PrivateInvitation).to.have.property('survey_id').that.satisfies(expectNumberOrNull)
                }
            } else if(Shop.isAPIAdmin() === false) {
                const statusCode = response.status
                expect(statusCode).to.eq(403)
                const responseBody = response.body
                expect(responseBody).to.deep.eq({
                    "code": 403,
                    "message": "[AC] you don't have permission to access this resource"
                })
            }
        })  
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_nps_invitation_serve_${shop_unique}_${platform}.json`).then(originalResponses => {
                let newUrl
                if (Cypress.env('IS_CI_Stage') || Cypress.env('IS_CI_Prod')) {
                    newUrl = api_url + 'nps-invitations/' + api_serve_id + '/serve'
                } else {
                    newUrl = `${api_url}nps-invitations/${api_serve_id}/serve`
                }
                cy.request({
                    method: 'GET',
                    url: newUrl,
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