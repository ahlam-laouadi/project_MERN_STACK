# All in One App v1.0
- Application that would contain the essence of every project I made and more
- The project is not perfect but i gave it my best considering i made it alone and will improve it and add more features in later versions
---

# v1.0 features
The user can 
- register and login
- create products
- edit and delete his/her products
- search for products by name or categories
- comment on products and delete his/her comments
- exchange messages with other users

![This is an image](./home.png)
![This is an image](./profile.png)
![This is an image](./user.png)
![This is an image](./product.png)
![This is an image](./chat.png)

---

## how to install the server

1. cd to the backend directory
2. npm install
3. create the .env
   - JWT_SECRET=anysecretyouwant
   - PORT= 5000
   - DB_URI=*the link to your mongodb *
4. npm run dev

## how to install the frontend

1. cd to the frontend directory
2. npm install
3. npm start

---

## The endpoints with their request and response examples

1. ### Register

   #### POST => localhost:5000/auth/register  form-data

   #### req:

   {

   - "firstName": "didi",
   - "lastName": "didi",
   - "email": "didi@gmail.com",
   - "password": "12345678",
   - "picturePath": "testimonial-1.jpg",
   - "location": "egypt",
   - "gender": "female"
     }

   ***

   #### res:

   {

   - "firstName": "didi",
   - "lastName": "didi",
   - "email": "didi@gmail.com",
   - "password": "$2b$10$q51mT6qCACr7VioFLOH9TenU/.VdHe2w5bu7xAPimVYFUK0YbeZWC",
   - "picturePath": "testimonial-1.jpg",
   - "location": "egypt",
   - "gender": "female",
   - "products": [],
   - "messages": [],
   - "\_id": "63d7891e8c9e31704437d6db",
   - "createdAt": "2023-01-30T09:08:46.523Z",
   - "updatedAt": "2023-01-30T09:08:46.523Z",
   - "\_\_v": 0
     }

---

2. ### Login
   #### POST => localhost:5000/auth/login
   #### req:
   {
   - "email": "dodo@gmail.com",
   - "password": "12345678"
     }

---

#### res:

{

- "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDc4OTRkOGM5ZTMxNzA0NDM3ZDZkZCIsImlhdCI6MTY3NTA2OTkyOCwiZXhwIjoxNjc1MzI5MTI4fQ.szB25B6-Q9QhkmZpV917rkP0pST270nWpo8Ri6JNMcc",
- "user": {
  - "\_id": "63d7894d8c9e31704437d6dd",
  - "firstName": "dodo",
  - "lastName": "dodo",
  - "email": "dodo@gmail.com",
  - "password": "$2b$10$kpjeOtYXg/n3U9n.muU2o.IRzIPa7Bct6kn2lrYGKooddKvpS2RiS",
  - "picturePath": "testimonial-1.jpg",
  - "location": "egypt",
  - "gender": "female",
  - "products": [],
  - "messages": [],
  - "createdAt": "2023-01-30T09:09:33.377Z",
  - "updatedAt": "2023-01-30T09:09:33.377Z",
  - "\*\*v": 0
    }
    }

---

3. ### Get User
   #### GET => localhost:5000/users/user/:userId (public)
   #### res:
   {
   - "\_id": "63d7891e8c9e31704437d6db",
   - "firstName": "didi",
   - "lastName": "didi",
   - "email": "didi@gmail.com",
   - "password": "$2b$10$q51mT6qCACr7VioFLOH9TenU/.VdHe2w5bu7xAPimVYFUK0YbeZWC",
   - "picturePath": "testimonial-1.jpg",
   - "location": "egypt",
   - "gender": "female",
   - "products": [],
   - "messages": [],
   - "createdAt": "2023-01-30T09:08:46.523Z",
   - "updatedAt": "2023-01-30T09:08:46.523Z",
   - "\_\_v": 0
     }

---

