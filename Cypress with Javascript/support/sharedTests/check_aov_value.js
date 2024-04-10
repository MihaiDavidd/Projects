export function checkAOVValue(User, Calendar) {
	User.Goto('Main')
	Calendar.open()
	Calendar.selectLast7Days()
	cy.wait(10000)
	User.getAOVMainDashboard().then(AOVMainValue => {
		User.visit('Trends Overview')
		cy.wait(10000)
		User.getAOVTrendsOverview().then(getAOVTrendsOverview =>{
			expect(AOVMainValue).to.eq(getAOVTrendsOverview)
		})
	})
}