import { routeMap, routeNames } from '../../routes';

const baseUrl = 'https://rozmowni.pl';

const socialLinks = [
    'https://www.facebook.com/Rozmownipl-141305311401481',
    'https://www.instagram.com/rozmowni.pl/',
    'https://www.tiktok.com/@rozmowni.pl',
    'https://www.linkedin.com/in/ma%C5%82gorzata-rudowska-08a29a219',
];

const image = {
    url: 'https://rozmowni.pl/logo512.png',
    height: 512,
    width: 512,
    type: 'image/png', // MIME type of the image. One of image/jpeg, image/gif or image/png
};

const logo = {
    '@type': 'ImageObject',
    height: image.height,
    url: image.url,
    width: image.width,
};

const fallback = {
    title: 'Nauka języka przez Internet | Angielski online przez Skype, Zoom',
    description:
        'Praktyczne lekcje angielskiego z naciskiem na konwersacje w ciekawych tematach dotyczących rozwoju osobistego, psychologii, coachingu, relacji społecznych. Równoczesny rozwój kompetencji przyszłości: komunikacji, kreatywności, radzenie sobie z trudnymi emocjami, przełamywaniem bariery językowej.',
};

const postfix = ' | Rozmowni.pl';

function getOrganizationJsonLd(canonicalUrl) {
    return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Kraków, Polska',
            postalCode: '31-242',
            streetAddress: 'Witkowicka 68G/1',
        },
        name: 'Rozmowni.pl',
        description: 'Szkoła języka angielskiego online',
        logo,
        sameAs: socialLinks,
        url: canonicalUrl,
        contactPoint: [
            {
                '@type': 'ContactPoint',
                telephone: '+48506262227',
                contactType: 'customer service',
                areaServed: 'PL',
                availableLanguage: ['en', 'pl'],
            },
        ],
        brand: [
            {
                '@type': 'Brand',
                logo,
                url: canonicalUrl,
                name: 'Rozmowni.pl',
            },
        ],
        telephone: '+48605262227',
        email: 'kontakt@rozmowni.pl',
    };
}

function getWebPageJsonLd(canonicalUrl) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': canonicalUrl,
    };
}

function getBreadcrumbsJsonLd(name, canonicalUrl) {
    return {
        '@context': 'https://schema.org/',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Strona główna',
                item: `${baseUrl}`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name,
                item: canonicalUrl,
            },
        ],
    };
}

function getHomeMetadata(canonicalUrl) {
    const title = 'Rozmowni.pl | Nauka języka angielskiego online przez Skype, Zoom';
    const description = '';

    return {
        title,
        description,
        robots: 'index, follow',
        jsonLd: [
            getWebPageJsonLd(canonicalUrl),
            getOrganizationJsonLd(canonicalUrl),
            {
                '@context': 'https://schema.org/',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Strona główna',
                        item: `${baseUrl}`,
                    },
                ],
            },
        ],
    };
}

function getWhyUs(canonicalUrl) {
    const title = 'Dlaczego my? | Czemu miałbyś uczyć się angielskiego w Rozmowni.pl';
    const description =
        'Nauka z Rozmowni.pl? Gwarancja ciekawych zajęć dotyczących rozwoju osobistego, psychologii, filozofii, coachingu. Równoczesny rozwój kompetencji przyszłości: komunikacji, kreatywności, radzenie sobie z trudnymi emocjami, przełamywaniem bariery językowej przez konwersacje online';

    return {
        title,
        description,
        robots: 'index, follow',
        jsonLd: [getWebPageJsonLd(canonicalUrl), getBreadcrumbsJsonLd('Dlaczego my?', canonicalUrl)],
    };
}

function getAboutUs(canonicalUrl) {
    const title = 'O nas | Angielski online w szkole językowej Rozmowni.pl';
    const description =
        'Szkoła języka angielskiego Rozmowni.pl jest dla gwarancją przyjaznej atmosfery - bez szkolnych ocen i testów, za to ze wsparciem i uśmiechem. To przyjazne środowisko, zachęcające do otwarcia się, popełniania błędów i eksperymentowania! Ćwiczysz intensywniej i szybciej przez internet!';

    return {
        title,
        description,
        robots: 'index, follow',
        jsonLd: [getWebPageJsonLd(canonicalUrl), getBreadcrumbsJsonLd('O nas', canonicalUrl)],
    };
}

function getPricing(canonicalUrl) {
    const title = 'Cennik | Szkoła języka angielskiego Rozmowni.pl';
    const description = '';

    return {
        title,
        description,
        robots: 'index, follow',
        jsonLd: [getWebPageJsonLd(canonicalUrl), getBreadcrumbsJsonLd('Cennik', canonicalUrl)],
    };
}

function getIndividualCourse(canonicalUrl) {
    const title = `Indywidualne kursy angielskiego dla dorosłych online ${postfix}`;
    const description =
        'Kurs języka angielskiego online dla dorosłych i młodzieży. Ucz się w domu przez Skype, Zoom lub Teams i nie trać czasu na dojazdy do szkoły językowej. Rozwijaj kompetencje przyszłości, zdobądź pracę marzeń lub przygotuj się do wyjazdu zagranicznego';

    return {
        title,
        description,
        robots: 'index, follow',
        jsonLd: [getWebPageJsonLd(canonicalUrl), getBreadcrumbsJsonLd('Kursy indywidualne', canonicalUrl)],
    };
}

