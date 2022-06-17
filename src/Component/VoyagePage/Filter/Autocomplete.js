import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AppContext } from "./Filter";
import {GlobalContext} from "../../App";
import {ComponentContext} from "./ComponentFac"
const header={ "Authorization": process.env.REACT_APP_AUTHTOKEN}

export default function Auto() {

 const {labels} = React.useContext(AppContext)
  const {search_object, set_search_object} = React.useContext(GlobalContext)
  const { index } = React.useContext(ComponentContext)

  const searchLabel = labels[index];

  
  const [value, setValue] = React.useState([]);
  const [textInput, setTestInput] = React.useState("");
  const [autocompleteOptions, setautocompleteOptions] = React.useState([]);

    React.useEffect(()=>{
      const fetchData = async (labels,textInput) => {
        var formdata = new FormData();
        formdata.append(labels.option, textInput);


        var requestOptions = {
            method: 'POST',
            headers: header,
            body: formdata,
            redirect: 'follow'
        };
        fetch("https://voyages3-api.crc.rice.edu/voyage/autocomplete", requestOptions)
        .then(response => response.json())
        .then(result => {
            var newOptions = result[labels.option]
            setautocompleteOptions(newOptions) })
      }

      fetchData(searchLabel,textInput).catch(console.error)
    },[])

    React.useEffect(()=>{
      set_search_object(search_object=>({                     // <---------- UPDATE SEARCH OBJECT
        ...search_object,
        [searchLabel.option]: value
      }));
    },[value])


  return (

    <Autocomplete
      disablePortal
      autoHighlight
      multiple
      options={autocompleteOptions}
      value={autocompleteOptions[0]}
      onChange={(event, newValue) => {
        setValue(oldArray => [newValue][0]);
      }}
      sx={{ width: 300 }}
      renderInput={(params) => {

        setTestInput(params.inputProps.value)

        return <TextField {...params} label="field" />
         
    }}
    />

  );
}
