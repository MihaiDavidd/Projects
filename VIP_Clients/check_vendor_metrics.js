import { Reveal_User } from '/support/classes/User.js'
import { Reveal_Calendar } from '/support/classes/Calendar.js'
import { Reveal_Shop } from '/support/classes/Shop'
import { CheckVendorMetrics, CheckMetricsForMobexpertVendor,CheckMetricsForAuchanVendor,GoToVendorOverview } from '/support/sharedTests/check_vendor_metrics.js'

let User = {}
let Calendar = {}
let Shop = {}

describe('Vendor Overview Metrics', function()	{
	before(function() {
		cy.fixture('credentials_vip').then(function(data) {
		let shopId = Cypress.env("shopId") || "demo01"
		User = new Reveal_User(data[shopId])
		Calendar = new Reveal_Calendar()
		Shop = new Reveal_Shop(data[shopId])
		})
	})

	it('Compare Dashboard with Vendor Overview metrics for Revenue, Customers, Orders and CLV', function() {
		CheckVendorMetrics(User, Calendar, Shop)
		GoToVendorOverview(User)
	})

    it('For Mobexpert Baneasa Vendor Compare Dashboard with Vendor Overview metrics for Revenue, Customers, Orders and CLV', function() {
		CheckMetricsForMobexpertVendor(User, Calendar)
		GoToVendorOverview(User)
	})

	it('For Auchan Cluj Vendor Compare Dashboard with Vendor Overview metrics for Revenue, Customers, Orders and CLV', function() {
		CheckMetricsForAuchanVendor(User, Calendar)
		GoToVendorOverview(User)
	})
})