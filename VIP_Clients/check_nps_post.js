import { Reveal_User } from '/support/classes/User.js'
import { Reveal_Calendar } from '/support/classes/Calendar.js'
import { checkNPSPost } from '/support/sharedTests/check_nps_post'

let User = {}
let Calendar = {}
let shopId
let hasNPSPreORPost

describe('Check NPS Post', function()	{
	before(function() {
		cy.fixture('credentials_vip').then(function(data) {
			shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Calendar = new Reveal_Calendar()
			hasNPSPreORPost = data[shopId].hasNPSPreORPost
		})
	})

	it('Compare NPS Post Score between Main,Trends Overview and Customer Experience', function() {
		cy.wrap(null).should(() => {
		}).then(() => {
			if (shopId !== undefined && hasNPSPreORPost === "true") {
				checkNPSPost(User, Calendar)
			} else {
				cy.log('This shop has no NPS Pre or Post')
			}
		})
	})
})