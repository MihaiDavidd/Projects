import { Reveal_User } from '/support/classes/User.js'
import { Reveal_Calendar } from '/support/classes/Calendar.js'
import { checkDailyImport } from '/support/sharedTests/check_daily_import.js'

let User = {}
let Calendar = {}

describe('Dashboard', function() {
  before(function() {
    cy.fixture('credentials_vip').then(function(data) {
      let shopId = Cypress.env("shopId") || "demo01"
      User = new Reveal_User(data[shopId])
      Calendar = new Reveal_Calendar()
    })
  })

  it('Check daily import', function() {
    checkDailyImport(User, Calendar)
  })
})