4. ### Get all Products
   #### GET => localhost:5000/products/ Public
   #### res
   [ 
    * {
         - "_id": "6409c8466e0083484b0f6d4b",
         - "userId": "6409c8116e0083484b0f6d42",
         - "name": "dress",
         - "description": "A black dress",
         - "category": "women's",
         - "price": 40,
         - "numberInStock": 5,
         - "picturePath": "clothes-4.jpg",
         - "comments": [],
         - "creationDate": "2023-03-09T11:51:34.867Z",
         - "createdAt": "2023-03-09T11:51:34.870Z",
         - "updatedAt": "2023-03-09T11:51:34.870Z",
         - "__v": 0
    },
    * {
         - "_id": "6409cab46e0083484b0f6d70",
         - "userId": "6409c9f86e0083484b0f6d65",
         - "name": "watch",
         - "description": "A cool blue watch",
         - "category": "electronics",
         - "price": 150,
         - "numberInStock": 2,
         - "picturePath": "watch-1.jpg",
         - "comments": [],
         - "creationDate": "2023-03-09T12:01:56.068Z",
         - "createdAt": "2023-03-09T12:01:56.069Z",
         - "updatedAt": "2023-03-11T07:30:52.424Z",
         - "__v": 0
    }
]

---

5. ### Create a Product
   #### POST => localhost:5000/products/create (token (Bearer)) [form-data]
   #### req:
   {
   - "name": "dress",
   - "description": "A Black dress ",
   - "category": "women's",
   - "price": 40,
   - "numberInStock": 1,
   - "picturePath": "clothes-4.jpg"
   }

   ---
   #### res:
   {
   - "userId": "63d7891e8c9e31704437d6db",
   - "name": "dress",
   - "description": "A Black dress ",
   - "category": "women's",
   - "price": 40,
   - "numberInStock": 1,
   - "picturePath": "clothes-4.jpg",
   - "comments": [],
   - "\_id": "63d78c0f8c9e31704437d6e2",
   - "creationDate": "2023-01-30T09:21:19.175Z",
   - "createdAt": "2023-01-30T09:21:19.177Z",
   - "updatedAt": "2023-01-30T09:21:19.177Z",
   - "\_\_v": 0
   }

---

6. ### Get a product
   #### GET => localhost:5000/products/:productId (public)
   #### res
   {
   - "\_id": "63d78c0f8c9e31704437d6e2",
   - "userId": "63d7891e8c9e31704437d6db",
   - "name": "dress",
   - "description": "A Black dress ",
   - "category": "women's",
   - "price": 40,
   - "numberInStock": 1,
   - "picturePath": "clothes-4.jpg",
   - "comments": [],
   - "creationDate": "2023-01-30T09:21:19.175Z",
   - "createdAt": "2023-01-30T09:21:19.177Z",
   - "updatedAt": "2023-01-30T09:21:19.177Z",
   - "\_\_v": 0
   }

---

7.  ### Search a product by name 
    #### POST => localhost:5000/products/products/search (public)
    #### req
    {
    - "body": "dress"
    }

    ---

    #### res
    {
    - "\_id": "63d78c0f8c9e31704437d6e2",
    - "userId": "63d7891e8c9e31704437d6db",
    - "name": "dress",
    - "description": "A Black dress ",
    - "category": "women's",
    - "price": 40,
    - "numberInStock": 5,
    - "picturePath": "clothes-4.jpg",
    - "comments": [],
    - "creationDate": "2023-01-30T09:21:19.175Z",
    - "createdAt": "2023-01-30T09:21:19.177Z",
    - "updatedAt": "2023-01-30T09:32:52.471Z",
    - "\_\_v": 0
    }

---

8.  ### Search a product by category 
    #### POST => localhost:5000/products/products/search (public)
    #### req
    {
    - "body": "women's"
    }

    ---

    #### res
    {
    - "\_id": "63d78c0f8c9e31704437d6e2",
    - "userId": "63d7891e8c9e31704437d6db",
    - "name": "dress",
    - "description": "A Black dress ",
    - "category": "women's",
    - "price": 40,
    - "numberInStock": 5,
    - "picturePath": "clothes-4.jpg",
    - "comments": [],
    - "creationDate": "2023-01-30T09:21:19.175Z",
    - "createdAt": "2023-01-30T09:21:19.177Z",
    - "updatedAt": "2023-01-30T09:32:52.471Z",
    - "\_\_v": 0
    }

