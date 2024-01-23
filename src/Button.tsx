import React from 'react';

type ButtonProps = {
    title: string
    onClickHandler: ()=>void
}
export const Button: React.FC<ButtonProps> = ({title,onClickHandler}) => {
    return (
        <>
           <button onClick={onClickHandler}>{title}</button>
        </>
    );
};

