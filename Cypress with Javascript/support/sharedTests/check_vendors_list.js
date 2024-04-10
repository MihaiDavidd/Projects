/* eslint-disable no-undef */
export function CheckVendorsList(User,Shop, api_url, api_username, api_key_password,accessToken,shopUnique) {
    if (Shop.isMarketplace()){
        User.Goto('Main')
        cy.get('.dropdown.vendor-filter > .btn').click()
        cy.get('.action-item.market-block .marketplace-filters .vendor-filter .dropdown-menu.inner.show li a span.text').then(vendors => {
            // We count -1 because we do not want "All" to be included in the final number
            const vendorsCount = vendors.length-1
            if (Cypress.env('shopId') === 'auchan'){ 
                cy.get('.dropdown-menu.inner.show').then(vendors => {
                    cy.wrap(vendors).find('.text').should('contain', 'All')
                    cy.wrap(vendors).find('.text').should('contain', 'Auchan Ecommerce')
                    cy.wrap(vendors).find('.text').should('contain', 'Auchan Vendor Extra 00b01')
                    cy.wrap(vendors).find('.text').should('contain', 'Auchan Vendor Extra 00b02')
                    cy.wrap(vendors).find('.text').should('contain', 'Auchan Vendor Extra 00b03')
                    cy.wrap(vendors).find('.text').should('contain', 'Auchan Vendor Extra 00b04')
                    cy.wrap(vendors).find('.text').should('contain', 'Auchan Vendor Extra 00b05')
                    cy.wrap(vendors).find('.text').should('contain', 'Titan')
                })
            }
            cy.request({
                method: 'POST',
                url: api_url + "login",
                body : {
                    "username": api_username,
                    "key": api_key_password
                }
            }).then(response => {
                accessToken = response.body.token
                cy.request ({
                    method:'GET',
                    url: `${api_url}s/${shopUnique}/vendors`,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                    }
                }).then(response => {
                    const vendorsData = response.body.vendors;
                    const vendorsAPICount = vendorsData.table.map(vendor => vendor.vendor_eid)
                    const uniqueVendorEids = Array.from(new Set(vendorsAPICount))
                    const uniqueVendorEidsCount = uniqueVendorEids.length
                    expect(uniqueVendorEidsCount).to.eq(vendorsCount)
                })
            })
        })
    }
}