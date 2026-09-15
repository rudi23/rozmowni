// Dopełnione do szerokości `total`, bo GA4 sortuje etykiety leksykalnie:
// 'question 02' musi wypaść przed 'question 10' także przy >99 pytaniach.
const paddedQuestion = (question, total) =>
  String(question).padStart(String(total).length, '0');

export const HOME_BANNER_CLICK_TEST = {
  category: 'Home',
  action: 'Click',
  label: 'Banner - test',
};
export const HOME_BANNER_CLICK_LEARN_MORE = {
  category: 'Home',
  action: 'Click',
  label: 'Banner - learn more',
};
export const HOME_SOCIAL_PROOF_CLICK_TEST = {
  category: 'Home',
  action: 'Click',
  label: 'Social proof - test',
};
export const HOME_TEST_BENEFITS_CLICK_TEST = {
  category: 'Home',
  action: 'Click',
  label: 'Test benefits - test',
};
export const HOME_FAQ_CLICK_TEST = {
  category: 'Home',
  action: 'Click',
  label: 'FAQ - test',
};
export const HOME_FAQ_CLICK_CONTACT = {
  category: 'Home',
  action: 'Click',
  label: 'FAQ - contact',
};
export const HOME_FINAL_CTA_CLICK_TEST = {
  category: 'Home',
  action: 'Click',
  label: 'Final CTA - test',
};
export const HOME_WHY_US_EXPANDED_BOTTOM_CLICK_TEST = {
  category: 'Home',
  action: 'Click',
  label: 'Why us expanded - test bottom',
};

export const OPINIONS_CLICK_GOOGLE_REVIEWS = (path) => ({
  category: 'Opinions',
  action: 'Click',
  label: `Google reviews from '${path}'`,
});

export const INDIVIDUAL_COURSE_CLICK_ENROLL = {
  category: 'Individual course',
  action: 'Click',
  label: 'Enroll',
};
export const INDIVIDUAL_COURSE_CLICK_TEST = {
  category: 'Individual course',
  action: 'Click',
  label: 'New semester - test',
};

export const GROUP_COURSE_CLICK_ENROLL = {
  category: 'Group course',
  action: 'Click',
  label: 'Enroll',
};

export const EXAM_8_COURSE_CLICK_ENROLL = {
  category: '8 class exam course',
  action: 'Click',
  label: 'Enroll',
};

export const MATURA_EXAM_COURSE_CLICK_ENROLL = {
  category: 'Matura exam course',
  action: 'Click',
  label: 'Enroll',
};

export const ABOUT_CLICK_TEST = {
  category: 'About us',
  action: 'Click',
  label: 'Trial lesson - test',
};

export const PRICING_CLICK_ENROLL = (courseName) => ({
  category: 'Pricing',
  action: 'Click',
  label: `Enroll - ${courseName}`,
});

export const HOLIDAY_COURSE_CLICK_BANNER = {
  category: 'Holiday course',
  action: 'Click',
  label: 'Banner',
};
export const HOLIDAY_COURSE_CLICK_CONTACT = {
  category: 'Holiday course',
  action: 'Click',
  label: 'Contact page',
};
export const HOLIDAY_COURSE_CLICK_EMAIL = {
  category: 'Holiday course',
  action: 'Click',
  label: 'Contact email',
};
export const HOLIDAY_COURSE_CLICK_PHONE = {
  category: 'Holiday course',
  action: 'Click',
  label: 'Contact phone',
};

export const COURSE_REQUIREMENTS_CLICK_PLATFORM = (platform, path) => ({
  category: 'Course requirements',
  action: 'Click',
  label: `${platform} from '${path}'`,
});

export const TEST_START = (testType) => ({
  category: 'Test',
  action: 'Start',
  label: testType,
});
export const TEST_PROGRESS = (testType, question, total) => ({
  category: 'Test',
  action: 'Progress',
  label: `${testType} - question ${paddedQuestion(question, total)}/${total}`,
});
export const TEST_COMPLETED = (testType) => ({
  category: 'Test',
  action: 'Complete',
  label: testType,
});
export const TEST_CONTACT_DETAILS_SENT = (testType) => ({
  category: 'Test',
  action: 'Send',
  label: testType,
});

export const CONTACT_SEND_FORM = {
  category: 'Contact',
  action: 'Send',
  label: 'Form',
};
export const CONTACT_CLICK_FB = {
  category: 'Contact',
  action: 'Click',
  label: 'Facebook',
};
export const CONTACT_CLICK_FB_TEXT = {
  category: 'Contact',
  action: 'Click',
  label: 'Facebook in text',
};
export const CONTACT_CLICK_IG = {
  category: 'Contact',
  action: 'Click',
  label: 'Instagram',
};
export const CONTACT_CLICK_IG_TEXT = {
  category: 'Contact',
  action: 'Click',
  label: 'Instagram in text',
};
export const CONTACT_CLICK_TIKTOK = {
  category: 'Contact',
  action: 'Click',
  label: 'TikTok',
};
export const CONTACT_CLICK_TIKTOK_TEXT = {
  category: 'Contact',
  action: 'Click',
  label: 'TikTok in text',
};
export const CONTACT_CLICK_LINKEDIN = {
  category: 'Contact',
  action: 'Click',
  label: 'LinkedIn',
};
export const CONTACT_CLICK_PHONE = {
  category: 'Contact',
  action: 'Click',
  label: 'Phone',
};
export const CONTACT_CLICK_EMAIL = {
  category: 'Contact',
  action: 'Click',
  label: 'Email',
};

export const FOOTER_CLICK_FB = {
  category: 'Footer',
  action: 'Click',
  label: 'Facebook',
};
export const FOOTER_CLICK_IG = {
  category: 'Footer',
  action: 'Click',
  label: 'Instagram',
};
export const FOOTER_CLICK_TIKTOK = {
  category: 'Footer',
  action: 'Click',
  label: 'TikTok',
};
export const FOOTER_CLICK_LINKEDIN = {
  category: 'Footer',
  action: 'Click',
  label: 'LinkedIn',
};
export const FOOTER_CLICK_EMAIL = {
  category: 'Footer',
  action: 'Click',
  label: 'Email',
};
export const FOOTER_CLICK_PHONE = {
  category: 'Footer',
  action: 'Click',
  label: 'Phone',
};
export const FOOTER_CLICK_TEST = {
  category: 'Footer',
  action: 'Click',
  label: 'Footer CTA - test',
};
export const FOOTER_CLICK_MENU_ITEM = (path) => ({
  category: 'Footer',
  action: 'Click',
  label: `Navigate to '${path}'`,
});

export const NAVIGATION_CLICK_LOGO = {
  category: 'Navigation',
  action: 'Click',
  label: 'Logo',
};
export const NAVIGATION_CLICK_FB = {
  category: 'Navigation',
  action: 'Click',
  label: 'Facebook',
};
export const NAVIGATION_CLICK_IG = {
  category: 'Navigation',
  action: 'Click',
  label: 'Instagram',
};
export const NAVIGATION_CLICK_TIKTOK = {
  category: 'Navigation',
  action: 'Click',
  label: 'TikTok',
};
export const NAVIGATION_CLICK_PHONE = {
  category: 'Navigation',
  action: 'Click',
  label: 'Phone',
};
export const NAVIGATION_CLICK_MENU_ITEM = (path) => ({
  category: 'Navigation',
  action: 'Click',
  label: `Navigate to '${path}'`,
});

export const COOKIE_CONSENT_CLICK_PRIVACY_POLICY = {
  category: 'Cookie consent',
  action: 'Click',
  label: 'Privacy policy',
};
