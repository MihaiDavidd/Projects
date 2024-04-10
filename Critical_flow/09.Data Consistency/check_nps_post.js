import { Reveal_User } from '/support/classes/User.js'
import { Reveal_Calendar } from '/support/classes/Calendar.js'
import { checkNPSPost } from '../../support/sharedTests/check_nps_post'

let User = {}
let Calendar = {}

describe('Check NPS Post Score', function() {
    before(function() {
        cy.fixture('credentials').then(function(data) {
            let shopId = Cypress.env("shopId") || "demo01"
            User = new Reveal_User(data[shopId])
            Calendar = new Reveal_Calendar()
            if (Cypress.env ('shopId')==='demo01Stage') {
                this.skip()
            }
        })
    })

    it('Compare NPS Post Score between Main, Trends Overview and Customer Experience', function() {
        checkNPSPost(User, Calendar)
    })
})