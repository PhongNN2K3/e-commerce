import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox",
  client_id:
    "ARqJoRASpGsHRQI6gUUg8p3yNvh66gnQHmMNlvIMketOC0mzY99Onm-1nbJE-is84U8MqyEJdbtHJnxd",
  client_secret:
    "ECK80r0OQvvRt6aNZgyqIoP3lcXrd2MLqvp-hg3PCed7mWuYr11zaP8Ytu255Xs0Bkvblq1UaR17ecTo",
});

export default paypal;
