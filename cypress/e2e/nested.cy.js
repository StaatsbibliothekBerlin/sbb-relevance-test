describe('Nested Work', () => {
    // see #8  
    describe('African American Review -All', () => {
        // Title search and online access false to limit noise
        // check if exact match first list item is the journal parent and subsequent entries are child works
        // a more elaborate test would compare the value of '.record-number' within the same family
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'African American Review',
                    type: 'allFields',
                    "filter[]": '~remote_bool:"false"'
                }
            })
        })

        // see #25
        it.skip('should appear before child work', () => {
            cy.get('#result0')
                .find('.media-type')
                .contains(' Zeitschrift (gedruckt) ')
            cy.get('#result1')
                .find('.media-type')
                .contains(' Band einer Zeitschrift/Zeitung ')
        })
    })
	
	describe('African American Review -Journal', () => {
        // check if exact match first list item is the journal parent and subsequent entries are child works
		// see #75
    
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'African American Review',
                    type: 'JournalSearch',
                    "filter[]": '~remote_bool:"false"'
                }
            })
        })

        it('should appear before child work', () => {
            cy.get('#result0')
                .find('.media-type')
                .contains(' Zeitschrift (gedruckt) ')
            cy.get('#result1')
                .find('.media-type')
                .contains(' Band einer Zeitschrift/Zeitung ')
        })
    })
	
	describe('African American Review -Title', () => {
        // check if exact match first list item is the journal parent and subsequent entries are child works
    
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'African American Review',
                    type: 'title',
                    "filter[]": '~remote_bool:"false"'
                }
            })
        })

        it.skip('should appear before child work', () => {
            cy.get('#result0')
                .find('.media-type')
                .contains(' Zeitschrift (gedruckt) ')
            cy.get('#result1')
                .find('.media-type')
                .contains(' Band einer Zeitschrift/Zeitung ')
        })
    })

    describe('Nachrichten Organ Bergbau Hüttenbetrieb', () => {
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'Nachrichten Organ Bergbau Hüttenbetrieb',
                    type: 'allFields'
                }
            })
        })

        // (DP): 3 hits no child works as far as I can see
        // PPN: 168000709
        it('first hit should be parent work', () => {
            cy.get('[href*="168000709"]')
                .should('exist')
        })
    })

    describe('Journal of Comparative Law 2021', () => {
        // (DP): parent work not in top 20
        // need to boost parent work 
        // see #66
        beforeEach(() => {
            cy.visit({
                url: '/Results',
                qs: {
                    lookfor: 'Journal of Comparative Law 2021',
                    type: 'allFields'
                }
            })
        })

  
        // PPN: 1755480725
        it('first hit should be 2021 child work based on search term', () => {
            cy.get('#result0')
              .find('[href*="1755480725"]')
              .should('exist')
        })

        // see #25
        it.skip('parent work should appear in initial results', () => {
            cy.get('[href*="521689139"]')
              .should('exist')
        })

        // This asssumes de default view
        it('first hit should be child volume based on search term', () => {
            cy.get('#result0')
              .find('.media-type')
              .should('contain', 'Band einer Zeitschrift/Zeitung')
              .and('not.contain', 'Serial Volume')
        })
    })
})