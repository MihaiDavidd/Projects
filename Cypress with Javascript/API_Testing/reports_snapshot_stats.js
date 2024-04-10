import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let shop_unique

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
                shopId = Cypress.env("shopId") || "61d018"
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
    
    it('Reports Snapshot Stats no data', function() {   
        cy.request ({
            method: 'GET',
            url: `${api_url}s/${shop_unique}/reports/snapshot-stats`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            const statusCode = response.status
            expect(statusCode).to.eq(500)
            const responseBody = response.body
            expect(responseBody).to.contain({
                "message": "Unexpected error"
            })
        })
    })

    it('Reports Snapshot Stats end param yyyy/mm/dd will fail given date with no hours', function() {   
        cy.request ({
            method: 'GET',
            url: `${api_url}s/${shop_unique}/reports/snapshot-stats?end=2023-01-01`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            const statusCode = response.status
            expect(statusCode).to.eq(400)
            const responseBody = response.body
            expect(responseBody).to.deep.eq({
                "error": {
                    "TimeForm": "end: parsing time \"2023-01-01\" as \"2006-01-02 15:04:05\": cannot parse \"\" as \"15\""
                },
                "message": "Invalid form"
            })
        })  
    })

    it('Reports Snapshot Stats end param dd/mm/yyyy will fail due to invalid date', function() {   
        cy.request ({
            method: 'GET',
            url: `${api_url}s/${shop_unique}/reports/snapshot-stats?end=01-01-2023 15:00:00`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            const statusCode = response.status
            expect(statusCode).to.eq(400)
            const responseBody = response.body
            expect(responseBody).to.deep.eq({
                "error": {
                    "TimeForm": "end: parsing time \"01-01-2023 15:00:00\" as \"2006-01-02 15:04:05\": cannot parse \"01-01-2023 15:00:00\" as \"2006\""
                },
                "message": "Invalid form"
            })
        })  
    })

    it('Reports Snapshot Stats with start and end param', function() {   
        cy.request ({
            method: 'GET',
            url: `${api_url}s/${shop_unique}/reports/snapshot-stats?end=2023-01-01 15:00:00&start=2022-01-01 15:00:00`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            var snapshotStats = response.body.snapshot_stats
            checkBodyResponse(response, snapshotStats)
        })
    })

    it('Reports Snapshot Stats with start,start prev, end, end prev will fail due to no hours added ', function() {   
        cy.request ({
            method: 'GET',
            url: `${api_url}s/${shop_unique}/reports/snapshot-stats?start=2022-01-01 15:00:00&end=2023-01-01 15:00:00&start_prev=2023-01-02&end_prev=2023-01-03`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            const statusCode = response.status
            expect(statusCode).to.eq(400)
            const responseBody = response.body
            expect(responseBody).to.deep.eq({
                "error": {
                    "TimeCompareForm": "start_prev: parsing time \"2023-01-02\" as \"2006-01-02 15:04:05\": cannot parse \"\" as \"15\""
                },
                "message": "Invalid form"
            })
        })  
    })

    it('Reports Snapshot Stats with start,start prev, end, end prev with correct date yyyy/mm/dd', function() {   
        cy.request ({
            method: 'GET',
            url: `${api_url}s/${shop_unique}/reports/snapshot-stats?start=2022-01-01 15:00:00&end=2023-01-01 15:00:00&start_prev=2022-02-02 00:00:00&end_prev=2022-02-03 00:00:00`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            var snapshotStats = response.body.snapshot_stats
            checkBodyResponse(response, snapshotStats)
        })  
    })

    it('Reports Snapshot Stats with start,start prev, end, end prev with incorrect date dd/mm/yyyy', function() {   
        cy.request ({
            method: 'GET',
            url: `${api_url}s/${shop_unique}/reports/snapshot-stats?start=01-01-2022 15:00:00&end=2023-01-01 15:00:00&start_prev=2022-02-02 00:00:00&end_prev=2022-02-03 00:00:00`,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            const statusCode = response.status
            expect(statusCode).to.eq(400)
            const responseBody = response.body
            expect(responseBody).to.deep.eq({
                "error": {
                    "TimeForm": "start: parsing time \"01-01-2022 15:00:00\" as \"2006-01-02 15:04:05\": cannot parse \"01-01-2022 15:00:00\" as \"2006\""
                },
                "message": "Invalid form"
            })
        })
    })

    it('Reports Snapshot Stats with time period crossing between "start-end" and "start prev-end prev"', function() {   
        cy.request ({
            method: 'GET',
            url: `${api_url}s/${shop_unique}/reports/snapshot-stats?start=2023-01-01 15:00:00&end=2023-03-01 15:00:00&start_prev=2022-12-02 00:00:00&end_prev=2023-02-03 00:00:00`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            var snapshotStats = response.body.snapshot_stats
            checkBodyResponse(response, snapshotStats)
        })
    })
})

