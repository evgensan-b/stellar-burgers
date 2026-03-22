describe('Burger Constructor', () => {
  beforeEach(() => {
    localStorage.setItem('refreshToken', 'fake-refresh-token');
    cy.setCookie('accessToken', 'fake-access-token');

    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json',
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json',
    }).as('getUser');

    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json',
    }).as('createOrder');

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Добавление ингредиента из списка ингредиентов в конструктор', () => {
    cy.contains('Краторная булка N-200i').parent().contains('Добавить').click();
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .contains('Добавить')
      .click();
    cy.contains('Соус традиционный галактический')
      .parent()
      .contains('Добавить')
      .click();  

    cy.get('[class*=constructor]').contains('Краторная булка N-200i');
    cy.get('[class*=constructor]').contains(
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('[class*=constructor]').contains(
      'Соус традиционный галактический'
    );
  });

  it('Открытие и закрытие модального окна ингредиента по клику на крестик', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('[data-cy=modal]').as('modal');
  
    cy.get('@modal').contains('Краторная булка N-200i').should('be.visible');
  
    cy.get('@modal').contains('Калории, ккал').should('be.visible');
    cy.get('@modal').contains('Белки, г').should('be.visible');
    cy.get('@modal').contains('Жиры, г').should('be.visible');
    cy.get('@modal').contains('Углеводы, г').should('be.visible');
  
    cy.get('[data-cy=modal-close]').click();
    cy.get('@modal').should('not.exist');
  });

  it('Открытие и закрытие модального окна по клику на оверлей', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('[data-cy=modal]').as('modal');

    cy.get('@modal').contains('Краторная булка N-200i').should('be.visible');
  
    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('@modal').should('not.exist');
  });

  it('Создание заказа авторизованным пользователем', () => {  
    cy.contains('Краторная булка N-200i').parent().contains('Добавить').click();
    cy.contains('Биокотлета из марсианской Магнолии').parent().contains('Добавить').click();
    
    cy.get('[data-cy=order-button]').first().click();
    cy.wait('@createOrder');
    
    cy.get('[data-cy=modal]').as('modal');
    cy.get('@modal').contains('12345').should('be.visible');
    cy.get('@modal').contains('идентификатор заказа').should('be.visible');
    cy.get('@modal').contains('Ваш заказ начали готовить').should('be.visible');
    cy.get('@modal').contains('Дождитесь готовности на орбитальной станции').should('be.visible');
    
    cy.get('[data-cy=modal-close]').click();
    cy.get('@modal').should('not.exist');
    
    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
    cy.get('[data-cy=ingredientItem]').should('have.length', 0);
  });
});