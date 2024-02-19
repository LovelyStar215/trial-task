import React from 'react';
import sanitizeHtml from 'sanitize-html';

interface EmbeddedPageProps {
    link: string;
}
const EmbeddedPage: React.FC<EmbeddedPageProps> = ({ link }) => {
    // Sanitize the URL
    console.log(link);
    const safeUrl = sanitizeHtml(link);

    return (
        <iframe
            src={link}
            title="Embedded Page"
            width="100%"
            className='h-[252px] rounded-md'
            allowFullScreen
        />
    );
};

export default EmbeddedPage;
