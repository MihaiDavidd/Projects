export class Reveal_User {
    constructor(data){
        this.url = data.url;
        this.username = data.username;
        this.password = data.password;
        this.shop_unique = data.shop_unique;
		this.shop_name = data.shop_name;
		this.production = data.production;
		this.user_super_admin = data.user_super_admin;
	}

	hasSuperAdmin(){
		return this.user_super_admin
	}
	
	getVendorMargin(){
		return cy.get('#vendor_overview_dt-dt_row_1 > .column__margin--vendor_overview_dt').invoke('text')
	}

	getfirstVendorMargin()
	{
		return cy.get('#vendor_overview_dt-dt_row_2 > .column__margin--vendor_overview_dt').invoke('text')
	}
	getfirstVendorOrders(){
		return cy.get('#vendor_overview_dt-dt_row_2 > :nth-child(4)').invoke('text')
	}

	getfirstVendorCustomers(){
		return cy.get('#vendor_overview_dt-dt_row_2 > :nth-child(5)').invoke('text')
	}

	getfirstVendorCLV(){
		return cy.get('#vendor_overview_dt-dt_row_2 > :nth-child(8)').invoke('text')
	}

	getfirstVendorRevenue(){
			return cy.get('#vendor_overview_dt-dt_row_2 > :nth-child(6)').invoke('text')
	}

	getVendorOrders(){
		return cy.get('#vendor_overview_dt-dt_row_1 > :nth-child(4)').invoke('text')
	}

	getVendorCustomers(){
		return cy.get('#vendor_overview_dt-dt_row_1 > :nth-child(5)').invoke('text')
	}

	getVendorCLV(){
		return cy.get('#vendor_overview_dt-dt_row_1 > :nth-child(8)').invoke('text')
	}

	getVendorRevenue(){
		return cy.get('#vendor_overview_dt-dt_row_1 > :nth-child(6)').invoke('text')
	}

	getNPSPostMainDashboard(){
		return cy.get('#chart-nps_score_panel-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value')
			.invoke('text').then(Math.round)
	}
	getNPSPostTrendsOverview(){
		return cy.get('#customer_net_promoter_score_post').invoke('text').then(parseInt)
	}

	
	getADBTMainDashboard(){
		return cy.get('#chart-average_days_between_orders-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value')
			.invoke('text')
	}
	getADBTTrendsOverview(){
		return cy.get('#order_adbt').invoke('text')
	}


	getRevenuePerCustomerCLV(){
		return cy.get('#chart-customer_lifetime_value_historical-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value')
			.invoke('text')
	}
	getRevenuePerCustomerTrendsOverview(){
		return cy.get('#customer_historical_clv').invoke('text')
	}


	getAOVMainDashboard(){
		return cy.get('#chart-average_order_value-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value')
			.invoke('text')
	}
	getAOVTrendsOverview(){
		return cy.get('#order_aov').invoke('text')
	}

	
	getOrdersMainDashboard() {
		return cy.get('#chart-order_count-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value')
			.invoke('text')
	}
	getOrdersTrendsOverview() {
		return cy.get('#top_orders').invoke('text')
	}


	getRevenueMain(){
		return cy.get('#chart-revenue-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value')
			.invoke('text')
	}
	getRevenueTrendsOverview(){
		return cy.get('#top_revenue').invoke('text')
	}
	getRevenueMainRFMSegmentationLover(){
		return cy.get('#row_2 > :nth-child(4)').invoke('text')
	}
	getRevenueSegmentationRFMSegmentationLover(){
		return cy.get('#row_2 > :nth-child(4)').invoke('text')
	}
	getRevenueMainRFMSegmentationApprentice(){
		return cy.get('[id^=row]')
		.contains('td', 'Apprentice')
		.nextAll()
		.eq(2)
		.invoke('text');
	}
	getRevenueSegmentationRFMSegmentationApprentice(){
		return cy.get('[id^=row]')
		.contains('td', 'Apprentice')
		.nextAll()
		.eq(2)
		.invoke('text');
	}
	

	getCLVMainDashboard() {
		return cy.get('#chart-customer_lifetime_value_predictive-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value')
			.invoke('text')
	}
	getCLVCustomerLifetimeValue() {
		return cy.get('#chart-customer_lifetime_value_predictive-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value')
			.invoke('text')
	}
	getCLVTrendsOverview() {
		return cy.get('#customer_clv').invoke('text')
	}


	getMarginMain(){
		return cy.get('#chart-margin-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value').invoke('text')
	}
	getMarginTrendsOverview(){
		return cy.get('#top_margin').invoke('text')
	}
	getMarginMainRFMSegmentationLover(){
		return cy.get('#row_2 > :nth-child(3)').invoke('text')
	}
	getMarginSegmentationRFMSegmentationLover(){
		return cy.get('#row_2 > :nth-child(3)').invoke('text')
	}
	getMarginMainRFMSegmentationApprentice(){
		return cy.get('[id^=row]')
		.contains('td', 'Apprentice')
		.nextAll()
		.eq(1)
		.invoke('text')
	}
	getMarginSegmentationRFMSegmentationApprentice(){
		return cy.get('[id^=row]')
		.contains('td', 'Apprentice')
		.nextAll()
		.eq(1)
		.invoke('text')
	}

	
	getCustomerMain(){
		return cy.get('#chart-customer_count-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value')
			.invoke('text')
	}
	getCustomerTrendsOverview(){
		return cy.get('#top_customers').invoke('text')
	}
	getCustomerMainRFMSegmentationApprentice(){
		return cy.get('[id^=row]')
		.contains('td', 'Apprentice')
		.nextAll()
		.eq(0)
		.invoke('text')
		.then((text) => {
            const modifiedText = text.replace(',', '')
            return parseInt(modifiedText)
        })
	}
	getCustomerMainRFMSegmentationLover(){
		return cy.get('#row_2 > :nth-child(2)').invoke('text')
			.then((text) => {
				const modifiedText = text.replace(',', '')
				return parseInt(modifiedText)
			})
	}
	getCustomerSegmentationRFMSegmentationApprentice(){
		return cy.get('[id^=row]')
		.contains('td', 'Apprentice')
		.nextAll()
		.eq(0)
		.invoke('text')
		.then((text) => {
            const modifiedText = text.replace(',', '')
            return parseInt(modifiedText)
        })
	}
	getCustomerSegmentationRFMSegmentationLover(){
		return cy.get('#row_2 > :nth-child(2)').invoke('text')
			.then((text) => {
				const modifiedText = text.replace(',', '')
				return parseInt(modifiedText)
			})
	}


	getNPSPreDeliveryGoodResponses() {
		return cy.get(':nth-child(1) > .d-inline-block')
			.invoke('text').then(parseInt)
	}
	getNPSPreDeliveryNeutralResponses() {
		return cy.get(':nth-child(2) > .d-inline-block')
			.invoke('text').then(parseInt)
	}
	getNPSPreDeliveryBadResponses() {
		return cy.get(':nth-child(3) > .d-inline-block')
			.invoke('text').then(parseInt)
	}


	getNPSPreDeliveryExplore(){
		return cy.get(':nth-child(2) > .row_active > .experimentCard-results > ul > :nth-child(5) > .results-content').invoke('text').then(parseInt)
	}


	login() {
		cy.fillInput('#username', this.username);
		cy.fillInput('#password', this.password);
		cy.clickLink('#rvl220720log');
	}
	login_with_url(){
		let sessionName = 'Omniconvert';
		cy.session(sessionName, () => {
			cy.visit(this.url)
			cy.fillInput('#username', this.username);
			cy.fillInput('#password', this.password);
			cy.clickLink('#rvl220720log');
		})
	}
	selectStore() {
		if (this.production === true) {
			cy.clickLink(`[data-url="/${this.shop_unique}/dashboard"] > .text-right > .btn`)
		} else {
			cy.clickLink(`.btn[href*="${this.shop_unique}/dashboard"]`)
		}
	}

	visit(page){
		cy.wait(500)
		if(page === 'Trends Overview')
		{
			cy.get('#dashboards > :nth-child(2) > .filter-persistent > span').click()
		}
		if(page === 'Vendor Overview')
		{
			cy.get('#dashboards > :nth-child(3) > .filter-persistent > span').click()
		}
		if(page === 'Segmentation')
		{
			cy.get(':nth-child(2) > .main-link > a').click()
			cy.get('#customer-analytics > :nth-child(1) > .filter-persistent').click()
		}
		if(page === 'CLV')
		{
			cy.get(':nth-child(2) > .main-link > a').click()
			cy.get('#customer-analytics > :nth-child(2) > .filter-persistent').click()
		}
		if(page === 'Retention')
		{
			cy.get(':nth-child(2) > .main-link > a').click()
			cy.get('#customer-analytics > :nth-child(3) > .filter-persistent').click()
		}
		if(page === 'CRM')
		{
			cy.get(':nth-child(2) > .main-link > a').click()
			cy.get('#customer-analytics > :nth-child(4) > .filter-persistent').click()
		}
		if(page === 'Cohort Analysis')
		{
			cy.get(':nth-child(2) > .main-link > a').click()
			cy.get('#customer-analytics > :nth-child(5) > .filter-persistent').click()
		}
		if(page === 'CRM Marketplace')
		{
			cy.get(':nth-child(2) > .main-link > a').click()
			cy.get(':nth-child(6) > .filter-persistent > span').click()
		}
		if(page === 'Catalog Performance')
		{
			cy.get(':nth-child(3) > .main-link > a > span').click()
			cy.get('#product-performance > :nth-child(1) > .filter-persistent > span').click()
		}
		if(page === 'Brand Performance')
		{
			cy.get(':nth-child(3) > .main-link > a > span').click()
			cy.get('#product-performance > :nth-child(2) > .filter-persistent > span').click()
		}
		if(page === 'Category Performance')
		{
			cy.get(':nth-child(3) > .main-link > a > span').click()
			cy.get('#product-performance > :nth-child(3) > .filter-persistent > span').click()
		}
		if(page === 'Buying Habits')
		{
			cy.get(':nth-child(3) > .main-link > a > span').click()
			cy.get('#product-performance > :nth-child(4) > .filter-persistent > span').click()
		}
		if(page === 'Customer Experience')
		{
			cy.get(':nth-child(4) > .main-link > .filter-persistent').click()
		}
		if(page === 'Audience Builder')
		{
			if(Cypress.env('automation') === true) {
				cy.get(':nth-child(6) > .main-link > .filter-persistent > span').click()
			}
			else cy.get(':nth-child(5) > .main-link > .filter-persistent > span').click()
		}
		if(page === 'NPS Alert')
		{
			if(Cypress.env('automation') === true) {
				cy.get(':nth-child(7) > .main-link > .filter-persistent > span').click()
			}
			else cy.get(':nth-child(6) > .main-link > .filter-persistent').click()
		}
		if(page === 'General')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(1) > a').click()
		}
		if(page === 'Billing')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(2) > a').click()
		}		
		if(page === 'Integrations')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(3) > a').click()
		}
		if(page === 'Import')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(4) > a').click()
		}
		if(page === 'Costs')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(5) > a').click()
		}
		if(page === 'User Management')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(6) > a').click()
		}
		if(page === 'API Keys')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(1) > a').click()
			cy.get('#apiKeys_edit_button').click()
		}
		if(page === 'Customer Events')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(1) > a').click()
			cy.get('#customerEvents_edit_button').click()
		}
		if(page === 'Exports General Settings')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(1) > a').click()
			cy.get('#exportGeneral_edit_button').should('be.visible').click()
		}
		if(page === 'Imports')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(1) > a').click()
			cy.get('#imports_edit_button').click()
		}
		if(page === 'NPS Klaviyo')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(1) > a').click()
			cy.get('#npsKlaviyo_edit_button').click()
		}
		if(page === 'NPS SendGrid')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(1) > a').click()
			cy.get('#npsSendgrid_edit_button').click()
		}
		if(page === 'NPS')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(1) > a').click()
			cy.get('#npsSettings_edit_button').click()
		}
		if(page === 'Order Status Mapping')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(1) > a').click()
			cy.get('#orderStatus_edit_button').click()
		}
		if(page === 'Reports')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(1) > a').click()
			cy.get('#reports_edit_button').click()
		}
		if(page === 'RFM Groups')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(1) > a').click()
			cy.get('#rfmGroups_edit_button').click()
		}
		if(page === 'RFM Points')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(1) > a').click()
			cy.get('#rfmPoints_edit_button').click()
		}
		if(page === 'RFM Score Mapping')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(1) > a').click()
			cy.get('#rfmSMapping_edit_button > .rv-edit').click()
		}
		if(page === 'Settings for Klaviyo')
		{
			cy.get('.secondary > .menu-categories-main-links > .list-group > :nth-child(1) > .main-link > a').click()
			cy.get('#settings > :nth-child(1) > a').click()
			cy.get('#klaviyoCustomerProfile_edit_button').click()
		}
	cy.wait(500)
	}
	Goto(page_name) {
		let url ='';
		let sessionName = 'Omniconvert';
		if (page_name === 'Main'){
			url = (this.url+ this.shop_unique + '/dashboard')
		}
		if (page_name === 'Trends Overview'){
			url = (this.url+ this.shop_unique + '/overview')
		}
		if (page_name === 'Vendor Overview'){
			url = (this.url+ this.shop_unique + '/vendor-overview/')
		}
		if (page_name === 'Segmentation'){
			url = (this.url+ this.shop_unique + '/categories/segmentation')
		}
		if (page_name === 'Customer Lifetime Value'){
			url = (this.url+ this.shop_unique + '/categories/customer-lifetime-value')
		}
		if (page_name === 'Retention'){
			url = (this.url+ this.shop_unique + '/categories/retention')
		}
		if (page_name === 'CRM'){
			url = (this.url+ this.shop_unique + '/categories/crm')
		}
		if (page_name === 'Cohort Analysis'){
			url = (this.url+ this.shop_unique + '/cohort-analysis')
		}
		if (page_name === 'CRM Marketplace'){
			url = (this.url+ this.shop_unique + '/list/crm-marketplace')
		}
		if (page_name === 'Catalog Performance'){
			url = (this.url+ this.shop_unique + '/categories/catalog-performance')
		}
		if (page_name === 'Brand Performance'){
			url = (this.url+ this.shop_unique + '/categories/brand-performance')
		}
		if (page_name === 'Category Performance'){
			url = (this.url+ this.shop_unique + '/categories/category-performance')
		}
		if (page_name === 'Buying Habits'){
			url = (this.url+ this.shop_unique + '/categories/buying-habits')
		}
		if (page_name === 'Customer Experience'){
			url = (this.url+ this.shop_unique + '/categories/customer-experience')
		}
		if (page_name === 'Audience Builder'){
			url = (this.url+ this.shop_unique + '/audience-builder/')
		}
		if (page_name === 'NPS Alert'){
			url = (this.url+ this.shop_unique + '/nps-alerts/')
		}
		if (page_name === 'General'){
			url = (this.url+ this.shop_unique + '/settings/')
		}
		if (page_name === 'Billing'){
			url = (this.url+ this.shop_unique + '/billing/')
		}
		if (page_name === 'Integrations'){
			url = (this.url+ this.shop_unique + '/settings/integrations')
		}
		if (page_name === 'Import'){
			url = (this.url+ this.shop_unique + '/import')
		}
		if (page_name === 'Costs'){
			url = (this.url+ this.shop_unique + '/costs/list')
		}
		if (page_name === 'User Management'){
			url = (this.url+ this.shop_unique + '/settings/users-roles/')
		}
		cy.session(sessionName, () => {
			cy.visit(url)
			cy.fillInput('#username', this.username);
			cy.fillInput('#password', this.password);
			cy.clickLink('#rvl220720log');
		},
		{
			validate() {
				cy.visit(url)
			}
		})
	}
	loginInvitedUser(){
		cy.clearAllCookies()
		cy.fixture('credentials').then(credentials => {
			const shopId = "userpermissionreceiver"
			const { username, password } = credentials[shopId]
			cy.wait(100)
			cy.get('#dropdownProfileToggle').click({force:true})
			cy.wait(100)
			cy.get('.dropdown-item').last().click({force:true})
			cy.wait(100)
			cy.visit(this.url)
			cy.wait(100)
			cy.fillInput('#username', username )
			cy.wait(100)
			cy.fillInput('#password', password )
			cy.wait(100)
			cy.clickLink('#rvl220720log')
			cy.wait(1000)
		})
	}
	loginAndGoToUserManagement() {
		cy.clearAllCookies()
		cy.visit(this.url)
		cy.fillInput('#username', this.username)
		cy.wait(100)
		cy.fillInput('#password', this.password)
		cy.wait(100)
		cy.clickLink('#rvl220720log')
		cy.wait(100)
		cy.visit(this.url+ this.shop_unique + '/settings/users-roles/')
		cy.wait(1000)
	}
	loginDemo01Admin(){
		cy.clearAllCookies()
		cy.fixture('credentials').then(credentials => {
			const shopId = "demo01Admin"
			const { username, password } = credentials[shopId]
			cy.wait(100)
			cy.get('#dropdownProfileToggle').click({force:true})
			cy.wait(100)
			cy.get('.dropdown-item').last().click({force:true})
			cy.wait(100)
			cy.visit(this.url)
			cy.wait(100)
			cy.fillInput('#username', username )
			cy.wait(100)
			cy.fillInput('#password', password )
			cy.wait(100)
			cy.clickLink('#rvl220720log')
			cy.wait(1000)
		})
	}
}
export default { Reveal_User }