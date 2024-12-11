import {useAppSelector} from "../../../../common/hooks/useAppSelector";


export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists.map((tl) => {
                return (
                    <Grid key={tl.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <Todolist key={tl.id} todolist={tl}/>
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}