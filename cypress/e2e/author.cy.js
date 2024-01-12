describe('Author Search', () => {
    // see #14  
    describe('glaser karin' , () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'glaser karin',
                    type: 'Author'
                }
            })
        })

        // erster Treffer von Autorin
        it('first hit should be by the author', () => {
            cy.get('#result0')
                .find('.resultlist-data')
                .contains('Karin Glaser')
        })
    })

    describe('阎连科', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: '阎连科',
                    type: 'Author'
                }
            })
        })

        // see #22
        it('CJK author search should return translations', () => {
            cy.get('.record-list')
              .contains('Yan, Lianke')
        })
    })

    describe('"Corte, Justine del"', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: '"Corte, Justine del"',
                    type: 'allFields'
                }
            })
        })

        it('strict search should only contain works by that author', () => {
            cy.get('.resultlist-data')
              .should('have.length.gte', 3)
              .and('contain','Corte, Justine del')
        })
    })

    describe('Samuel Scheidt' , () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'Samuel Scheidt',
                    type: 'Author', 
                    limit: '5'
                }
            })
        })

        // (DP): 182 (or 90?)works by author but 200 hits.
        //  within top 20 6 works unrelated to search 14 by author
        // Top 5 in author search should all be by author
        // see #28
        it.skip('TOP 5 should all be by author', () => {
            cy.get('.resultlist-data')
              .find('[href*=Author]')
              .each(($el, index, $lis) => {
                cy.wrap($el)
                  .contains('Scheidt, Samuel')
              })
              .then(($lis) => {
                cy.wrap($lis)
                  .should('have.length', '5')
              })

        })
    })

    describe('oliver heaviside' , () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'oliver heaviside',
                    type: 'allFields'
                }
            })
        })

        it('should appear in each of top 20', () => {
            cy.get('.resultlist')
              .each(($el, index, $lis) => {
                cy.wrap($el)
                  .contains('Heaviside', {matchCase: false})
              })
              .then(($lis) => {
                cy.wrap($lis)
                  .should('have.length', '20')
              })
        })
    })
})