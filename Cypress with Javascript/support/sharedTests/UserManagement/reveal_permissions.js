export const permissionsCheckers = {
    "User Management": function() {
        cy.location().should((loc) => {
            expect(loc.pathname).to.include('users-roles')
        })
        cy.get('.page-title').should('be.visible').should('contain', 'User management')
    },
    "Edit User": function() {
        cy.get('#users-dt-container_row_1 > .buttons > ._modalFormHandler').should('be.visible')
    },
    "Invite User": function() {
        cy.get('#users > .rvl-datatable-wrapper > .rvl-datatable-table > .mb-3 > ._modalFormHandler').should('be.visible')
    },
    "Remove Users": function() {
        cy.get('.rv-delete').should('be.visible')
    },
    "Add/edit Shop Roles": function() {
        cy.get(':nth-child(2) > .nav-link').click()
        cy.get('#roles > .rvl-datatable-wrapper > .rvl-datatable-table > .mb-3 > ._modalFormHandler').should('be.visible')
        cy.get('#roles-dt-container_row_5 > .buttons > ._modalFormHandler').should('be.visible')
    },
    "Audience Builder": function() {
        cy.location().should((loc) => {
            expect(loc.pathname).to.include('audience-builder')
        })
        cy.get('.page-title').should('be.visible').should('contain', 'Audience Builder')
    },
    "List Audiences": function() {
        cy.get('.card-title').last().should('be.visible')
    },
    "Create Audience": function() {
        cy.get('.pt-0').should('be.visible')
        cy.get('.row > .col-lg-12 > .dropdown > .btn').click()
        cy.get('.dropdown-menu.show a.dropdown-item:contains("Last 90 days")').click()
        cy.get('.col-sm-4 > .btn').should('be.visible')
    },
    "Audience Details": function() {
        cy.get('.rv-view').should('be.visible')
    },
    "Audience Export": function() {
        cy.get('.rv-download').should('be.visible')
    },
    "Sync Audience Provider": function() {
        cy.get('.odd > :nth-child(1)').click()
        cy.get(':nth-child(1) > :nth-child(5) > .tooltip-r').should('be.visible')
    },
    "Delete Audience": function() {
        cy.get('.rv-delete').should('be.visible')
    },
    "NPS Alerts": function() {
        cy.location().should((loc) => {
            expect(loc.pathname).to.include('nps-alerts')
        });
        cy.get('.page-title').should('be.visible').should('contain', 'NPS Alert')
    },
    "Create NPS Alert": function() {
        cy.get('#add-new-conditions').should('be.visible')
    },
    "Delete NPS Alert": function() {
        cy.get('.rv-delete').should('be.visible')
    },
    "Show Billing Page": function() {
        cy.location().should((loc) => {
            expect(loc.pathname).to.include('billing')
        })
        cy.get('.page-title').should('be.visible').should('contain', 'Billing')
    }
}