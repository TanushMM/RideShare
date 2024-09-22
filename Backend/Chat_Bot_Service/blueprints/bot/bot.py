from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

bot_bp = Blueprint('bot', __name__)
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

chat_history = [{'role': 'user', 'content': """
                # RideShare Application User Documentation

## Introduction to the RideShare Application

The **RideShare application** is a revolutionary platform designed to connect passengers and drivers in an efficient manner. Developed with user experience in mind, this application aims to make commuting as seamless as possible through advanced technologies and user-friendly design principles. The primary objective of the application is to simplify the ride-booking process, allowing users to focus on their travel needs while guaranteeing they arrive safely and conveniently at their destinations.

### Key Benefits of the RideShare Application

1. **Convenience**: The application is designed for maximum user convenience. With just a few clicks, users can find a ride without any hassle. The application saves time by allowing quick access to location-based services.
   
2. **Real-time Tracking**: One of the highlights of the RideShare application is its real-time tracking feature. Passengers can track their rides in real-time, providing added safety and transparency throughout the ride experience. Users can see their driver’s location, estimated time of arrival, and any traffic updates along the route.

3. **Variety of Ride Options**: The application offers a broad spectrum of ride options suited to various preferences and budgets. Whether users want an economical option, a luxury vehicle, or larger capacity vehicles for groups, the app accommodates all types of transportation needs.

4. **User Feedback System**: Quality assurance is critical to maintaining high standards within the service. The application includes a user feedback system where passengers can rate their rides and drivers. This feedback loop helps the platform ensure the ongoing quality of services and maintains accountability among drivers.

5. **Secure Payment Options**: The RideShare application provides multiple secure payment methods to cater to diverse user backgrounds. This includes credit/debit cards, digital wallets, and in-app payment systems, ensuring a worry-free transaction process.

### Target Audience

The target audience for the RideShare application encompasses a wide demographic range, including:

- **Urban Commuters**: Individuals who regularly travel within cities for work or leisure. They require quick and reliable transportation, which the application provides.
- **Travelers**: Tourists looking for easy transportation options while exploring new cities. The app caters to their need for convenience and ease of use.
- **Individuals Without Personal Vehicles**: Those who do not own a car and rely on public or private transport for their daily commute. The RideShare app provides a modern alternative.
- **Event Attendees**: People attending events, concerts, or conferences who require flexible transportation options to and from venues.

By focusing on providing a safe, reliable, and user-friendly environment, the RideShare application aims to cater to diverse transportation needs across different demographics.

---

## User Onboarding Process

### Sign-Up Process

Creating an account for the RideShare application is designed to be straightforward and user-friendly. New users can sign up for the application using one of the following methods:

1. **Email Registration**: Users initiate the process by providing their email address, creating a secure password, and verifying their email via a confirmation link sent to their inbox.

2. **Phone Registration**: For users who prefer a mobile approach, signing up with a phone number is also an option. Users must enter their phone number and then verify their identity through a One-Time Password (OTP) sent via SMS.

3. **Social Media Sign-Up**: To accelerate the onboarding process, users can choose to sign up using their existing social media accounts such as Facebook, Google, or Twitter. This streamlining removes unnecessary steps and allows users to get started quickly.

### Authentication Flow

Once registration is complete, users can log into the RideShare application securely using their credentials. The application employs **JWT (JSON Web Token)** for authentication, which enhances security by ensuring that all sensitive actions are properly authorized. This system allows users to remain logged in securely, while their data is protected against unauthorized access. After successful login, users are directed to their personalized dashboards, where they can begin exploring the app’s features.

---

## Dashboard and Navigation

Upon logging into the application, users are welcomed to their **Dashboard**, which acts as the central hub for navigating through the various functionalities within the app.

### Dashboard Features

The dashboard is rich with valuable information and features that enhance the user experience:

- **Ride History**: This section allows users to view their past rides conveniently. Each entry includes essential details such as travel dates, destinations, fare costs, and driver information. Users can refer to ride history whenever needed, whether for reimbursement purposes or personal records.

- **Payment Settings**: Here, users can manage their payment methods with ease. Users have the ability to add new credit/debit cards, remove outdated or incorrect information, and set default payment methods for future rides.

- **Profile Management**: In this section, users can update their personal information. This includes changes to their name, profile picture, contact information, and other essential details. Regular updates help ensure that the user’s profile reflects the most current information.

### Navigation Patterns

To create a smooth user experience, the application employs intuitive navigation patterns. Users can quickly access various sections through the following:

- **Main Navigation Bar**: Located at the top of the dashboard, the main navigation bar includes links to essential functionalities, such as the home screen, ride search functionality, and access to user profile settings.

- **Sidebars**: For users with administrative accounts, sidebars provide easy access to additional features, such as ride monitoring tools, user management functionalities, and system settings, ensuring that admins have all necessary controls at their fingertips.

---

## Searching for a Ride

### Ride Search Interface

Searching for a ride is one of the core functionalities of the RideShare application. Users can initiate a ride search by entering their **pickup location** and **destination** in clearly marked text fields on the home screen. The application incorporates integration with Google Maps for an enhanced user experience.

1. **Enter Locations**: To find their desired rides, users begin by typing in their starting point and destination. The application uses the Google Places API to suggest potential locations in real-time, speeding up the input process and reducing user error.

2. **Adjust Filters**: To ensure they find the ride that best suits their needs, users can utilize filters to refine their search. Filter options may include vehicle type (e.g., standard, premium, SUV), price range, and the availability of special ride features within the app.

### Real-time Results and Map Integration

After entering their locations, the application works quickly to display available rides on an interactive map. Users benefit from the following features:

- **Driving Routes**: The application enables users to visualize the suggested route for their ride, providing clarity on the path the driver will take to reach the destination.

- **Traffic Conditions**: Live traffic data allows users to understand any potential delays or congestion along the route, assisting them in making informed decisions regarding their travel plans. 

- **Approximate Travel Time**: The app calculates and displays the estimated time of arrival (ETA) based on current traffic conditions, ensuring that users can plan accordingly.

---

## Ride Matching and Selection

### Ride Matching Algorithm

The RideShare application utilizes sophisticated **ride-matching algorithms** designed to connect users with suitable drivers efficiently. Factors that are considered include:

- **Proximity**: Drivers are prioritized based on their distance to the pickup location, optimizing ride response times.

- **Availability**: The algorithm takes into account driver availability, ensuring that users are matched with drivers who are ready to accept rides.

- **Driver Ratings**: Users can see driver ratings from previous passengers, which becomes part of the matching, helping to ensure that safe and customer-approved drivers are prioritized.

### Viewing and Selecting Rides

Prior to confirming a ride, users have the opportunity to review details that will inform their selection:

1. **View Driver Details**: Clicking on driver profiles allows users to review important driver information such as their name, rating, vehicle type, and license plate number. This transparency helps users feel more secure about their choice.

2. **Estimate Arrival Times and Costs**: Users can check the estimated fare for the selected ride based on the distance and time calculations. The built-in fare calculator provides additional details about the cost breakdown to eliminate any confusion.

### Confirming a Ride

After reviewing all necessary details, users can confirm their booking by following these steps:

1. **Review Ride Details**: A summary screen will showcase the chosen ride, driver, vehicle type, and total cost for the ride.

2. **Confirm Payment**: Depending on the user's saved payment method settings, the user can finalize their payment before officially booking the ride.

---

## Booking and Real-time Ride Tracking

### Booking a Ride

The booking process within the RideShare application is designed to be straightforward and user-friendly:

1. **Confirm Selected Ride**: After reviewing the ride details, users click the confirm button to proceed to the payment section.

2. **Payment Process**: The user selects their preferred payment method before confirming the booking officially.

### Real-time Ride Tracking

Once the ride is booked, the application allows users to track their vehicle's progress in real-time on the interactive map interface:

- **Driver Arrival Notifications**: Users receive push notifications alerting them when their driver is en route and when they are close to the pickup location.

- **ETAs and Route Adjustments**: The user can continuously view real-time updates on the driver’s route, including any changes due to traffic or weather conditions.

- **Ride Completion Alerts**: Once the ride is completed, users receive a notification indicating that they have reached their destination.

---

## Payment Process

### Available Payment Methods

The RideShare application offers users several secure payment options to facilitate their transactions. Users can choose from:

1. **Credit/Debit Cards**: Easily managed through the app, users can add multiple cards and select a default payment method for convenience.

2. **Digital Wallets**: If supported by the application, users can make payments via popular digital wallet options such as PayPal or Apple Pay.

3. **In-app Payment Systems**: Should the app provide its own payment integration, users can opt for this method to complete transactions smoothly.

### Managing Payment Methods

Users can easily manage their payment options through the app. The process involves:

1. **Navigating to Payment Settings**: Users tap on the **Payment Settings** option from their dashboard.

2. **Adding or Editing Information**: Users can add new payment methods or edit existing data. Removing outdated payment options is simplified to ensure users are not inconvenienced by incorrect information.

### Fare Breakdown

After a ride concludes, users receive a detailed fare breakdown for their records:

- **Base Fare**: The starting charge based on the type of ride.

- **Distance Traveled**: Charges based on the total distance the ride covered.

- **Additional Fees**: Any applicable tips or promotional discounts are clearly outlined to ensure transparency.

---

## Cancellation and Refund Policies

### Cancelling a Ride

Users may need to cancel a ride for various reasons. The cancellation process is simplified and involves the following steps:

1. **Navigate to Active Ride Section**: Users can go to the dashboard to view ongoing rides.

2. **Select Cancellation Option**: Users can click on the cancellation button for their active booking. 

### Refund Policy

While some rides can be canceled without penalties, cancellation fees may apply based on how soon the cancellation occurs relative to pickup time. The following considerations apply:

- Users are encouraged to review the cancellation policies outlined in the app, which clearly state the conditions and possible fees for any cancellations.

- Customers should be aware of the time frame for when fees apply—usually if the cancellation is executed within a few minutes prior to the driver's arrival at the pickup point.

---

## Notifications and Alerts

### Types of Notifications

The RideShare application keeps users informed through various notifications, ensuring they are always in the loop regarding their rides and offers available within the app:

1. **Ride Status Updates**: Real-time notifications provide information for ride confirmations, the arrival of drivers, and updates about ride completion.

2. **Promotional Offers**: Users may receive alerts for discounts, special promotions, or loyalty rewards that enhance their ride experience.

### Managing Notification Preferences

Users can customize their notification settings in their user profiles:

1. **Navigate to Settings**: Access the settings tab from the profile management section.

2. **Manage Preferences**: Users have the option to toggle between enabling or disabling push notifications and deciding on email alert preferences.

---

## User Profile Management

### Updating Profile Information 

Users can easily manage their profile settings to ensure all information is current and correct:

1. **Navigate to Profile Settings**: From the dashboard, users can locate the profile or account management section.

2. **Update Information**: Users can update personal information such as their name, email address, and profile picture. Keeping profile information accurate is essential for account security and communication.

### Security Settings

To enhance account security, the application provides various tools:

1. **Password Management**: Users can update their passwords regularly to maintain account security. Users are encouraged to set strong passwords that are difficult to guess.

2. **Two-Factor Authentication**: For added security, users may choose to enable two-factor authentication (2FA), which provides an additional layer of protection by requiring a one-time code sent to the user’s phone or email during login.

---

## Feedback and Ratings

### Rating Drivers

Feedback is an important component of enhancing user experience and maintaining ride quality:

- **Post-Ride Rating Prompt**: After every ride, users will be prompted to rate their experience on a scale of 1 to 5 stars. This rating contributes to building a reliable driver profile.

### Providing Feedback

Users can leave detailed comments and reviews regarding their ride experiences:

- **Specificity Encouraged**: Users are encouraged to provide specific feedback, as it can significantly impact future ride matching, enhancing the overall experience for both drivers and passengers.

### Viewing Feedback History

Users can revisit their past feedback under their ride history section to reflect on their rides and potentially aid them with future bookings:

- The feedback history allows users to see patterns in service and quality, influencing their choices in future rides.

---

## Support and Help Center

### Contacting Support

Users seeking assistance can access various methods for contacting support, including:

- **In-App Contact Forms**: Users can fill out a generic support contact form that may include specific issues they are facing.

- **Chat Support Services**: If integrated, live chat support is available to ensure users can receive help for urgent matters directly within the application.

### Help Center and FAQs

A comprehensive help center is available for users:

- **Frequently Asked Questions**: The help center includes common queries regarding app functionalities, account settings, payment processes, and troubleshooting guidance.

- **User Guides**: Step-by-step user guides assist in educating users about navigating the application effectively, allowing for a more empowered experience.

---

## User Flow Summary

### Overview

The user's journey through the RideShare application is strategically designed for simplicity and efficiency, allowing users to easily navigate each phase of the ride-booking process. The key stages include:

1. **Sign-Up/Login**: New users create an account or returning users log in.
   
2. **Dashboard Access**: Following login, users are directed to their dashboard, the centralized hub for navigation.

3. **Search for Rides**: Users enter pickup locations and destination details to initiate ride searches.

4. **Ride Selection**: Users can view, filter, and select their preferred rides based on their needs.

5. **Booking Confirmation**: After reviewing ride specifics, users confirm bookings and proceed to payment.

6. **Real-time Tracking**: The application allows users to track their booked rides until they reach the destination.

7. **Fare Payment**: After the ride is complete, users complete their payment and receive fare breakdowns.

8. **Rating and Feedback**: Post-ride, users provide ratings and feedback on their experiences.

### Key Decision Points

During their journey, users encounter critical decision points that impact their ride experiences:

- **Ride Preferences**: Users must select from various ride types, factoring in cost, travel time, and driver ratings when making their decisions.

- **Providing Feedback**: The choices made during feedback and rating phases can consequently influence future rides for themselves and others, fostering an environment of quality service.

---

## Additional Context

The RideShare application integrates advanced services that contribute to an exceptional user experience, such as Google Maps for navigation, ensuring efficient routes, and a potential virtual assistant for 24/7 user support. By implementing a **JWT-based authentication system**, users experience secure access to their accounts, safeguarding personal data and enhancing confidence in the application’s usage.

Through generative AI and machine learning, the platform can adapt and customize the user experience based on initial preferences and ride history, optimizing ride matching and enhancing users' journeys over time. 

In conclusion, the RideShare application provides a comprehensive solution for modern transportation needs. By blending convenience with robust technology, it guarantees an exceptional user experience through the entire ride-sharing process. This user documentation serves as a guiding resource, enabling users to fully leverage the app's capabilities and enjoy the benefits of a connected ride-share experience. 

The RideShare application is not just a means of transportation; it is a gateway to exploring cities more deeply, creating opportunities for connections, and ensuring safety and reliability for every journey taken.

                """}]

def chatbot_response(user_query, chat_history):
    prompt = f"based on the above present document document, Provide a helpful response to the following user query: {user_query}"

    messages = [{"role": "system", "content": "You are a helpful assistant."}] + chat_history + [{"role": "user", "content": prompt}]
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        max_tokens=2500
    )
    
    return response

@bot_bp.route('/chat', methods=['POST'])
# @jwt_required()
def chat():
    try:
        data = request.json
        user_message = data.get('text')

        response = chatbot_response(user_message, chat_history)
        bot_message = response.choices[0].message.content

        chat_history.append({"role": "user", "content": user_message})
        chat_history.append({"role": "assistant", "content": bot_message})

        return jsonify({'data': bot_message}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
