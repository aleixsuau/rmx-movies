export class MoviesFormPageObject {
  static fillForm(name: string, username: string, post_code: string, movie_query: string) {
    cy.get('[data-testid="movie-form-name-input"]').type(name);
    cy.get('[data-testid="movie-form-username-input"]').type(username);
    cy.get('[data-testid="movie-form-country-input"]').click();
    cy.get('.p-dropdown-item').first().click();
    cy.get('[data-testid="movie-form-post_code-input"]').type(post_code);
    cy.get('.p-autocomplete-input').type(movie_query);
    cy.get('.p-autocomplete-item').first().click();
  }

  static submitForm() {
    cy.get('[data-testid="movie-form-submit-button"]').click();
  }
}