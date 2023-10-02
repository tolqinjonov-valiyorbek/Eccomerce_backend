const { getStorage } = require('firebase/storage');
const firebase = require('firebase/app');

const firebaseConfig = ({
    "type": "service_account",
    "project_id": "ecommerce-app-7fe4e",
    "private_key_id": "89e14bef5be83ee9ee25d221a3f0b145a0381e01",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6FaWXEenqZfKJ\naOAiJdNtx1TUbc7KmawQsBMeei7nVl4VVptty/KUXMNz58/hX8LAQLBcUoFVXIOm\nxB5sjPaaiC/NbK8ewkBUrs/4zdPhUk1Nnbaic6JVLVyevWGnojITi2wh9o37YJ9Y\negUbOM4od5tSnnlo4Y+fSaJoFH+XJertYBwUWHFNqX/lg0btmrnqwY6vb1pfgKEh\n8N7yJT5mKEHlwaYvX66i0FyDOjik6RP1EzzxwQ6/svP2mZQA5NwFUU5fP0byhwTo\n/f0BBqNT7qknrhDbxPTKHedXiNU0MPbodBSKHWseCp4CLamTrMbJDNDVqzjLrJe6\nVSu7s71fAgMBAAECggEADD5QXtg2481BX/kehiCnAJoU4sU2ze2+fHqZR3ASlfYA\nyragE2FP3KMd2QpviwyZ67xV3j0vdUZZAyf0OIAt2Y0MWB/GheeSBABcfqpMPo8D\ntw+hbJ7fF2ucpHUhb74kPVT3EGUAgoGg+llM7LWYGuGDvrPemR/+KyTVIrP2kSM4\nrnzKz8FTNjl+Cm1JVwK3An+fbpeY2TQJfT00+jzoPoOGQ6wTQK7bYXhR1WRtcuJ4\nayGbnMWJFGHjAQvQUgQ4jtIXOD3M0i86fYolQXfFmp+W4As15JJIdd5GOxqAWBrY\nWOhG5jOIUARQ25bLYHwepfFiDozvVJw/FsM7dUawgQKBgQDwhOBYmsZ0ccqbOgeN\nr7YGvQyRKnhY9Al1NTowcreGMKE8cTuWDEZls+MxmXR7oMJeiroOq9Y39MDqBLck\nXkxAYyoG39HxlV1Zjw03n0BQ65iOVlUPe4TsFau3i6p4e2LF1BtCNHSJG3KJRtbm\nmyPgOCG3Ie9gLpk7tFoResB3CQKBgQDGD9UtmDJYjTlbLPK2nKSy3niOfHktEWjD\nW+4enqnkLTq+vBpP+S13dZf0bemqiKsGTMfrZp75Wbr7DBPAB/dyIcI7ArDzhj5K\nLX6dvwrFNEIRVykoVcpr9hCT7gWUIwF1uZgAftYXeBuXWYTkvD7b/qF7i+XEkuOk\n/NGmVbiDJwKBgFef0Sv2lz5tBmcu6PmRfjtOPHnWgynFHnz4+04TPRFCPjuK9S5h\nInSC6M51HZ68npNa7xXRPKX+IRogxagWQqlidzkx6Yad5/hsyV/uQLw6WMXiZfLS\nCUcJThn8ZAqoyP9Rmuyvt5ULztp8WGaDNrrFOGNDlbXwxBqgRgAAPIYhAoGAcVkq\nRReu6GKaCoXkuYFX+E29bL3rk1E9RWBdHATtcXo4/mMkI9SUoqMXvXkRmtjwF4Dl\ngOCP5l/l1DqLKwDkKdsMDz1xC00uZME4jwqAHW/Ux5u8ICtI1xRRVHeJlcea1EbM\nqKvt1iyUjb9bgJQC3WASBmR/sEnoIcnWKX0xRU0CgYEAjnhmyy+cnyVN9IdWvQLb\ndhBhwm8ipL/oUu/sJoEsh6ycgffRXuL0eLYyA4c6hN1FDwQhGbOniwI5uLsR1qu4\nvQrV0GU85G2jegwqigiBJR1DM2Dixh0TqTDuzlkC44j6zbVugktdz6CfYJPzzgCb\n3OEuDo2407PuAUQCvHGPoS4=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-lhq4l@ecommerce-app-7fe4e.iam.gserviceaccount.com",
    "client_id": "107875754396262266547",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lhq4l%40ecommerce-app-7fe4e.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com",
    "storageBucket": "ecommerce-app-7fe4e.appspot.com"  // Firebase Storage uchun saqlash joyi nomi
});

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

module.exports = storage;
