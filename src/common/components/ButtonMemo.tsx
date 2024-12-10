import Button from "@mui/material/Button";
import React, {memo} from "react";



type ButtonMemoType = {
    variant:boolean,
    onClick:()=>void,
    color: 'success',
    name: string
}

export const ButtonMemo = memo( (props:ButtonMemoType )=>{
    console.log('RerenderButtonFilter')
    return(
        <Button
            variant={props.variant  ? "contained" : "outlined"}
            onClick={props.onClick}
            color="success"
        >
            {props.name}
        </Button>
    )
    }
)