import contactInfoIcon from "./images/contact-info.svg";
import healthInfoIcon from "./images/health-info.svg";
import financialInfoIcon from "./images/financial-info.svg"
import locationIcon from "./images/location.svg"
import sensitiveInfoIcon from "./images/sensitive-info.svg"
import contactsIcon from "./images/contacts.svg"
import userContentIcon from "./images/user-content.svg"
import browserHistoryIcon from "./images/browsing-history.svg"
import searchHistoryIcon from "./images/search-history.svg"
import identifiersIcon from "./images/identifiers.svg"
import purchasesIcon from "./images/purchase-history.svg"
import usageDataIcon from "./images/usage-data.svg"
import diagnosticsIcon from "./images/diagnostics.svg"
import otherDataIcon from "./images/other-data.svg"

export const purposeOrderList = [
    "Third-Party Advertising", "Developer's Advertising or Marketing", "Analytics",
    "Product Personalization", "App Functionality", "Other Purposes"
]

export const purposeLabelMapping = {
    "Third-Party Advertising": "Such as displaying third-party ads in your app, or sharing data with entities who display third-party ads",
    "Developer's Advertising or Marketing": "Such as displaying first-party ads in your app, sending marketing communications directly to your users, or sharing data with entities who will display your ads",
    "Analytics": "Using data to evaluate user behavior, including to understand the effectiveness of existing product features, plan new features, or measure audience size or characteristics",
    "Product Personalization": "Customizing what the user sees, such as a list of recommended products, posts, or suggestions",
    "App Functionality": "Such as to authenticate the user, enable features, prevent fraud, implement security measures, ensure server up-time, minimize app crashes, improve scalability and performance, or perform customer support",
    "Other Purposes": "Any other purpose not listed"
}

export const dataCategoryPluralFormMapping = {
    "Name": "names",
    "Email Address": "email addresses",
    "Phone Number": "phone numbers",
    "Physical Address": "physical addresses",
    "Other User Contact Info": "other user contact info",
    "Health": "health data",
    "Fitness": "fitness data",
    "Payment Info": "payment info",
    "Credit Info": "credit info",
    "Other Financial Info": "other financial info",
    "Precise Location": "precise location data",
    "Coarse Location": "coarse location data",
    "Sensitive Info": "sensitive info",
    "Contacts": "contacts",
    "Emails or Text Messages": "emails or text messages",
    "Photos or Videos": "photos or videos",
    "Audio Data": "audio data",
    "Gameplay Content": "gameplay content",
    "Customer Support": "customer support data",
    "Other User Content": "other user content",
    "Browsing History": "browsing history data",
    "Search History": "search history data",
    "User ID": "user IDs",
    "Device ID": "device IDs",
    "Purchase History": "purchase history data",
    "Product Interaction": "product interaction data",
    "Advertising Data": "advertising data",
    "Other Usage Data": "other usage data",
    "Crash Data": "crash data",
    "Performance Data": "performance data",
    "Other Diagnostic Data": "other diagnostic data",
    "Other Data Types": "other data"
}

export const dataTypeOrderList = ["Contact Info", "Health & Fitness", "Financial Info", "Location", "Sensitive Info",
    "Contacts", "User Content", "Browsing History", "Search History", "Identifiers", "Purchases", "Usage Data",
    "Diagnostics", "Other Data"]

export const dataTypeCategoryMapping = {
    "Contact Info": ["Name", "Email Address", "Phone Number", "Physical Address", "Other User Contact Info"],
    "Health & Fitness": ["Health", "Fitness"],
    "Financial Info": ["Payment Info", "Credit Info", "Other Financial Info"],
    "Location": ["Precise Location", "Coarse Location"],
    "Sensitive Info": ["Sensitive Info"],
    "Contacts": ["Contacts"],
    "User Content": ["Emails or Text Messages", "Photos or Videos", "Audio Data", "Gameplay Content", "Customer Support", "Other User Content"],
    "Browsing History": ["Browsing History"],
    "Search History": ["Search History"],
    "Identifiers": ["User ID", "Device ID"],
    "Purchases": ["Purchase History"],
    "Usage Data": ["Product Interaction", "Advertising Data", "Other Usage Data"],
    "Diagnostics": ["Crash Data", "Performance Data", "Other Diagnostic Data"],
    "Other Data": ["Other Data Types"]
}

