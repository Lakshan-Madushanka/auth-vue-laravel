


# Vue authentication system with a Laravel backend
This is a front-end-focused project that demonstrates how to use vue.js in commercial projects with advanced features.
This project has two versions of vue.js that are **Optional API** and **Composition API**. Each has its branch.

## Services
Following services has been used to develop the front-end.
- **Vue-Router** 
- **Vuex**
- **Vuelidate**

## Features
- **Authentcation**
  - Login|Register|Email Verify|Password Reset

- **Global Error Handler**
- **Global State Management (Vuex)**
- **Routing (with route guards)**
- **Form Valdation (Vuelidate)**


## Usage

### Setup back-end
1). Clone the back-end from the back-end branch.
3). copy .env.example into env file.
2). Run the below command.
```
composer install
php artisan key:generate
php artisan serve
```
### Setup back-end

1). Clone one of the front-end from the front-end branch.
 2). Run the below commands
 ```
 npm install
 npm run serve
 ```
 Make sure back-end and front-end run in the same domain. (Port address can be changed.)
 API address can be changed in the main.js file located in the router folder.
## Screenshots
![loading](https://user-images.githubusercontent.com/47297673/155713952-ffa59af1-8bc6-4294-8d93-e86e2e57fabc.PNG)
![auth](https://user-images.githubusercontent.com/47297673/155713942-8687ee65-8391-4ba0-9717-24f1b67f4c88.PNG)
![auth loading](https://user-images.githubusercontent.com/47297673/155713955-20987d51-7102-46a6-aefa-e44065087a60.PNG)
![Error](https://user-images.githubusercontent.com/47297673/155713951-d4ed369b-e6be-41ee-921d-4ba17e77bf5b.PNG)
![success](https://user-images.githubusercontent.com/47297673/155713954-9f85fee2-39fd-45f0-8430-2d13bca7dfa3.PNG)

