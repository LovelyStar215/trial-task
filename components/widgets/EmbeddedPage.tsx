import React from 'react';
import sanitizeHtml from 'sanitize-html';

interface EmbeddedPageProps {
    url: string;
}

const EmbeddedPage: React.FC<EmbeddedPageProps> = ({ url }) => {
    // Sanitize the URL
    const safeUrl = sanitizeHtml(url);

    return (
        <iframe
            src={safeUrl}
            title="Embedded Page"
            width="50%"
            height="600"
            frameBorder="2px"
            allowFullScreen
        />
    );
};

export default EmbeddedPage;
