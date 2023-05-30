import { MoviesFormPageObject } from "../support/app.po";

describe('rmx-movies', () => {
  beforeEach(() => cy.visit('/'));
});


describe('rmx-movies', () => {
  beforeEach(() => cy.visit('http://localhost:4200'));

  context('Form', () => {
    it('should fill the form, navigate to "/thank-you" on submit, and display the data', () => {
      const testName = 'testName';
      const testUserName = 'testUserName@test.com';
      const testCountry = 'ireland';
      const testPostCode = 'testPost';
      const movieQuery = 'O Brother';

      MoviesFormPageObject.fillForm(testName, testUserName, testPostCode, movieQuery);
      MoviesFormPageObject.submitForm();
      
      cy.url().should('include', '/thank-you');

      cy.get('[data-testid="thank-you-header"]').should('include.text', testName);
      cy.get('[data-testid="thank-you-body"]').should('include.text', testName);
      cy.get('[data-testid="thank-you-body"]').should('include.text', testUserName);
      cy.get('[data-testid="thank-you-body"]').should('include.text', testCountry);
      cy.get('[data-testid="thank-you-body"]').should('include.text', testPostCode);
      cy.get('[data-testid="thank-you-movie-body"]').should('include.text', 'O Brother, Where Art Thou?');
      cy.get('[data-testid="thank-you-movie-body"]').should('include.text', 'movie');
      cy.get('[data-testid="thank-you-movie-body"]').should('include.text', '2000');
      cy.get('[data-testid="thank-you-movie-body"]').should('include.text', 'tt0190590');
    });
  });
});