import Accordion from './Accordion';

// Course-specific questions under the course copy. Accordion's default h4
// sits one level under the h3 section title.
export default function CourseFAQ({ id, items }) {
  return (
    <>
      <h3 className="course-section-title">Najczęstsze pytania</h3>
      <Accordion
        id={id}
        cards={items.map(({ question, answer }, index) => ({
          // Prefixed so the ids do not collide with the course-type accordion
          // on the same page.
          id: `faq-${index + 1}`,
          title: question,
          content: <p>{answer}</p>,
        }))}
      />
    </>
  );
}
