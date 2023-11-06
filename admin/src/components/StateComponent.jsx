import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from 'react-bootstrap/DropdownButton';

import "../App.css";

const StateComponent = () => {
    return (
      <DropdownButton id="dropdown-basic-button" title="Estados">
      <Dropdown.Item eventKey="AC">AC</Dropdown.Item>
      <Dropdown.Item eventKey="AL">AL</Dropdown.Item>
      <Dropdown.Item eventKey="AM">AM</Dropdown.Item>
      <Dropdown.Item eventKey="AP">AP</Dropdown.Item>
      <Dropdown.Item eventKey="BA">BA</Dropdown.Item>
      <Dropdown.Item eventKey="CE">CE</Dropdown.Item>
      <Dropdown.Item eventKey="DF">DF</Dropdown.Item>
      <Dropdown.Item eventKey="ES">ES</Dropdown.Item>
      <Dropdown.Item eventKey="GO">GO</Dropdown.Item>
      <Dropdown.Item eventKey="MA">MA</Dropdown.Item>
      <Dropdown.Item eventKey="MT">MT</Dropdown.Item>
      <Dropdown.Item eventKey="MS">MS</Dropdown.Item>
      <Dropdown.Item eventKey="MG">MG</Dropdown.Item>
      <Dropdown.Item eventKey="PA">PA</Dropdown.Item>
      <Dropdown.Item eventKey="PB">PB</Dropdown.Item>
      <Dropdown.Item eventKey="PE">PE</Dropdown.Item>
      <Dropdown.Item eventKey="PI">PI</Dropdown.Item>
      <Dropdown.Item eventKey="PR">PR</Dropdown.Item>
      <Dropdown.Item eventKey="RJ">RJ</Dropdown.Item>
      <Dropdown.Item eventKey="RN">RN</Dropdown.Item>
      <Dropdown.Item eventKey="RO">RO</Dropdown.Item>
      <Dropdown.Item eventKey="RS">RS</Dropdown.Item>
      <Dropdown.Item eventKey="RR">RR</Dropdown.Item>
      <Dropdown.Item eventKey="SC">SC</Dropdown.Item>
      <Dropdown.Item eventKey="SE">SE</Dropdown.Item>
      <Dropdown.Item eventKey="SP">SP</Dropdown.Item>
      <Dropdown.Item eventKey="TO">TO</Dropdown.Item>
    </DropdownButton> 
);};

export default StateComponent;
 