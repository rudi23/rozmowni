export const routeNames = {
    HOME: 'HOME',
    WHY_US: 'WHY_US',
    ABOUT_US: 'ABOUT_US',
    PRICING: 'PRICING',
    INDIVIDUAL_COURSE: 'INDIVIDUAL_COURSE',
    GROUP_COURSE: 'GROUP_COURSE',
    EXAM_8_COURSE: 'EXAM_8_COURSE',
    MATURA_EXAM_COURSE: 'MATURA_EXAM_COURSE',
    CONTACT: 'CONTACT',
    PRIVACY_POLICY: 'PRIVACY_POLICY',
};

export const routeTitles = {
    [routeNames.HOME]: 'Home',
    [routeNames.WHY_US]: 'Why us',
    [routeNames.ABOUT_US]: 'About us',
    [routeNames.PRICING]: 'Pricing',
    [routeNames.INDIVIDUAL_COURSE]: 'Individual course',
    [routeNames.GROUP_COURSE]: 'Group course',
    [routeNames.EXAM_8_COURSE]: 'Exam for 8 class course',
    [routeNames.MATURA_EXAM_COURSE]: 'Matura exam course',
    [routeNames.CONTACT]: 'Contact',
    [routeNames.PRIVACY_POLICY]: 'Privacy policy',
};

export const routeMap = {
    [routeNames.HOME]: '/',
    [routeNames.WHY_US]: '/dlaczego-my',
    [routeNames.ABOUT_US]: '/o-nas',
    [routeNames.PRICING]: '/cennik',
    [routeNames.INDIVIDUAL_COURSE]: '/kursy/indywidualne',
    [routeNames.GROUP_COURSE]: '/kursy/grupowe',
    [routeNames.EXAM_8_COURSE]: '/kursy/egzamin-8-klasisty',
    [routeNames.MATURA_EXAM_COURSE]: '/kursy/egzamin-maturalny',
    [routeNames.CONTACT]: '/kontakt',
    [routeNames.PRIVACY_POLICY]: '/polityka-prywatnosci',
};

export function resolveRouteName(path) {
    return Object.entries(routeMap).find(([_key, value]) => value.startsWith(path))?.[0];
}
