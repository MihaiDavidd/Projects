let ChartRevenueValue = ''
export function checkRevenueValueMainTrends(User, Calendar) {
	let RevenueMainValue = ''
	User.Goto('Main')
	cy.viewport(1600,3000)
	Calendar.open()
	Calendar.selectLast7Days()
	cy.wait(5000)
	User.getRevenueMain().then(getRevenueMain => {
		RevenueMainValue = getRevenueMain
		User.visit('Trends Overview')
		cy.wait(5000)
		User.getRevenueTrendsOverview().then(getRevenueTrendsOverview =>{
			const RevenueTrendsOverviewValue = getRevenueTrendsOverview
			expect(RevenueMainValue).to.eq(RevenueTrendsOverviewValue)
		})
	})
}

export function checkRevenueValueLover(User, Calendar) {
	let RevenueMainRFMSegmentationLover = ''
	User.Goto('Main')
	Calendar.open()
	Calendar.selectLast7Days()
	cy.viewport(1300,2500)
	cy.intercept('*/update-chart?specific_type=revenue_by_rfm&type=bar&**').as('dataRevenueValue')
// Get Revenue number for Lover in RFM Segmentation
	User.getRevenueMainRFMSegmentationLover().then(revenueOfLovers => {
		RevenueMainRFMSegmentationLover = revenueOfLovers
		User.visit('Segmentation')
		cy.viewport(1600,3000)
		User.getRevenueSegmentationRFMSegmentationLover().then(revenueOfLoversFromSegmentation => {
			expect(revenueOfLoversFromSegmentation).to.eq(RevenueMainRFMSegmentationLover)
		})
		cy.wait('@dataRevenueValue').then((value) => {
			ChartRevenueValue = value
			if(Cypress.env('shopId') === 'auchan') {
				const RevenueByRFMChartDataLoversGroup = value.response.body.data.chart_data.revenue.rfm_groups.find(group => group.Lovers)
				const RevenueValueLoversGroup = RevenueByRFMChartDataLoversGroup.Lovers.toFixed(2)
				expect(RevenueValueLoversGroup.replace(/[^\d.]/g, '')).to.eq(RevenueMainRFMSegmentationLover.replace(/[^\d.]/g, ''))
			} else {
				const RevenueByRFMChartDataLoverGroup = value.response.body.data.chart_data.revenue.rfm_groups.find(group => group.Lover)
				const RevenueValueLoverGroup = RevenueByRFMChartDataLoverGroup.Lover.toFixed(2)
				expect(RevenueValueLoverGroup).to.eq(RevenueMainRFMSegmentationLover.replace(',',''))
			}
		})
	})
}

export function checkRevenueValueApprentice(User, Calendar) {
	let RevenueMainRFMSegmentationApprentice = ''
	User.visit('Main')
	Calendar.open()
	Calendar.selectLast7Days()
	cy.viewport(1600,4000)
	cy.wait(5000)
// Get Revenue value for Apprentice in RFM Segmentation
	User.getRevenueMainRFMSegmentationApprentice().then(revenueOfApprentice => {
		RevenueMainRFMSegmentationApprentice = revenueOfApprentice
		cy.get('#customer-analytics > :nth-child(1) > .filter-persistent').click()
		cy.viewport(1600,3000)
		cy.get('#chart-revenue_margin_by_rfm-aggregated-table > .card')
			.scrollTo('bottom',{ensureScrollable: false})
// it does not scroll down in table to see the apprentice 
		cy.wait(5000)
		User.getRevenueSegmentationRFMSegmentationApprentice().then(revenueOfApprenticeFromSegmentation => {
			expect(revenueOfApprenticeFromSegmentation).to.eq(RevenueMainRFMSegmentationApprentice)
		})
		const RevenueByRFMChartDataApprenticeGroup = ChartRevenueValue.response.body.data.chart_data.revenue.rfm_groups.find(group => group.Apprentice)
		const RevenueValueApprenticeGroup = RevenueByRFMChartDataApprenticeGroup.Apprentice.toFixed(2)
		expect(RevenueValueApprenticeGroup).to.eq(RevenueMainRFMSegmentationApprentice.replace(',',''))
	})
}