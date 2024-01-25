describe('Topical Search', () => {
    // see #37 
    describe('Narratologie', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'Narratologie',
                    type: 'allFields'
                }
            })
        })

        // too many articles
        // note both requested titles are translations
        // see #22
        // see #43

        it.skip('should contain relevant titles', () => {
            cy.get('[href*="490244408"]')
                .should('exist')
            cy.get('[href*="595354122"]')
                .should('exist')
        })
    })

    describe('soziale arbeit theorie', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'soziale arbeit theorie',
                    type: 'Keyword',
                    limit: '10'
                }
            })
        })

        // too many articles in allFields no testable conditions
        // keyword search shows signs of poor relevance
        // PPN: 276627377 pl 1987 und nicht das gesuchte thema
        // see #43

        it.skip('keyword search should not rank loosely related items in TOP 20', () => {
            cy.get('[href*="276627377"]')
                .should('not.exist')
        })

        // This is a judgement call based on the allFields results, 
        // 5 of 20 from 2020 or later seems too low
        // This tests for publication dates from 2010-202X in TOP 10
        // see #43

        it.skip('TOP10 should only contain items from 2010 or later', () => {
            // cy.get('.resultlist-data')
            //     .first()
            //     .contains(/20(1|2)\d/)
            cy.get('.resultlist-data')
                .each(($data) => {
                    cy.wrap($data)
                        .contains(/20(1|2)\d/)
                })
        })
    })

    describe('social media analytics', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'social media analytics',
                    type: 'allFields'
                }
            })
        })

        // too many articles
        // nothing obviously wrong with list imv
        // many eletronic ressources to be expected for topic
        // needs clearer criteria
        // see #43

        it.skip('should ...', () => {
            cy.get('.resultlist')
        })
    })

    // see above unclear success criteria
    describe('othering', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'othering',
                    type: 'allFields',
                    limit: 5
                }
            })
        })

        it('TOP5 should contain topic in title', () => {
            cy.get('.resultlist')
                .contains('othering', { matchCase: false })
        })
    })

    describe('japan popular culture anime', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'japan popular culture anime',
                    type: 'Subject'
                }
            })
        })

        // the tourism hits all contain MANGA or ANIME as subject
        // see #42
        it.skip('should ...', () => {
            cy.get('.resultlist')
        })
    })


    describe('esperanto ddr', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'esperanto ddr',
                    type: 'allFields',
                    limit: '10'
                }
            })
        })

        // relevance looks good
        it('should contain DDR and esperanto in title', () => {
            // this selects the expanded title, because it is invisible we use force
            cy.get('.detailview', { force: true })
                // Force display of the full title line for testing
                .invoke('attr', 'style', 'display: inline')
                .each(($el) => {
                    cy.wrap($el)
                        .contains('ddr', { matchCase: false })
                })
            cy.get('.detailview')
                .each(($el) => {
                    cy.wrap($el)
                        .contains('esperanto', { matchCase: false })
                })
        })
    })

    describe('KI gesichtserkennung', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'KI gesichtserkennung',
                    type: 'Keyword',
                    limit: '10'
                }
            })
        })

        // why is there no date for DOAJ041084004 ??
        // list looks ok 
        // see #44 
        it('TOP 10 in keyword search should contain both matching keywords', () => {

            cy.get('.resultlist')
                // Display details
                .each(($el) => {
                    cy.wrap($el)
                        .click()
                })
                cy.get('table')
                  .should('have.length', 10)
                  .each(($el) => {
                    cy.wrap($el)
                      .contains(/K(ünstliche )?I(ntelligenz)?/, { matchCase: false })
                    cy.get($el)  
                      .contains('Gesichtserkennung', { matchCase: false })
                })

        })
    })
    
    describe('affektive störung', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'affektive störung',
                    type: 'allFields'
                }
            })
        })

        it('should ...', () => {
            cy.get('.resultlist')
        })
    })

    describe('Ensemblespiel und Klassenmusizieren', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'Ensemblespiel und Klassenmusizieren',
                    type: 'allFields'
                }
            })
        })

        it('should ...', () => {
            cy.get('.resultlist')
        })
    })

    describe('The Law of nature in the thought of Hugo grotius', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'The Law of nature in the thought of Hugo grotius',
                    type: 'allFields'
                }
            })
        })

        it('should ...', () => {
            cy.get('.resultlist')
        })
    })

    describe('Sadeleer, Environmental principles. From political slogans to legal rules', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'Sadeleer, Environmental principles. From political slogans to legal rules',
                    type: 'allFields'
                }
            })
        })

        // too many articles? 
        it('should ...', () => {
            cy.get('.resultlist')
        })
    })

    describe('Selam Berlin Yade Kara', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'Selam Berlin Yade Kara',
                    type: 'allFields'
                }
            })
        })
        it('should ...', () => {
            cy.get('.resultlist')
        })
    })
})