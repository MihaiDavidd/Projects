describe('Login Page', function() {    
    before(function() {
        cy.fixture('credentials').then(function(data){
            let shopId = Cypress.env("shopId") || "demo01"
            this.data=data[shopId]
            cy.clearAllCookies()
        })
    })

    it('Sign up', function() {
        cy.visit(this.data.url)
        cy.get('.sign-up-link').click()
        cy.get('.login-title').should('have.text', 'Create your account for FREE')
        cy.get('.card-body-header > p').should('have.text', '* 30 days free trial, no credit card required')
        cy.get(':nth-child(1) > .control-label').should('have.text', 'Business email')
        cy.get(':nth-child(2) > .control-label').should('have.text', 'Password')
        cy.get(':nth-child(3) > .control-label').should('have.text', 'Repeat password')
        cy.get('.float-left').should('have.text', 'I accept the Terms & Conditions and Privacy Policy')
        cy.contains('Register')
        cy.contains('Sign up with Google')
        cy.contains('Does your company already have a Reveal account?')
        cy.get('.sign-up-link').should('have.text', 'Login here')
    })
})