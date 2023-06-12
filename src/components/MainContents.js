import React from 'react';
import FileUploadGrid from './FilesContainer';
import FoldersList from './FolderContainer';


const Content = ({ searchTerm }) => {
    return (
        <main className="ml-64 mr-8 pt-20 pl-8">
            <FileUploadGrid  searchTerm={searchTerm} />
            <div className='h-12'></div>
        </main>
    );
};

export default Content;