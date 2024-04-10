import { Reveal_User } from '/support/classes/User.js'
import { Reveal_Shop } from '/support/classes/Shop'
import { CheckVendorsList } from '/support/sharedTests/check_vendors_list.js'

let User = {}
let Shop = {}
let credentials
let api_username
let api_key_password
let api_url
let accessToken
let shopUnique

describe('Dashboard - User Management', function()	{
	before(function() {
			cy.fixture('credentials').then(function(dataCredentials) {
			credentials = dataCredentials
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(dataCredentials[shopId])
			Shop = new Reveal_Shop(dataCredentials[shopId])
			const shopCredentials = credentials[shopId]
			api_username = shopCredentials.api_username
			api_key_password = shopCredentials.api_key_password
			api_url = shopCredentials.api_url
			shopUnique = shopCredentials.shop_unique
			if (Cypress.env ('shopId')==='demo01Stage') {
				this.skip()
			}
		})
	})

	it('Compare Dashboard Vendor List with the User Management list', function() {
		CheckVendorsList(User,Shop,api_url,api_username,api_key_password,accessToken,shopUnique)
	})
})