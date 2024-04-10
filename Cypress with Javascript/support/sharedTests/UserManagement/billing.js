export function checkPermissionForRoleBilling(billingPermissions, rolesForShop, User) {
    if (rolesForShop.includes("Billing")) {
    // This if creates a soft-limit because another shop may have the permissions but the role has a different name
        User.loginInvitedUser()
        if (billingPermissions.includes("Show Billing Page")) {
            User.Goto('Billing')
            cy.location().should((loc) => {
                expect(loc.pathname).to.include('billing')
            })
            cy.get('.page-title').should('be.visible').should('contain','Billing')
        }
    } else 
    cy.log('This shop does not have the role Billing')
}