import { Reveal_User } from '/support/classes/User'
import { Reveal_Shop } from '/support/classes/Shop'

let User = {}
let Shop = {}
let shopId

describe('Dashboard', function() {
	before(function() {
		cy.fixture('credentials').then(function(data) {
			shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Shop = new Reveal_Shop(data[shopId])
		})
	})

	it('Login', function() {
		User.login_with_url()
		if (Shop.isStage()) {
			cy.get('.text-dark').should('contain', Shop.getStoreName())}
		User.selectStore()
		cy.log(shopId)
		cy.location().should((loc) => {
			expect(loc.pathname).to.include(Shop.getStoreUnique())
		})
	})
})