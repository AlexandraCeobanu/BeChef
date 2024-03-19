import React, { useState, useEffect } from 'react';

function ImageDisplay() {
    const [imageBlob, setImageBlob] = useState(null);

    // Funcție pentru a obține imaginea și a o seta ca obiect Blob
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/v1/upload/profileImage?username=alexandra17");
                console.log(response) // Înlocuiți cu URL-ul serviciului de imagine
                const blob = await response.blob(); // Convertim răspunsul într-un obiect Blob
                setImageBlob(blob); // Setăm obiectul Blob în starea componentei
            } catch (error) {
                console.error('Eroare în obținerea imaginii:', error);
            }
        };

        fetchImage();
    }, []); // Apelăm efectul doar o singură dată la încărcarea componentei

    return (
        <div>
            <h2>Imagine afișată din obiectul Blob</h2>
            {imageBlob && <img src={URL.createObjectURL(imageBlob)} alt="Imagine" />} {/* Afișăm imaginea din obiectul Blob */}
        </div>
    );
}

export default ImageDisplay;