function getGroupCourse(canonicalUrl) {
    const title = 'Kursy grupowe | Konwersacje, General English, Business English';
    const description =
        'Grupowe lekcje angielskiego online. Szeroki wybór kursów tematycznych: konwersacje, General English, Business English. Różne poziomy zaawansowania: A2, B1, B2, C1, C2.';

    return {
        title,
        description,
        robots: 'index, follow',
        jsonLd: [getWebPageJsonLd(canonicalUrl), getBreadcrumbsJsonLd('Kursy grupowe', canonicalUrl)],
    };
}

function getExam8Course(canonicalUrl) {
    const title = 'Egzamin ósmoklasisty | Kursy przygotowujące do egzaminu 8-klasisty';
    const description =
        'Grupowe lekcje angielskiego online przygotowujące młodzież do egzaminu ósmoklasisty. Ucząc się w rozmowni.pl Twoje dziecko zda egzamin ósmoklasisty z języka angielskiego calująco!';

    return {
        title,
        description,
        robots: 'index, follow',
        jsonLd: [getWebPageJsonLd(canonicalUrl), getBreadcrumbsJsonLd('Egzamin 8-klasisty', canonicalUrl)],
    };
}

function getMaturaExamCourse(canonicalUrl) {
    const title = 'Egzamin maturalny | Kursy przygotowujące do matury';
    const description =
        'Grupowe lekcje angielskiego online przygotowujące młodzież do egzaminu maturalnego na poziomie podstawowym lub rozszerzonym. Ucząc się w rozmowni.pl Twoje dziecko zda maturę z języka angielskiego calująco!';

    return {
        title,
        description,
        robots: 'index, follow',
        jsonLd: [getWebPageJsonLd(canonicalUrl), getBreadcrumbsJsonLd('Egzamin maturalny', canonicalUrl)],
    };
}

function getContact(canonicalUrl) {
    const title = 'Kontakt | Jak dołączyć na lekcje angielskiego online';
    const description =
        'Szkoła języka angielskiego online dla osób, którym dobra znajomość angielskiego jest potrzebna do zdobycia pracy marzeń, chcą uczyć się lub studiować za granicą, pragną bez ograniczeń podróżować po świecie. Skuteczna nauka i pogłębianie wiedzy związanej z językiem angielskim pomoże w realizacji Twoich celów.';

    return {
        title,
        description,
        robots: 'index, follow',
        jsonLd: [getWebPageJsonLd(canonicalUrl), getBreadcrumbsJsonLd('Kontakt', canonicalUrl)],
    };
}

function getPrivacyPolicy(canonicalUrl) {
    const title = `Polityka prywatności${postfix}`;
    const description = '';

    return {
        title,
        description,
        robots: 'noindex, follow',
        jsonLd: [getWebPageJsonLd(canonicalUrl), getBreadcrumbsJsonLd('Polityka prywatności', canonicalUrl)],
    };
}

export const getPropertiesMap = {
    [routeNames.HOME]: getHomeMetadata,
    [routeNames.WHY_US]: getWhyUs,
    [routeNames.ABOUT_US]: getAboutUs,
    [routeNames.PRICING]: getPricing,
    [routeNames.INDIVIDUAL_COURSE]: getIndividualCourse,
    [routeNames.GROUP_COURSE]: getGroupCourse,
    [routeNames.EXAM_8_COURSE]: getExam8Course,
    [routeNames.MATURA_EXAM_COURSE]: getMaturaExamCourse,
    [routeNames.CONTACT]: getContact,
    [routeNames.PRIVACY_POLICY]: getPrivacyPolicy,
};

export function getMetadata(routeName) {
    const properties = getPropertiesMap[routeName];
    if (!properties) {
        return {};
    }

    const canonicalUrl = baseUrl + routeMap[routeName];
    const { description: pageDescription, jsonLd, robots, title: pageTitle } = properties(canonicalUrl);

    const title = pageTitle || fallback.title;
    const description = pageDescription || fallback.description;

    const metadata = {
        title,
        meta: [
            {
                name: 'description',
                content: description,
            },
            {
                property: 'author',
                content: 'Małgorzata Rudowska',
            },
            {
                property: 'og:site_name',
                content: 'Rozmowni.pl',
            },
            {
                property: 'og:title',
                content: title,
            },
            {
                property: 'og:description',
                content: description,
            },
            {
                property: 'og:type',
                content: 'website',
            },
            {
                property: 'og:url',
                content: canonicalUrl,
            },
            {
                property: 'og:image',
                content: image.url,
            },
            {
                property: 'og:image:secure_url',
                content: image.url,
            },
            {
                property: 'og:image:type',
                content: image.type,
            },
            {
                property: 'og:image:width',
                content: image.width,
            },
            {
                property: 'og:image:height',
                content: image.height,
            },
            {
                property: 'og:locale',
                content: 'pl_PL',
            },
            {
                property: 'twitter:title',
                content: title,
            },
            {
                property: 'twitter:description',
                content: description,
            },
            {
                property: 'twitter:card',
                content: 'summary',
            },
            {
                property: 'twitter:image',
                content: image.url,
            },
            {
                property: 'twitter:image:alt',
                content: 'Logo szkoły języka angielskiego Rozmowni.pl',
            },
        ],
        jsonLd,
    };

    if (robots) {
        metadata.meta.push({
            name: 'robots',
            content: robots,
        });
    }
    if (!robots?.match?.('noindex') && canonicalUrl) {
        metadata.canonicalUrl = canonicalUrl;
    }
    if (description) {
        metadata.meta.push();
    }

    metadata.jsonLd = JSON.stringify(metadata.jsonLd);

    return metadata;
}
