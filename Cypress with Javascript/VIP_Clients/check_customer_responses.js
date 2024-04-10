import { Reveal_User } from '/support/classes/User.js'
import { Reveal_Calendar } from '/support/classes/Calendar.js'

let User = {}
let Calendar = {}
let credentials
let shop_name

describe('Customer Experience', function()
{
	before(function() {
		cy.fixture('credentials_vip').then(function(data) {
			credentials = data
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
			Calendar = new Reveal_Calendar()
			const shopCredentials = credentials[shopId]
            shop_name = shopCredentials.shop_name
		})
	})

	it('Sum of Pre-Delivery NPS', function() {
	User.Goto('Customer Experience')
		Calendar.open()
		Calendar.selectLastMonth()
	// Select Pre-Delivery NPS
		// cy.get(':nth-child(1) > .filter-item-container > .dropdown > .btn').click()
		// 	.then(() => {
		// 		cy.get('.dropdown-menu')
		// 		.contains('Pre-Delivery')
		// 		.click()
		// 		cy.get('.card > :nth-child(2) > div > .btn').click({force:true})
		// 	}) //TODO: change this to comply pipeline tests
	// Calculate how many responses
		User.getNPSPreDeliveryGoodResponses().then(good => {
			User.getNPSPreDeliveryNeutralResponses().then(neutral => {
				User.getNPSPreDeliveryBadResponses().then(bad => {
					const RevealNPSPreDeliveryReponses = good + neutral + bad
					cy.log(RevealNPSPreDeliveryReponses)
				// Login to Explore
					cy.visit('https://web.omniconvert.com/crm/websites?search=' + `${shop_name}`)
					cy.get(':nth-child(3) > .reveal--input').type('qa-test@omniconvert.com', {force: true})
					cy.get(':nth-child(4) > .reveal--input').type('djq!DeCYGc4e6WeT*b*v')
					cy.get('form > .reveal--button').click()
				// Impersonate shop
					cy.get(':nth-child(2) > :nth-child(11) > .action-icon > .fa').click()
				// Go to Survey and select last month
					cy.visit('https://web.omniconvert.com/survey/list?status=&interval=prev_m&device_type=all&name=')
				// Get NPS Pre responses 
					User.getNPSPreDeliveryExplore().then(ExploreReponses =>{
						const ExploreNPSPreDeliveryReponses = ExploreReponses
						expect(RevealNPSPreDeliveryReponses).to.eq(ExploreNPSPreDeliveryReponses)
					})
				})
			})
		})
	})
})