let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let shop_unique
let platform
let costs_id

describe('API Response', function() {
    before(function() {
        cy.fixture('credentials').then(function(dataCredentials) {
            credentials = dataCredentials
            shopId = Cypress.env("shopId") || "demo01"
            const shopCredentials = credentials[shopId]
            api_username = shopCredentials.api_username
            api_key_password = shopCredentials.api_key_password
            api_url = shopCredentials.api_url
            shop_unique = shopCredentials.shop_unique
            platform = shopCredentials.platform
            costs_id = shopCredentials.costs_id
        })
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

    it('Append response body to JSON file for cost show', function() {
        cy.request({
            method: 'GET',
            url: `${api_url}s/${shop_unique}/costs/${costs_id}`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            const responseBody = response.body
            const fileName = `response_cost_show_${shop_unique}_${platform}.json`
            cy.writeFile(`API_Responses/Responses/${fileName}`, responseBody).then(() => {
                cy.log(`${fileName} updated successfully.`)
            })
        })
    })
})