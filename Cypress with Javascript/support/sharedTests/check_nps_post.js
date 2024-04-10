export function checkNPSPost(User, Calendar) {
	User.Goto('Main')
	cy.viewport(1600,4000)
	Calendar.open()
	Calendar.selectLast7Days()
	cy.wait(5000)
	User.getNPSPostMainDashboard().then(NPSPostMainScore => {
		User.visit('Trends Overview')
		cy.wait(10000)
		User.getNPSPostTrendsOverview().then(NPSPostTrendsOverview =>{
			expect(NPSPostMainScore).to.eq(NPSPostTrendsOverview)
			cy.intercept('*/update-chart?specific_type=nps_score&type=custom_knob&**').as('NPSPostScore')
			User.visit('Customer Experience')
			cy.viewport(1600,3000)
			cy.wait(5000)
			cy.wait('@NPSPostScore').then((score) => {
				const NPSPostCustomerExperience = score.response.body.data.chart_data.value
				const roundNPSPostCustomerExperience = Math.round(NPSPostCustomerExperience)
				expect(NPSPostMainScore).to.eq(roundNPSPostCustomerExperience)
			})
		})
	})
}