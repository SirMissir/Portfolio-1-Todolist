import Button from "@mui/material/Button";
import React, {memo} from "react";


export const ButtonMemo = memo( (props:PropsType)=>{
    console.log('RerenderButtonFilter')
    return(
        <Button
            variant={props.filter === "all" ? "contained" : "outlined"}
            onClick={props.onClick}
            color="success"
        >
            {props.name}
        </Button>
    )
    }


)