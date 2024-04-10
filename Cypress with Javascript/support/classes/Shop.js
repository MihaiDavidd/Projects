export class Reveal_Shop {
    constructor(data) {
        this.currency = data.currency
        this.marketplace = data.marketplace
        this.shop_name = data.shop_name
        this.billing_plan = data.billing_plan
        this.sendgrid_integration_active = data.sendgrid_integration_active
        this.klaviyo_integration_active = data.klaviyo_integration_active
        this.facebook_integration_active = data.facebook_integration_active
        this.google_integration_active = data.google_integration_active
        this.api_keys = data.api_keys
        this.Demo01 = data.Demo01
        this.api_keys = data.api_keys
        this.Demo01 = data.Demo01
        this.production = data.production
        this.stage = data.stage
        this.shop_unique = data.shop_unique
        this.api_admin = data.api_admin
        this.hasCosts = data.hasCosts
        this.hasNPSInvitations = data.hasNPSInvitations
        this.hasJobSequences = data.hasJobSequences
        this.hasCustomerProfiles = data.hasCustomerProfiles
        this.hasAccountKey = data.api_account_key
        this.hasApiNPSPreResponse = data.api_nps_pre_response
        this.hasApiCustomers = data.hasApiCustomers
    }

    hasApiCustomers(){
        return this.hasApiCustomers  
    }

    hasApiNPSPreResponse(){
        return this.hasApiNPSPreResponse
    }

    hasAccountKey(){
        return this.hasAccountKey
    }

    hasCustomerProfiles(){
        return this.hasCustomerProfiles
    }

    hasJobSequences(){
        return this.hasJobSequences
    }

    hasNPSInvitations(){
        return this.hasNPSInvitations
    }

    hasCosts(){
        return this.hasCosts 
    }

    isAPIAdmin(){
        return this.api_admin
    }
    
    getCurrency() {
        return this.currency
    }

    isStage(){
        return this.stage
    }
    
    getFormattedCurrency() {
        return "[" + this.currency + "]"
    }  
    
    isMarketplace() {
        return this.marketplace
    }

    isDemo01(){
        return this.Demo01
    }

    getStoreUnique() {
        return this.shop_unique
    }

    getStoreName() {
        return this.shop_name
    }

    hasSendgridIntegration()
    {
        return this.sendgrid_integration_active
    }

    hasKlaviyoIntegration()
    {
        return this.klaviyo_integration_active
    }
    hasFacebookIntegration()
    {
        return this.facebook_integration_active
    }
    hasGoogleIntegration()
    {
        return this.google_integration_active
    }
    hasApiKeys()
    {
        return this.api_keys
    }
    
    hasBillingPlan()
    {
        return this.billing_plan
    }
}
export default { Reveal_Shop };





