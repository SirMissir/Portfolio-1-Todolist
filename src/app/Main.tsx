import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import React from "react";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForms";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {addTodolistAC} from "../feauters/todolists/model/todolists-reducer";
import {Todolists} from "../feauters/todolists/ui/Todolists/Todolists";

export const Main = () => {

    const dispatch = useAppDispatch()

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    return (
        <Container fixed>
            <Grid container sx={{mb: '30px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>

            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    )
}