---

9.  ### Edit a product
    #### PUT => localhost:5000/products/:productId/edit (token Bearer)
    #### req
    {
    - "numberInStock": 5
    }

    ---

    #### res
    {
    - "\_id": "63d78c0f8c9e31704437d6e2",
    - "userId": "63d7891e8c9e31704437d6db",
    - "name": "dress",
    - "description": "A Black dress ",
    - "category": "women's",
    - "price": 40,
    - "numberInStock": 5,
    - "picturePath": "clothes-4.jpg",
    - "comments": [],
    - "creationDate": "2023-01-30T09:21:19.175Z",
    - "createdAt": "2023-01-30T09:21:19.177Z",
    - "updatedAt": "2023-01-30T09:32:52.471Z",
    - "\_\_v": 0
    }

---

10. ### Delete a product
   #### DELETE => localhost:5000/products/:productId/delete (token Bearer)
   #### res
   {
   - "\_id": "63d78c0f8c9e31704437d6e2",
   - "userId": "63d7891e8c9e31704437d6db",
   - "name": "dress",
   - "description": "A Black dress ",
   - "category": "women's",
   - "price": 40,
   - "numberInStock": 5,
   - "picturePath": "clothes-4.jpg",
   - "comments": [],
   - "creationDate": "2023-01-30T09:21:19.175Z",
   - "createdAt": "2023-01-30T09:21:19.177Z",
   - "updatedAt": "2023-01-30T09:32:52.471Z",
   - "\_\_v": 0
   }

---

11. ### Comment on a product
   #### Post => localhost:5000/products/:productId/comment (token Bearer)
   #### req
   {
   - "name": user.firstName,
   - "picturePath": user.picturePath,
   - "body": "thay's a very cool dress"
   }

   ---

   #### res:
   {
   - "user": "63d7894d8c9e31704437d6dd",
   - "name": user.firstName,
   - "picturePath": user.picturePath,
   - "body": "thay's a very cool dress, i am dodo",
   - "\_id": "63d78fcc8c9e31704437d6ee",
   - "date": "1675071436896",
   - "\_\_v": 0
   }

---

12. ### Delete a comment on a product
    #### DELETE => localhost:5000/products/productId/comment/:commentId/delete (token Bearer)
    #### res:
   {
   - "user": "63d7894d8c9e31704437d6dd",
   - "name": user.firstName,
   - "picturePath": user.picturePath,
   - "body": "thay's a very cool dress, i am dodo",
   - "\_id": "63d78fcc8c9e31704437d6ee",
   - "date": "1675071436896",
   - "\_\_v": 0
   }
---

13. ### Send a message to another user
    #### POST => localhost:5000/users/user/recieverId/message (token Bearer)
    #### req
    {
    - "toName": "dodo",
    - "toPicturePath": "pic-4.png",
    - "fromName": "mido",
    - "fromPicturePath": "pic-3.png",
    - "body": " dodo it's me didi?"
    }

    --- 

    #### res
    {
    - "toId": "6409c56fb6a1a74bd2eda443",
    - "toName": "dodo",
    - "toPicturePath": "pic-4.png",
    - "fromId": "6409c9f86e0083484b0f6d65",
    - "fromName": "mido",
    - "fromPicturePath": "pic-3.png",
    - "body": " dodo it's me didi?"
    - "\_id": "63d791608c9e31704437d6f2",
    - "date": "1675071840695",
    - "\_\_v": 0
    }

---

14. ### Delete a message
    #### DELETE => localhost:5000/users/user/message/:messageId/delete (token Bearer)
    #### res
    {
    - "toId": "6409c56fb6a1a74bd2eda443",
    - "toName": "dodo",
    - "toPicturePath": "pic-4.png",
    - "fromId": "6409c9f86e0083484b0f6d65",
    - "fromName": "mido",
    - "fromPicturePath": "pic-3.png",
    - "body": "hello",
    - "date": 1678526024182,
    - "_id": "640c478c72563581e80b6399",
    - "__v": 0
    }

---

