# SpiderDroid
An Airbnb for cars

# Roadmap
- [x] Deploy the core[:grin:] system on ~~qovery. https://zee97d88c-zb4b2caf0-gtw.qovery.io/~~ Heroku on custom domain with cloudFlare CDN.
- [X] Implement express-cors and allow qovery.io domain.
- [x] Complete Car details update system.
- [x] Complete Car scheduling system.
- [x] Complete Auth/reg/login/forgot password system.
- [x] Email system forgot password
- [x] Email system for scheduling and payments.
- [x] Rectify all UI issues -> templates/spacing etc..
- [x] Implement review System [User reviews].
- [x] Implement SSR on specific pages.
- [x] Implement apollo In-memory caching and cache invalidation for better performance

# TechStack
- Apollo server express for BackEnd.
- NextJS with ChakraUI for FrontEnd.
- Typescript.
- Redis DB for storing session and user tokens.
- Postgres for storing relational user and payment data.
- Powered by Heroku with CloudFlare CDN.
- Nodemailer for handling mails.

# Architecture

![Spider_Arch](https://user-images.githubusercontent.com/18285895/142775720-0976062e-495d-4088-81fc-1f0b0704bbb9.png)


# GraphQL Schema

The graphql api doc is generated using [graphdoc](https://github.com/2fd/graphdoc#readme) and can be found at [Spiderdroid GraphQL Spec](https://spiderdroid-schema.vercel.app/)

> Note: The documentation is still in-progress [Some comments might be missing].

