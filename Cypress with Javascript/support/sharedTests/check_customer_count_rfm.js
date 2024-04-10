export function checkCustomerCountMainTrends(User, Calendar) {
    let CustomerMainCount = ''
    User.Goto('Main')
    Calendar.open()
    Calendar.selectLast7Days()
    cy.wait(10000)
    User.getCustomerMain().then(getCustomerMain => {
        CustomerMainCount = getCustomerMain
        User.visit('Trends Overview')
        cy.wait(10000)
        User.getCustomerTrendsOverview().then(getCustomerTrendsOverview =>{
            const CustomerTrendsOverviewCount = getCustomerTrendsOverview
            expect(CustomerMainCount).to.eq(CustomerTrendsOverviewCount)
        })
    })
}

export function checkCustomerCountLover(User, Calendar) {
    let ChartCustomerCount ='';
    let CustomerMainRFMSegmentationLover = ''
    User.Goto('Main')
    Calendar.open()
    Calendar.selectLast7Days()
    cy.viewport(1300,4000)
    cy.intercept('*/update-chart?specific_type=customer_count_by_rfm&type=bar**').as('dataCustomerCount')
// Get customer count for Lover in RFM Segmentation
    User.getCustomerMainRFMSegmentationLover().then(numberOfLovers => {
        CustomerMainRFMSegmentationLover = numberOfLovers
        User.visit('Segmentation')
        cy.viewport(1300,1800)
        cy.wait(15000)
        User.getCustomerSegmentationRFMSegmentationLover().then(numberOfLoverFromSegmentation => {
            expect(numberOfLoverFromSegmentation).to.eq(CustomerMainRFMSegmentationLover)
        })
        cy.wait('@dataCustomerCount').then((count) => {
            ChartCustomerCount = count
            if(Cypress.env('shopId') === 'auchan') {
                const CountLoversGroup = ChartCustomerCount.response.body.data.chart_data.customer_count.rfm_groups.find(group => group.Lovers)
                const CustomerCountLoversGroup = parseInt(CountLoversGroup.Lovers)
                expect(CustomerCountLoversGroup).to.eq(CustomerMainRFMSegmentationLover)
            } else {
            const CountLoverGroup = ChartCustomerCount.response.body.data.chart_data.customer_count.rfm_groups.find(group => group.Lover)
            const CustomerCountLoverGroup = parseInt(CountLoverGroup.Lover)
            expect(CustomerCountLoverGroup).to.eq(CustomerMainRFMSegmentationLover)
            }
        })
    })
}

export function checkCustomerCountApprentice(User, Calendar) {
    let ChartCustomerCount ='';
    let CustomerMainRFMSegmentationApprentice ='';
    User.Goto('Main')
    Calendar.open()
    Calendar.selectLast7Days()
    cy.viewport(1300,4000)
    cy.wait(10000)
    cy.intercept('*/update-chart?specific_type=customer_count_by_rfm&type=bar**').as('dataCustomerCount')
// Get customer count for Lover in RFM Segmentation
    User.getCustomerMainRFMSegmentationApprentice().then(numberOfApprentice => {
        CustomerMainRFMSegmentationApprentice = numberOfApprentice
        User.visit('Segmentation')
        cy.viewport(1300,1800)
        cy.wait(10000)
        User.getCustomerSegmentationRFMSegmentationApprentice().then(numberOfApprenticeFromSegmentation => {
            expect(numberOfApprenticeFromSegmentation).to.eq(CustomerMainRFMSegmentationApprentice)
        })
        cy.wait('@dataCustomerCount').then((count) => {
            ChartCustomerCount = count
            const CountApprenticeGroup = ChartCustomerCount.response.body.data.chart_data.customer_count.rfm_groups.find(group => group.Apprentice)
            const CustomerCountApprenticeGroup = parseInt(CountApprenticeGroup.Apprentice)
            expect(CustomerCountApprenticeGroup).to.eq(CustomerMainRFMSegmentationApprentice)
        })
    })
}