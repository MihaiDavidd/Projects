if (Cypress.env('shopId')=== 'mobexpert') {
	describe('Mobexpert NPS Microservice with orderEid', function () {
		const orderEids = [
			'D82C186F63',
			'B543D31049',
			'51FB694EB7',
			'565A7A4B81',
			'915AA95BDB',
			'DCEE24B091'
		];
		
		orderEids.forEach((orderEid) => {
			let response;
			let body;

			beforeEach(() => {
				cy.request('GET',`https://mobexpert.clients.reveal.omniconvert.com/v3/?orderEid=${orderEid}`)
					.then((resp) => {
						response = resp;
						body = JSON.parse(response.body);
				});
			});

			it('Should have a valid status', function () {
				expect(response.status).to.eq(200);
				expect(response).to.have.property('body');
			});

			it('Should have employees data', () => {
				expect(body).to.have.property('employees').and.to.be.an('object');
				expect(body.employees).to.have.property('employees').and.to.be.an('array');
			});

			it('Should have shipping info', () => {
				expect(body).to.have.property('shipping_provider').and.to.be.a('string');
			});

			it('Should have employee_eid, name, role, and team for each employee', () => {
				const employees = body.employees.employees;

				employees.forEach((employee) => {
					expect(employee).to.have.property('employee_eid').and.to.be.a('string');
					expect(employee).to.have.property('name').and.to.be.a('string');
					expect(employee).to.have.property('role').and.to.be.a('string');
					expect(employee).to.have.property('team').and.to.be.a('string');
				});
			});

			it('Should have order level vendor', () => {
				expect(body).to.have.property('order_vendor').and.to.be.a('string');
			});

			it('Should have info about cache status', () => {
				expect(body).to.have.property('cached').and.to.be.a('boolean');
			});
		});
	});
}