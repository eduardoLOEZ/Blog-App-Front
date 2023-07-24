import React, { useState } from 'react'
import registerUser from '@/app/api/register'
import MessageModal from '@/components/MessageModal';
import { useRouter } from 'next/navigation';


function register() {
    const router = useRouter();
    

    const [formData, setFormData] = useState({
        username: " ",
        email: " ",
        password: " "
    });
    const [successMessage, setSuccessMessage] = useState(" ");
    const [errorMessage, setErrorMessage] = useState(" ");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { username, email, password } = formData;
            const response = await registerUser(username, email, password);
            console.log(response)

            if (response.status === 201) {
                setSuccessMessage(response.msg);
                setErrorMessage('');
                router.push("http://localhost:3000/");
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                // Si el servidor responde con un mensaje de error, lo mostramos en el componente
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Error en el registro');
            }
            setSuccessMessage('');
        }

    }




    return (
        <div>
            <h2>Registro</h2>
            {/* Mostrar el MessageModal si hay mensaje de éxito o error */}
            {successMessage && (
                <MessageModal message={successMessage} onClose={() => setSuccessMessage('')} />
            )}
            {errorMessage && (
                <MessageModal message={errorMessage} onClose={() => setErrorMessage('')} />
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>

            
            
            
        </div>
    );

}

export default register
