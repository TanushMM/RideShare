# RideShare Application - InnovateX_Crescent

**Hexaware Code & Rise Program**  
**Team Name:** InnovateX_Crescent  
**Prototype Status:** 70% - 75% Complete

## Table of Contents

- [Introduction](#introduction)
- [Team Information](#team-information)
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [System Architecture](#system-architecture)
- [Features and Functionalities](#features-and-functionalities)
- [Microservices Breakdown](#microservices-breakdown)
- [API Gateway](#api-gateway)
- [Design Diagrams](#design-diagrams)
- [Demo Video](#demo-video)

## Introduction

The **RideShare Application** aims to provide an efficient, user-friendly, and eco-friendly platform for ride-sharing. The application uses advanced AI algorithms for ride matching, dynamic pricing, and enhanced safety features, contributing to **sustainability**, **employee well-being**, and **social connectivity** within organizations.

This repository contains the complete source code for the **Frontend**, **Backend Microservices**, and **API Gateway** along with **Docker Compose** files for easy deployment. The application is currently in the prototype stage, with 70% to 75% functionality implemented.

---

## Team Information

- **Tanush M M** - [tanushmmofficial@gmail.com](mailto:tanushmmofficial@gmail.com)
- **Sirasudeen P** - [sirasudeenp@gmail.com](mailto:sirasudeenp@gmail.com)

Former Members (Inactive):

- Syed Fayaadh S
- Gouri Shankar Prusty P

---

## Project Overview

The **RideShare Application** offers a platform where users can carpool efficiently, reducing costs and contributing to a greener environment. The application is designed with a strong focus on the following aspects:

- **Smart Ride Matching** using AI algorithms.
- **Dynamic Pricing** based on real-time conditions.
- **Safety Features** such as real-time ride tracking and verified profiles.
- **Eco-Friendly Initiatives** like promoting carpooling and electric vehicles.

---

## Technologies Used

### Frontend

- **React** for building a responsive user interface.
- **MUI (Material-UI)** for design components.
- **Google Maps API** for real-time ride tracking and navigation.

### Backend

- **Python-Flask** for the backend microservices and API Gateway.
- **JWT (JSON Web Token)** for secure authentication.

### Database

- **MongoDB** for handling data storage.

### Deployment and Version Control

- **Docker** for containerization.
- **AWS (EC2, S3)** for hosting and file storage.
- **Git & GitHub** for version control.

### API Testing

- **Postman** for API testing

---

## System Architecture

The system is designed using a **microservices architecture** with separate services for user management, ride matching, payments, feedback, and notifications. An API Gateway manages all external requests and forwards them to appropriate microservices.

---

## Features and Functionalities

- **Intelligent Ride Matching**: Leverages AI to match riders with drivers based on their location and routes.
- **Dynamic Pricing**: Fares are calculated dynamically, factoring in demand, traffic, and ride duration.
- **Safety Features**: Includes real-time ride tracking, verified user profiles, and emergency options.
- **Real-Time Notifications**: Both users and drivers receive real-time notifications for booking confirmations, ride arrivals, and delays.
- **Feedback System**: A comprehensive feedback system for users to rate rides and provide comments.
- **Sustainability Initiatives**: Promotes carpooling and eco-friendly transportation methods like electric vehicles.

---

## Microservices Breakdown

### 1. **User Service**

- Handles user registration, login, and profile management.
- JWT-based authentication for secure access.

### 2. **Ride Matching Service**

- Matches drivers and passengers using geolocation data and AI-driven algorithms.

### 3. **Payment Service**

- Manages payments and transactions using RazorPay integration.

### 4. **Notification Service**

- Sends real-time notifications via email and push notifications.

### 5. **Feedback Service**

- Collects and processes user feedback to improve the service.

---

## API Gateway

- **Node.js**-based API Gateway to handle requests from the frontend.
- Forwards requests to appropriate microservices.
- Secures communication between frontend and backend using **JWT**.

---

## Design Diagrams

### Technical Design

![Technical Design](https://drive.google.com/file/d/10eB57ii-urwPUKy4khamz1o4XJZDOkcS/view?usp=drive_link)

### Functionality Design (User Flow)

![User Flow Design](https://drive.google.com/file/d/1PoS_FF3Hmpp-f5vyhjhojpVhaaoU0c6x/view?usp=drive_link)

### Functionality Design (Admin Flow)

![Admin Flow Design](https://drive.google.com/file/d/107C76lG9GUrr8KmwdN-uQMqk4obIqeaq/view?usp=drive_link)

---

## Demo Video

- **User Flow Demo**: [Watch Video](https://drive.google.com/file/d/1rmqCaoK6LPIpwwAWISSEtk_1uB6BX-BR/view?usp=drive_link)
- **Admin Flow Demo**: [Watch Video](https://drive.google.com/file/d/12LyQN0K3XMrUcAfedkIC1i9CkI6UxXt_/view?usp=drive_link)
- **Google Maps API Demo**: [Watch Video](https://drive.google.com/file/d/1QQPqGi97ONTn_39jr1FQieLBLYuLXhSL/view?usp=drive_link)

---
