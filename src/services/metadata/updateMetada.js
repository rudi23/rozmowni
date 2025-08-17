import { curryN, isNil, omitBy } from '../../utils';

const updateNodeProperty = curryN(4, (propertyName, node, metaObject, metaObjectKey) => {
    if (metaObject[metaObjectKey]) {
        if (metaObject[metaObjectKey] !== node.getAttribute(propertyName)) {
            node.setAttribute(propertyName, metaObject[metaObjectKey]);
        }
        // eslint-disable-next-line no-param-reassign
        delete metaObject[metaObjectKey];
    } else {
        node.remove();
    }
});

const createNode = curryN(2, (tagName, properties) => {
    const newMetaNode = document.createElement(tagName);
    newMetaNode.setAttribute('data-meta', true);

    const propertiesToAdd = omitBy(isNil, properties);
    Object.entries(propertiesToAdd).forEach(([key, value]) => {
        newMetaNode.setAttribute(key, value);
    });
    document.head.appendChild(newMetaNode);

    return newMetaNode;
});

function updateMetaTags(metas = []) {
    const { metaPropertyObject, metaNameObject } = convertMetasToMetaObjects(metas);

    const nodes = document.head.querySelectorAll('meta[data-meta="true"]');
    const updateMetaNode = updateNodeProperty('content');
    nodes.forEach((node) => {
        const property = node.getAttribute('property');
        const name = node.getAttribute('name');
        if (property) {
            updateMetaNode(node, metaPropertyObject, property);
        } else if (name) {
            updateMetaNode(node, metaNameObject, name);
        } else {
            node.remove();
        }
    });

    const createMetaNode = createNode('meta');
    Object.entries(metaPropertyObject).forEach(([key, value]) =>
        createMetaNode({
            property: key,
            content: value,
        })
    );
    Object.entries(metaNameObject).forEach(([key, value]) =>
        createMetaNode({
            name: key,
            content: value,
        })
    );
}

function convertMetasToMetaObjects(metas) {
    return metas.reduce(
        (acc, meta) => {
            if (meta.property) {
                return {
                    ...acc,
                    metaPropertyObject: {
                        ...acc.metaPropertyObject,
                        [meta.property]: meta.content,
                    },
                };
            }
            if (meta.name) {
                return {
                    ...acc,
                    metaNameObject: { ...acc.metaNameObject, [meta.name]: meta.content },
                };
            }

            return acc;
        },
        {
            metaPropertyObject: {},
            metaNameObject: {},
        }
    );
}

function updateTitle(title = '') {
    const titleNode = document.head.querySelector('title') || createNode('title');
    titleNode.textContent = title;
}

function updateCanonicalUrl(canonicalUrl) {
    const existingCanonicalUrlNode = document.head.querySelector('link[rel="canonical"]');

    if (!canonicalUrl && existingCanonicalUrlNode) {
        existingCanonicalUrlNode.remove();
    } else if (canonicalUrl) {
        const canonicalUrlNode = existingCanonicalUrlNode || createNode('link', { rel: 'canonical' });

        canonicalUrlNode.setAttribute('href', canonicalUrl);
    }
}

function updateJsonLd(jsonLd = '') {
    const linkNode =
        document.head.querySelector('script[type="application/ld+json"][data-meta="true"]') ||
        createNode('script', { type: 'application/ld+json' });
    linkNode.textContent = jsonLd;
}

export function updateMetadata(metadata) {
    updateCanonicalUrl(metadata.canonicalUrl);
    updateTitle(metadata.title);
    updateMetaTags(metadata.meta);
    updateJsonLd(metadata.jsonLd);
}
