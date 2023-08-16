import React from 'react';
import { IconButton, useTheme } from '@chakra-ui/react';
import { GoUnmute, GoMute } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@chakra-ui/react'

function MuteButton() {

    // define theme dispatch and selector variables
    const theme = useTheme();
    const musicPlay = useSelector((state) => state.appReducer.musicPlay)
    const dispatch = useDispatch();

    const iconStyle = {
        fontSize: '28px',
        fontWeight: 'bold',
    };


    // mute or unmute music
    const handelMusicPlayMode = () => {

        // dispatch play mode
        dispatch({ type: 'MUSIC_PLAY', payload: !musicPlay });
    };


    return (

        <Tooltip hasArrow label={musicPlay? "Play Music": "Stop Music"} py={2} px={4} color={theme.colors.brand[50]} bg={theme.colors.brand[200]}>
        <IconButton
            mr={"8"}
            icon={!musicPlay ? <GoUnmute style={iconStyle} /> : <GoMute style={iconStyle} />}
            aria-label="Mute Button"
            size="lg"
            position="fixed"
            top="1rem"
            right="1rem"
            zIndex="1000"
            _hover={{
                bg: 'transparent',
                border: '3px solid ' + theme.colors.brand[200], 
            }}
            bg={theme.colors.brand[300]}
            onClick={handelMusicPlayMode}
        />
        </Tooltip>
    );
}

export default MuteButton;
