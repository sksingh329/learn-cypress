/// <reference types="cypress" />

describe('First Test Suite',() => {
    it('Locators', () => {
        
        // Navigate to base url
        cy.visit('/');

        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        // by tab name 
        cy.get('input');

        // by id 
        cy.get('#inputEmail')

        // by class value
        cy.get('.input-full-width')

        // attribute name 
        cy.get('[fullwidth]')

        // attribute name and value
        cy.get('[placeholder="Email"]')
        
        cy.get('[class="input-full-width size-medium shape-rectangle"]')
        
        // using multiple attribute 
        cy.get('[fullwidth][placeholder="Email"]') 
        
        // using tag name and attribute 
        cy.get('input[fullwidth][placeholder="Email"]') 

        // using test ID
        cy.get('[data-cy="imputEmail1"]')
    }),
    it('Finding WebElements', () => {
        // Navigate to base url
        cy.visit('/');

        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('Sign in');
        cy.contains('[status="warning"]','Sign in')

        cy.contains('Horizontal form');

        cy.contains('nb-card','Horizontal form');

        cy.contains('nb-card','Horizontal form').find('button');

    }),
    it('Chaining Elements', () => {
        // Navigate to base url
        cy.visit('/');

        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain','Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click();
    }),
    it('Saving the subject of the command', () => {
        // Navigate to base url
        cy.visit('/');

        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();
        
        // 1 - Using alias
        cy.contains('nb-card','Using the Grid').as('usingTheGrid');

        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain','Email');
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain','Password');

        // 2 - Using then() function
        cy.contains('nb-card','Using the Grid').then( usingTheGridForm => {
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain','Email')
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain','Password')
        })
    }),
    it('extract text value', () => {
        // Navigate to base url
        cy.visit('/');

        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.get('[for="exampleInputEmail1"]').should('contain','Email address')

        // store value in variable 
        cy.get('[for="exampleInputEmail1"]').then( label => {
            const labelText = label.text()
            expect(labelText).to.equal('Email address') 
        })

        // using invoke function 
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })

        // get attribute value
        cy.get('[for="exampleInputEmail1"]').invoke('attr','class').then( classValue => {
            expect(classValue).to.equal('label')
        })

        // get property 
        cy.get('#exampleInputEmail1').type('test@test.com')
        cy.get('#exampleInputEmail1').invoke('prop','value').should('contain','test@test.com')
    }),
    it('radio button', () => {
        // Navigate to base url
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card','Using the Grid')
            .find('[type="radio"]')
            .then( radioButtons => {
                cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')
                cy.wrap(radioButtons).eq(1).check({force: true})
                cy.wrap(radioButtons).eq(0).should('not.be.checked')
                cy.wrap(radioButtons).eq(2).should('be.disabled')
            })
    }),
    it('Checkbox', () => {
        // Navigate to base url
        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

        // cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').uncheck({force: true})
    }),
    it('Date Picker', () => {
        // Navigate to base url
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

        let date = new Date()
        date.setDate(date.getDate() + 10)
        const monthName = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sep',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
        }
        
        cy.contains('nb-card','Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            cy.get('.day-cell').not('.bounding-month').contains(`${date.getDate()}`).click()
            cy.wrap(input).invoke('prop','value').should('contain',`${monthName[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`)
            cy.wrap(input).should('have.value',`${monthName[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`)
        })
    }),
    it('Date Picker 2', () => {
        // Navigate to base url
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

        let date = new Date()
        date.setDate(date.getDate() + 60)
        
        const futureDay = date.getDate()
        const futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
        const futureYear = date.getFullYear()
        const dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`
        
        cy.contains('nb-card','Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            
            function navigateToCalendarMonth(){
                // Navigate to month
                cy.get('nb-calendar-navigation').find('button').invoke('text').then( dateAttribute => {
                if( !dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
                    cy.get('[data-name="chevron-right"]').click()
                    navigateToCalendarMonth()
                }
                else{
                    cy.get('.day-cell').not('.bounding-month').contains(`${date.getDate()}`).click()       
                }
            })
            }
            navigateToCalendarMonth()
            cy.wrap(input).invoke('prop','value').should('contain',dateToAssert)
            cy.wrap(input).should('have.value',dateToAssert)
        })
    })

    it('List Selection', () => {
        cy.visit('/');
        cy.get('.header-container nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain','Dark')
    })

    it('Select All List Items', () => {
        cy.visit('/');
        cy.get('nav nb-select').then( dropDown => {
            cy.wrap(dropDown).click()
            cy.get('.options-list nb-option').each( (listItem, index) => {
                const itemText = listItem.text().trim()
                cy.wrap(listItem).click()
                cy.wrap(dropDown).should('contain',itemText)
                if (index < 3){
                    cy.wrap(dropDown).click()
                }
            })
        })
    })

    it('Web Tables - Get table row by text', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // Get the row by text
        cy.get('tbody').contains('tr','Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            // const currentAge = cy.wrap(tableRow).find('[placeholder="Age"]').text().trim()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('36')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain','36')
        }) 
    })

    it.only('Web Tables - Get table row by index', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        cy.get('thead').find('.nb-plus').click()

        // Get row by index 
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Subodh')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Singh')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        cy.get('tbody tr').first().find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain','Subodh')
            cy.wrap(tableColumns).eq(3).should('contain','Singh')
        })
    })
})