15. ### Get a chat
    #### GET => localhost:5000/users/user/:receiverId/chat (token Bearer)
    #### res
    {
    - "_id": "640c478c72563581e80b639c",
    - "toId": "6409c56fb6a1a74bd2eda443",
    - "toName": "dodo",
    - "toPicturePath": "pic-4.png",
    - "fromId": "6409c9f86e0083484b0f6d65",
    - "fromName": "mido",
    - "fromPicturePath": "pic-3.png",
    - "messages": [
        - {
            - "toId": "6409c56fb6a1a74bd2eda443",
            - "toName": "dodo",
            - "toPicturePath": "pic-4.png",
            - "fromId": "6409c9f86e0083484b0f6d65",
            - "fromName": "mido",
            - "fromPicturePath": "pic-3.png",
            - "body": "hello",
            - "date": 1678526024182,
            - "_id": "640c478c72563581e80b6399",
            - "__v": 0
        },
        - {
            - "toId": "6409c9f86e0083484b0f6d65",
            - "toName": "mido",
            - "toPicturePath": "pic-3.png",
            - "fromId": "6409c56fb6a1a74bd2eda443",
            - "fromName": "dodo",
            - "fromPicturePath": "pic-4.png",
            - "body": "hello",
            - "date": 1678526024182,
            - "_id": "640c5d4d72563581e80b6491",
            - "__v": 0
        }
    ],
    - "date": "1678526348504",
    - "__v": 0
}

---

16. ### Get all my chats
    #### GET => localhost:5000/users/chats (token Bearer)
    #### res
    [
    - {
        - "_id": "6409da2342119e05759ef317",
        - "toId": "6409c8116e0083484b0f6d42",
        - "toName": "didi",
        - "toPicturePath": "pic-2.png",
        - "fromId": "6409c56fb6a1a74bd2eda443",
        - "fromName": "dodo",
        - "fromPicturePath": "pic-4.png",
        - "messages": [
            - {
                - "toId": "6409c8116e0083484b0f6d42",
                - "toName": "didi",
                - "toPicturePath": "pic-2.png",
                - "fromId": "6409c56fb6a1a74bd2eda443",
                - "fromName": "dodo",
                - "fromPicturePath": "pic-4.png",
                - "body": "hi",
                - "_id": "6409da2342119e05759ef314",
                - "date": "2023-03-09T13:07:47.612Z",
                - "__v": 0
            },
            - {
                - "toId": "6409c56fb6a1a74bd2eda443",
                - "toName": "dodo",
                - "toPicturePath": "pic-4.png",
                - "fromId": "6409c8116e0083484b0f6d42",
                - "fromName": "didi",
                - "fromPicturePath": "pic-2.png",
                - "body": " we should meet",
                - "date": 1678367373472,
                - "_id": "6409df9b4a848444d662f704",
                - "__v": 0
            },
        ],
        - "date": "1678367267938",
        - "__v": 0
    },
    - {
        - "_id": "640c478c72563581e80b639c",
        - "toId": "6409c56fb6a1a74bd2eda443",
        - "toName": "dodo",
        - "toPicturePath": "pic-4.png",
        - "fromId": "6409c9f86e0083484b0f6d65",
        - "fromName": "mido",
        - "fromPicturePath": "pic-3.png",
        - "messages": [
            - {
                - "toId": "6409c56fb6a1a74bd2eda443",
                - "toName": "dodo",
                - "toPicturePath": "pic-4.png",
                - "fromId": "6409c9f86e0083484b0f6d65",
                - "fromName": "mido",
                - "fromPicturePath": "pic-3.png",
                - "body": "hello",
                - "date": 1678526024182,
                - "_id": "640c478c72563581e80b6399",
                - "__v": 0
            },
            - {
                - "toId": "6409c9f86e0083484b0f6d65",
                - "toName": "mido",
                - "toPicturePath": "pic-3.png",
                - "fromId": "6409c56fb6a1a74bd2eda443",
                - "fromName": "dodo",
                - "fromPicturePath": "pic-4.png",
                - "body": "hello",
                - "date": 1678526024182,
                - "_id": "640c5d4d72563581e80b6491",
                - "__v": 0
            }
        ],
        - "date": "1678526348504",
        - "__v": 0
    }
]


