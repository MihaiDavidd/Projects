export function checkRevenuePerCustomer(User, Calendar) {
	User.Goto('Customer Lifetime Value')
	Calendar.open()
	Calendar.selectLast7Days()
	cy.wait(5000)
    User.getRevenuePerCustomerCLV().then(RevenuePerCustomerCLV =>{
        cy.get('.list-group.show > :nth-child(1) > .main-link > a').click()
		User.visit('Trends Overview')
		cy.wait(10000)
        User.getRevenuePerCustomerTrendsOverview().then(RevenuePerCustomerTrendsOverview => {
			expect(RevenuePerCustomerCLV).to.eq(RevenuePerCustomerTrendsOverview)
		})
	})
}