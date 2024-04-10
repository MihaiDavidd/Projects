let ChartMarginValue = ''
export function checkMarginValueMainTrends(User, Calendar) {
    let MarginMainValue = ''
	User.Goto('Main')	
	Calendar.open()
	Calendar.selectLast7Days()
	cy.wait(5000)
	User.getMarginMain().then(getMarginMain => {
		MarginMainValue = getMarginMain
		User.visit('Trends Overview')
		cy.wait(5000)
		User.getMarginTrendsOverview().then(getMarginTrendsOverview =>{
			const MarginTrendsOverviewValue = getMarginTrendsOverview
			expect(MarginMainValue).to.eq(MarginTrendsOverviewValue)
		})
	})
}

export function checkMarginValueLover(User, Calendar) {
	let MarginMainRFMSegmentationLover = ''
	User.Goto('Main')
	Calendar.open()
	Calendar.selectLast7Days()
	cy.viewport(1300,2500)
	cy.intercept('*/update-chart?specific_type=margin_by_rfm&type=bar&**').as('dataMarginValue')
// Get margin number for Lover in RFM Segmentation
	User.getMarginMainRFMSegmentationLover().then(marginOfLovers => {
		MarginMainRFMSegmentationLover = marginOfLovers
		User.visit('Segmentation')
		cy.viewport(1600,3000)
		cy.wait(5000)
		User.getMarginSegmentationRFMSegmentationLover().then(marginOfLoversFromSegmentation => {
			expect(marginOfLoversFromSegmentation).to.eq(MarginMainRFMSegmentationLover)
		})
		cy.wait('@dataMarginValue').then((value) => {
			ChartMarginValue = value
			if(Cypress.env('shopId') === 'auchan') {
				const MarginLoversGroup = value.response.body.data.chart_data.margin.rfm_groups.find(group => group.Lovers)
				const MarginValueLoversGroup = MarginLoversGroup.Lovers.toFixed(2)
				expect(MarginValueLoversGroup).to.eq(MarginMainRFMSegmentationLover.replace(/,/g, ''))
			} else {
				const MarginLoverGroup = value.response.body.data.chart_data.margin.rfm_groups.find(group => group.Lover)
				const MarginValueLoverGroup = MarginLoverGroup.Lover.toFixed(2)
				expect(MarginValueLoverGroup).to.eq(MarginMainRFMSegmentationLover.replace(',',''))
			}
		})
	})	
}

export function checkMarginValueApprentice(User, Calendar) {
	let MarginMainRFMSegmentationApprentice = ''
	User.visit('Main')
	Calendar.open()
	Calendar.selectLast7Days()
	cy.viewport(1600,4000)
	cy.wait(5000)
// Get margin value for Apprentice in RFM Segmentation
	User.getMarginMainRFMSegmentationApprentice().then(marginOfApprentice => {
		MarginMainRFMSegmentationApprentice = marginOfApprentice
		cy.get('#customer-analytics > :nth-child(1) > .filter-persistent').click()
		cy.viewport(1600,3000)
		cy.wait(5000)
		User.getMarginSegmentationRFMSegmentationApprentice().then(marginOfApprenticeFromSegmentation => {
			expect(marginOfApprenticeFromSegmentation).to.eq(MarginMainRFMSegmentationApprentice)
			const MarginApprenticeGroup = ChartMarginValue.response.body.data.chart_data.margin.rfm_groups.find(group => group.Apprentice)
			const MarginValueApprenticeGroup = MarginApprenticeGroup.Apprentice.toFixed(2)
			expect(MarginValueApprenticeGroup).to.eq(MarginMainRFMSegmentationApprentice.replace(',',''))
		})
	})
}