export const TEST_COMPLETED_LEAD = (selectedTest) => ({
  name: 'Lead',
  data: {
    content_name: 'Test poziomujący',
    content_category: selectedTest,
  },
});

export const TEST_CONTACT_DETAILS_SUBMITTED = (selectedTest) => ({
  name: 'CompleteRegistration',
  data: {
    content_name: 'Test poziomujący',
    content_category: selectedTest,
    status: true,
  },
});
