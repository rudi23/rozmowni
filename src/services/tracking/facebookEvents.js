// Meta's vocabulary is worth matching exactly, because its campaign UI suggests
// `Lead` by default: that event has to mean "handed over contact details", which
// is the form on the results screen, not finishing the questions. Optimising
// against it then buys real contacts rather than abandoned quizzes. Completing
// the test is the registration step that leads there, so it carries
// `CompleteRegistration`.
export const TEST_COMPLETED = (selectedTest) => ({
  name: 'CompleteRegistration',
  data: {
    content_name: 'Test poziomujący',
    content_category: selectedTest,
  },
});

export const TEST_CONTACT_DETAILS_SUBMITTED = (selectedTest) => ({
  name: 'Lead',
  data: {
    content_name: 'Test poziomujący',
    content_category: selectedTest,
  },
});
