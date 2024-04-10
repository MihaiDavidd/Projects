// describe('Login Page', function()
// {    
//     before(function(){
//     // runs once before all tests in the block
//     cy.fixture('credentials').then(function(data)
//     {
//         this.data=data
//     })
// })
// let new_email = ""
// let token

// it('Create account', function() {
//   cy.visit(this.data.baseUrl);

//   cy.get('.sign-up-link').click()
//   new_email = "automation" + random_char() + "@omniconvert.com"
//   cy.get('#app_user_registration_email').type(new_email)
//   function random_char() {
//       var text = "";
//       var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

//       for (var i = 0; i < 7; i++)
//         text += possible.charAt(Math.floor(Math.random() * possible.length));

//       return text;
//     }
//     cy.get('#app_user_registration_plainPassword_first').type(this.data.password)
//     cy.get('#app_user_registration_plainPassword_second').click({force:true}).type(this.data.password)
//     cy.get('.custom-control-label').click({force:true})
//     cy.get('#rvl220720reg').click()
//     cy.contains('Congratulations! Your account has been successfully created.')
//     cy.get('.btn').click()
//     cy.contains("Let's begin your journey by adding your shop.")
  
// })

// it('delete account', function() {
//     cy.request({
//         method: 'POST',
//         url: 'https://api.argos.stage.omniconvert.com/v1/login',
//         body : {  
//             "username": "stage_automation@omniconvert.com",
//             "key": "u6X{X*AyS+yVq1h5{pji1Adn5n^p/7Qx#r5xh/muEQtg"
//         }
//     }).then(response => {
//         expect(response.status).to.eq(200)
//         expect(response.body).to.have.property('token')
//         token = response.body.token
//     })
// })









//     cy.request ({
//         method:'GET',
//         url: 'api.argos.stage.omniconvert.com/v1/users',

//     }).then(response => {
//         expect(response.status).to.eq(200)
//         var userId = response.body.id[-1];
//         // var email_user = response.body.email[01];
//         //return userId //email_user;
//         cy.log(userId)
//     }) //.then((userId)=> {
//         for(let i=0; i > userId.slice(-1);){    //i > userId[userId.length -1];
// //The pop() method pops/removes the last element of an array, and returns it. This method changes the length of the array.
            
// cy.request({
//                 method: 'DELETE',
//                 url: 'api.argos.stage.omniconvert.com/v1/users/'+userId,
//                 headers: {
//                     'Authorization': 'Bearer ' + accessToken
//                 }

//             }).then((resp)=>{
//                 expect(resp.status).to.eq(204)
      
//             })
// //         }
// //         })    
        
//         // cum selectez id-ul de la un userul cu email

//     })

// })












    // for (new_user) {
    //     if (new_email) {
    //         const userId = response.body.data.id
    //   }
    // }

        // const userId = response.body.data.id
        
        
        
        
        // delete user
        // cy.request({
        //     method: 'DELETE',
        //     url: 'https://web.argos.stage.omniconvert.com/'+userId,
        //     headers: {
        //         'Authorization': 'Bearer ' + accessToken
        //     }
        // }).then((response)=>{
        //     expect(response.status).to.eq(204)
        // })
