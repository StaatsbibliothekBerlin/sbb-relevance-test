describe('Foreign language phrase search', () => {
    // See #6
    // see 31 
    // Thematische Suche#L30
    it('en all fields query matches en not ar', () => {
        cy.visit({
            url: '/Results',
            qs: {
                lookfor: 'Egyptian Language',
                type: 'AllFields'
            }
        })
        cy.get('.resultlist')
            // PPN JST063665204
            .contains('The Egyptian Language')
        cy.get('.resultlist')
            // PPN DOAJ008736839
            .should('not.contain', 'المعانی الثانیة للأمر فی النص المصری القدیم دراسة بلاغیة مقارنة ')

    })

    // see #27
    it.skip('en subject query matches en and ar', () => {
        cy.visit({
            url: '/Results',
            qs: {
                lookfor: 'Egyptian Language',
                type: 'Subject'
            }
        })
        cy.get('.resultlist')
            // PPN JST063665204
            .contains('The Egyptian Language')
        cy.get('.resultlist')
            // PPN DOAJ008736839
            .contains('المعانی الثانیة للأمر فی النص المصری القدیم دراسة بلاغیة مقارنة ')

    })

    // see place.cy.js
    // see #15
    describe('history berlin', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'history berlin',
                    type: 'allFields', 
                    limit: 10
                }
            })
        })

        // see #27
        // poor results needs more fine tuning once more relvant hits are in the top 10
        it.skip('should have both search terms in title', () => {
            cy.get('.resultlist')
              .each(($el, index, $lis) => {
                cy.wrap($el)
                  .contains(/^(?=.*Berlin)(?=.*Histor.*)$/)
              })
              .then(($lis) => {
                cy.wrap($lis)
                  .should('have.length', '10')
              })
        })

        it('TOP 1 should be in english', () => {
            cy.get('.resultlist')
              .first()
              .click()
            cy.get('.language')
              .contains('Englisch')
        })
    })



    describe('German Intelligence', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'German Intelligence',
                    type: 'Subject'
                }
            })
        })
        // DP: 2nd hit is about intelligence of German Shepherds, passt oder?
        // No idea why 1821166620 is shown
        // poor results, we need better results to write better assertions
        // see #27, #32
        it.skip('should have German* in title', () => {
            cy.get('.resultlist')
              .each(($el, index, $lis) => {
                cy.wrap($el)
                  .contains(/German.*/, {matchCase: false})
              })
              .then(($lis) => {
                cy.wrap($lis)
                  .should('have.length', '20')
              })
        })
    })

    // see #33
    describe('popular science soviet', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'popular science soviet',
                    type: 'allFields'
                }
            })
        })

        it('Top 1 should contain search terms in title', () => {
            cy.get('.resultlist')
              .first()
              .contains(/(?=.*Soviet.*)(?=.*Science)(?=.*Popular.*)/i)
        })

        it('Top 2 should contain search terms in details > subject', () => {
            cy.get('#result1')
              .find('.resultlist')      
              .click()
            cy.get('.col-sm-8')
              .contains(/(?=.*Soviet.*)(?=.*Science)(?=.*Popular.*)/i)
        })
    })

    describe('Boundary and the Making of Home', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'Boundary and the Making of Home',
                    type: 'allFields',
                    limit: '5'
                }
            })
        })

        // 16.01.24 Title no longer in TOP 20
        // PPN CAJ435467670
        // see #27 #20
        // Parallel Title: 门禁社区边界和家的构建关系研究 see below
        it.skip('TOP 5 should contain matching article', () => {
            cy.get('[href*="CAJ435467670"]')
                .should('exist')
        })

        // see #27 #20
        // the assertion might be too strong 
        it.skip('TOP 5 titles should contain all search phrases', () => {
            cy.get('.resultlist')
              .each(($el, index, $lis) => {
                cy.wrap($el)
                  .contains(/(?=.*boundar.*)(?=.*mak.*)(?=.*home)/i)
              })
              .then(($lis) => {
                cy.wrap($lis)
                  .should('have.length', '5')
              })
        })
    })
    
    describe('门禁社区边界和家的构建关系研究', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: '门禁社区边界和家的构建关系研究',
                    type: 'allFields',
                    limit: '1'
                }
            })
        })

        // 16.01.24 Title no longer in TOP 20
        // PPN CAJ435467670
        // see #27
        // see Boundary and the Making of Home above
        it('should find matching article as first hit', () => {
            cy.get('[href*="CAJ435467670"]')
                .should('exist')
        })
    })

    describe('Zivopisnaja Rossija', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'Zivopisnaja Rossija',
                    type: 'allFields', 
                    limit: '5'
                }
            })
        })

        it('should contain non Latin search phrase', () => {
            cy.get('.resultlist')
              .contains('Живописная Россия')
        })

        it('TOP 5 titles should contain search phrases', () => {
            cy.get('.resultlist')
              .each(($el, index, $lis) => {
                cy.wrap($el)
                  .contains('Živopisnaja Rossija')
              })
              .then(($lis) => {
                cy.wrap($lis)
                  .should('have.length', '5')
              })
        })
    })
})