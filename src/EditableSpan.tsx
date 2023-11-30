import React, {FC} from 'react';
type EditableSpanPropsType = {
    title:string
    classes: string
}
const EditableSpan: FC<EditableSpanPropsType> = ({title,classes}) => {
    return (
        <span className={classes}>{title}</span>
    );
};

export default EditableSpan;