import React, { FC } from 'react';
import { useState } from "react";
import { HasOnChangeEventType } from '../models/sharedtypes/HasOnChangeEventType';

export const Username: FC<UsernameProps> = (props: UsernameProps) => {
  const [username, setUsername] = useState("");

  const onChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    props.onChangeEvent?.(event);
  }

  return (
    <>
      <label htmlFor="Username">Password: </label>
      <input id="Username" type="text" name="Username" value={username} onChange={onChangeEvent} />
    </>
  );
};

export type UsernameProps = HasOnChangeEventType & { Username?: string };