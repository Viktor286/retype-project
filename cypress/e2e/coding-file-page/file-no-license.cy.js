describe('Coding file page for the repo without license.', () => {
  beforeEach(() => {
    // todo: replace inner http request with fixture
    cy.visit('/Viktor286/retype-project/blob/master/package.json')
  });

  it('Should contain section.no-license-notification when user isn\'t login', () => {
    cy.get('section.no-license-notification', {timeout: 10000}).should((section) => {
      expect(section.text()).to.contain('license');
    });
  })
});
