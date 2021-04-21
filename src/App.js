import '@sweetalert2/theme-bootstrap-4/bootstrap-4.css'
import { Form } from "./components/Form";

function LsApp() {
  return (
    <div className="container-fluid bg-dark">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-white my-3">LocalStorage App</h1>
          </div>
        </div>
        <div className="row">
            <Form />
        </div>
      </div>
    </div>
  );
}

export default LsApp;
