/**
	What the test needs to accomplish ?
	   To verify that the audience synchronization with Google and Facebook Ads is working 
	   
	Criterias :
	   a). The shop needs to have integration with Google or Facebook 
	   b). The shop needs to have active audience with toggled Google and/or Facebook synchronization
	   c). For the synch to work well it is needed to be synch in the last 72 hours
	
	Test logic :
	   We will test all audiences that match criterias and check for the synch using unix time
	   
	Failing conditions:
		- no failing condition
		- the test is a health check and it will log if the active audience were synced or not in the last 72 hours
*/
"use strict"
import { Reveal_User } from '/support/classes/User.js'
import dayjs from 'dayjs'

let User = {}

describe('Audience Builder', function()
{
	before(function() {
		cy.fixture('credentials_vip').then(function(data) {
			let shopId = Cypress.env("shopId") || "demo01"
			User = new Reveal_User(data[shopId])
		})
	})
	
	it('Health Check Audience Synchronization with Google and Facebook in the last 72 hours', function() {
		interceptAndSetWindow()
		cy.viewport(1300, 3000)
		cy.window().then(window => {
			if (window.document.querySelector(SELECTORS.EMPTY_TABLE) !== null) {
				return
			}
			cy.get('table.audience-list tbody > tr').each(($audience, i) => {
				checkAudienceSyncGoogleAndFacebook($audience, i)
			})
		})
	})

	function interceptAndSetWindow() {
		cy.intercept('GET', '*/audiences/**').as('Audience')
		User.Goto('Audience Builder')
		cy.wait('@Audience')
	}	
	function checkAudienceSyncGoogleAndFacebook($audience, i) {
		cy.wrap($audience).as(`audienceHeader${i}`)
		cy.get(`@audienceHeader${i}`).find('td:nth-child(2)').invoke('text').then((text) => {
			if (!text.includes('1 active') && !text.includes('2 active')) {
				return
			}
			AudienceData.open(i)
			cy.get(`@audienceData${i}`).find('tr:has(td input.sync-toggle-switch:checked[checked])').each($row => {
				cy.wrap($row).find(SELECTORS.AUDIENCE_LAST_SYNC_LOCATOR).invoke('text').then((text) => {
					const dateTimeString = text.replace(/\t/g, '')
					const parsedDate = dayjs(dateTimeString, 'YYYY-MM-DD HH:mm:ss')
					const audienceUnixTime = parsedDate.unix()
					const currentDate = dayjs()
					const subtractedDate = currentDate.subtract(72, 'hour')
					const unixTime = subtractedDate.unix()
					cy.wrap(audienceUnixTime).then((value) => {
						try {
							assert.isAtLeast(value, unixTime, `Audience ${i + 1} was synced`)
						} catch (error) {
							cy.log(`Audience ${i + 1} was not synced`)
						}
					})
				})
			})
			AudienceData.close(i)
		})
	}
})

const AudienceData = {
	close: function (i) {
		AudienceData.__toggle(i)
	},
	open: function (i) {
		AudienceData.__toggle(i)
		cy.get(`@audienceHeader${i}`).next('tr').find('table tbody').as(`audienceData${i}`)
	},
	__toggle: function (i) {
		cy.get(`@audienceHeader${i}`).find(SELECTORS.AUDIENCE_HEADER_TOGGLE).click()
	}
}
const SELECTORS = {
	FACEBOOK_DATA_TOGGLE_BTN: 'input.custom-control-input.sync-toggle-switch[data-provider_code="fb"]',
	FACEBOOK_LAST_SYNCED_DATE: '.p-0 > .table > tbody > :nth-child(2) > :nth-child(4)',
	AUDIENCE_HEADER_TOGGLE: 'td:nth-child(1) > .edit-icon > .rv-chevron-right',
	AUDIENCE_LAST_SYNC_LOCATOR: 'td:nth-child(4)',
	EMPTY_TABLE: '.dataTables_empty'
}