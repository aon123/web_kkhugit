import docs from '../static/docs.png';
import png from '../static/png.png';
import jpeg from '../static/jpg.png';
import pdf from '../static/pdf.png';
import zip from '../static/zip.png';
import folder from "../static/folder.png";
import xls from '../static/exel.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { data } from 'autoprefixer';
import { FileSharingSidebar } from './FileSharingSidebar';

const FileUploadGrid = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [sortOption, setSortOption] = useState('none'); // New state for sort option
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFiles, setFilteredFiles] = useState([]);
    const [isSharing, setIsSharing] = useState(false);
    const [fileToShare, setFileToShare] = useState(null);
    const [folders, setFolders] = useState([]);
    const [isListVisible, setIsListVisible] = useState(true); // State for toggling visibility
    const [showCreateFolder, setShowCreateFolder] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [selectedFolder, setSelectedFoler] = useState('Home')



    const handleShowCreateFolder = () => {
        setShowCreateFolder(true);
    }

    const handleCreateFolder = async () =>{
        try {
            // Make an API request to fetch the files
            const token = localStorage.getItem('accessToken');
            console.log(token)
    
          // Set the authorization header with the access token
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
            const response = await axios.post('http://13.125.141.67/api/v1/files/create/folder/' , {name: folderName}, config);
    
            // Update the files state with the fetched data
            fetchFolders();
          } catch (error) {
            console.error('Fetch Files Error:', error);
            // Handle any fetch files error if needed
          }
        
        setShowCreateFolder(false);
    }



    const toggleListVisibility = () => {
        setIsListVisible(!isListVisible); // Toggle the visibility
    };

  
    const handleShare = (file) => {
      setFileToShare(file);
      setIsSharing(true);
    };
  
    const closeSidebar = () => {
      setIsSharing(false);
    };
    const fetchFiles = async (selectedFolder) => {
        const folderName = selectedFolder === "" ? "Home" : selectedFolder;

        try {
          // Make an API request to fetch the files
          const token = localStorage.getItem('accessToken');
          console.log(token)
  
        // Set the authorization header with the access token
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
          const response = await axios.get('http://13.125.141.67/api/v1/files/files/', config);
  
          // Update the files state with the fetched data
          setFiles(response.data.filter((file) =>  file.folder_id === folderName));
          console.log(files)
        } catch (error) {
          console.error('Fetch Files Error:', error);
          // Handle any fetch files error if needed
        }
      };


      const fetchFolders = async () => {
        try {
          // Make an API request to fetch the files
          const token = localStorage.getItem('accessToken');
          console.log(token)
  
        // Set the authorization header with the access token
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
          const response = await axios.get('http://13.125.141.67/api/v1/files/folders/', config);
  
          // Update the files state with the fetched data
          setFolders(response.data);
        } catch (error) {
          console.error('Fetch Files Error:', error);
          // Handle any fetch files error if needed
        }
      };

    

    useEffect(() => {
        
    
        fetchFiles(selectedFolder);
        
        
      }, []);

      useEffect(() => {
        
    
        fetchFolders();
        
        
      }, []);

      useEffect(() => {
        const filteredFiles = files.filter((file) =>
          file.file_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFiles(filteredFiles);
      }, [searchTerm, files]);
    
      const handleSortChange = (e) => {
        const option = e.target.value;
        setSortOption(option);
    
        // Sort the files based on the selected option
        const sortedFiles = [...filteredFiles].sort((a, b) => {
          if (option === 'name') {
            return a.file_name.localeCompare(b.file_name);
          } else if (option === 'size') {
            return a.size - b.size;
          }
          return 0;
        });
    
        setFilteredFiles(sortedFiles);
      };

    const handleFileChange = async (e) => {
        const file = e.target.files[0]; // Get the first file from the selected files


        try {
            console.log(selectedFolder);
            // Create a new FormData object
            const formData = new FormData();

            // Append the file to the FormData object
            formData.append('file', file);
            formData.append('folder_id', selectedFolder )

            // Make an API request to upload the file
            const token = localStorage.getItem('accessToken');
            const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            };
            await axios.post('http://13.125.141.67/api/v1/files/upload/', formData, config);

            // Fetch the updated list of files after successful upload
            fetchFiles(selectedFolder);
        } catch (error) {
            console.error('Upload File Error:', error);
            // Handle any upload file error if needed
        }
        

    };

    const handleFileFavorite = async (file) => {
        try {
            const id = file
            const url = `http://13.125.141.67/api/v1/files/files/${id}/favorite/`;
            const token = localStorage.getItem('accessToken');
            const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                
            },
            };
            await axios.put(url, {'id': id} ,config);

            // Fetch the updated list of files after successful upload
            fetchFiles(selectedFolder);
        } catch (error) {
            console.error('Favorite')
        }
    };

    

    const handleFileOpen = async (file) => {
       
        try {
            const id = file.id
            const url = `http://13.125.141.67/api/v1/files/files/${id}/view/`;
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

    

      const sortedFiles = [...files].sort((a, b) => {
        if (sortOption === 'name') {
          return a.file_name.localeCompare(b.file_name);
        } 
        return 0;
      });

    
    

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


    const handleSelecedFolder = (name)=>{
        setSelectedFoler(name);
        fetchFiles(name)
        console.log(selectedFolder)
    }

    return (
        <div>
            <div className="w-full bg-slate-50 shadow-md rounded-xl mt-8">
            <div className="flex justify-between items-center p-4">
                <div className='flex items-center'>
                <i className="fas fa-folder text-yellow-400"></i>
                <h1 className='font-bold text-lg ml-2'>Folders</h1>
                <button className='ml-4 p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700' onClick={handleShowCreateFolder}> <i className='fas fa-add'></i> Create folder</button>
                { showCreateFolder && <div className='flex ml-4'><input name="folder_name" className="w-full px-4 py-2 pl-4 pr-8 rounded-md border" onChange={(e)=> setFolderName(e.target.value)} type="text" /> <button className='bg-blue-500 p-2 rounded-md text-white ml-1' onClick={()=> handleCreateFolder(folderName)}>Save</button> <button className='bg-red-500 p-2 rounded-md text-white ml-1' onClick={()=> setShowCreateFolder(false)}>Cancel</button> </div> }
                </div>
            
                <button onClick={toggleListVisibility} className="text-sm font-semibold text-gray-600 hover:text-purple-800">
                    {isListVisible ? 'Hide' : 'Show'}
                </button>
            </div>

            {isListVisible && (
                <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 p-2">
                    {folders.map((folder) => (
                        <li key={folder.id} className="p-2">
                            {folder.name === selectedFolder ? (
                    <div className="bg-blue-500 py-2 px-4 flex rounded-md text-white items-center space-x-2 hover:bg-blue-600" onClick={() => handleSelecedFolder(folder.name)}>
                        <i className="fas fa-folder text-yellow-400"></i>
                        <span className='font-medium'>{folder.name}</span>
                    </div>
                ) : (
                    <div className="bg-gray-100 py-2 px-4 flex rounded-md items-center space-x-2 hover:bg-gray-300" onClick={() => handleSelecedFolder(folder.name)}>
                        <i className="fas fa-folder text-yellow-400"></i>
                        <span className='font-medium' >{folder.name}</span>
                    </div>
                )}
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>
         <div className=' bg-slate-50 mt-10 rounded-xl shadow-md'>
            
            <div className='flex items-center justify-between ml-4 mt-4 mb-2 pt-2'>
                <div className='flex items-center'>
                    <i className="fas fa-file text-blue-500"></i>
                    <h1 className='font-bold text-lg ml-2'>Files</h1>
                </div>
                    <div className="relative w-[400px] p-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 pl-4 pr-8 rounded-md border"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>
                <div className='mr-4'>
                    <select onChange={handleSortChange} className='border-2 border-blue-500 rounded-md p-2 bg-white shadow-md focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-200'>
                        <option value='none'>Sort by...</option>
                        <option value='name'>Name</option>
                    </select>
                </div>
            </div>
        <div className="grid md:grid-cols-2 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 ml-2">

            {/* File Upload Card as the first element in the grid */}
            <div className="justify-center relative overflow-auto rounded-lg border-dotted bg-gray-200 border-gray-200 border-2 px-4 py-2 w-48 h-56 shadow-md my-3">
                <label htmlFor="file-input" className="absolute inset-0 cursor-pointer">
                    <input id="file-input" type="file" className="sr-only" onChange={handleFileChange} multiple />
                    <span className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
                        
                        <i className="fas fa-upload text-blue-500"></i>
                        <span className="mt-2 text-sm font-medium">Click to upload files</span>
                    </span>
                </label>
            </div>

            {/* File List Grid */}
            {filteredFiles.map((file, index) => (
                <div key={index} className="justify-center flex items-center relative overflow-auto rounded-lg border-gray-100   bg-white w-48 h-56 shadow-md my-3">
                     
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
                            <button type="button" onClick={() => handleShare(file)} className="mr-2 text-gray-500 hover:text-blue-800">
                                <i className="fas fa-share"></i>
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
        {isSharing && <FileSharingSidebar file={fileToShare} onClose={closeSidebar} />}
        </div>
        </div>
    );
};

export default FileUploadGrid;
