export function checkDailyImport(User, Calendar) {
    User.Goto('Main');
    cy.viewport(1300, 3000);
    Calendar.open();
    Calendar.selectToday();
    cy.wait(5000);
    // check in Dashboard that we have orders
    cy.get('#chart-order_count-aggregated-panel > .card > .card-content-panel > .card-content-panel-wrapper > .card-content-panel-values > .value > .panel-value')
      .should('be.visible')
      .should('not.have.text','N/A');
}