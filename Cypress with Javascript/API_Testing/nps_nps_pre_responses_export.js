let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let shop_unique

describe('NPS', function() {
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

    it('Export NPS Pre Responses with valid data', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}s/${shop_unique}/nps-pre/export/responses.csv?start=2019-02-23 14:45:38`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            expect(response.status).to.eq(200)
            expect(response.headers['content-type']).to.include('text/csv')
        })
    })

    it('Export NPS Pre Responses  with no data', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}s/${shop_unique}/nps-pre/export/`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            const statusCode = response.status
            expect(statusCode).to.eq(404)
            const responseBody = response.body
            expect(responseBody).to.deep.eq("404 page not found")
        })
    })
})