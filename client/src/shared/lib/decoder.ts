// interface decoderProps {
//     latitude: number,
//     longitude: number,
// }

// export const decoder = async ({latitude, longitude}: decoderProps) => {
//     const url = `https://geocode-maps.yandex.ru/v1/?apikey=${import.meta.env.VITE_DECODER_SECRET_KEY}&geocode=${longitude},${latitude}&lang=ru_RU&format=json`;
    
//     try {
//         const response = await fetch(url);
//         console.log('Response status:', response.status);
        
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
//         console.log('Response data:', data);
        
//         return data;
//     } catch (error) {
//         console.error('Error in decoder:', error);
//         throw error; // Перебрасываем ошибку для обработки в вызывающем коде
//     }
// };