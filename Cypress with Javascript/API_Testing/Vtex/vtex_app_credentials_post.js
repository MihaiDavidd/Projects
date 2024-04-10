let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let shop_unique
let vtex_app_key
let vtex_app_token

describe('VTEX', function() {
    if (Cypress.env('IS_CI_Prod') || Cypress.env('IS_CI_Stage')) {
        Cypress.config('isStopped', true)
    } else {
        before(function() {
            cy.fixture('credentials').then(function(dataCredentials) {
                credentials = dataCredentials
                shopId = Cypress.env("shopId") || "demomk"
                const shopCredentials = credentials[shopId]
                api_username = shopCredentials.api_username
                api_key_password = shopCredentials.api_key_password
                api_url = shopCredentials.api_url
                shop_unique = shopCredentials.shop_unique
                vtex_app_key = shopCredentials.vtex_app_key
                vtex_app_token = shopCredentials.vtex_app_token
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

        it('Check response without body when a shop is not in the list', function() {   
            if(shopId === "demomk"){
                cy.request ({
                    method:'POST',
                    url: `${api_url}s/${shop_unique}/vtex-app-configs`,
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }).then(response => {
                    const statusCode = response.status
                    const responseBody = response.body
                    expect(statusCode).to.eq(404)
                    expect(responseBody.message).to.eq("Resource could not be found")
                })
            }
        })

        it('Check response with body when a shop is not in the list', function() {   
            if(shopId === "demomk"){
                cy.request ({
                    method:'POST',
                    url: `${api_url}s/${shop_unique}/vtex-app-configs`,
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    },
                    body: {
                        "app_key": vtex_app_key,
                        "app_token": vtex_app_token
                    }
                }).then(response => {
                    const statusCode = response.status
                    const responseBody = response.body
                    expect(statusCode).to.eq(404)
                    expect(responseBody.message).to.eq("Resource could not be found")
                })
            }
        })

        it('Check response without body when a Shopify shop is not in the list', function() {
            if(shopId === "mihai-test"){
                cy.request ({
                    method:'POST',
                    url: `${api_url}s/${shop_unique}/vtex-app-configs`,
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }).then(response => {
                    const statusCode = response.status
                    const responseBody = response.body
                    expect(statusCode).to.eq(400)
                    expect(responseBody).to.eq({
                        "message": {
                            "error": "Missing app_key or app_token!"
                        },
                        "success": false
                    })
                })
            }
        })

        it('Check response with body when a Shopify shop is not in the list', function() {
            if(shopId === "mihai-test"){
                cy.request ({
                    method:'POST',
                    url: `${api_url}s/${shop_unique}/vtex-app-configs`,
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    },
                    body: {
                        "app_key": vtex_app_key,
                        "app_token": vtex_app_token
                    }
                }).then(response => {
                    const statusCode = response.status
                    const responseBody = response.body
                    expect(statusCode).to.eq(404)
                    expect(responseBody).to.eq({
                        "message": {
                            "error": "Shop '71a600' not found!"
                        },
                        "success": false
                    })
                })
            }
        })

        it('Check response when an inexistent shop is not in the list', function() {
            cy.request ({
                method:'POST',
                url: `${api_url}s/thisShopIdDoesnotExist/vtex-app-configs`,
                failOnStatusCode: false,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }).then(response => {
                const statusCode = response.status
                const responseBody = response.body
                expect(statusCode).to.eq(403)
                expect(responseBody.code).to.eq(403);
                expect(responseBody.message).to.eq("[SA] you don't have permission to access this resource");
            })
        })

        it('Check response without body for a VTEX shop that is in the list', function() {
            if(shopId === "432ade"){
                cy.request ({
                    method:'POST',
                    url: `${api_url}s/${shop_unique}/vtex-app-configs`,
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }).then(response => {
                    const statusCode = response.status
                    const responseBody = response.body
                    expect(statusCode).to.eq(400)
                    expect(responseBody).to.deep.eq({
                        "message": {
                            "error": "Missing app_key or app_token!"
                        },
                        "success": false
                    })
                })
            }
        })

        it('Check response with incorrect body for a VTEX shop that is in the list', function() {
            if(shopId === "432ade"){
                cy.request ({
                    method:'POST',
                    url: `${api_url}s/${shop_unique}/vtex-app-configs`,
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    },
                    body: {
                        "app_key": vtex_app_key,
                        "app_token": "a"
                    }
                }).then(response => {
                    const statusCode = response.status
                    const responseBody = response.body
                    expect(statusCode).to.eq(400)
                    expect(responseBody).to.deep.eq({
                        "message": {
                            "error": "cURL error 6: Could not resolve host: vtex-featureflag-onboarding (see https://curl.haxx.se/libcurl/c/libcurl-errors.html)"
                        },
                        "success": false
                    })
                })
            }
        })

        it('Check response with body for a VTEX shop that is in the list', function() {
            if(shopId === "432ade"){
                cy.request ({
                    method:'POST',
                    url: `${api_url}s/${shop_unique}/vtex-app-configs`,
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    },
                    body: {
                        "app_key": vtex_app_key,
                        "app_token": vtex_app_token
                    }
                }).then(response => {
                    const statusCode = response.status
                    const responseBody = response.body
                    expect(statusCode).to.eq(400)
                    expect(responseBody).to.deep.eq({
                        "message": {
                            "error": "cURL error 6: Could not resolve host: vtex-featureflag-onboarding (see https://curl.haxx.se/libcurl/c/libcurl-errors.html)"
                        },
                        "success": false
                    })
                })
            }
        })
    }
})