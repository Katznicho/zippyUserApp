/* eslint-disable prettier/prettier */
import { Dimensions, Platform, StatusBar } from "react-native";

export const LISTMARGIN = 10;
export const WIDTH = Dimensions.get("screen").width - LISTMARGIN * 2;
export const PHOTOS_STR = "photos";
export const AMENITIES_STR = "amenities";
export const DESCRIPTION_STR = "description";

const baseHeight = 160;
const iosNotch = 40;
const iosHeight = baseHeight + iosNotch;
let androidHeight = baseHeight;
let androidNotch = 0;
if (StatusBar.currentHeight) androidNotch = StatusBar.currentHeight;
androidHeight += androidNotch;

export const HEADERHEIGHT = Platform.OS === "ios" ? iosHeight : androidHeight;


export const BOTTOM_NOTCH = 10;


export const APP_GENDER = {
    MALE: 'Male',
    FEMALE: "Female"
}

export const PAYMENT_STATUS = {
    PENDING: "Pending",
    COMPLETED: "Completed",
    CANCELLED: "Failed",
    UNPAID: "UNPAID",
    CONFIRMED: "Confirmed",
    UNCONFIRMED: 'UnConfirmed'
}

export const PAYMENT_TYPE = {
    "Wallet": "Wallet",
    "Donation": "Donation",
    "Product": "Product",
    "Other": "Other",
    "Order": "Order"
}




export const DEFAULT_USER_PROFILE = "https://media.istockphoto.com/id/519078727/photo/male-silhouette-as-avatar-profile-picture.jpg?b=1&s=170667a&w=0&k=20&c=JzPsyMEFcdQp2UlFqLVeuOaj2bOpteXUWFR9FJzTnBM=";


//reuse storage

export const PUBLIC_STORAGE = "https://dashboard.zippyug.com/storage/app/public/"



export const PRIVACYPOLICY = `
Privacy Policy

1. Introduction

Welcome to Zippy Real Estate ("we," "us," or "our"). At Zippy Real Estate, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our website and services (collectively, the "Services"). By accessing or using the Services, you consent to the practices described in this Privacy Policy.

2. Information We Collect

We may collect the following types of personal information:

User-Provided Information: When you register an account, list a property, or communicate with us, you may provide personal information such as your name, email address, phone number, and property details.

Automatically Collected Information: We may collect information about your device and usage of the Services, including your IP address, device type, operating system, and interactions with the Services.

3. How We Use Your Information

We use the collected information for the following purposes:

To facilitate property listings, connections between buyers and sellers, and other real estate transactions.
To provide and improve our services, including personalized recommendations and content.
To communicate with you, respond to your inquiries, and provide customer support.
To send you important updates, newsletters, and promotional materials.
4. Sharing Your Information

We may share your information with:

Real Estate Partners: Your property listing information may be shared with potential buyers or tenants.

Service Providers: We may share your information with third-party service providers to help us operate the Services and provide our services.

Legal Requirements: We may disclose your information if required by law, to protect our rights, or in response to a legal request.

5. Security

We take reasonable measures to protect your personal information. However, no method of transmission over the internet or electronic storage is entirely secure. We cannot guarantee the absolute security of your information.

6. Your Choices

You may have certain rights regarding your personal information, including the right to access, correct, or delete your data. You can manage your preferences within your account settings.

7. Updates to this Privacy Policy

We may update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes through the Services or other means.

8. Contact Us

If you have any questions or concerns about this Privacy Policy, please contact us at [Insert Contact Information].

By using the Zippy Real Estate Services, you acknowledge that you have read and understood this Privacy Policy.
...
`;
export const ABOUTUS = `
Welcome to Zippy Real Estate!

At Zippy Real Estate, we're dedicated to simplifying the real estate experience for both property owners and seekers. Our platform serves as a dynamic marketplace where buyers, sellers, and renters can connect, making property transactions seamless and efficient.

Our Vision:
🏡 Simplifying Real Estate Transactions
Our vision is to streamline the real estate process by leveraging technology and providing a user-friendly platform. We believe that finding or selling a property should be straightforward and stress-free.

What We Offer:
🔍 Property Discovery
Zippy Real Estate offers a diverse range of properties, ensuring that you can find the perfect match for your needs. Whether you're looking for a cozy home, commercial space, or a rental property, our platform has you covered.

💼 Seller and Buyer Support
We empower sellers by providing them with the tools and exposure needed to showcase their properties to a wide audience. For buyers, we offer a rich selection of properties and helpful features to make the search process efficient.

Why Choose Zippy Real Estate:
✨ User-Friendly Platform: Our intuitive platform is designed to make property transactions straightforward and accessible.

🤝 Connecting Buyers and Sellers: Zippy Real Estate facilitates connections between buyers and sellers, fostering a collaborative and transparent real estate community.

🌟 Diverse Property Listings: Whether you're a first-time homebuyer or a seasoned investor, our platform caters to a variety of property needs.

Join us at Zippy Real Estate and experience a new era of real estate convenience. Whether you're listing a property or searching for your dream home, we're here to make the process enjoyable.

Get started today and discover the possibilities with Zippy Real Estate!
`;

export const SUPPORT_US = `
Welcome to Zippy Real Estate Support!

If you have any questions, concerns, or need assistance, our support team is here to help. At Zippy Real Estate, we are committed to providing excellent support to our community members.

### Contact Information:
- **Email:** [support@zippyrealestate.com](mailto:support@zippyrealestate.com)
- **Customer Support Line:** +1 (123) 456-7890

### How to Reach Us:
You can get in touch with our support team through email or by calling our customer support line. Whether you're a property owner, buyer, or just exploring our platform, we're here to assist you.

### Frequently Asked Questions (FAQs):
Before reaching out to our support team, you might find answers to common questions in our [FAQ section](/faq). We've compiled a list of inquiries to provide quick solutions to common issues.

### Technical Support:
If you encounter any technical issues while using our platform, please don't hesitate to contact our technical support team. They are available to help you with any technical challenges you may face.

### General Inquiries:
For general inquiries about our platform, services, or how to get started, feel free to send us an email or give us a call. We value your input and are happy to provide information about Zippy Real Estate.

### Feedback and Suggestions:
Your feedback is important to us. If you have suggestions for improving our platform or ideas on how we can better serve our community, please let us know. We are always eager to hear from you.

Thank you for being a part of the Zippy Real Estate community. We appreciate your support and look forward to assisting you with any inquiries or support needs you may have.

Join us in creating a better real estate experience for everyone!

Get in touch with Zippy Real Estate Support today!
`;






