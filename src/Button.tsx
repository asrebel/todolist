import React from 'react';

type ButtonProps = {
    title: string
}
export const Button: React.FC<ButtonProps> = ({title}) => {
    return (
        <div>
           <button>{title}</button>
        </div>
    );
};

