import LocalizedStrings from 'react-native-localization';
import * as english from './en.json'

export const originalStrings = {
    en: english,
}

let strings = new LocalizedStrings(originalStrings)

export default strings
