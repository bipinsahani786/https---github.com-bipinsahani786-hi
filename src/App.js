import { useRef, useState, useEffect } from 'react';
import './App.css';
import { uploadFile } from './service/api';

function App() {
  const [file, setFile] = useState("");
  const [result, setResult] = useState('');
  const fileInputRef = useRef();
  useEffect(() =>{
    const getImage = async() =>{
      if(file){
         const data = new FormData();
         data.append("name", file.name);
         data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  },[])
  const onUploadClick = () => {
    fileInputRef.current.click();
   
  }
  console.log(file);
const logo = 'https://img.freepik.com/free-vector/business-background-design_1300-411.jpg?size=626&ext=jpg&ga=GA1.2.696115259.1679509504&semt=ais';
  return (
    <div className='container'>
     <img src={logo} alt="banner"/>
     <div className='wrapper'>
     <h1>Simple File sharing</h1>
     <p>Upload and share the download link</p>
     <button onClick={() => onUploadClick()}>Upload</button>
     <input type="file"
     ref= {fileInputRef}
     style={{display:'none'}}
     onChange={(e) => setFile(e.target.files[0])}
     />
     <a href={result} target='_blank'>{result}</a>
     </div>
    </div>
  );
}

export default App;
