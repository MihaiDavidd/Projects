import {expectStringOrNull,expectObjectOrNull} from '../support/sharedVariables/api_variables'

let accessToken
let shopId
let credentials
let api_username
let api_key_password
let api_url
let shop_unique
let platform

describe('Settings' , function() {
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

    it('Show All Settings', function() {   
        cy.request ({
            method:'GET',
            url: `${api_url}s/${shop_unique}/settings/all`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            var settings = response.body.settings
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('settings').to.satisfy(expectObjectOrNull) 
            if(settings.audience) {
                if(shopId === "61d018") {
                    expect(settings.audience).to.have.property('facebook_enabled').that.satisfies(expectStringOrNull)
                }
                if (Cypress.env('shopId') !== "demomk") {
                    expect(settings.audience).to.have.property('googleads_enabled').that.satisfies(expectStringOrNull)
                }
                expect(settings.audience).to.have.property('pf_facebook_enabled').that.satisfies(expectStringOrNull)
            }
            if(settings.audience_provider) {
                if(shopId === "61d018") {
                    expect(settings.audience_provider).to.have.property('facebook_config').that.satisfies(expectStringOrNull)
                }
                if (shopId !== "demomk") {
                expect(settings.audience_provider).to.have.property('googleads_config').that.satisfies(expectStringOrNull)
                }
                expect(settings.audience_provider).to.have.property('pf_facebook_config').that.satisfies(expectStringOrNull)
            }
            if(settings.customer_events) {
                if (Cypress.env('shopId') !== "demomk") {
                    expect(settings.customer_events).to.have.property('event_nps_partial_response_enabled').that.satisfies(expectStringOrNull)
                    expect(settings.customer_events).to.have.property('event_nps_pre_response_enabled').that.satisfies(expectStringOrNull)
                    expect(settings.customer_events).to.have.property('event_nps_response_enabled').that.satisfies(expectStringOrNull)
                }
                if(shopId === "61d018" || shopId === "demomk") {
                    expect(settings.customer_events).to.have.property('event_nps_response_update_enabled').that.satisfies(expectStringOrNull)
                }
                if (Cypress.env('shopId') !== "demomk") {
                    expect(settings.customer_events).to.have.property('event_nps_segment_changed_enabled').that.satisfies(expectStringOrNull)
                    expect(settings.customer_events).to.have.property('event_rfm_group_changed_enabled').that.satisfies(expectStringOrNull)
                    expect(settings.customer_events).to.have.property('event_rfm_importance_decreased_enabled').that.satisfies(expectStringOrNull)
                    expect(settings.customer_events).to.have.property('event_rfm_importance_increased_enabled').that.satisfies(expectStringOrNull)
                    expect(settings.customer_events).to.have.property('event_rfm_score_changed_enabled').that.satisfies(expectStringOrNull)
                    expect(settings.customer_events).to.have.property('export_klaviyo_enabled').that.satisfies(expectStringOrNull)
                    expect(settings.customer_events).to.have.property('export_webhook_enabled').that.satisfies(expectStringOrNull)
                    expect(settings.customer_events).to.have.property('trigger_enabled').that.satisfies(expectStringOrNull)
                }    
            }
            if(settings.email_provider) {
                expect(settings.email_provider).to.have.property('config_klaviyo').that.satisfies(expectStringOrNull)
                if(shopId === "61d018") {
                    expect(settings.email_provider).to.have.property('config_sendgrid').that.satisfies(expectStringOrNull)
                }
            }
            if (settings.export) {
                expect(settings.export).to.have.property('customer_profile_contact_email').that.satisfies(expectStringOrNull)
                expect(settings.export).to.have.property('customer_profile_format').that.satisfies(expectStringOrNull)
                expect(settings.export).to.have.property('customer_profile_klaviyo_config').that.satisfies(expectStringOrNull)
                expect(settings.export).to.have.property('customer_profile_klaviyo_enabled').that.satisfies(expectStringOrNull)
                expect(settings.export).to.have.property('nps_invitation_format').that.satisfies(expectStringOrNull)
                expect(settings.export).to.have.property('rfm_customer_diff_format').that.satisfies(expectStringOrNull)
                expect(settings.export).to.have.property('rfm_customer_diff_window').that.satisfies(expectStringOrNull)
                expect(settings.export).to.have.property('rfm_customer_format').that.equals('csv')
            }
            if(settings.general) {
                expect(settings.general).to.have.property('timezone_offset').that.satisfies(expectStringOrNull)
            }
            if(settings.import) {
                expect(settings.import).to.have.property('basic_auth_pass').that.satisfies(expectStringOrNull)
                expect(settings.import).to.have.property('basic_auth_user').that.satisfies(expectStringOrNull)
                expect(settings.import).to.have.property('contact_email').that.satisfies(expectStringOrNull)
                expect(settings.import).to.have.property('daily_enabled').that.satisfies(expectStringOrNull)
                expect(settings.import).to.have.property('daily_import_at').that.satisfies(expectStringOrNull)
                expect(settings.import).to.have.property('type_feed_combined').that.satisfies(expectStringOrNull)
                expect(settings.import).to.have.property('url_feed_categories').that.satisfies(expectStringOrNull)
                expect(settings.import).to.have.property('url_feed_combined').that.satisfies(expectStringOrNull)
                expect(settings.import).to.have.property('url_feed_customers').that.satisfies(expectStringOrNull)
                expect(settings.import).to.have.property('url_feed_orders').that.satisfies(expectStringOrNull)
                expect(settings.import).to.have.property('url_feed_products').that.satisfies(expectStringOrNull)
                expect(settings.import).to.have.property('url_feed_vendors').that.satisfies(expectStringOrNull)
            }
            if(settings.integration) {
                expect(settings.integration).to.have.property('config_explore').that.satisfies(expectStringOrNull)
            }
            if(settings.nps) {
                expect(settings.nps).to.have.property('invitation_capping_enabled').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('invitation_capping_interval').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('invitation_capping_winner').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('invitation_channel').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('invitation_consent_enabled').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('invitation_delay_interval').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('invitation_delay_type').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('invitation_generation_moment').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('invitation_timeout_respond').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('invitation_timeout_send').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('pre_survey_id').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('sending_config_klaviyo').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('sending_config_sendgrid').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('sending_contact_email').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('sending_enabled').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('sending_provider').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('sending_schedule_at').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('survey_id').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('survey_path_consumed').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('survey_path_expired').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('survey_path_valid').that.satisfies(expectStringOrNull)
                expect(settings.nps).to.have.property('survey_presenter_client').that.satisfies(expectStringOrNull)
            }
            if(settings.reports) {
                expect(settings.reports).to.have.property('base_currency').that.satisfies(expectStringOrNull)
                expect(settings.reports).to.have.property('customer_merge_guest').that.satisfies(expectStringOrNull)
                expect(settings.reports).to.have.property('inherit_missing_aqprice').that.satisfies(expectStringOrNull)
                expect(settings.reports).to.have.property('prices_ttl').that.satisfies(expectStringOrNull)
                expect(settings.reports).to.have.property('product_prices_taxes_included').that.satisfies(expectStringOrNull)
                expect(settings.reports).to.have.property('rate_of_discount').that.satisfies(expectStringOrNull)
                expect(settings.reports).to.have.property('shop_avg_margin').that.satisfies(expectStringOrNull)
            }
        })
    })

    if (Cypress.env('compareData')) {
        it('Check and compare response with the original', function() {
            cy.readFile(`API_Responses/Responses/response_settings_all_show_${shop_unique}_${platform}.json`).then(originalResponses => {
                cy.request({
                    method: 'GET',
                    url: `${api_url}s/${shop_unique}/settings/all`,
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