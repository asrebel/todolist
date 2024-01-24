import React from 'react';

type ButtonProps = {
    title: string
    onClickHandler: () => void
    isDisabled?: boolean
}
export const Button: React.FC<ButtonProps> = ({
                                                  title,
                                                  onClickHandler,
                                                  isDisabled
                                              }) => {
    return (
        <>
            <button
                disabled={isDisabled}
                onClick={onClickHandler}>
                {title}
            </button>
        </>
    );
};

