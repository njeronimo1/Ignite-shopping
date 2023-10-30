import { styled } from '..'

export const ContainerCarrinho = styled('div', {
    width: '30rem',
    height: '100vh',
    zIndex: '1',
    position: 'absolute',
    right: '0',
    top: '0',
    backgroundColor:'#202024',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',

    '.close': {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        background: 'transparent',
        border: 'none',
        color: 'white',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        zIndex: '1',

        '&:hover':{
            filter: 'brightness(0.8)'
        },
    },

    '.container_carrinho': {
        // width: '100%',
        maxHeight: '60vh',
        overflowY: 'auto',
        
        marginTop: '1rem',
        padding: '3rem',
        position: 'relative',
    },

    '.container_products':{
        marginTop: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },

    '.product':{
        display: 'flex',
        gap: '1rem',
        
        '.image':{
            borderRadius:'8px',
            background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
        },
    },

    '.desc_product':{
        display: 'flex',
        flexDirection: 'column',
        gap:'0.88rem',

        button:{
            backgroundColor: 'transparent',
            border:'none',
            textAlign: 'left',
            fontWeight: 'bold',
            color: '$green300',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            
            '&:hover':{
                filter: 'brightness(0.8)'
            },
        }
    },

    footer:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'absolute',
        bottom: '1rem',

        main:{
            width: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '0.5rem'    
        },
        
        gap:'0.5rem',

        div:{
            width: '100%',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'space-between',
        },

        button: {
            marginTop: '1.5rem',
            backgroundColor: '$green300',
            border: 'none',
            padding: '1rem',
            borderRadius: '8px',
            width: '100%',
            fontWeight: 'bold',
            color: 'white',
            cursor: 'pointer',

            transition: 'all 0.2s ease-in-out',
            
            '&:not([disabled]):hover':{
                filter: 'brightness(0.8)'
            },

            '&:disabled':{
                opacity: 0.6,
                cursor: 'not-allowed'
            },
        }
    }

})