import React, { useState, useEffect } from 'react';

const FoldersList = () => {
    const [folders, setFolders] = useState([]);
    const [isListVisible, setIsListVisible] = useState(true); // State for toggling visibility
    const [showCreateFolder, setShowCreateFolder] = useState(false);
    const [folderName, setFolderName] = useState('');


    useEffect(() => {
        // Dummy data to simulate API response
        const dummyData = [
        ];

        // Simulate an API call with a setTimeout
        setTimeout(() => {
            setFolders(dummyData);
        }, 100); // simulate a 1 second delay
    }, []);

    const handleShowCreateFolder = () => {
        setShowCreateFolder(true);
    }

    const handleCreateFolder = () =>{
        if(folders === null){
            setFolders({id: 1, name: folderName});
        }
        else{
            const length = folders.length;
            setFolders(prevState => [...prevState, {id: length, name: folderName}]);
        }
        
        setShowCreateFolder(false);
    }



    const toggleListVisibility = () => {
        setIsListVisible(!isListVisible); // Toggle the visibility
    };

    return (
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
                            <div className="bg-gray-100 py-2 px-4 flex rounded-md items-center space-x-2 hover:bg-gray-300">
                                <i className="fas fa-folder text-yellow-400"></i>
                                <span className='font-medium'>{folder.name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FoldersList;

