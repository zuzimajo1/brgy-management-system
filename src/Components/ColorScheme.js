import React from 'react'
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { Sun, MoonStars } from "tabler-icons-react";

const ColorScheme = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : 'blue'}
      onClick={() => toggleColorScheme()}
      title={
        dark ? `Light Mode or Press Ctrl + J` : `Dark Mode or Press Ctrl + J`
      }
    >
      {dark ? <Sun size={18} /> : <MoonStars size={18} />}
    </ActionIcon>
  );
}

export default ColorScheme