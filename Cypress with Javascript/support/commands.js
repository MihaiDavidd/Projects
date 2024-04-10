// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// Cypress.Commands.add('selectProduct', (productName) => { 
//     cy.get('h4.card-title').each(($el, index, $list) => {
//         if($el.text().includes(productName))
//         {
//             cy.get('button.btn.btn-info').eq(index).click()
//         } 
//     })
//  })
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
//  import random_six_letters from './utils';

Cypress.Commands.add('signUpUser', (data) => {
  cy.visit(data.url);
  cy.clickLink('.sign-up-link');  
  cy.checkText('.login-title', 'Create your account for FREE');
  cy.checkText('.card-body-header > p', '* 30 days free trial, no credit card required');
  cy.checkText('.control-label[for="app_user_registration_email"]', 'Business email');
  cy.checkText('.control-label[for="app_user_registration_plainPassword_first"]', 'Password');
  cy.checkText('.control-label[for="app_user_registration_plainPassword_second"]', 'Repeat password');
  cy.checkText('label[for="app_user_registration_terms"]', 'I accept the Terms & Conditions and Privacy Policy');
  cy.contains('Register'); 
  cy.contains('Sign up with Google');
  cy.contains('Does your company already have a Reveal account?');
  cy.checkText('.sign-up-link', 'Login here');
});

Cypress.Commands.add('checkText', (selector, text) => {
  cy.get(selector).should('have.text', text);
});

Cypress.Commands.add('fillInput', (selector, text) => {
  cy.get(selector).type(text);
});

Cypress.Commands.add('clickLink', (selector) => {
  cy.get(selector).click();
});

Cypress.Commands.add('closeDiscovery', () => {
  cy.get('body').trigger('keydown', { escKey: true, keyCode: 27, which: 27 })
});

Cypress.Commands.add('closeZoom', () => {
  cy.get('#closeFullScreen').click({force:true})
});
Cypress.Commands.add('preserveCookie', () => {
  Cypress.Cookies.defaults({
    preserve: "PHPSESSID"
  });
});
Cypress.Commands.add('tooltip', (text) => {
  cy.get('.tooltip-inner').should('be.visible').should('contain',(text))
});
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })