describe('Publishing Place', () => {
    // see #15  
    describe('soziale frauenschule berlin', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'soziale frauenschule berlin',
                    type: 'allFields',
                    limit: 5
                }
            })
        })

        // The Problem: too many bad matches
        // title: 6 hits
        // allFields: 48 hits
        // To identify good matches we check if the title (and only the title) 
        // contains either K.F.D, Salomon, Berlin, or 1908 via Regex
        // Because this is inherently flaky we add another test below
        // 
        // see https://docs.cypress.io/guides/core-concepts/conditional-testing
        // see #30
        
        it.skip('Top 5 should match the queried topic', () => {
            // this selects the expanded title, because it is invisible we use force
            cy.get('.detailview', {force: true})
            // Force display the full title line for testing
              .invoke('attr','style', 'display: inline')
              .each(($el) => {
                cy.wrap($el)
                 .contains(/(K\.F\.D|Salomon|Berlin|1908)/, {matchCase: false})
              })
        })

        // see #30
        it.skip('Top 5 titles should not contain Aachen', () => {
            cy.get('.resultlist')
              .should('not.contain', 'Aachen')
        })
    })

    // see multi-lang-phrase.cy.js
    describe('geschichte berlin', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'geschichte berlin',
                    type: 'allFields'
                }
            })
        })

        // Results are good 
        // RegEx check for relevant titles is a bit on the flaky side
        // see second test below 
        it('TOP 20 should have topical titles', () => {
            cy.get('.resultlist')
              .each(($el, index, $lis) => {
                cy.wrap($el)
                  .contains(/^(?=.*Berlin)(?=.*Geschichte)|Kalend.*|Chron.*$/)
              })
              .then(($lis) => {
                cy.wrap($lis)
                  .should('have.length', '20')
              })
        })

        // This assumes that the most relevant result will have the matching baisc classification
        // Iterating over the list to determin relevance based on detail view increase flakyness, decreases performance,
        // and doesn't significantly improving test accuracy
        it('TOP hit should have matching BK', () => {
            cy.get('.resultlist')
              .first()
              .click()
            cy.get('[href*="BKL"]')
              .contains('15.46')
        })
    })
})