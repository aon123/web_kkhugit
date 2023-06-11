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
  const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const fetchFiles = async () => {
      try {
        // Make an API request to fetch the files
        const token = localStorage.getItem('accessToken');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get('http://13.124.48.227/api/v1/files/files/', config);
    
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
    
    const sortedFiles = files.filter(file => file.favorites);


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


    const handleFileFavorite = async (file) => {
      try {
          const id = file
          const url = `http://13.124.48.227/api/v1/files/files/${id}/favorite/`;
          const token = localStorage.getItem('accessToken');
          const config = {
          headers: {
              Authorization: `Bearer ${token}`,
              
          },
          };
          await axios.put(url, {'id': id} ,config);

          // Fetch the updated list of files after successful upload
          fetchFiles();
      } catch (error) {
          console.error('Favorite')
      }
  };
  

  const handleFileOpen = async (file) => {
       
    try {
        const id = file.id
        const url = `http://13.124.48.227/api/v1/files/files/${id}/view/`;
        const token = localStorage.getItem('accessToken');
        const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        };
        await axios.put(url, {'id': id} ,config);

        // Fetch the updated list of files after successful upload
        navigate(`/file/${id}`)
} catch (error) {
    console.error('Favorite')
}
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

    /* 
  useEffect(() => {
    // Simulated API call to fetch the list of files
    const fetchFiles = async () => {
      try {
        // Make the API call here and update the files state with the response data
        const apiResponse = await yourApiCall(); // Replace yourApiCall with your actual API call
        setFiles(apiResponse.data); // Assuming the API response has a 'data' field containing the list of files
      } catch (error) {
        console.error('Failed to fetch files', error);
      }
    };

    fetchFiles();
  }, []);

  */

  return (
    <main className="ml-64 mr-8 pt-20 pl-8">
      <div className=' bg-slate-50 mt-10 rounded-xl shadow-md'>
          <div className='flex items-center justify-between ml-4 mt-4 mb-2 pt-2'>
                <div className='flex items-center'>
                    <i className="fas fa-star text-blue-500"></i>
                    <h1 className='font-bold text-lg ml-2'>Favorites</h1>
                </div>
          </div>
      <div className="grid md:grid-cols-2 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 ml-2">
        {sortedFiles.map((file, index) => (
          <div key={index} className="justify-center flex items-center relative overflow-auto rounded-lg border-gray-100 bg-white w-48 h-56 shadow-md my-3">
            
              <div className="flex flex-col items-center">
                <img src={getFileIcon(file.file_name)} className="h-20 w-20" alt="" />
                <div className="flex items-center mt-2 pt-4">
                <button type="button" onClick={() => handleDownload(file.s3key, file.file_name)} className="mr-2 text-gray-500 hover:text-blue-800">
                            <i className="fas fa-download"></i>
                        </button>
                            <button
                                type="button"
                                onClick={()=>handleFileFavorite(file.id)}
                                className={`mr-2 ${file.favorites ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-800`}
                            >
                                <i className="fas fa-star"></i>
                            </button>
                        
                </div>
                <div className="pt-2">
                <button type="button" onClick={() => handleFileOpen(file)} className="text-sm font-medium text-gray-600">
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