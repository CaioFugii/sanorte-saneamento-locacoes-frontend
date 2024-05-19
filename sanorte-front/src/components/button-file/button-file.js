
import './button-file.css';

function  ButtonFile() {
    return (
    <div className='container-input-file'>  
        <div className='text-content'>   
            <h1 className='title'>Inclua um arquivo excel:</h1>        
            <label for='avatar' id='label-input'>
                <img src='./icon-file.png' alt='icon-file'/>
                Arquivo
            </label>
        </div>   

        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"/>
    </div>
    );
}

export default ButtonFile;