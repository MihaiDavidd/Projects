import { Reveal_User } from '/support/classes/User.js'

let User = {}

describe('NPS Dashboard', function() {
    before(function() {
        cy.fixture('credentials_vip').then(function(data) {
            let shopId = "mobexpert"
            User = new Reveal_User(data[shopId])
        })
    })

    it('Check NPS Dashboard', function() {
        User.Goto('Main')
        cy.get(':nth-child(8) > .main-link > .filter-persistent > span')
            .should('be.visible').should('contain','NPS Dashboard')
        cy.get(':nth-child(8) > .main-link > .filter-persistent > span').click()
        cy.wait(10000)
        cy.get('.page-title')
            .should('be.visible').should('contain','NPS Dashboard')
        cy.get('iframe')
            .should('be.visible')
            .then(($iframe) => {
                const iframe = $iframe.contents()
                cy.wrap(iframe).find('#app').should('be.visible')
                cy.wrap(iframe).find('canvas[data-zr-dom-id="zr_0"]').should('be.visible')
            })
    })
})