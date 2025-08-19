import Section from './Section';

export default function CourseLayout({
  children,
  sidebar,
  background,
  contentColSize = 'col-lg-8',
  sidebarColSize = 'col-lg-4',
}) {
  return (
    <Section background={background}>
      <div className="row">
        <div className={contentColSize}>{children}</div>
        {sidebar && <div className={sidebarColSize}>{sidebar}</div>}
      </div>
    </Section>
  );
}
