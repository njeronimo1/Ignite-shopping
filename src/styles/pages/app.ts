import { styled } from '..'

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: '100vh'
})

export const Header = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',

    '.car':{
        marginTop:'1.5rem',
        backgroundColor: '$gray800',
        height: '2.5rem',
        padding: '0.4rem 0.5rem',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        position: 'relative',

        border: 'none',
        color: '$gray300',

        '&:hover':{
            filter: 'brightness(0.8)'
        },

        '.quantitie':{
            position: 'absolute',
            top:'-0.4rem',
            right: '-0.4rem',
            backgroundColor: '#00875f',
            color: 'white',
            borderRadius: '50%',
            height:'1.25rem',
            width: '1.2rem',
            fontWeight: 'bold',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    },
})