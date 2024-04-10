// /// <reference types="Cypress" />
// let accessToken
// let userList

// describe('delete user' , function() {
    
// it('Log In', function() {

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
//         accessToken = response.body.token
//     })
// })
// it('User list', function() {   
//     cy.request ({
//         method:'GET',
//         url: 'https://api.argos.stage.omniconvert.com/v1/users',
//         headers: {
//             'Authorization': 'Bearer ' + accessToken
//         },
//     }).then(response => {
//         var userList = response.body.users;
//         // var email_user = response.body.email;
//         cy.log(userList)
//         // cy.log(email_user)
//         for(i=0; i < userList.length; i++){
            
//         }
//     })

//         // // delete user
//         // cy.request({
//         //     method: 'DELETE',
//         //     url: 'https://api.argos.stage.omniconvert.com/'+userId,
//         //     headers: {
//         //         'Authorization': 'Bearer ' + accessToken
//         //     },
//         // }).then((res)=>{
//         //     expect(res.status).to.eq(204)
//         // })
//     })

// })
