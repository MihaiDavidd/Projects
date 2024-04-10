export function checkOrdersCount(User, Calendar) {
	User.Goto('Main')
	Calendar.open()
	Calendar.selectLast7Days()
	cy.wait(5000)
	User.getOrdersMainDashboard().then(OrdersMainCount => {
		User.visit('Trends Overview')
		cy.wait(10000)
		User.getOrdersTrendsOverview().then(getOrdersTrendsOverview =>{
			expect(OrdersMainCount).to.eq(getOrdersTrendsOverview)
		})
	})
}