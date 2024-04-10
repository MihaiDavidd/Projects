export function CheckVendorMetrics(User, Calendar, Shop) {
    if (Shop.isMarketplace()){
        User.Goto('Main')
        Calendar.open()
        Calendar.selectLast7Days()
        cy.wait(10000)
        User.getOrdersMainDashboard().then(dashboardOrders =>{
            User.getRevenueMain().then(dashboardRevenue =>{
                User.getCLVMainDashboard().then(dashboardCLV =>{
                    User.getCustomerMain().then(dashboardCustomers =>{
                        if(Cypress.env('shopId') === 'mobexpert') {
                            User.getMarginMain().then(dashboardMargin =>{
                                GoToVendorOverview(User)
                                User.getVendorMargin().then(vendorMargin =>{
                                    expect(vendorMargin).to.eq(dashboardMargin)
                                })
                            })
                        }
                        GoToVendorOverview(User)
                        User.getVendorRevenue().then(vendorRevenue =>{
                            expect(vendorRevenue).to.eq(dashboardRevenue)
                        })
                        User.getVendorCLV().then(vendorCLV =>{
                            expect(vendorCLV).to.eq(dashboardCLV)
                        })
                        User.getVendorCustomers().then(vendorCustomers =>{
                            expect(vendorCustomers).to.eq(dashboardCustomers)
                        })
                        User.getVendorOrders().then(vendorOrders =>{
                            expect(vendorOrders).to.eq(dashboardOrders)
                        })
                    })
                })
            })
        })
    }
}

export function CheckMetricsForMobexpertVendor(User, Calendar) {
    if (Cypress.env('shopId') === 'mobexpert'){ 
        User.Goto('Main')
        Calendar.open()
        Calendar.selectLast7Days()
        // Select Vendor Baneasa
        cy.get('.dropdown.vendor-filter > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner').click()
        cy.get('.dropdown.vendor-filter > div.dropdown-menu > .bs-searchbox > .form-control').type('Baneasa')
        cy.get('#bs-select-1-4 > .text').click()
        cy.get('.card > :nth-child(2) > div > .btn').click()
        cy.wait(10000)
        User.getOrdersMainDashboard().then(dashboardOrders =>{
            User.getRevenueMain().then(dashboardRevenue =>{
                User.getCLVMainDashboard().then(dashboardCLV =>{
                    User.getCustomerMain().then(dashboardCustomers =>{
                        User.getMarginMain().then(dashboardMargin =>{
                            GoToVendorOverview(User)
                            User.getfirstVendorRevenue().then(vendorBaneasaRevenue =>{
                                expect(vendorBaneasaRevenue).to.eq(dashboardRevenue)
                            })
                            User.getfirstVendorCLV().then(vendorBaneasaCLV =>{
                                expect(vendorBaneasaCLV).to.eq(dashboardCLV)
                            })
                            User.getfirstVendorCustomers().then(vendorBaneasaCustomers =>{
                                expect(vendorBaneasaCustomers).to.eq(dashboardCustomers)
                            })
                            User.getfirstVendorOrders().then(vendorBaneasaOrders =>{
                                expect(vendorBaneasaOrders).to.eq(dashboardOrders)
                            })
                            User.getfirstVendorMargin().then(vendorBaneasaMargin =>{
                                expect(vendorBaneasaMargin).to.eq(dashboardMargin)
                            })
                        })
                    })
                })
            })
        })
    }
}

export function CheckMetricsForAuchanVendor(User, Calendar) {
    if (Cypress.env('shopId') === 'auchan'){ 
        User.Goto('Main')
        Calendar.open()
        Calendar.selectLast7Days()
        // Select Vendor Titan
        cy.get('.dropdown.vendor-filter > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner').click()
        cy.get('.dropdown.vendor-filter > div.dropdown-menu > .bs-searchbox > .form-control').type('Titan')
        cy.get('#bs-select-1-1 > .text').click()
        cy.get('.card > :nth-child(2) > div > .btn').click()
        cy.wait(10000)
        User.getOrdersMainDashboard().then(dashboardOrders =>{
            User.getRevenueMain().then(dashboardRevenue =>{
                User.getCLVMainDashboard().then(dashboardCLV =>{
                    User.getCustomerMain().then(dashboardCustomers =>{
                        GoToVendorOverview(User)
                        User.getfirstVendorRevenue().then(vendorTitanRevenue =>{
                            expect(vendorTitanRevenue).to.eq(dashboardRevenue)
                        })
                        User.getfirstVendorCLV().then(vendorTitanCLV =>{
                            expect(vendorTitanCLV).to.eq(dashboardCLV)
                        })
                        User.getfirstVendorCustomers().then(vendorTitanCustomers =>{
                            expect(vendorTitanCustomers).to.eq(dashboardCustomers)
                        })
                        User.getfirstVendorOrders().then(vendorTitanOrders =>{
                            expect(vendorTitanOrders).to.eq(dashboardOrders)
                        })
                    })
                })
            })
        })
    }
}

export function GoToVendorOverview(User) {
    User.visit('Vendor Overview')
    cy.wait(10000)
}