
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
 
  function Toaster(){
    return (
        <ToastContainer
        closeOnClick
        pauseOnHover
        autoClose={2000}
        />
    );
  }

  export default Toaster