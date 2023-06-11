import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import docs from '../static/docs.png';
import png from '../static/png.png';
import jpeg from '../static/jpg.png';
import pdf from '../static/pdf.png';
import zip from '../static/zip.png';
import folder from "../static/folder.png";
import xls from '../static/exel.png';
import axios from 'axios';



const Content = () => {
    const [files, setFiles] = useState([]);
    const fetchFiles = async () => {
      try {
        // Make an API request to fetch the files
        const token = localStorage.getItem('accessToken');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get('http://13.124.48.227/api/v1/files/shared/', config);
    
        // Update the files state with the fetched data
        setFiles(response.data);
      } catch (error) {
        console.error('Fetch Files Error:', error);
        // Handle any fetch files error if needed
      }
    };
    
    useEffect(() => {
      fetchFiles();
    }, []);
    
    

    const handleDownload = (fileUrl, fileName) => {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = fileUrl;
    
      // Set the custom filename
      link.download = fileName;
    
      // Append the link to the document body and click it
      document.body.appendChild(link);
      link.click();
    
      // Clean up by removing the link from the document body
      document.body.removeChild(link);
    };



  
  

    

  const getFileIcon = (fileName) => {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    switch (fileExtension) {
        case 'png':
            return png;
        case 'jpeg':
        case 'jpg':
            return jpeg;
        case 'pdf':
            return pdf;
        case 'doc':
        case 'docx':
            return docs;
        case 'xls':
        case 'xlsx':
            return xls;
        case 'zip':
            return zip;
        default:
            return folder;
    }
    };

    const formatBytes = (bytes) => {
        return (bytes / 1024).toFixed(2) + ' KB';
    };

   

  return (
    <main className="ml-64 mr-8 pt-20 pl-8">
      <div className=' bg-slate-50 mt-10 rounded-xl shadow-md'>
          <div className='flex items-center justify-between ml-4 mt-4 mb-2 pt-2'>
                <div className='flex items-center'>
                    <i className="fas fa-share text-blue-500"></i>
                    <h1 className='font-bold text-lg ml-2'>Shared files</h1>
                </div>
          </div>
      <div className="grid md:grid-cols-2 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 ml-2">
        {files.map((file, index) => (
          <div key={index} className="justify-center flex items-center relative overflow-auto rounded-lg border-gray-100 bg-white w-48 h-56 shadow-md my-3">
            
              <div className="flex flex-col items-center">
                <img src={getFileIcon(file.file_name)} className="h-20 w-20" alt="" />
                <div className="flex items-center mt-2 pt-4">
                <button type="button" onClick={() => handleDownload(file.s3key, file.file_name)} className="mr-2 text-gray-500 hover:text-blue-800">
                            <i className="fas fa-download"></i>
                        </button>
                        
                </div>
                <div className="pt-2">
                <button type="button" className="text-sm font-medium text-gray-600">
                                {file.file_name}
                            </button>
                  <div className="text-xs text-gray-500 text-center">{formatBytes(file.size)}</div>
                  
                </div>
              </div>
            
          </div>
        ))}
      </div>
      </div>
    </main>
  );
};

export default Content;