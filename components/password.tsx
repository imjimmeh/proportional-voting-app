import React, { FC } from 'react';
import { useState } from "react";
import { HasOnChangeEventType } from '../models/sharedtypes/HasOnChangeEventType';

export const Password: FC<PasswordProps> = (props: PasswordProps) => {
    const [password, setPassword] = useState("");

    const onChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);

        props.onChangeEvent?.(event);
    }

    return (
        <div className='form-group'>
            <label htmlFor="Password">Password: </label>
            <input id="Password" type="password" name="Password" value={password} onChange={(onChangeEvent)} className='form-control' />
        </div>
    );
};

export type PasswordProps = HasOnChangeEventType & { Password?: string };