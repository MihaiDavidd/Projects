import {expectStringOrNull,expectNumberOrNull,expectObjectOrNull,expectArrayOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let shop_unique
let platform

describe('Customer Profile', function() {
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
    
    it('Show Customer Profile with valid data', function() {   
        cy.request ({ 
            method: 'GET',
            url: `${api_url}s/${shop_unique}/customer-profiles?page_size=3`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            const customerProfile = response.body.customer_profiles
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('customer_profiles').that.satisfies(expectObjectOrNull)
            expect(customerProfile).to.have.property('page').that.satisfies(expectNumberOrNull)
            expect(customerProfile).to.have.property('page_size').that.satisfies(expectNumberOrNull)
            expect(customerProfile).to.have.property('table').that.satisfies(expectArrayOrNull)
            const customerTable = customerProfile.table
            for (let i = 0; i < customerTable.length; i++) {
                const tableCustomer = customerTable[i]
                if (tableCustomer) {
                    expect(tableCustomer).to.have.property('customer_eid').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('email').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('first_name').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('last_name').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('date_registered').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('country').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('region').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('city').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('gender').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('yob').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('accepts_marketing').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('is_guest').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('was_guest').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('anonymized_at').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('last_order_phone').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('last_order_eid').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('custom_attributes').that.satisfies(expectObjectOrNull)
                    const attributesCustomer = tableCustomer.custom_attributes;
                    if (attributesCustomer && attributesCustomer.discount_group !== undefined) {
                        expect(attributesCustomer).to.have.property('discount_group').that.satisfies(expectStringOrNull)
                    }
                    expect(tableCustomer).to.have.property('cohort').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('first_delivered_order_at').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('first_delivered_order_placed_at').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('first_delivered_order_recency').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('delivered_orders_count').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('delivered_orders_amount').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('last_delivered_order_at').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('last_delivered_order_placed_at').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('last_delivered_order_recency').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('customer_canceled_orders_count').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('customer_canceled_orders_amount').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('last_customer_canceled_order_at').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('last_customer_canceled_order_recency').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('shop_canceled_orders_count').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('shop_canceled_orders_amount').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('last_shop_canceled_order_at').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('last_shop_canceled_order_recency').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('returned_orders_count').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('returned_orders_amount').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('last_returned_order_at').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('last_returned_order_recency').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('last_order_at').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('last_order_recency').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('returned_rate').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('customer_canceled_rate').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('shop_canceled_rate').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('rfm_r_percentile').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('rfm_f_percentile').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('rfm_m_percentile').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('total_spending').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('total_profit').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('total_profit_percentile').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('total_margin').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('is_profitable').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('adbt').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('aov').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('avg_ol_per_order').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('avg_qty_per_order').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('predicted_lifetime').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('predicted_lifetime_value').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_last_response_score').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_last_responded_at').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('nps_last_invited_at').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('nps_last_invitation_responded').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('nps_score_aggregated_3x').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_score_aggregated').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_segment').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('nps_invitation_count').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_response_count').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_response_rate').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_promoter_count').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_passive_count').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_detractor_count').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_score_aggregated_3m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_segment_3m').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('nps_invitation_count_3m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_response_count_3m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_response_rate_3m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_promoter_count_3m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_passive_count_3m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_detractor_count_3m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_score_aggregated_6m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_segment_6m').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('nps_invitation_count_6m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_response_count_6m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_response_rate_6m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_promoter_count_6m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_passive_count_6m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_detractor_count_6m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_score_aggregated_12m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_segment_12m').that.satisfies(expectStringOrNull)
                    expect(tableCustomer).to.have.property('nps_invitation_count_12m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_response_count_12m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_response_rate_12m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_promoter_count_12m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_passive_count_12m').that.satisfies(expectNumberOrNull)
                    expect(tableCustomer).to.have.property('nps_detractor_count_12m').that.satisfies(expectNumberOrNull)
                }
            }
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_customer_profile_list_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/customer-profiles?page_size=1`,
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }).then(response => {
                    const responseBody = response.body
                    expect(JSON.stringify(responseBody['customer_profiles'])).to.deep.equal(JSON.stringify(originalResponses['customer_profiles']))
                })
            })
        })
    }
})