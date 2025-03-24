import { Anton, Montserrat, Archivo_Black, Lexend_Deca } from 'next/font/google';
 
export const anton = Anton(
    { 
        weight:['400'],
        subsets: ['latin'] 
    });

export const monserrat = Montserrat(
    { 
        weight:['400'],
        subsets: ['latin'] 
    });

export const archivo_black = Archivo_Black(
    { 
        weight:['400'],
        subsets: ['latin'] 
    });

export const lexen = Lexend_Deca(
    {
        weight:['200', '300', '400', '500', '600', '700', '800', '900' ],
        subsets:['latin'],
        
    }
)
