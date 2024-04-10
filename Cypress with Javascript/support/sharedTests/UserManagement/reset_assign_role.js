export function resetAssignRoleForUser(roleName, rolesForShop, User) {
    if (rolesForShop.includes(roleName)) {
        User.loginAndGoToUserManagement()
    // Reset Roles
        cy.get('#users-dt-container_row_1 > .buttons > ._modalFormHandler').click()
        cy.get('.dropdown > .dropdown-toggle').click()
        cy.wait(100)
        cy.get('.bs-deselect-all').click()
        cy.wait(100)
        cy.get('._processModalForm').click({force:true})
        cy.wait(1000)
    // Edit Roles
        cy.get('#users-dt-container_row_1 > .buttons > ._modalFormHandler').click()
        cy.get('.dropdown > .dropdown-toggle').click()
        cy.wait(100)
        cy.get(`.dropdown-menu.show a.dropdown-item:contains("${roleName}")`).click()
        cy.wait(100)
        cy.get('.dropdown > .dropdown-toggle').click()
        cy.wait(100)
        cy.get('._processModalForm').click()
        cy.wait(1000)
    }
}