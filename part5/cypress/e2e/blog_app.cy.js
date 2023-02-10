describe('blog app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3001/api/testing/reset');
      const user = {
        name: 'Test User',
        username: 'testuser',
        password: 'sekret',
      };
      cy.request('POST', 'http://localhost:3001/api/users/', user);
    });

    it('login form is shown', () => {
      cy.contains('username');
      cy.contains('password');
      cy.contains('login');
    });

    it('logins successfully with correct credentials', () => {
      cy.get('#username-input').type('testuser');
      cy.get('#password-input').type('sekret');
      cy.contains('login').click();

      cy.contains('Test User logged in');
    });

    it('fails with incorrect credentials', () => {
      cy.get('#username-input').type('testuser');
      cy.get('#password-input').type('password');
      cy.contains('login').click();

      cy.contains('wrong credentials');
    });
  });

  describe('when logged in', () => {
    // here you should write some helper functions such that
    // these test wouldn't be dependent on each other
    // but let's go with that this tome

    it('creates a new blog successfully', () => {
      cy.get('#username-input').type('testuser');
      cy.get('#password-input').type('sekret');
      cy.contains('login').click();

      cy.contains('Test User logged in');

      cy.contains('new blog').click();
      cy.get('#title-input').type('New blog title');
      cy.get('#author-input').type('New test author');
      cy.get('#url-input').type('testurl.com/cypress');

      cy.get('#create-button').click();
      cy.contains('New blog title by New test author');
    });

    it('adds a like to blog succesfully', () => {
      cy.get('#username-input').type('testuser');
      cy.get('#password-input').type('sekret');
      cy.contains('login').click();

      cy.contains('Test User logged in');
      cy.contains('show').click();

      cy.contains('likes 0');
      cy.contains('like').click();
      cy.contains('likes 1');
      cy.contains('like').click();
      cy.contains('likes 2');
    });

    it('displays delete button only for user who has created the blog', () => {
      const user = {
        name: 'Test User 2',
        username: 'testuser2',
        password: 'sekret',
      };
      cy.request('POST', 'http://localhost:3001/api/users/', user);

      cy.get('#username-input').type('testuser');
      cy.get('#password-input').type('sekret');
      cy.contains('login').click();

      cy.contains('Test User logged in');
      cy.contains('show').click();

      cy.contains('remove blog');
      cy.contains('log out').click();

      cy.get('#username-input').type('testuser2');
      cy.get('#password-input').type('sekret');
      cy.contains('login').click();

      cy.contains('Test User 2 logged in');
      cy.contains('show').click();

      cy.contains('remove blog').should('not.exist');
    });

    it('orders blog based on likes correctly', () => {
      cy.get('#username-input').type('testuser');
      cy.get('#password-input').type('sekret');
      cy.contains('login').click();

      cy.contains('Test User logged in');

      cy.contains('new blog').click();
      cy.get('#title-input').type('New blog title 2');
      cy.get('#author-input').type('New test author');
      cy.get('#url-input').type('testurl.com/cypress');

      cy.get('#create-button').click();

      cy.get('.blog').should('have.length', 2);
      cy.get('.blog')
        .eq(0)
        .should('contain', 'New blog title by New test author');
      cy.get('.blog')
        .eq(1)
        .should('contain', 'New blog title 2 by New test author');

      cy.get('.show-button').eq(1).click();

      cy.contains('like').click();
      cy.contains('like').click();
      cy.contains('like').click();

      cy.get('.blog')
        .eq(0)
        .should('contain', 'New blog title 2 by New test author');
      cy.get('.blog')
        .eq(1)
        .should('contain', 'New blog title by New test author');
    });
  });
});
