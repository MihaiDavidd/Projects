export function checkADBTValue(User, Calendar) {
	User.Goto('Main')
	Calendar.open()
	Calendar.selectLast7Days()
	cy.wait(10000)
	User.getADBTMainDashboard().then(ADBTMainValue => {
		User.visit('Trends Overview')
		cy.wait(10000)
		User.getADBTTrendsOverview().then(ADBTTrendsOverview =>{
			expect(ADBTMainValue).to.eq(ADBTTrendsOverview)
		})
	})
}