export const dataTypeIconMapping = {
    "Contact Info": contactInfoIcon,
    "Health & Fitness": healthInfoIcon,
    "Financial Info": financialInfoIcon,
    "Location": locationIcon,
    "Sensitive Info": sensitiveInfoIcon,
    "Contacts": contactsIcon,
    "User Content": userContentIcon,
    "Browsing History": browserHistoryIcon,
    "Search History": searchHistoryIcon,
    "Identifiers": identifiersIcon,
    "Purchases": purchasesIcon,
    "Usage Data": usageDataIcon,
    "Diagnostics": diagnosticsIcon,
    "Other Data": otherDataIcon
}

export const dataCategoryTooltip = {
    "Name": "Such as first or last name",
    "Email Address": "Including but not limited to a hashed email address",
    "Phone Number": "Including but not limited to a hashed phone number",
    "Physical Address": "Such as home address, physical address, or mailing address",
    "Other User Contact Info": "Any other information that can be used to contact the user outside the app",
    "Health": "Health and medical data, including but not limited to from the Clinical Health Records API, HealthKit API, MovementDisorderAPIs, or health-related human subject research or any other user provided health or medical data",
    "Fitness": "Fitness and exercise data, including but not limited to the Motion and Fitness API",
    "Payment Info": "Such as form of payment, payment card number, or bank account number. If your app uses a payment service, the payment information is entered outside your app, and you as the developer never have access to the payment information, it is not Collected and does not need to be declared.",
    "Credit Info": "Such as credit score",
    "Other Financial Info": "Such as salary, income, assets, debts, or any other financial information",
    "Precise Location": "Information that describes the location of a user or device with the same or greater resolution as a latitude and longitude with three or more decimal places",
    "Coarse Location": "Information that describes the location of a user or device with lower resolution than a latitude and longitude with three or more decimal places, such as approximate location services",
    "Sensitive Info": "Such as racial or ethnic data, sexual orientation, pregnancy or childbirth information, disability, religious or philosophical beliefs, trade union membership, political opinion, genetic information, or biometric data",
    "Contacts": "Such as a list of contacts in the user's phone, address book, or social graph",
    "Emails or Text Messages": "Including subject line, sender, recipients, and contents of the email or message",
    "Photos or Videos": "The user's photos or videos",
    "Audio Data": "The user's voice or sound recordings",
    "Gameplay Content": "Such as user-generated content in-game",
    "Customer Support": "Data generated by the user during a customer support request",
    "Other User Content": "Any other user-generated content",
    "Browsing History": "Information about the content the user has viewed that is not part of the app, such as web sites.",
    "Search History": "Information about searches performed in the app",
    "User ID": "Such as screen name, handle, account ID, assigned user ID, customer number, probabilistic identifier, or other user- or account-level ID that can be used to identify a particular user or account",
    "Device ID": "Such as the device's advertising identifier, or other device-level ID",
    "Purchase History": "An account's or individual's purchases or purchase tendencies",
    "Product Interaction": "Such as app launches, taps, clicks, scrolling information, music listening data, video views, saved place in a game, video, or song, or other information about how the user interacts with the app",
    "Advertising Data": "Such as information about the advertisements the user has seen",
    "Other Usage Data": "Any other data about user activity in the app",
    "Crash Data": "Such as crash logs",
    "Performance Data": "Such as launch time, hang rate, or energy use",
    "Other Diagnostic Data": "Any other data collected for the purposes of measuring technical diagnostics related to the app",
    "Other Data Types": "Any other data types not mentioned"
};

