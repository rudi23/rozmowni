/*
 * Shared look for every email we send.
 * Mirrors the site tokens — same brand colours, same 8px / 16px radii,
 * same three buttons — written as literals because email clients do not
 * support CSS custom properties.
 */

const colors = {
  navy: '#07294d',
  teal: '#0f8d8c',
  tealDark: '#0c6b6a',
  tealTint: '#e8f5f5',
  orange: '#ff6b35',
  orangeDark: '#e55a2b',
  cream: '#ffefd5',
  surface: '#ffffff',
  surfaceAlt: '#f5f7fa',
  line: '#e9ecef',
  text: '#535967',
  textMuted: '#6c7787',
};

const radius = {
  control: '8px',
  card: '16px',
};

const fontStack =
  'Mulish,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
const headingStack =
  'Montserrat,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';

const main = {
  backgroundColor: colors.surfaceAlt,
  fontFamily: fontStack,
  margin: '0',
  padding: '0',
};

const container = {
  backgroundColor: colors.surface,
  margin: '0 auto',
  padding: '0 0 40px',
  marginBottom: '40px',
  maxWidth: '600px',
  width: '100%',
};

const header = {
  padding: '32px 40px 0',
  textAlign: 'center',
};

const logo = {
  margin: '0 auto',
  display: 'block',
  maxWidth: '100%',
  height: 'auto',
};

const content = {
  padding: '0 40px',
};

const h1 = {
  color: colors.navy,
  fontFamily: headingStack,
  fontSize: '26px',
  fontWeight: 'bold',
  lineHeight: '1.25',
  margin: '8px 0 16px',
  padding: '0',
};

const h2 = {
  color: colors.navy,
  fontFamily: headingStack,
  fontSize: '20px',
  fontWeight: 'bold',
  lineHeight: '1.3',
  margin: '0 0 16px',
  padding: '0',
};

const h3 = {
  color: colors.navy,
  fontFamily: headingStack,
  fontSize: '17px',
  fontWeight: 'bold',
  lineHeight: '1.3',
  margin: '32px 0 12px',
  padding: '0',
};

const text = {
  color: colors.text,
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 14px',
};

const textMuted = {
  ...text,
  color: colors.textMuted,
  fontSize: '14px',
  lineHeight: '22px',
};

// One card. White, hairline border, 16px corners.
const card = {
  backgroundColor: colors.surface,
  border: `1px solid ${colors.line}`,
  borderRadius: radius.card,
  padding: '24px',
  margin: '24px 0',
};

// A quiet block for something worth pausing on.
const cardTinted = {
  backgroundColor: colors.tealTint,
  border: `1px solid ${colors.line}`,
  borderRadius: radius.card,
  padding: '24px',
  margin: '24px 0',
};

const cardSubtle = {
  backgroundColor: colors.surfaceAlt,
  border: `1px solid ${colors.line}`,
  borderRadius: radius.card,
  padding: '24px',
  margin: '24px 0',
};

// Buttons: the primary action, then everything else.
const button = {
  backgroundColor: colors.orange,
  borderRadius: radius.control,
  color: '#ffffff',
  fontFamily: headingStack,
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '1.2',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  padding: '16px 28px',
  margin: '8px 0 0',
};

const buttonSecondary = {
  ...button,
  backgroundColor: colors.navy,
};

const buttonBlock = {
  ...button,
  display: 'block',
  padding: '14px 20px',
  fontSize: '15px',
  margin: '0',
};

const buttonBlockSecondary = {
  ...buttonBlock,
  backgroundColor: colors.navy,
};

const link = {
  color: colors.tealDark,
  textDecoration: 'underline',
};

const actionColumnLeft = {
  width: '50%',
  paddingRight: '8px',
  verticalAlign: 'top',
};

const actionColumnRight = {
  width: '50%',
  paddingLeft: '8px',
  verticalAlign: 'top',
};

const listItem = {
  color: colors.text,
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 10px',
  paddingLeft: '18px',
  position: 'relative',
};

const hr = {
  borderColor: colors.line,
  margin: '24px 0',
};

const footer = {
  padding: '0 40px',
  textAlign: 'center',
};

const footerText = {
  color: colors.textMuted,
  fontSize: '13px',
  lineHeight: '20px',
  margin: '4px 0',
};

const footerLink = {
  color: colors.textMuted,
  textDecoration: 'underline',
};

const footerFine = {
  color: colors.textMuted,
  fontSize: '12px',
  lineHeight: '18px',
  margin: '14px 0 0',
};

export {
  colors,
  radius,
  fontStack,
  headingStack,
  main,
  container,
  header,
  logo,
  content,
  h1,
  h2,
  h3,
  text,
  textMuted,
  card,
  cardTinted,
  cardSubtle,
  button,
  buttonSecondary,
  buttonBlock,
  buttonBlockSecondary,
  actionColumnLeft,
  actionColumnRight,
  link,
  listItem,
  hr,
  footer,
  footerText,
  footerLink,
  footerFine,
};