function checkBodyResponse(response, snapshotStats) {
    expect(response.status).to.eq(200)
    expect(response.body).to.have.property('snapshot_stats').to.satisfy(expectObjectOrNull)
    expect(snapshotStats).to.have.property('start_date').that.satisfies(expectStringOrNull)
    expect(snapshotStats).to.have.property('end_date').that.satisfies(expectStringOrNull)
    expect(snapshotStats).to.have.property('start_date_prev').that.satisfies(expectStringOrNull)
    expect(snapshotStats).to.have.property('end_date_prev').that.satisfies(expectStringOrNull)
    expect(snapshotStats).to.have.property('customer_new').that.is.a('number')
    expect(snapshotStats).to.have.property('customer_new_percentage').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('customer_returning').that.is.a('number')
    expect(snapshotStats).to.have.property('customer_returning_percentage').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('customer_historical_clv').that.is.a('number')
    expect(snapshotStats).to.have.property('customer_historical_clv_percentage').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('customer_clv').that.is.a('number')
    expect(snapshotStats).to.have.property('customer_clv_percentage').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('customer_highest_rank_rfm_group_name').that.satisfies(expectStringOrNull)
    expect(snapshotStats).to.have.property('customer_highest_rank_rfm_group_value').that.is.a('number')
    expect(snapshotStats).to.have.property('customer_lowest_rank_rfm_group_name').that.satisfies(expectStringOrNull)
    expect(snapshotStats).to.have.property('customer_lowest_rank_rfm_group_value').that.is.a('number')
    expect(snapshotStats).to.have.property('customer_highest_rank_rfm_group_value_percentage').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('customer_lowest_rank_rfm_group_value_percentage').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('customer_net_promoter_score_pre').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('customer_net_promoter_score_pre_percentage').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('customer_net_promoter_score_post').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('customer_net_promoter_score_post_percentage').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('product_most_sold_title').that.satisfies(expectStringOrNull)
    expect(snapshotStats).to.have.property('product_most_returned_title').that.satisfies(expectStringOrNull)
    expect(snapshotStats).to.have.property('product_top_category').that.satisfies(expectStringOrNull)
    expect(snapshotStats).to.have.property('product_top_brand_name').that.satisfies(expectStringOrNull)
    expect(snapshotStats).to.have.property('product_top_location').that.satisfies(expectStringOrNull)
    expect(snapshotStats).to.have.property('top_revenue').that.is.a('number')
    expect(snapshotStats).to.have.property('top_revenue_percentage').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('top_margin').that.is.a('number')
    expect(snapshotStats).to.have.property('top_margin_percentage').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('top_orders').that.is.a('number')
    expect(snapshotStats).to.have.property('top_orders_percentage').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('top_customers').that.is.a('number')
    expect(snapshotStats).to.have.property('top_customers_percentage').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('order_aov').that.is.a('number')
    expect(snapshotStats).to.have.property('order_aov_percentage').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('order_margin').that.is.a('number')
    expect(snapshotStats).to.have.property('order_margin_percentage').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('order_avg_ol_per_order').that.is.a('number')
    expect(snapshotStats).to.have.property('order_avg_ol_per_order_percentage').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('order_adbt').that.satisfies(expectNumberOrNull)
    expect(snapshotStats).to.have.property('order_adbt_percentage').that.satisfies(expectNumberOrNull)
}