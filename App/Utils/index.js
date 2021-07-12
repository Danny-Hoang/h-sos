import { defaults } from "lodash";
import { PhoneNumberUtil } from "google-libphonenumber";
import { Image, PermissionsAndroid } from 'react-native';
import Constants from "../Constants";
import { Images } from "../Theme";
const phoneUtil = PhoneNumberUtil.getInstance();

export class CarerState { }
CarerState.PENDING = { value: "Pending" }
CarerState.ACCEPTED = { value: "Accepted" }
CarerState.EXPIRED = { value: "Expired" }
CarerState.REJECTED = { value: "Rejected" }


export function validateEmail(text) {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
        return false;
    }
    else {
        return true
    }
}

export function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}

export function secondsToMS(d) {
    d = Number(d);
    var m = Math.floor(d / 60);
    var s = Math.floor(d % 60);
    let mStr = m < 10 ? "0" + m : m
    let sStr = s < 10 ? "0" + s : s
    return mStr + ":" + sStr
}

export function isValidNumber(number, countryCode) {
    try {
        const parsedNumber = phoneUtil.parse(number, countryCode);
        return phoneUtil.isValidNumber(parsedNumber);
    } catch (err) {
        return false;
    }
};

export async function requestPermission(permission) {
    try {
        if (Platform.OS !== 'android') {
            return true
        }
        const granted = await PermissionsAndroid.request(
            permission
        )
        return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
        console.warn(err)
    }
}

export const SensorMode = {
    Low: "Low",
    Medium: "Medium",
    High: "High"
}

export const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export function getImage(type) {
    switch (type) {
        case Constants.TYPE_REMINDER.CUSTOME:
            return Images.icCustome;
        case Constants.TYPE_REMINDER.MEAL:
            return Images.icMeal;
        case Constants.TYPE_REMINDER.MEDICINE:
            return Images.icMedicine;
        case Constants.TYPE_REMINDER.HOSPITAL:
            return Images.icHospital;
        case Constants.TYPE_REMINDER.GENERAL:
            return Images.icGeneral;
        case Constants.TYPE_REMINDER.WORKOUT:
            return Images.icWorkout;
    }
}


export default {
    validateEmail, secondsToHms, secondsToMS, isValidNumber, requestPermission, CarerState, groupBy, getImage
}