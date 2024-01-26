import React from 'react';

type ButtonProps = {
    title: string
    onClickHandler: () => void
    isDisabled?: boolean
    classes?: string
}
export const Button: React.FC<ButtonProps> = ({
                                                  title,
                                                  onClickHandler,
                                                  isDisabled,
                                                  classes
                                              }) => {
    return (
        <>
            <button className={classes}
                    disabled={isDisabled}
                    onClick={onClickHandler}
            >{title}
            </button>
        </>
    );
};

