const profile = {
  first_name: "Sandbox",
  last_name: "User",
  email: "sandbox@example.com",
  mobile: "5556667788",
  mobile_prefix: "+966",
  is_email_verified: true,
  is_mobile_verified: true,
};

const countries = [
  {
    id: 1,
    name: "Saudi Arabia",
    phone_prefix: "+966",
    iso: "SA",
  },
  {
    id: 2,
    name: "United Arab Emirates",
    phone_prefix: "+971",
    iso: "AE",
  },
];

const cities = [
  {
    id: 1,
    name: "Riyadh",
  },
  {
    id: 2,
    name: "Jeddah",
  },
  {
    id: 3,
    name: "Dammam",
  },
];

const senderLocations = [
  {
    id: 1,
    name: "Sender Warehouse #1",
    mobile_prefix: "+966",
    mobile: "525452233",
    country: {
      id: 1,
      iso: "SA",
      name: "Saudi Arabia",
    },
    city: {
      id: 1,
      name: "Riyadh",
    },
    district: "Al-Khaznah",
    street_name: "Al-Khaznah",
    building_no: "123",
    zip_code: "12345",
  },
];

const customerLocations = [
  {
    id: 1,
    name: "Ahmed Ghilan",
    mobile_prefix: "+966",
    mobile: "5556665554",
    country: {
      id: 1,
      iso: "SA",
      name: "Saudi Arabia",
    },
    city: {
      id: 1,
      name: "Riyadh",
    },
    district: "This District",
    street_name: "That Street",
    building_no: "445",
    zip_code: "12345",
    short_address: "",
    is_new: false,
  },
  {
    id: 2,
    name: "Mohamed Ali",
    mobile_prefix: "+966",
    mobile: "565564018",
    country: {
      iso: "SA",
      name: "Saudi Arabia",
    },
    city: {
      id: 2,
      name: "Jeddah",
    },
    district: "Another District",
    street_name: "This Street",
    building_no: "555",
    zip_code: "12345",
    short_address: "",
    is_new: false,
  },
];

//fetch all carriers and save in redux. no use for now
const allCarriers = [
  {
    id: 1,
    name: "Sab Express",
    name_ar: "صاب اكسبريس",
    code: "fdx",
    sort: 1,
    bg_hex: "F0F0F0",
    image_url: "https://cloud.shiptag.com/theme/carrier_images/fdx.svg",
  },
  {
    id: 2,
    name: "DHL",
    name_ar: "دي إتش إل",
    code: "sv",
    sort: 2,
    bg_hex: "F0F0F0",
    image_url: "https://cloud.shiptag.com/theme/carrier_images/sv.svg",
  },
];

//show in step 2 of new order page
const carrierRates = [
  {
    name: "DHL",
    code: "sv",
    image_url: "https://cloud.shiptag.com/theme/carrier_images/sv.svg",
    price: "33.00",
    description: "2-4 Business Days",
    badge: "Recommended",
    attributes: {}, //doorstep, pickup, cold storage, etc.
  },

  {
    name: "J&T Express",
    code: "jt",
    image_url: "https://cloud.shiptag.com/theme/carrier_images/jt.svg",
    price: "21.61",
    description: "4-7 Business Days",
    badge: "",
    attributes: {}, //doorstep, pickup, cold storage, etc.
  },
];

const pickupMethods = [
  {
    key: "pickup",
    title: "Pickup",
  },
  {
    key: "dropoff",
    title: "Dropoff",
  },
  {
    key: "locker",
    title: "Locker",
  },
];

const serviceTypes = [
  {
    key: "all",
    title: "All",
  },
  {
    key: "economy",
    title: "Economy",
  },
  {
    key: "express",
    title: "Express",
  },
  {
    key: "locker",
    title: "Locker",
  },
  {
    key: "same-day",
    title: "Same Day",
  },
];

const bill = [
  {
    title: "Shipping Fee",
    price: "18.99",
  },
  {
    title: "Available Balance",
    price: "18.99",
    suffix: "Wallet",
    description: "You have 18.99 SAR in your wallet",
  },
  {
    title: "Subtotal",
    price: "18.99",
    description: "You have 18.99 SAR in your wallet",
    className: "text-success-500 dark:text-success-300",
  },
];

const order = {
  customer: customerLocations[0],
  sender: senderLocations[0],
  country: "Saudi Arabia",
  bill: bill,
  carrier: "sv",
  pickup_method: "pickup",
  service_type: "economy",
  is_cod: true,
  description: "This is a description",
  declared_value: 1000,
  packages: [
    {
      id: 1,
      weight: 1,
      width: 10,
      height: 10,
      length: 10,
    },
  ],
  platform: "ShipTag",
  platform_order_id: "ST123456",
  create_time: "2025-05-21 12:00:00",
  payment_status: "unpaid",
  shipment_status: "preparing",
  total_amount: 25.55,
  total_weight: "2 KG",
  links: {
    label: "https://cloud.shiptag.com/theme/carrier_images/sv.svg",
    receipt: "https://cloud.shiptag.com/theme/carrier_images/sv.svg",
    commercial_invoice: "https://cloud.shiptag.com/theme/carrier_images/sv.svg",
    tracking: "https://cloud.shiptag.com/theme/carrier_images/sv.svg",
  },
  actions: {
    can_cancel: false,
    can_request_cancellation: true,
  },
};

export default {
  profile,
  countries,
  cities,
  senderLocations,
  customerLocations,
  allCarriers,
  carrierRates,
  pickupMethods,
  serviceTypes,
  bill,
  order,
};
