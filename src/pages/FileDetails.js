import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import docs from '../static/docs.png';
import png from '../static/png.png';
import jpeg from '../static/jpg.png';
import pdf from '../static/pdf.png';
import zip from '../static/zip.png';
import folder from "../static/folder.png";
import xls from '../static/exel.png';

const FileDetailsPage = () => {
  const { id } = useParams();
  const [fileDetails, setFileDetails] = useState([]);
  const [memoContent, setMemoContent] = useState('');

  const handleMemoChange = (event) => {
    setMemoContent(event.target.value);
  };

  // Simulated API call to fetch file details based on the ID
  const fetchFiles = async () => {
    try {
      // Make an API request to fetch the files
      const token = localStorage.getItem('accessToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get(`http://13.125.141.67/api/v1/files/files/${id}`, config);
  
      // Update the files state with the fetched data
      setFileDetails(response.data);
  
      // Set the selectedVersion to the first file detail in the response
      if(response.data && response.data.length > 0) {
        setSelectedVersion(response.data[0]);
      }
  
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


  const handleDelete = async (file) => {
    try {
      const id = file
      const url = `http://13.125.141.67/api/v1/files/files/${id}/remove/`;
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

  const handleEditMemo = async (file) => {
    // Implement the edit memo functionality
    try {
      const id = file
      const url = `http://13.125.141.67/api/v1/files/memos/${id}`;
      const token = localStorage.getItem('accessToken');
      const config = {
      headers: {
          Authorization: `Bearer ${token}`,
          
      },
      };
      await axios.put(url, {'id': id, "memo": memoContent} ,config);

      // Fetch the updated list of files after successful upload
      fetchFiles();
  } catch (error) {
      console.error('Favorite')
  }
  };

 

  
  const [selectedVersion, setSelectedVersion] = useState(fileDetails[0]);

  const renderFileDetails = (selectedFile) => {
    if (selectedFile) {
      const fileExtension = selectedFile.file_name.split('.').pop().toLowerCase();
      const isImage = ['png', 'jpg', 'jpeg'].includes(fileExtension);
  
        
    
          

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
            <div>
                <div className='flex items-center justify-between'>
                    <div className='flex'>
                    <img className='h-6 w-6' src={getFileIcon(selectedFile.file_name)} alt={selectedFile.file_name} />
                        <h1 className='ml-2 text-lg font-semibold'>{selectedFile.file_name}</h1>
                    </div>
                
                <div className='flex'>
                <button className="border-2 font-bold py-2 px-4 rounded-md mt-4 text-black hover:text-white hover:bg-red-500" onClick={() => handleDelete(selectedFile.id)}><i className="fas fa-trash"></i> Delete</button>
                <button className="border-2 font-bold py-2 px-4 ml-4 rounded-md mt-4 text-black hover:text-white hover:bg-black" onClick={() => handleDownload(selectedFile.s3key, selectedFile.file_name)}><i className="fas fa-download text-blue-500"></i> Download</button>
                </div>
                </div>
              
              
              <p className='text-sm'>{formatBytes(selectedFile.size)}</p>
              <p className='text-sm'>Version: {selectedFile.version}</p>
              <div className='w-full border-1 border-gray-200 rounded-xl flex flex-col shadow-sm'>
                <label htmlFor="memo" className='font-semibold'>Memo</label>
                <textarea
                className='rounded-xl p-2'
                    id="memo"
                    onChange={handleMemoChange}
                    defaultValue={selectedFile.memo}
                    rows={15} // Adjust the number of rows
                    cols={40} // Adjust the number of columns
                    style={{ color: 'black',  backgroundColor: '#EEF1EF' }}
                    > 
                </textarea>
                <button className="border-2 font-bold py-2 px-4 rounded-md mt-4 text-black hover:text-white hover:bg-blue-500" onClick={()=> handleEditMemo(selectedFile.id)}>Edit</button>
              </div>
              
              
            </div>
          );
      
    } else {
      return <p>Loading...</p>;
    }
  };
  

  const Versions = () => {
    const handleVersionClick = (version) => {
      const selectedFile = fileDetails.find((file) => file.version === version);
      setSelectedVersion(selectedFile);
    };

    return (
      <div className="fixed top-0 right-0 h-full w-72 bg-gray-200 shadow-md">
        <div className="ml-4 mt-24 text-black">
          <h1 className="font-bold">Versions</h1>
          {fileDetails &&
            fileDetails.map((file) => (
                <div
                key={file.version}
                className='cursor-pointer '
                onClick={() => handleVersionClick(file.version)}
              >
                <div className='bg-gray-50 p-2 mt-1 mr-4 mb-2 rounded-md shadow-md hover:bg-gray-100'>
                  <div className='flex items-center'>
                    <i className="fas fa-file text-blue-500"></i>
                    <p className='font-bold ml-2'>{file.file_name}</p>
                  </div>
                  <p>Version {file.version}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <Versions />
      <div className="mt-28 ml-32 mr-80">{renderFileDetails(selectedVersion)}</div>
    </div>
  );
};

export default FileDetailsPage;

