import React from 'react';
import sanitizeHtml from 'sanitize-html';

const EmbeddedPage = () => {
    // Sanitize the URL
    const safeUrl = sanitizeHtml("https://www.example.com");

    return (
        <iframe
            src={safeUrl}
            title="Embedded Page"
            width="100%"
            className='h-[252px] rounded-md'
            frameBorder="2px"
            allowFullScreen
        />
    );
};

export default EmbeddedPage;
