describe('Chronology', () => {
    // see #11  

    describe('Andreas Gryphius', {tags: ['@next']}, () => {
        // DP: add sort: 'year' to qs for sorted results
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'Andreas Gryphius',
                    type: 'allFields'
                }
            })
        })

        // Items without a year in resultlist-data exist but quite rare 
        // DP: sometimes the date in resultlist-data conflicts with the exact date in details view
        // which can impact the percieved sorting
        // see #35
        it('Top 1 should be published in or after 2020', () => {
            cy.get('.resultlist-data')
                .first()
                .contains(/202\d/)
        })
    })

    describe('Klaus Hurrelmann, Gudrun Quenzel: Lebensphase Jugend', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'Klaus Hurrelmann, Gudrun Quenzel: Lebensphase Jugend',
                    type: 'allFields'
                }
            })
        })

        // 2022 ed. PPN 1739067762
        // 2012 ed. PPN 682815853
        it('Latest edition should be before earlier edition', () => {
            // pick 2022 edition
            cy.get('[href*="1739067762"]')
                // select ranking number from hit list 
                .parents('[id^="result"]')
                .find('.record-number')
                .invoke('text')
                .then(($num1) => {
                    // turn into integer
                    const num1 = parseInt($num1)

                    // repeat for 2012 edition
                    cy.get('[href*="682815853"]')
                        .parents('[id^="result"]')
                        .find('.record-number')
                        .invoke('text')
                        .then(($num2) => {
                            const num2 = parseInt($num2)
                            // make sure 1 < 2
                            expect(num1).to.be.lessThan(num2)
                        })
                })
        })
    })

    describe('Lehrbuch Organisationspsychologie', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'Lehrbuch Organisationspsychologie',
                    type: 'Title'
                }
            })
        })
        // 2007 ed PPN 537598197
        // 1995 ed PPN 182859061
        // 2004 ed PPN 366403265
        // see #35
        it.skip('Later editions should be ranked higher', () => {
            cy.get('[href*="537598197"]')
                .parents('[id^="result"]')
                .find('.record-number')
                .invoke('text')
                .then(($num1) => {
                    const num1 = parseInt($num1)

                    cy.get('[href*="366403265"]')
                        .parents('[id^="result"]')
                        .find('.record-number')
                        .invoke('text')
                        .then(($num2) => {
                            const num2 = parseInt($num2)

                            cy.get('[href*="182859061"]')
                                .parents('[id^="result"]')
                                .find('.record-number')
                                .invoke('text')
                                .then(($num3) => {
                                    const num3 = parseInt($num3)

                                    expect(num2).to.be.lessThan(num3)
                                })

                            expect(num1).to.be.lessThan(num2)
                        })
                })
        })
    })

    // see #36
    // definition of relevance?
    describe('emanzipation juden', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'emanzipation juden',
                    type: 'allFields'
                }
            })
        })


        it.skip('should show relevant literature according to chronology', () => {
            cy.get('.resultlist')
        })
    })

    // Sorting by date decreases relevance 
    // 608 hits total but many do not contain the search terms in the title 
    // or are about later periods all together
    // why is 130141674 shown ?
    // definition of relevance?
    // see #39
    describe('Kulturgeschichte deutsches Kaiserreich', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'Kulturgeschichte  deutsches Kaiserreich',
                    type: 'allFields'
                }
            })
        })

        it.skip('should show relevant literature according to chronology', () => {
            cy.get('.resultlist')
        })
    })

    describe('Caral America', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'Caral America',
                    type: 'allFields'
                }
            })
        })

        // PPN 1612978711
        // PPN JST069657696
        // see #35
        it.skip('should not match irrelevant titles', () => {
            cy.get('[href*="1612978711"]')
                .should('not.exist')
            cy.get('[href*="JST069657696"]')
                .should('not.exist')
        })

        it('should not contain Caralli in Title', () => {
            cy.get('.resultlist')
                .should(`not.contain`, `Caralli`)
        })
    })

    describe('jugendliteratur mittelalter roman', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'jugendliteratur mittelalter roman',
                    type: 'allFields',
                    limit: '40'
                }
            })
        })

        // see #40
        // see #45 two titles are identical (print 613754344 and e-book 1016493053)
        // 1st hit published 1985, 2nd 2002, 3rd 2011
        // definition of relevance?
        it('should show these items', () => {
            cy.get('[data-id="272952737"]')
                .should('exist')
            cy.get('[data-id="1507865600"]')
                .should('exist')
            cy.get('[data-id="1016493053"]')
                .should('exist')
        })

        // see #40 the relevance of these PPNs is questionable imv
        it.skip('TOP20 should not show less relevant items', () => {
            cy.get('[data-id="1754948634"]')
                .should('not.exist')
            cy.get('[data-id="894082345"]')
                .should('not.exist')
            cy.get('[data-id="1686973969"]')
                .should('not.exist')
        })

        // the ebook is shown much later than the print book, which messes with chronological sorting, but is WAI
        // 
        it.skip('Later editions should be ranked higher', {tags: ['@next']}, () => {
            cy.get('[href*="613754344"]')
                .parents('[id^="result"]')
                .find('.record-number')
                .invoke('text')
                .then(($num1) => {
                    const num1 = parseInt($num1)

                    cy.get('[href*="1507865600"]')
                        .parents('[id^="result"]')
                        .find('.record-number')
                        .invoke('text')
                        .then(($num2) => {
                            const num2 = parseInt($num2)

                            cy.get('[href*="272952737"]')
                                .parents('[id^="result"]')
                                .find('.record-number')
                                .invoke('text')
                                .then(($num3) => {
                                    const num3 = parseInt($num3)

                                    expect(num2).to.be.lessThan(num3)
                                })

                            expect(num1).to.be.lessThan(num2)
                        })
                })
        })
    })

    describe('Griechische Mythologie', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'Griechische Mythologie',
                    type: 'allFields'
                }
            })
        })

        //  1756833699
        // not sure if this should or should not exist
        // definition of relevance?
        // see #35
        it.skip('should show relevant title', () => {
            cy.get('[href*="1756833699"]')
                .should('exist')
        })

        // PPN 389602841 2005
        // PPN 430480865 1969
        // see #35
        it.skip('should show relevant titles according to chronology', () => {
            cy.get('[href*="389602841"]')
                .parents('[id^="result"]')
                .find('.record-number')
                .invoke('text')
                .then(($num1) => {
                    const num1 = parseInt($num1)


                    cy.get('[href*="430480865"]')
                        .parents('[id^="result"]')
                        .find('.record-number')
                        .invoke('text')
                        .then(($num2) => {
                            const num2 = parseInt($num2)


                            expect(num1).to.be.lessThan(num2)
                        })
                })
        })


    })

    describe('koptische Stoffe', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'koptische Stoffe',
                    type: 'allFields'
                }
            })
        })

        // TOP 4 hits identical Title but not duplicate
        // unclear why chronology not the effective sorting criteria
        // but not necessarily a problem
        // PPN 447104306 (1966)
        // PPN 1117375048 (1967)
        // PPN 1083642081 (1986)
        // PPN 403203899 (1959)
        it.skip('should rank identical titles according to chronology', () => {
            cy.get('[href*="1083642081"]')
                .parents('[id^="result"]')
                .find('.record-number')
                .invoke('text')
                .then(($num1) => {
                    const num1 = parseInt($num1)

                    cy.get('[href*="1117375048"]')
                        .parents('[id^="result"]')
                        .find('.record-number')
                        .invoke('text')
                        .then(($num2) => {
                            const num2 = parseInt($num2)

                            cy.get('[href*="447104306"]')
                                .parents('[id^="result"]')
                                .find('.record-number')
                                .invoke('text')
                                .then(($num3) => {
                                    const num3 = parseInt($num3)

                                    cy.get('[href*="403203899"]')
                                        .parents('[id^="result"]')
                                        .find('.record-number')
                                        .invoke('text')
                                        .then(($num4) => {
                                            const num4 = parseInt($num4)

                                            expect(num3).to.be.lessThan(num4)
                                        })

                                    expect(num2).to.be.lessThan(num3)
                                })

                            expect(num1).to.be.lessThan(num2)
                        })
                })
        })
    })

    describe('future publication', () => {
        // see #58
        // run a query for publications 5 years from noww
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: '*',
                    type: 'allFields',
                    'daterange[]': 'publishDate',
                    publishDatefrom: new Date().getFullYear() + 5,
                    limit: 10
                }
            })
        })
        // most results are data errors
        // e.g. https://stabikat.de/Record/181994543X publishDate = 2029 Display Date = [2020]
        it('TOP1 should be from the future', () => {

            const now = new Date().getFullYear() + 5
            cy.get('.resultlist-data > div')
                .first()
                .invoke('text')
                .then((s) => {
                    const start = s.indexOf('2')
                    return s.slice(start, start + 4)
                })
                .then(parseInt)
                .should('be.a', 'number')
                .and('be.gte', now)
            })
    })
})