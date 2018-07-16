'use strict';
import supertest from 'supertest';
import {
  server,
} from '../../../src/app.js';
// import superagent from 'superagent';
// import app from '../../../src/app.js';
import Dog from '../../../src/models/dogs.js';
import Cat from '../../../src/models/cats.js';

import modelsHelper from '../../../src/scripts/models.helper.js';
const mockRequest = supertest(server);
const API_URL = '/api/v1/cats/';

afterAll(modelsHelper.afterAll);
beforeAll(modelsHelper.beforeAll);
//comment out afterEach modelsHelper to test the GET all, PUT, and DELETEs
// afterEach(modelsHelper.afterEach);

describe('API MODULE', () => {

  it('POST one cat', () => {

    const catObj = {
      name: 'MOCK CAT',
      color: 'WWOOOOOWWWW',
    };

    return mockRequest
      .post(API_URL)
      .send(catObj)
      .then(results => {
        const cat = JSON.parse(results.text);
        expect(cat.name).toBe(catObj.name);
        expect(cat._id).toBeDefined();
        // try {
        //   // console.log('CAT:',cat);
        //   expect(cat.name).toBe(catObj.name);
        //   expect(cat._id).toBeDefined();
        // } catch (error) {
        //   fail(err);
        // }
      });
    // .catch(err => fail(err));
  });

  it('GET ALL cats', () => {
    return mockRequest
      .get(API_URL)
      .then(results => {
        const cat = JSON.parse(results.text);
        expect(cat.length).toBe(1);
        // try {
        //   const cat = JSON.parse(results.text);
        //   expect(cat.length).toBe(1);
        // } catch (error) {
        //   fail(err);
        // }
      });
    // .catch(err => fail(err));
  });


  it('GET ONE cat', () => {
    const catObj = {
      name: 'GET ONE CAT',
      color: 'TTTTTTTTTT',
    };

    return mockRequest
      .post(API_URL)
      .send(catObj)
      .then(results => {
        const cat = JSON.parse(results.text);
        return mockRequest.get(`/api/v1/cats/${cat._id}`)
          .then(data => {
            // console.log('DATA ID :',data.body._id);
            // console.log('CAT ID:',cat._id);
            expect(data.body.name).toEqual(cat.name);
            expect(data.body.color).toEqual(cat.color);
            expect(data.body._id).toEqual(cat._id);
          });
        // .catch( err => fail(err));
      });
    // .catch( err=> fail(err));
  });

  it('PUT one cat', () => {
    const oldCat = {
      name: 'OLD CAT',
      color: 'WOOF',
    };

    return mockRequest.post(API_URL)
      .send(oldCat)
      .then(results => {
        const cat = JSON.parse(results.text);
        const updateCat = {color: 'polkadot'};

        return mockRequest.put(API_URL + cat._id)
          .send(updateCat)
          .then(data => {
            return mockRequest.get(API_URL + data.body._id)
              .then(newCat => {
                // console.log(newCat);
                expect(newCat.body.color).toEqual(updateCat.color.toUpperCase());
              });
            //         .catch( err => fail(err));
          });
      //     .catch( err => fail(err));
      });
    // .catch( err=> fail(err));
  });

  it('PUT test 404: no id', () => {

    return mockRequest.put(API_URL)
      .then( data => {
        expect(data.status).toEqual(404);
      });

  });

  it('DELETE one cat', () => {
    const oldCat = {
      name: 'delete CAT',
      color: 'rainbow',
    };

    return mockRequest.post(API_URL)
      .send(oldCat)
      .then(results => {
        const cat = JSON.parse(results.text);
        // console.log('CAT object BEFORE delete', cat);
        return mockRequest.delete(API_URL + cat._id)
          .then(data => {
            // console.log('CAT object AFTER delete', data.text);
            expect(data.body._id).not.toBeDefined();
          });
        // .catch( err => fail(err));
      });
    // .catch( err=> fail(err));
  });

  it('DELETE all cats', () => {
    const oldCat = {
      name: 'delete ALL CAT',
      color: 'ETELED',
    };

    return mockRequest.post(API_URL)
      .send(oldCat)
      .then( () => {
        // const cat = JSON.parse(results.text);

        return mockRequest.delete(`/api/v1/deleteall/cats`)
          .then(data => {
            expect(data.body._id).not.toBeDefined();
            expect(data.text._id).not.toBeDefined();
          });
        // .catch( err => fail(err));
      });
    // .catch( err=> fail(err));
  });


}); // closing describe
//have something reference something else
describe('LAB 14 DOG and CAT modules', () => {
  
  //create cat first with post
  //create a dog
  //PASS in 

//works = you are properely saving the cat as part of the dog and the next step is to populate that cat out
  it('POL', () => {
    return Cat.create({name : 'Zoe', color: 'black'})
      .then( cat => {
        expect(cat.name).toEqual('ZOE');

        return Dog.create({name : 'Felix', color: 'white', cat: cat._id})
          .then(dog => {
            expect(dog.cat).toEqual(cat._id);

            //were expecting it to show us a cat object not just the cat id but we only give it the cat id because that all we need so just add populate

            // return dog.save()
            //   .then(savedDog => {
            //     // console.log('nested Dog ID: ', dog._id);
            //     console.log('Saved Cat with nested Dog: ', savedDog);
            //     expect(savedDog.cat).toEqual(cat._id);
            //   });
          });
      });
  });

  //test if the populate works
  it('should have populated cat', () => {
    return Cat.create({name : 'Zoe', color: 'black'})
      .then( cat => {
        expect(cat.name).toEqual('ZOE');

        return Dog.create({name : 'Felix', color: 'white', cat: cat._id})
          .then(dog => {
            return Dog.findById(dog._id).populate('cat').exec().then(foundDog => {
              // populate the key from the other schema

              // console.log('FOUNDDOG.CAT: ', foundDog.cat);
              expect(foundDog.cat.name).toEqual(cat.name);
            });
          });
      });
  });



}); //closing describe

