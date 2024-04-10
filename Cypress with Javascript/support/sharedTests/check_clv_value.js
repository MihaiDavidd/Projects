export function checkCLVValue(User, Calendar) {
    let CLVMainDashboard = '';
	User.Goto('Main')
	Calendar.open()
	Calendar.selectLast7Days()
    cy.wait(5000)
    User.getCLVMainDashboard().then(dashboardCLV => {
		CLVMainDashboard = dashboardCLV
        cy.log(CLVMainDashboard)
        User.visit('CLV')
        cy.viewport(1600,3000)
		cy.wait(10000)
        User.getCLVCustomerLifetimeValue().then(CustomerLifetimeValueCLV => {
            expect(CLVMainDashboard).to.eq(CustomerLifetimeValueCLV)
        })
		cy.get('.list-group.show > :nth-child(1) > .main-link').click()
		User.visit('Trends Overview')
		cy.wait(10000)
		User.getCLVTrendsOverview().then(TrendsOverviewCLV => {
            expect(CLVMainDashboard).to.eq(TrendsOverviewCLV)
        })
    })
}