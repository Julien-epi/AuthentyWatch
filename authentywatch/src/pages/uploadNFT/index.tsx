import { pinFileToIPFS } from '@/utils/pinata';
import React, { useState } from 'react';

const UploadForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (file) {
            try {
                const response = await pinFileToIPFS(file);
                alert(`Fichier uploadé avec succès ! Hash IPFS : ${response.IpfsHash}`);
            } catch (error) {
                console.error('Erreur lors de l\'upload :', error);
                alert('Erreur lors de l\'upload. Veuillez vérifier la console pour plus de détails.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Uploader</button>
        </form>
    );
};

export default UploadForm;
