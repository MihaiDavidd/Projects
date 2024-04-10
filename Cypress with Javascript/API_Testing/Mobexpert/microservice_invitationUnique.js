if (Cypress.env('shopId')=== 'mobexpert') {
	describe('Mobexpert NPS Microservice with invitation', function () {
		const uniqueInvitations = [
			'anqfoEcoTsuMztPJR*m6Sg',
			'i5RHlC-zTfOKr8Zn7QxQsg',
			'iui3VePLRxWCmxKMbj1fPA',
		]

		uniqueInvitations.forEach((invitationUnique) => {
			let response
			let body

			beforeEach(() => {
				cy.request('GET',`https://mobexpert.clients.reveal.omniconvert.com/v3/?invitationUnique=${invitationUnique}`
				).then((resp) => {
					response = resp
					body = JSON.parse(response.body)
				})
			})

			it(`${invitationUnique} Should have a valid status`, function () {
				expect(response.status).to.eq(200)
				expect(response).to.have.property('body')
			})

			it(`${invitationUnique} Should have employees data`, () => {
				expect(body).to.have.property('employees').and.to.be.an('array')
			})

			it(`${invitationUnique} Should have shipping info`, () => {
				expect(body).to.have.property('shipping_provider').and.to.be.a('string')
			})

			it(`${invitationUnique} Should have multiple employee objects`, () => {
				const employees = body.employees
				employees.forEach((employee) => {
					expect(employee).to.be.an('object')
				})
			})

			it(`${invitationUnique} Should have employee eid and role for each employee object`, () => {
				const employee_list = body.employees
				employee_list.forEach((employee_object) => {
					const employee_data = employee_object.employee
					expect(employee_data).to.have.property('employee_eid').and.to.be.a('string')
					expect(employee_data).to.have.property('name').and.to.be.a('string')
					expect(employee_data).to.have.property('role').and.to.be.a('string')
					expect(employee_data).to.have.property('team').and.to.be.a('string')
				})
			})

			it(`${invitationUnique} Should have order level vendor`, () => {
				expect(body).to.have.property('order_vendor').and.to.be.a('string')
			})

			it(`${invitationUnique} Should have info about cache status`, () => {
				expect(body).to.have.property('cached').and.to.be.a('boolean')
			})
		})
	})
}