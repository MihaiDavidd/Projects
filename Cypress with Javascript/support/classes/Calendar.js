export class Reveal_Calendar {
	open() {
		cy.get('.parent-drp > #daterange-predef-range').click()
	}
	selectLastYear() {
		cy.get('.show-ranges .ranges:visible [data-range-key="Last Year"]').click()
		cy.wait(1000)
		cy.get('.show-forced > .drp-buttons > .applyBtn').click()
	}
	selectToday() {
		cy.get('.show-ranges .ranges:visible [data-range-key="Today"]').click()
		cy.wait(1000)
		cy.get('.show-forced > .drp-buttons > .applyBtn').click()
	}
    selectLast7Days(){
        cy.get('.show-ranges .ranges:visible [data-range-key="Last 7 Days"]').click()
        cy.wait(1000)
        cy.get('.show-forced > .drp-buttons > .applyBtn').click()
    }
	selectLastMonth(){
		cy.get('.show-ranges .ranges:visible [data-range-key="Last Month"]').click()
		cy.wait(1000)
		cy.get('.show-forced > .drp-buttons > .applyBtn').click()
	}
	selectAllTime(){
		cy.get('.show-ranges .ranges:visible [data-range-key="All time"]').click()
		cy.wait(1000)
		cy.get('.show-forced > .drp-buttons > .applyBtn').click({force:true})
	}
	selectYesterday() {
		cy.get('.show-ranges .ranges:visible [data-range-key="Yesterday"]').click()
		cy.wait(1000)
		cy.get('.show-forced > .drp-buttons > .applyBtn').click()
	}
}
export default { Reveal_Calendar };