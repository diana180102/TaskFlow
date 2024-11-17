// import type { NextApiRequest, NextApiResponse } from 'next';
// import multer from 'multer';
// import nextConnect from 'next-connect'; // Importación correcta según la documentación

// interface ExtendedNextApiRequest extends NextApiRequest {
//     file: Express.Multer.File; // Asegúrate de que esto coincida con el tipo de multer
// }

// // Configuración de multer para manejar la subida de archivos
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: './public/uploads', // Carpeta donde se guardarán las imágenes
//         filename: (req, file, cb) => {
//             cb(null, `${Date.now()}-${file.originalname}`); // Generar un nombre único para el archivo
//         },
//     }),
// });

// // Crear un manejador de API con next-connect
// const handler = nextConnect<NextApiRequest, NextApiResponse>()
//     .use(upload.single('profilePicture')) // Middleware para subir una sola imagen
//     .post((req: NextApiRequest, res: NextApiResponse) => {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
//         }

//         // Generar la ruta del archivo subido
//         const filePath = `/uploads/${req.file.filename}`;

//         // Aquí puedes actualizar la base de datos con la nueva URL de la imagen
//         // ...

//         res.status(200).json({ message: 'Imagen subida exitosamente', filePath });
//     });

// export default handler;