////////////////////////////////////////////////////////////////////
// OLD SUPERAGENT TESTS BELOW
///////////////////////////////////////////////////////////////////

// xit('POST SUCCESS: test', (done) => {
//   let obj = {
//     name:'max',
//     color:'brown',
//   };
//   console.log('OBJ: ', obj);
//   superagent.post('http://localhost:3000/api/v1/cats')
//     .send(obj)
//     .then(data => {
//       console.log('DATA: ', data);
//       expect(data.body.color).toEqual('brown');
//       expect(data.status).toEqual(200);
//       done();
//     });
// });

// xit('GET SUCCESS: test', (done) => {
//   let obj = {
//     content:'max',
//     title:'maxtitle',
//   };
  
//   superagent.post('http://localhost:3000/api/v1/cats')
//     .send(obj)
//     .then(data => {
//       superagent.get(`http://localhost:3000/api/v1/cats/${data.body.id}`)
//         .then(res => {
//           expect(res.body.title).toEqual('maxtitle');
//           expect(res.status).toEqual(200);
//           done();
//         });
//     });
// });

// xit('PUT SUCCESS: test', (done) => {
//   let obj = {
//     content:'max',
//     title:'maxtitle',
//   };
  
//   superagent.post('http://localhost:3000/api/v1/cats')
//     .send(obj)
//     .then(data => {
//       superagent.put(`http://localhost:3000/api/v1/cats/${data.body.id}`)
//         .send({content: 'john', title: 'smith'})
//         .then(res => {
//           expect(res.body.title).toEqual('smith');
//           expect(res.status).toEqual(200);
//           done();
//         });
//     });
// });

// xit('GET ALL SUCCESS: test', (done) => {
//   superagent.get('http://localhost:3000/api/v1/cats')
//     .then(data => {
//       let database = data.body;
//       let elementArr = [];
//       for (var property in database) {
//         elementArr.push(database[property].title);
//       }
//       for (let i = 0; i < elementArr.length; i++) {
//         expect(elementArr[i]);
//       }
//       expect(elementArr[0]).toEqual('maxtitle');
//       expect(data.status).toEqual(200);
//       done();
//     });
// });

// xit('DELETE ALL SUCCESS: test', (done) => {
//   superagent.delete('http://localhost:3000/api/v1/cats')
//     .then(data => {
//       expect(data.status).toEqual(200);
//       done();
//     });
// });

// }); //closing describe
